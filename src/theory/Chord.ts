import MusicalPattern     from './MusicalPattern'
import { rearrangeArray } from '../utilities/GeneralFunctions'
import { InvalidInput }   from '../Exceptions'

/**
 * @class Chord
 * @extends MusicalPattern
 * @classdesc Represents a musical Chord - a number of pitch classes with a specific
 * pattern which can be played together to form a harmonic sound.
 * @param {PitchClass} root - chords root note
 * @param {Array} pattern - the pattern to build the chord by pitch intervals(e.g [3, 7])
 * @example
 * const c = new PitchClass('c')
 * const C_Maj = new Chord(c, [4, 7]) // new C major chord.
 */
export default class Chord extends MusicalPattern {
  /**
   * Applies an inversion to a chord.
   * @param {number} type
   * @returns {Array}
   */
  inversion(type: number) {
    if(type > 0 && type <= this.pitchClasses.length) {
      return rearrangeArray(this.pitchClasses, type)
    }
    throw new InvalidInput('inversion cant be bigger then the number of pitch classes in the chord')
  }
}
