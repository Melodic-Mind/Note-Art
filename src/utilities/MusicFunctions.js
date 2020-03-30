import { Constants }                       from '../resources/Constants'
import { Note, PitchClass }                from '../theory'
import { firstToUpper, rearrangeArray }    from '../utilities'
import { PitchClassRule, validateRawNote } from '../validation'
import ModelHelper                         from './ModelHelper'

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {PitchClass} pitchClass1 first note
 * @param {PitchClass} pitchClass2 second note
 * @returns {Number}
 */
export function calculateInterval(pitchClass1, pitchClass2) {
  const i1 = pitchClass1.classIndex,
        i2 = pitchClass2.classIndex
  return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
}

/**
 * Turns a note into an object with pitch class and octave.
 * @param {string} pitch Pitch as a string, e.g Ab3
 * @returns {{octave: number, pitchClass: String}}
 */
export function noteToObject(note) {
  validateRawNote(note)

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
  return Object.keys(Constants.noteDurations).includes(dur)
}

/**
 * Checks if a string represents a raw musical note.
 * @param str
 * @returns {boolean}
 */
export function isRawNote(str) {
  if(typeof str !== 'string') {
    return false
  }

  if(isRest(str)) {
    return true
  }

  const pitchClass = firstToUpper(str.slice(0, str.length - 1))
  const octave     = parseInt(str[str.length - 1])

  if(!PitchClassRule.exists(pitchClass) || typeof octave !== 'number') {
    return false
  }

  return true
}

/**
 * Transpose a raw note by interval.
 * @param {string} note Either pitch class or note as string.
 * @param {number} interval Interval to transpose by.
 * @returns {string|*}
 */
export function transpose(note, interval) {
  validateRawNote(note)

  if(!isRest(note)) {
    return Note.builder(note).interval(interval).toString()
  }

  return note
}

/**
 * Returns an object where the keys are raw notes and their value is an instance of that note.
 * @param {string} baseNote
 * @param {number} range
 * @returns {Array}
 */
export function notesInRange(baseNote, range) {
  let { pitchClass, octave } = noteToObject(baseNote)
  const notes                = {}
  let tmpPitchClass

  for(let i = 0; i <= range; ++i) {
    tmpPitchClass = Constants.flatClassNotes[(Constants.flatClassNotes.indexOf(pitchClass) + i) % 12]

    notes[tmpPitchClass + octave] = { pitchClass: tmpPitchClass, octave }

    if(tmpPitchClass === 'B') {
      octave++
    }
  }

  return notes
}

/**
 * Returns a correctly spelled scale where no pitch class appears more than once.
 * @param scale
 * @returns {Array}
 */
export function spellScale(scale) {
  const letters = rearrangeArray(Constants.pitchClassLetters, Constants.pitchClassLetters.indexOf(scale.root.pitchClass[0]))
  const res     = [scale.root.pitchClass];
  [...scale.pitchClasses].slice(1).forEach((pc, i) => {
    res.push(ModelHelper.enharmonicPitchClass(pc, new PitchClass(letters[i + 1])))
  })

  return res
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
