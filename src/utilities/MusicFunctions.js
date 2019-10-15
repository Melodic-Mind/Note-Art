import {MusicTheoryStructures as mts}                 from '../resources/MusicTheoryStructures'
import {Note, PitchClass}                             from '../theory'
import {firstToUpper, fitArrayToSize, rearrangeArray} from '../utilities'
import {validateRawNote, PitchClassRule}              from '../validation'
import ModelHelper                                    from './ModelHelper'

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

  return {pitchClass, octave}
}

/**
 * Returns true if a note is a rest, else false.
 * @param {string} note Raw note.
 * @returns {boolean}
 */
export function isRest(str) {
  return ['r', 'R'].includes(str)
}

export function isRawNote(str) {
  if (typeof str !== 'string') {
    return false
  }

  if (isRest(str)) {
    return true
  }

  const pitchClass = firstToUpper(str.slice(0, str.length - 1))
  const octave     = parseInt(str[str.length - 1])

  if (!PitchClassRule.exists(pitchClass) || typeof octave !== 'number') {
    return false
  }

  return true
}

/**
 * Transpose a raw note by interval.
 * @param {string} note Raw note.
 * @param {number} interval Interval to transpose by.
 * @returns {string|*}
 */
export function transposeRawNote(note, interval) {
  validateRawNote(note)

  if (!isRest(note)) {
    return Note.builder(note).interval(interval).toString()
  }

  return note
}

/**
 * Returns an object where the keys are raw notes and their value is an instance of that note.
 * @param {string} baseNote
 * @param {number} range
 */
export function notesInRange(baseNote, range) {
  let {pitchClass, octave} = noteToObject(baseNote)
  const notes              = {}
  let tmpPitchClass

  for (let i = 0; i <= range; ++i) {
    tmpPitchClass = mts.flatClassNotes[(mts.flatClassNotes.indexOf(pitchClass) + i) % 12]

    notes[tmpPitchClass + octave] = {pitchClass: tmpPitchClass, octave}

    if (tmpPitchClass === 'B') {
      octave++
    }
  }

  return notes
}

export function getNoteDuration(note, bpm) {
  //@TODo
}

export function spellScale(scale) {
  const letters = fitArrayToSize(rearrangeArray(mts.pitchClassLetters, mts.pitchClassLetters.indexOf(scale.root.pitchClass[0])), scale.pattern.length + 1)
  const res     = [scale.root.pitchClass];
  [...scale.pitchClasses].slice(1).forEach((pc, i) => {
    res.push(ModelHelper.enharmonicPitchClass(pc, new PitchClass(letters[i + 1])))
  })

  return res
}
