import {
  FLAT_CLASS_NOTES, INTERVALS, NOTE_DURATIONS_AS_SIZE_IN_MEASURE, NUMBER_OF_PITCH_CLASSES, PITCH_CLASSES,
  SHARP_CLASS_NOTES,
} from '../Constants.js';
import { firstToUpper, isNumberAsString, mapString, occurrencesInString } from './GeneralFunctions.js';
import {
  NoteAsObject, PitchClass, PitchClassLetter, Accidental, Note, Octave, RawPitchClass, RawFlatPitchClass, RawSharpPitchClass,
} from '../types';

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {PitchClass} pitchClass1 first note
 * @param {PitchClass} pitchClass2 second note
 * @returns {number}
 * @example
 * getPitchClassesInterval('C', 'E') //  4
 */
export function getPitchClassesInterval(pitchClass1: PitchClass, pitchClass2: PitchClass): number {
  const normalizedPC1 = normalizePitchClass(pitchClass1);
  const normalizedPC2 = normalizePitchClass(pitchClass2);
  const i1 = getPitchClassIndex(normalizedPC1);
  const i2 = getPitchClassIndex(normalizedPC2);
  return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2);
}

/**
 * Returns the interval from one note to another.
 * @param note1
 * @param note2
 * @returns {number}
 * @example getNotesInterval('C3', 'G3'); // 7
 */
export function getNotesInterval(note1: Note, note2: Note): number {
  const {
    pitchClass: pc1,
    octave: octave1,
  } = noteToObject(note1);

  const {
    pitchClass: pc2,
    octave: octave2,
  } = noteToObject(note2);

  const normalizedPC1 = normalizePitchClass(pc1);
  const normalizedPC2 = normalizePitchClass(pc2);

  const pitchClassDistance = getPitchClassesInterval(normalizedPC1, normalizedPC2);
  const octaveDistance = (octave2 - octave1);

  const pc1Index = getPitchClassIndex(normalizedPC1);
  const pc2Index = getPitchClassIndex(normalizedPC2);
  const normalizedOctaveDistance = octaveDistance - (pc2Index >= pc1Index ? 0 : 1);

  return normalizedOctaveDistance * 12 + pitchClassDistance;
}

/**
 * Returns the interval from one note to another.
 * Accepts both pitch classes and notes.
 * @param {PitchClass | Note} note1
 * @param {PitchClass | Note} note2
 * @returns {number}
 * @example getNotesInterval('C3', 'G3'); // 7
 */
export function getInterval(note1: PitchClass | Note, note2: PitchClass | Note): number {
  return isNote(note1) ? 
    getNotesInterval(note1 as Note, note2 as Note) : 
    getPitchClassesInterval(note1 as PitchClass, note2 as PitchClass);
}

/**
 * Returns sharp if a pitch class has a sharp, otherwise returns flat.
 * @param pitchClass
 * @returns
 * @example
 * getClassSet('C#') // '#'
 * getClassSet('C') // 'b'
 */
export function getClassSet(pitchClass: PitchClass): '#' | 'b' {
  return pitchClass.includes('#') ? '#' : 'b';
}

/**
 * Returns an array of all natural music notes from set.
 * @param set
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPitchClassSet(set: 'b' | '#' | ''): any {
  if(set === '#') {
    return SHARP_CLASS_NOTES;
  } else if(set === 'b') {
    return FLAT_CLASS_NOTES;
  } else return PITCH_CLASSES;
}

/**
 * Returns the octave from a note.
 * Assuming the octave is between -9 - 9.
 * @returns {*}
 * @param note
 */
export function extractOctave(note: string): string {
  return note[note.length - 1];
}

/**
 * Returns the pitch class from a note.
 * @param note
 * @returns {*}
 */
export function extractPitchClass(note: string): string {
  return note.slice(0, note.length - 1);
}

/**
 * Transform a pitch class to it's basic form.
 * @param {String} pc
 * @returns {PitchClass}
 * @example
 * normalizePitchClass('CX') // 'A#'
 */
export function normalizePitchClass(pc: PitchClass): PitchClass {
  const pitchLetter: PitchClassLetter = firstToUpper(pc[0]) as PitchClassLetter;
  const accidental: Accidental = pc[1] as Accidental;

  let times, index, accurateIndex;
  switch (accidental) {
  case '#':
    return !['E', 'B'].includes(pitchLetter)
      ? `${pitchLetter}${accidental}` as PitchClass
      : SHARP_CLASS_NOTES[(SHARP_CLASS_NOTES.indexOf(pitchLetter) + 1) % 12];

  case 'x':
    times = occurrencesInString(pc, 'x') * 2;
    if(pc[pc.length - 1] === '#') {
      ++times;
    }
    return SHARP_CLASS_NOTES[(SHARP_CLASS_NOTES.indexOf(pitchLetter) + times) % NUMBER_OF_PITCH_CLASSES];

  case 'b':
    if(!['C', 'F'].includes(pitchLetter) && pc.length === 2) {
      return `${pitchLetter}${accidental}` as PitchClass;
    }

    times = occurrencesInString(pc, 'b');
    index = FLAT_CLASS_NOTES.indexOf(pitchLetter) - times;
    accurateIndex = index >= 0 ? index : NUMBER_OF_PITCH_CLASSES + index;
    return FLAT_CLASS_NOTES[(accurateIndex) % NUMBER_OF_PITCH_CLASSES];

  default:
    return pitchLetter;
  }
}

export function normalizeNote(note: Note): Note {
  const { pitchClass, octave } = noteToObject(note);
  return `${normalizePitchClass(pitchClass)}${octave}` as Note;
}

/**
 * Turns a note into an object with pitch class and octave.
 * @param {string} note Pitch as a string, e.g Ab3
 * @returns {{octave: number, pitchClass: PitchClass}}
 */
export function noteToObject(note: Note): NoteAsObject {
  const pitchClass = firstToUpper(note.slice(0, note.length - 1)) as PitchClass;
  const octave = parseInt(note[note.length - 1]) as Octave;

  return { pitchClass, octave };
}

/**
 * Returns true if string is a pitch class, else false.
 * @param {string} str
 * @returns {boolean}
 */
export function isPitchClass(str: string): boolean {
  return PITCH_CLASSES.includes(str as RawPitchClass);
}

export function isNote(str: string): boolean {
  return str.length > 1 && isNumberAsString(str[str.length - 1]);
}

/**
 * Returns true if a note is a rest, else false.
 * @param {string} str
 * @returns {boolean}
 */
export function isRest(str: string): boolean {
  return ['r', 'R'].includes(str);
}

export function isDuration(dur: string): boolean {
  return Object.keys(NOTE_DURATIONS_AS_SIZE_IN_MEASURE).includes(dur);
}

/**
 * Returns an object where the keys are raw notes and their value is an object with note & octave props.
 * @param {string} baseNote
 * @param {number} range
 * @returns {Array}
 */
export function notesInRange(baseNote: Note, range: number): Record<Note, NoteAsObject> {
  // eslint-disable-next-line prefer-const
  let { pitchClass, octave } = noteToObject(baseNote);
  const notes: Record<Note, NoteAsObject> = {};
  let tmpPitchClass;

  for(let i = 0; i <= range; ++i) {
    const currentIndex = (FLAT_CLASS_NOTES.indexOf(pitchClass as RawFlatPitchClass) + i) % 12;
    tmpPitchClass = FLAT_CLASS_NOTES[currentIndex];

    const key = `${tmpPitchClass}${octave}` as Note;
    const value = { pitchClass: tmpPitchClass, octave } as NoteAsObject;
    notes[key] = value;

    if(tmpPitchClass === 'B') {
      octave++;
    }
  }

  return notes;
}

/**
 * Returns the index of a pitch class out of a pitch class.
 * @param pc
 * @returns {number}
 */
export function getPitchClassIndex(pc: PitchClass): number {
  const classSet = pc.includes('#') ? '#' : 'b';
  return getPitchClassSet(classSet).indexOf(pc as PitchClassLetter);
}

/**
 *
 * @returns {string}
 * @param from
 * @param to
 */
export function enharmonicPitchClass(from: PitchClass, to: PitchClass): string {
  const interval = getPitchClassesInterval(from, to);

  const type = interval >= 7 ? '#' : 'b';

  const times = interval >= 7 ? 12 - interval : interval;

  let str = '';
  for(let i = 0; i < times; ++i) {
    str = str.concat(type);
  }

  if(type === '#') {
    str = mapString(str, '##', 'x');
  }

  return `${to}${str}`;
}

/**
 * Turns any sharp pitch class to flat.
 * @returns {String}
 * @param str
 */
export function toFlat(str: PitchClass | Note): PitchClass | Note {
  if(str.includes('#')) {
    const { pitchClass, octave } = noteToObject(str as Note);
    if(isNaN(octave)) {
      return FLAT_CLASS_NOTES[SHARP_CLASS_NOTES.indexOf(str as RawSharpPitchClass)];
    } else {
      const pc = FLAT_CLASS_NOTES[SHARP_CLASS_NOTES.indexOf(pitchClass as RawSharpPitchClass)];
      return `${pc}${octave}` as Note;
    }
  }

  return str;
}

/**
 * Normalize any interval representation to a semitone of Number type.
 * @param {Number | String} interval
 * @returns {number}
 */
export function toSemitones(interval: number): number {
  let semitones: number;
  if(typeof interval === 'number') {
    semitones = interval;
  } else {
    if(isNumberAsString(interval)) {
      semitones = INTERVALS[interval] as number;
    } else {
      semitones = parseInt(interval);
    }
  }
  return semitones;
}

/**
 * Returns the max interval from an array of intervals.
 * @param {Array} intervals
 * @returns {number}
 */
export function maxInterval(intervals: Array<number>): number {
  let max = -Infinity;
  intervals.forEach(interval => {
    const curr: number = toSemitones(interval);
    max = curr > max ? curr : max;
  });
  return max;
}

/**
 * Returns the highest note between 2 notes.
 * @param {String} note1
 * @param {String} note2
 * @returns {String}
 */
export function highestNote(note1: Note, note2: Note): string {
  return lowestNote(note1, note2) === note1 ? note2 : note1;
}

/**
 * Returns the lowest note between 2 notes.
 * @param {String} note1
 * @param {String} note2
 * @returns {String}
 */
export function lowestNote(note1: Note, note2: Note): Note {
  const noteObj1 = noteToObject(note1);
  const noteObj2 = noteToObject(note2);
  if(noteObj1.octave < noteObj2.octave) {
    return note1;
  } else if(noteObj1.octave > noteObj2.octave) {
    return note2;
  } else {
    const pitchClass = lowestPitch(noteObj1.pitchClass, noteObj2.pitchClass);
    return `${pitchClass}${noteObj1.octave}` as Note;
  }
}

/**
 * Returns the lowest pitch between 2 pitch classes.
 * @param {String} pc1
 * @param {String} pc2
 * @returns {String}
 */
export function lowestPitch(pc1: PitchClass, pc2: PitchClass): PitchClass {
  const normalizedPc1 = normalizePitchClass(pc1);
  const normalizedPc2 = normalizePitchClass(pc2);
  return PITCH_CLASSES.indexOf(normalizedPc1 as RawPitchClass) <= PITCH_CLASSES.indexOf(normalizedPc2 as RawPitchClass) ? pc1 : pc2;
}

/**
 * Returns the lowest note from an array of notes.
 * @param {Array} notes
 * @returns {String}
 */
export function lowestNoteFromArray(notes: Array<Note>): string {
  return notes.reduce((acc, curr) => lowestNote(acc, curr), notes[0]);
}

/**
 * Returns the highest note from an array of notes.
 * @param {Array} notes
 * @returns {Note}
 */
export function highestNoteFromArray(notes: Array<Note>): Note {
  return notes.reduce((acc: Note, curr: Note) => highestNote(acc, curr) as Note, notes[0]);
}

/**
 * Turns an array of pitch classes to an array containing the interval between each 2 pitch classes.
 * @param pitchClasses 
 * @returns 
 */
export function getPatternFromPitchClasses(pitchClasses: Array<PitchClass>): Array<number> {
  const base = pitchClasses[0];
  // for cases when it croses an octave, e.g C E G C E B
  let octaveMultiplier = 0;
  return pitchClasses.map((pc, i) => {
    if(base === pc && i > 0) {
      ++octaveMultiplier;
    }
    return getPitchClassesInterval(base, pc) + (12 * octaveMultiplier);
  });
}

/**
 * Turns an array of notes to an array containing the interval between each 2 notes.
 * @param notes 
 * @returns 
 */
export function getPatternFromNotes(notes: Array<Note>): Array<number> {
  const base = notes[0];
  return notes.map((pc) => {
    return getNotesInterval(base, pc);
  });
}
