import PitchClass            from './PitchClass'
import { calculateInterval } from '../utilities'
import { validateInstance, PatternRule } from '../validation'

/**
 * @class GuitarChordPattern
 * @classdesc This class is used to implement the CAGED chord system in code.
 * basically, it converts a chord of a specific pattern to any other root of the same chord.
 * @param {Array} pattern The chords pattern.
 * @param {PitchClass} pitchClass The chord's root pitch class.
 * @param {string} name The chords name.
 */
export default class GuitarChordPattern {
  constructor ( pattern, pitchClass, name ) {
    PatternRule.isArray( pattern )
    this.attributes = { pattern, pitchClass, name }
  }

  /**
   * Returns the chord pattern.
   * @returns {Array}
   */
  get pattern () {
    return this.attributes.pattern
  }

  /**
   * Returns the chord's pitch class.
   * @returns {PitchClass}
   */
  get pitchClass () {
    return this.attributes.pitchClass
  }

  /**
   * Returns the chord name.
   * @returns {string}
   */
  get name () {
    return this.attributes.name
  }

  /**
   * Returns a string that represents the strumming pattern for a guitar chord with the new root.
   * @param {PitchClass} root The root of the chord.
   * @returns {{chord: string, name: string}}
   */
  getChord ( root ) {
    validateInstance( root, PitchClass )
    const interval = calculateInterval( this.pitchClass, root )
    const pattern  = this.pattern.map( pos => pos === 'x' ? 'x' : pos + interval )
    return { pattern, name: `${ root } ${ this.name }` }
  }
}
