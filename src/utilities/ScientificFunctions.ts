import { SEMITONE, NUMBER_OF_PITCH_CLASSES, PITCH_STANDARD, FLAT_CLASS_NOTES } from '../Constants'
import { getPitchClassIndex, noteToObject }                                    from './PureMusicUtils'

/**
 * Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).
 * @param {String} note
 * @returns {Number}
 */
export function freqFromPitch(note: string): number {
  const { pitchClass, octave } = noteToObject(note)
  const oct                    = octave - PITCH_STANDARD.octave // calculate octave difference
  const pitchClassIndex        = getPitchClassIndex(pitchClass)
  return Math.pow(
    SEMITONE,
    pitchClassIndex - FLAT_CLASS_NOTES.indexOf(PITCH_STANDARD.pitchClass) + oct * NUMBER_OF_PITCH_CLASSES
  ) * PITCH_STANDARD.frequency
}

/**
 * Turns a midi value to frequency.
 * @param {Number} midi
 * @returns {number}
 */
export function freqFromMidi(midi: number) : number {
  return PITCH_STANDARD.frequency * Math.pow(2, (midi - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES)
}

/**
 * Turns a frequency value to midi note.
 * @param frequency
 * @returns {number}
 */
export function freqToFloatMidi(frequency: number): number {
  return PITCH_STANDARD.midi + NUMBER_OF_PITCH_CLASSES * Math.log2(frequency / PITCH_STANDARD.frequency)
}

/**
 * Turns frequency value to a ABSOLUTE midi note.
 * @param {Number} frequency
 * @returns {number}
 */
export function freqToMidi(frequency: number): number {
  return Math.round(freqToFloatMidi(frequency))
}

/**
 * Returns how much cents off a frequency is from an absolute note.
 * @param {Number} frequency
 * @param {Number} midi
 * @returns {number}
 */
export function centsOffFromFreq(frequency: number, midi: number): number {
  return Math.floor(1200 * Math.log(frequency / freqFromMidi(midi)) / Math.log(2))
}

/**
 * Generate frequency from real number.
 * @param realNumber
 * @returns {Number}
 */
export function midiToFreq(realNumber: number): number {
  return PITCH_STANDARD.frequency * (Math.pow(2, (realNumber - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES))
}
