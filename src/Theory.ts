import { enharmonicPitchClass, getClassSet, getPitchClassSet, noteToObject, getInterval, isNote, normalizePitchClass } from './utilities/PureMusicUtils.js';
import {
  FLAT_CLASS_NOTES, NUMBER_OF_PITCH_CLASSES, PITCH_CLASSES, SHARP_CLASS_NOTES,
} from './Constants.js';
import { freqToMidi } from './utilities/ScientificFunctions.js';
import { Chord, PitchClassLetter, Note, Scale, PitchClass, RawPitchClass, RawFlatPitchClass } from 'types.js';
import { rearrangeArray } from './utilities/GeneralFunctions.js';

/**
   * Transposes a pitch class by the given interval.
   * @param {PitchClass} pitchClass pitch class to transpose, e.g 5, 7
   * @param {number} interval The interval, e.g 5, 7
   * @returns {PitchClass}
   * @example
   * transposePitchClass('C', 7) // => 'G'
   */
export function transposePitchClass(pitchClass: PitchClass, interval: number): PitchClass {
  const normalizedInterval = interval % NUMBER_OF_PITCH_CLASSES;
  const normalizedPitchClass: PitchClass = normalizePitchClass(pitchClass);
  const classSet = getClassSet(pitchClass);
  const classIndex = getPitchClassSet(classSet).indexOf(normalizedPitchClass);
  if(PITCH_CLASSES.includes(pitchClass as RawPitchClass)) {
    const index = Math.abs((classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES);
    return getPitchClassSet(classSet)[index];
  } else {
    const classIndex = getPitchClassSet(classSet).indexOf(pitchClass[0] as PitchClassLetter);
    const index = Math.abs((classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES);
    let [letter, acc] = getPitchClassSet(classSet)[index];
    const accidentals = pitchClass.slice(1);
    if(acc === 'b' && !accidentals.includes('b')) {
      const pc2 = FLAT_CLASS_NOTES[(FLAT_CLASS_NOTES.indexOf(`${letter}${acc}` as RawFlatPitchClass) - 1) % NUMBER_OF_PITCH_CLASSES];
      const enharmonic = enharmonicPitchClass(`${letter}${acc}` as PitchClass, pc2);
      letter = enharmonic[0];
      acc = enharmonic[1];
    }
    if(accidentals[accidentals.length - 1] === '#' && acc) {
      return `${letter}${accidentals.slice(0, accidentals.length - 1)}x` as PitchClass;
    }
    return `${letter}${accidentals}${acc ? acc : ''}` as PitchClass;
  }
}

/**
   * Transposes a note by the given interval.
   * @param {Note} note note to transpose, e.g 5, 7
   * @param {number} interval The interval, e.g 5, 7
   * @returns {PitchClass}
   * @example
   * transposeNote('C4', 7) // => 'G4'
   */
export function transposeNote(note: Note, interval: number): Note {
  const { pitchClass, octave } = noteToObject(note);
  const normalizedPitchClass = normalizePitchClass(pitchClass);
  const classSet = getClassSet(pitchClass);
  const classIndex = getPitchClassSet(classSet).indexOf(normalizedPitchClass);
  
  const newPitchClass = transposePitchClass(pitchClass, interval);
  
  let octDiff = Math.floor((classIndex + interval) / 12);
  if(interval < 0) {
    octDiff = classIndex + interval < 0 ? octDiff : 0;
  }
  return `${newPitchClass}${octave + octDiff}` as Note;
}

/**
   * Transposes a pitch class or a note by the given interval.
   * @param {PitchClass | Note} note note to transpose, e.g 5, 7
   * @param {number} interval The interval, e.g 5, 7
   * @returns {PitchClass}
   * @example
   * transpose('C4', 7) // => 'G4'
   */
export function transpose(note: PitchClass | Note, interval: number): string {
  return isNote(note) ?
    transposeNote(note as Note, interval) :
    transposePitchClass(note as PitchClass, interval);
}

/**
   * Generate a note from frequency.
   * @param frequency
   * @returns {Note}
   * @example
   * noteFromFrequency(440) // => 'A4'
   */
export function noteFromFrequency(frequency: number): string {
  const n = freqToMidi(frequency);
  const pitchClass = SHARP_CLASS_NOTES[n % NUMBER_OF_PITCH_CLASSES];
  const octave = Math.floor(n / NUMBER_OF_PITCH_CLASSES - 1);

  return `${pitchClass}${octave}`;
}

/**
 * Creates an array of notes from a note/pitch class & an array of intervals.
 * @param {PitchClass | Note} note 
 * @param {Array<number>} pattern 
 * @returns {Array<PitchClass | Note>}
 * @example
 * notesFromPattern('C4', [0, 2, 4, 5, 7, 9, 11]) // => ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
 */
export function intervalsToNotes(note: PitchClass | Note , pattern: Array<number>): Array<PitchClass | Note> {
  return pattern.map(interval => transpose(note, interval) as Note);
}

/**
 * Inverts a chord
 * @param chord
 * @param type
 * @returns {Array<PitchClass | Note>}
 */
export function invertChord(chord: Chord,type: number): Array<PitchClass | Note> {
  if(typeof type === 'number' && type <= chord.length) {
    return rearrangeArray(chord, type) as Array<PitchClass | Note>;
  }
  throw new Error('inversion cant be bigger then the number of pitch classes in the chord');
}

/**
 * Returns the note in degree of a scale(array of notes).
 * for example - if the Scale is a C Major,
 * than interval(1) will return D.
 * @param {Scale} scale An array of notes.
 * @param {Number} degree The degree of the note.
 * @returns {PitchClass | Note}
 * @example
 * const majorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
 * scaleDegree(majorScale, 1) // => 'D'
 */
export function scaleDegree(scale: Scale, degree: number): PitchClass | Note{
  return scale[degree - 1];
}

/**
   * Returns the chord at the degree with specified size.
   * @param {Scale} scale An array of notes.
   * @param {number} degree Degree to get chord at.
   * @param {number} size Number of notes in the chord.
   * @returns {Chord}
   */
export function getChordFromScale(scale: Scale, degree: number, size = 3): Chord {
  const root = scaleDegree(scale, degree);
  const index = degree - 1;
  const pattern = [0];

  for(let i = 1; i < size; ++i) {
    const currIndex = index + (i * 2);
    const note = scale[currIndex % scale.length] as Note;
    const { pitchClass, octave } = noteToObject(note);
    const newOctave = octave + Math.floor(currIndex / scale.length);
    const newNote = `${pitchClass}${newOctave}` as Note;
    pattern.push(getInterval(root, newNote));
  }

  return intervalsToNotes(root, pattern);
}

/**
 * Returns an array of chords from a scale with specified size.
 * @param scale 
 * @param size
 * @returns {Array<Chord>}
 */
export function scaleToChords(scale: Scale, size = 3): Array<Chord> {
  return scale.map((_, degree) => getChordFromScale(scale, degree + 1, size));
}