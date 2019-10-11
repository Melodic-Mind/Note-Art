import {firstToUpper}                 from '../utilities'
import {PitchClassRule}               from '../validation'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {InvalidInput}                 from '../Exceptions'
import ModelHelper                    from '../utilities/ModelHelper'

/**
 * @class PitchClass
 * @classdesc Represents a pitch class.
 * @example
 * const c = new PitchClass('d')
 * @param {string} pitchClass
 */
export default class PitchClass {
  constructor(pitchClass) {
    const attributes = {}
    if (!PitchClassRule.exists(pitchClass)) {
      throw new InvalidInput(`${pitchClass} should be a pitch class.`)
    }

    attributes.pitchClass = firstToUpper(pitchClass)
    attributes.classSet   = mts.circleOfFourths.includes(attributes.pitchClass) ? 'b' : '#'
    attributes.classIndex = mts.getPitchClassSet(attributes.classSet).indexOf(attributes.pitchClass)

    this.attributes = attributes
  }

  /**
   * Returns the pitch class.
   * @type {String}
   */
  get pitchClass() {
    return this.attributes.pitchClass
  }

  /**
   * Get the set of the pitch class - sharp or flat.
   * @type {String}
   */
  get classSet() {
    return this.attributes.classSet
  }

  set classSet(set) {
    if (mts.pitchClassSets.includes(set)) {
      if (this.classSet === 'b') {
        this.attributes.pitchClass = PitchClass.flatToSharp(this.pitchClass)
      } else {
        this.attributes.pitchClass = PitchClass.sharpToFlat(this.pitchClass)
      }
      this.attributes.classSet = set
    }
  }

  /**
   * Returns true if pitch class has a flat in it, else false.
   * @param pitchClass
   * @returns {boolean}
   */
  static isFlat(pitchClass) {
    return pitchClass.includes('b')
  }

  /**
   * Returns true if pitch class has a sharp in it, else false.
   * @param pitchClass
   * @returns {boolean}
   */
  static isSharp(pitchClass) {
    return pitchClass.includes('#')
  }

  /**
   * Transforms a pitch class represented with a flat to a sharp. e.g Gb -> F#
   * @param {string} pitchClass
   * @returns {string}
   */
  static flatToSharp(pitchClass) {
    return this.alterPitchClass(pitchClass, 'isFlat', -1)
  }

  /**
   * Transforms a pitch class represented with a sharp to a flat. e.g F# -> Gb
   * @param {string} pitchClass
   * @returns {string}
   */
  static sharpToFlat(pitchClass) {
    return this.alterPitchClass(pitchClass, 'isSharp', 1)
  }

  /**
   * Helper method for sharpToFlat & flatToSharp,
   * should never be called.
   * @param pitchClass
   * @param operation
   * @param constant
   * @returns {string}
   * @private
   */
  static alterPitchClass(pitchClass, operation, constant) {
    if (PitchClass[operation](pitchClass)) {
      return mts.pitchClasses[mts.pitchClasses.indexOf(pitchClass) + constant]
    }

    return pitchClass
  }

  static isPitchClass(obj) {
    return obj instanceof PitchClass
  }

  /**
   * Get the index of the pitch class out of the 12 classes (C, Db, etc...).
   * @type {Number}
   */
  get classIndex() {
    return this.attributes.classIndex
  }

  /**
   * Retuns the pure pitch class at interval.
   * @param interval
   * @returns {PitchClass}
   * @throws InvalidInput
   * @example
   * const c = new PitchClass('c")
   * console.log(c.interval(5)) // F
   */
  interval(interval) {
    if (interval === parseInt(interval)) {
      if (interval >= 0) {
        return new PitchClass(mts.getPitchClassSet(this.classSet)[(this.classIndex + interval) % 12])
      }
      return new PitchClass(mts.getPitchClassSet(this.classSet)[Math.abs((this.classIndex + (12 + (interval % 12))) % 12)])
    }

    throw new InvalidInput(`${interval} is not a valid interval`)
  }

  /**
   * Returns string of the pitch class.
   * @returns {String}
   */
  toString() {
    return this.pitchClass
  }

  /**
   * Returns the pitch class as a string.
   * @returns {String}
   */
  get raw() {
    return this.pitchClass
  }
}
