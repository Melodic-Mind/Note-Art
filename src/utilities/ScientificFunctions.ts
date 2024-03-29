import { Note, PitchClass, RawFlatPitchClass } from 'types';
import { FLAT_CLASS_NOTES, NUMBER_OF_PITCH_CLASSES, PITCH_STANDARD, SEMITONE } from '../Constants.js';
import { getPitchClassIndex, noteToObject } from './PureMusicUtils.js';

/**
 * Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).
 * @param {String} note
 * @returns {Number}
 */
export function freqFromPitch(note: Note): number {
  const { pitchClass, octave } = noteToObject(note);
  const oct = octave - PITCH_STANDARD.octave; // calculate octave difference
  const pitchClassIndex = getPitchClassIndex(pitchClass as PitchClass);
  return Math.pow(
    SEMITONE,
    pitchClassIndex - FLAT_CLASS_NOTES.indexOf(PITCH_STANDARD.pitchClass as RawFlatPitchClass) + oct * NUMBER_OF_PITCH_CLASSES,
  ) * PITCH_STANDARD.frequency;
}

export function freqToPitch(frequency: number): Note {
  const midi = freqToMidi(frequency);
  const pitchClass = midi % NUMBER_OF_PITCH_CLASSES;
  const octave = Math.floor(midi / NUMBER_OF_PITCH_CLASSES) - 1;
  const note = `${FLAT_CLASS_NOTES[pitchClass]}${octave}`;
  return note as Note;
}

/**
 * Turns a midi value to frequency.
 * @param {Number} midi
 * @returns {number}
 */
export function freqFromMidi(midi: number): number {
  return PITCH_STANDARD.frequency * Math.pow(2, (midi - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES);
}

/**
 * Turns a frequency value to midi note.
 * @param frequency
 * @returns {number}
 */
export function freqToFloatMidi(frequency: number): number {
  return PITCH_STANDARD.midi + NUMBER_OF_PITCH_CLASSES * Math.log2(frequency / PITCH_STANDARD.frequency);
}

/**
 * Turns frequency value to a ABSOLUTE midi note.
 * @param {Number} frequency
 * @returns {number}
 */
export function freqToMidi(frequency: number): number {
  return Math.round(freqToFloatMidi(frequency));
}

/**
 * Returns how much cents off a frequency is from an absolute note.
 * @param {Number} frequency
 * @param {Number} midi
 * @returns {number}
 */
export function centsOffFromFreq(frequency: number, midi: number): number {
  return Math.floor(1200 * Math.log(frequency / freqFromMidi(midi)) / Math.log(2));
}

/**
 * Generate frequency from real number.
 * @param realNumber
 * @returns {Number}
 */
export function midiToFreq(realNumber: number): number {
  return PITCH_STANDARD.frequency * (Math.pow(2, (realNumber - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES));
}

/**
 * Convert MIDI value to pitch.
 * @param {Number} midi
 * @returns {Note}
 */
export function midiToPitch(midi: number): Note {
  const freq = freqFromMidi(midi);
  return freqToPitch(freq);
}

/**
 * Convert pitch to MIDI value.
 * @param {Note} pitch
 * @returns {number}
 */
export function pitchToMidi(note: Note): number {
  const freq = freqFromPitch(note);
  return freqToMidi(freq);
}