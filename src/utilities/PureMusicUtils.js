import {
  FLAT_CLASS_NOTES, NOTE_DURATIONS, NUMBER_OF_PITCH_CLASSES, PITCH_CLASSES, SHARP_CLASS_NOTES
}                                                       from '../Constants'
import { firstToUpper, mapString, occurrencesInString } from './GeneralFunctions'
import ModelHelper                                      from 'src/utilities/ModelHelper'
import PitchClass                                       from 'src/theory'

export function getPitchClassSet(set) {
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
 * @param rawNote
 * @returns {*}
 */
export function extractOctave(rawNote) {
  return rawNote[rawNote.length - 1]
}

/**
 * Returns the pitch class from a raw note.
 * @param rawNote
 * @returns {*}
 */
export function extractPitchClass(rawNote) {
  return rawNote.slice(0, rawNote.length - 1)
}

/**
 * Transform a pitch class to it's basic form.
 * @param {String} pc
 */
export function normalizePitchClass(pc) {
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
export function noteToObject(note) {
  // validateRawNote(note)

  const pitchClass = firstToUpper(note.slice(0, note.length - 1))
  const octave     = parseInt(note[note.length - 1])

  return { pitchClass, octave }
}

/**
 * Returns true if a note is a rest, else false.
 * @param {string} note Raw note.
 * @returns {boolean}
 */
export function isRest(str) {
  return ['r', 'R'].includes(str)
}

export function isDuration(dur) {
  return Object.keys(NOTE_DURATIONS).includes(dur)
}

/**
 * Returns an object where the keys are raw notes and their value is an object with note & octave props.
 * @param {string} baseNote
 * @param {number} range
 * @returns {Array}
 */
export function notesInRange(baseNote, range) {
  let { pitchClass, octave } = noteToObject(baseNote)
  const notes                = {}
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
export function getPitchClassIndex(pc) {
  const classSet = pc.includes('#') ? '#' : 'b'
  return getPitchClassSet(classSet).indexOf(pc)
}

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {String} pitchClass1 first note
 * @param {String} pitchClass2 second note
 * @returns {Number}
 */
export function calculateInterval(pitchClass1, pitchClass2) {
  const i1 = getPitchClassIndex(pitchClass1),
        i2 = getPitchClassIndex(pitchClass2)
  return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
}

/**
 *
 * @param {String} pc1
 * @param {String} pc2
 * @returns {string}
 */
export function enharmonicPitchClass(from, to) {
  const interval = calculateInterval(from, to)

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
