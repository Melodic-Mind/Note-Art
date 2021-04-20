import { rearrangeArray } from './GeneralFunctions'
import { PitchClassRule } from '../validation'
import { getPitchClassIndex, isRest, noteToObject, toSemitones } from './PureMusicUtils'
import { Note } from '../theory'

/**
 * Transpose a note by an interval
 * @example transposeNote('C3', 7) // G3
 * @param note
 * @param interval
 */
export function transposeNote(note: string, interval: number): string {
  return Note.builder(note).interval(interval).toString()
}

/**
 * Checks if a string represents a raw musical note.
 * @param str
 * @returns {boolean}
 */
export function isRawNote(str: string): boolean {
  if(isRest(str)) {
    return true
  }
  const { pitchClass, octave } = noteToObject(str)

  return PitchClassRule.exists(pitchClass) && !isNaN(octave)
}

/**
 * Returns an array of notes with a specific octave.
 * @param {Array} pitchClasses Array of pitch classes.
 * @param {number} octave Octave to assign to notes..
 * @returns {Array}
 */
export function pitchClassesToNotes(pitchClasses: Array<string>, octave: number): Array<string> {
  return pitchClasses.map(pitchClass => `${ pitchClass }${ octave }`)
}

/**
 * Returns an array of notes that represent a chord played on a piano in a certain octave.
 * @param {Array} pitchClasses
 * @param {number} octave Octave for the chord root.
 * @param {number} inversion Whether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
 *     etc...
 * @returns {Array}
 */
export function pitchClassesToPianoChordNotes(pitchClasses: Array<string>, octave: number, inversion: number = 0): Array<string> {
  if(inversion) {
    pitchClasses = rearrangeArray(pitchClasses, inversion)
  }

  let currentOctave = octave

  return pitchClasses.map((pitchClass, i) => {
    if(i !== 0) {
      const pcIndex     = getPitchClassIndex(pitchClass)
      const prevPcIndex = getPitchClassIndex(pitchClasses[i - 1])
      if((i - 1) >= 0 && pcIndex < prevPcIndex) {
        currentOctave++
      }
    }
    return `${ pitchClass }${ currentOctave }`
  })
}

/**
 * Returns an array of notes from a base note and array of intervals.
 * @param {String} baseNote
 * @param {Array<Number>} intervals
 * @returns {Array<String>}
 */
export function intervalsToNotes(baseNote: string, intervals: Array<number | string>) {
  return intervals.map(interval => {
    const semitones = toSemitones(interval)
    return transposeNote(baseNote, semitones)
  })
}
