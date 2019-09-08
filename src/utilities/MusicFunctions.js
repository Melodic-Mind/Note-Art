import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {Note, PitchClass}             from '../theory'
import {firstToUpper, rearrangeArray} from '../utilities'
import {
  validateNumber,
  validateRawNote,
  validatePitchClasses,
}                                     from '../validation'

/**
 * Returns an array of notes with a specific octave.
 * @param {Array} {pitchClasses} Array of pitch classes.
 * @param {number} octave Octave to assign to notes..
 * @returns {Array}
 */
export function pitchClassesToNotes(pitchClasses, octave) {
  validatePitchClasses(pitchClasses)
  validateNumber(octave)

  return pitchClasses.map(pitchClass => new Note(pitchClass.pitchClass, octave))
}

/**
 * Returns an array of notes that represent a chord played on a piano in a certain octave.
 * @param {Array} {pitchClasses} Array of pitch classes.
 * @param {number} octave Octave for the chord root.
 * @param {number} inversion Whhether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
 *     etc...
 * @returns {Array}
 */
export function pitchClassesToPianoChordNotes(pitchClasses, octave, inversion = 0) {
  validatePitchClasses(pitchClasses)
  validateNumber(octave)

  if (inversion) {
    pitchClasses = rearrangeArray(pitchClasses, inversion)
  }

  let currentOctave = octave

  return pitchClasses.map((pitchClass, i) => {
    if ((i - 1) >= 0 && pitchClass.classIndex < pitchClasses[i - 1].classIndex) {
      currentOctave++
    }
    return new Note(pitchClass.pitchClass, currentOctave)
  })
}

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
 * @param {String} pitch Pitch as a string, e.g Ab3
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
export function isRest(note) {
  return note === 'R' || note === 'r'
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
    return Note.builder(note).interval(interval).raw
  }

  return note
}

/**
 * Returns an object where the keys are raw notes and their value is an instance of that note.
 * @param base
 * @param range
 */
export function notesInRange(base, range) {
  let {pitchClass, octave} = noteToObject(base)
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
