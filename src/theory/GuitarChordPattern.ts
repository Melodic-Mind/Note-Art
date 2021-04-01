import PitchClass                          from './PitchClass'
import { calculateInterval, firstToUpper } from '../utilities'
import { validateInstance, PatternRule }   from '../validation'

/**
 * @class GuitarChordPattern
 * @classdesc This class is used to implement the CAGED chord system in code.
 * basically, it converts a chord of a specific pattern to any other root of the same chord.
 * @param {Array} pattern The chords pattern.
 * @param {PitchClass} pitchClass The chord's root pitch class.
 * @param {string} name The chords name.
 */
export default class GuitarChordPattern {
  _pattern: Array<number | string>
  _pitchClass: PitchClass
  _name: string

  constructor(pattern: Array<number | string>, pitchClass: string | PitchClass, name: string) {
    this._pitchClass = typeof pitchClass === 'string' ? new PitchClass(pitchClass) : pitchClass
    this._pattern    = pattern
    this._name       = name
  }

  /**
   * Returns the chord pattern.
   * @returns {Array}
   */
  get pattern() {
    return this._pattern
  }

  /**
   * Returns the chord's pitch class.
   * @returns {PitchClass}
   */
  get pitchClass() {
    return this._pitchClass
  }

  /**
   * Returns the chord name.
   * @returns {string}
   */
  get name() {
    return this._name
  }

  /**
   * Returns a string that represents the strumming pattern for a guitar chord with the new root.
   * @param {String} root The root of the chord.
   * @returns {{chord: string, name: string}}
   */
  getChord(root: string) {
    root           = firstToUpper(root)
    const interval = calculateInterval(this.pitchClass.raw, root)
    const pattern  = this.pattern.map(pos => typeof pos === 'number' ? pos + interval : pos)
    return { pattern, name: `${ root } ${ this.name }` }
  }
}
