import { PitchClassRule, PatternRule } from '../validation'
import { InvalidInput }                from 'src/Exceptions'

/**
 * @class MusicalPattern
 * @classdesc Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.
 * @param {PitchClass} pitchClass The pitch class to create the pattern from.
 * @param {Array} pattern The pattern to use.
 * @param {Object} [info={}] Any additional information to save about the pattern.
 */
export default class MusicalPattern {
  constructor(pitchClass, pattern, info = {}) {
    // PitchClassRule.isPitchClass(pitchClass)
    PatternRule.isPattern(pattern)
    this.attributes = {}
    this.setPitchClasses(pitchClass, pattern)
    this.attributes.info = { ...info, pattern }
  }

  setPitchClasses(pitchClass, pattern) {
    const notes = [pitchClass]
    pattern.forEach(interval => notes.push(pitchClass.interval(interval)))

    this.attributes.pitchClasses = notes
  }

  /**
   * Returns an array of the pitch classes.
   * @returns {Array}
   */
  get pitchClasses() {
    return this.attributes.pitchClasses
  }

  /**
   * Returns the root pitch class.
   * @returns {*}
   */
  get root() {
    return this.pitchClasses[0]
  }

  /**
   * Returns the information object the pattern was created with.
   * @returns {{}}
   */
  get info() {
    return this.attributes.info
  }

  /**
   * Returns the pattern it self.
   * @returns {Array}
   */
  get pattern() {
    return this.info.pattern
  }

  /**
   * Returns an array of the raw pitch classes.
   * @returns {Array}
   */
  get raw() {
    return this.pitchClasses.map(pitchClass => pitchClass.raw)
  }

  /**
   * Returns a string of the musical pattern's pitch classes.
   * @returns {String}
   */
  toString() {
    return this.pitchClasses.map(pc => pc.toString()).join(', ')
  }

  /**
   * Generates a new chord with the interval applied
   * @param {Number} interval the interval to apply
   * @returns {MusicalPattern}
   */
  transpose(interval) {
    if(typeof interval !== 'number'){
      throw InvalidInput('Interval should be an integer')
    }
    const root = this.root.interval(interval)
    return new MusicalPattern(root, this.pattern, this.info)
  }
}
