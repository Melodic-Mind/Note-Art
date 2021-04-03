import {
  FLAT_CLASS_NOTES, INTERVALS, NOTE_DURATIONS_AS_SIZE_IN_MEASURE, NUMBER_OF_PITCH_CLASSES, PITCH_CLASSES,
  SHARP_CLASS_NOTES
}                                                                         from '../Constants'
import { firstToUpper, isNumberAsString, mapString, occurrencesInString } from './GeneralFunctions'
import { NoteAsObject }                                                   from '../types'

/**
 * Returns the interval from one note to another.
 * @param note1
 * @param note2
 */
export function getNotesInterval(note1: string, note2: string): number {
  const {
          pitchClass: pc1,
          octave:     octave1
        } = noteToObject(note1)

  const {
          pitchClass: pc2,
          octave:     octave2
        } = noteToObject(note2)

  const pitchClassDistance = getPitchClassesInterval(pc1, pc2)
  const octaveDistance     = (octave2 - octave1)

  const pc2Index                 = getPitchClassIndex(pc2)
  const pc1Index                 = getPitchClassIndex(pc1)
  const normalizedOctaveDistance = octaveDistance - (pc2Index >= pc1Index ? 0 : 1)

  return normalizedOctaveDistance * 12 + pitchClassDistance
}

export function getPitchClassSet(set: string): Array<string> {
  if(set === '#') {
    return SHARP_CLASS_NOTES
  }
  if(set === 'b') {
    return FLAT_CLASS_NOTES
  }
  return PITCH_CLASSES
}

/**
 * Returns the octave from a raw note.
 * @returns {*}
 * @param note
 */
export function extractOctave(note: string): string {
  return note[note.length - 1]
}

/**
 * Returns the pitch class from a raw note.
 * @param note
 * @returns {*}
 */
export function extractPitchClass(note: string): string {
  return note.slice(0, note.length - 1)
}

/**
 * Transform a pitch class to it's basic form.
 * @param {String} pc
 */
export function normalizePitchClass(pc: string): string {
  const [pitchLetter, accidental] = pc
  let times, index, accurateIndex
  switch(accidental) {
    case '#':
      return !['E', 'B'].includes(pitchLetter) ?
             pc :
             SHARP_CLASS_NOTES[(SHARP_CLASS_NOTES.indexOf(pitchLetter) + 1) % 12]

    case 'x':
      times = occurrencesInString(pc, 'x') * 2
      if(pc[pc.length - 1] === '#') {
        ++times
      }
      return SHARP_CLASS_NOTES[(SHARP_CLASS_NOTES.indexOf(pitchLetter) + times) % NUMBER_OF_PITCH_CLASSES]

    case 'b':
      if( !['C', 'F'].includes(pitchLetter) && pc.length === 2) {
        return pc
      }

      times         = occurrencesInString(pc, 'b')
      index         = FLAT_CLASS_NOTES.indexOf(pitchLetter) - times
      accurateIndex = index >= 0 ? index : NUMBER_OF_PITCH_CLASSES + index
      return FLAT_CLASS_NOTES[(accurateIndex) % NUMBER_OF_PITCH_CLASSES]

    default:
      return pitchLetter
  }
}

/**
 * Turns a note into an object with pitch class and octave.
 * @param {string} note Pitch as a string, e.g Ab3
 * @returns {{octave: number, pitchClass: String}}
 */
export function noteToObject(note: string): NoteAsObject {
  const pitchClass = firstToUpper(note.slice(0, note.length - 1))
  const octave     = parseInt(note[note.length - 1])

  return { pitchClass, octave }
}

/**
 * Returns true if a note is a rest, else false.
 * @param {string} str
 * @returns {boolean}
 */
export function isRest(str: string): boolean {
  return ['r', 'R'].includes(str)
}

export function isDuration(dur: string): boolean {
  return Object.keys(NOTE_DURATIONS_AS_SIZE_IN_MEASURE).includes(dur)
}

/**
 * Returns an object where the keys are raw notes and their value is an object with note & octave props.
 * @param {string} baseNote
 * @param {number} range
 * @returns {Array}
 */
export function notesInRange(baseNote: string, range: number): any {
  let { pitchClass, octave } = noteToObject(baseNote)
  const notes: any           = {}
  let tmpPitchClass

  for(let i = 0; i <= range; ++i) {
    tmpPitchClass = FLAT_CLASS_NOTES[(FLAT_CLASS_NOTES.indexOf(pitchClass) + i) % 12]

    notes[tmpPitchClass + octave] = { pitchClass: tmpPitchClass, octave }

    if(tmpPitchClass === 'B') {
      octave++
    }
  }

  return notes
}

/**
 * Returns the index of a pitch class out of a pitch class.
 * @param pc
 * @returns {number}
 */
export function getPitchClassIndex(pc: string): number {
  const classSet = pc.includes('#') ? '#' : 'b'
  return getPitchClassSet(classSet).indexOf(pc)
}

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {String} pitchClass1 first note
 * @param {String} pitchClass2 second note
 * @returns {Number}
 */
export function getPitchClassesInterval(pitchClass1: string, pitchClass2: string): number {
  const i1 = getPitchClassIndex(pitchClass1),
        i2 = getPitchClassIndex(pitchClass2)
  return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
}

/**
 *
 * @returns {string}
 * @param from
 * @param to
 */
export function enharmonicPitchClass(from: string, to: string): string {
  const interval = getPitchClassesInterval(from, to)

  const type = interval >= 7 ? '#' : 'b'

  let times = interval >= 7 ? 12 - interval : interval

  let str = ''
  for(let i = 0; i < times; ++i) {
    str = str.concat(type)
  }

  if(type === '#') {
    str = mapString(str, '##', 'x')
  }

  return `${ to }${ str }`
}

/**
 * Turns any sharp pitch class to flat.
 * @returns {String}
 * @param str
 */
export function toFlat(str: string): string {
  if(str.includes('#')) {
    const { pitchClass, octave } = noteToObject(str)
    if(isNaN(octave)) {
      return FLAT_CLASS_NOTES[SHARP_CLASS_NOTES.indexOf(str)]
    } else {
      const pc = FLAT_CLASS_NOTES[SHARP_CLASS_NOTES.indexOf(pitchClass)]
      return `${ pc }${ octave }`
    }
  }

  return str
}

/**
 * Normalize any interval representation to a semitone of Number type.
 * @param {Number | String} interval
 * @returns {number}
 */
export function toSemitones(interval: number | string): number {
  let semitones: number
  if(typeof interval === 'number') {
    semitones = interval
  } else {
    if(isNumberAsString(interval)) {
      semitones = INTERVALS[interval]
    } else {
      semitones = parseInt(interval)
    }
  }
  return semitones
}

/**
 * Returns the max interval from an array of intervals.
 * @param {Array} intervals
 * @returns {number}
 */
export function maxInterval(intervals: Array<number | string>): number {
  let max: number = -Infinity
  intervals.forEach(interval => {
    const curr: number = toSemitones(interval)
    max                = curr > max ? curr : max
  })
  return max
}

/**
 * Returns the highest note between 2 notes.
 * @param {String} note1
 * @param {String} note2
 * @returns {String}
 */
export function highestNote(note1: string, note2: string): string {
  return lowestNote(note1, note2) === note1 ? note2 : note1
}

/**
 * Returns the lowest note between 2 notes.
 * @param {String} note1
 * @param {String} note2
 * @returns {String}
 */
export function lowestNote(note1: string, note2: string): string {
  const noteObj1 = noteToObject(note1)
  const noteObj2 = noteToObject(note2)
  if(noteObj1.octave < noteObj2.octave) {
    return note1
  } else if(noteObj1.octave > noteObj2.octave) {
    return note2
  } else {
    const pitchClass = lowestPitch(noteObj1.pitchClass, noteObj2.pitchClass)
    return `${ pitchClass }${ noteObj1.octave }`
  }
}

/**
 * Returns the lowest pitch between 2 pitch classes.
 * @param {String} pc1
 * @param {String} pc2
 * @returns {String}
 */
export function lowestPitch(pc1: string, pc2: string): string {
  return PITCH_CLASSES.indexOf(pc1) <= PITCH_CLASSES.indexOf(pc2) ? pc1 : pc2
}

/**
 * Returns the lowest note from an array of notes.
 * @param {Array} notes
 * @returns {String}
 */
export function lowestNoteFromArray(notes: Array<string>): string {
  return notes.reduce((acc, curr) => lowestNote(acc, curr), notes[0])
}

/**
 * Returns the highest note from an array of notes.
 * @param {Array} notes
 * @returns {String}
 */
export function highestNoteFromArray(notes: Array<string>): string {
  return notes.reduce((acc, curr) => highestNote(acc, curr), notes[0])
}

export function getPatternFromPitchClasses(pitchClasses: Array<string>): Array<number> {
  const base           = pitchClasses[0]
  // for cases when it croses an octave, e.g C E G C E B
  let octaveMultiplier = 0
  return pitchClasses.map((pc, i) => {
    if(base === pc && i > 0) {
      ++octaveMultiplier
    }
    return getPitchClassesInterval(base, pc) + (12 * octaveMultiplier)
  })
}

export function getPatternFromNotes(notes: Array<string>): Array<number> {
  const base = notes[0]
  return notes.map((pc, i) => {
    return getNotesInterval(base, pc)
  })
}
