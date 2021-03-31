import { rearrangeArray }                           from '../utilities/GeneralFunctions'
import PitchClassRule                               from '../validation/PitchClassRule'
import { getPitchClassIndex, isRest, noteToObject } from './PureMusicUtils'

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
