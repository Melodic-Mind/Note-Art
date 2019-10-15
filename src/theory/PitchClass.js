import {firstToUpper}                 from '../utilities'
import {PitchClassRule}               from '../validation'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {InvalidInput}                 from '../Exceptions'
import ModelHelper                    from '../utilities/ModelHelper'
import RawHelper                      from '../utilities/RawHelper'
import {NUMBER_OF_PITCH_CLASSES}      from '../Constants'

/**
 * @class PitchClass
 * @classdesc Represents a pitch class.
 * @example
 * const c = new PitchClass('d')
 * @param {string} pitchClass
 */
export default class PitchClass {
  constructor(pitchClass) {
    this.attributes = {}
    if (!PitchClassRule.exists(pitchClass)) {
      throw new InvalidInput(`${pitchClass} should be a pitch class.`)
    }

    this.attributes.raw        = firstToUpper(pitchClass)
    this.attributes.classSet   = pitchClass.includes('#') ? '#' : 'b'
    this.attributes.pitchClass = ModelHelper.transformPitchClass(this)
    this.attributes.classIndex = mts.getPitchClassSet(this.classSet).indexOf(this.pitchClass)
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
   * Returns the pure pitch class at interval as a new instance.
   * @param {number} interval The interval, e.g 5, 7
   * @returns {PitchClass}
   * @throws InvalidInput
   * @example
   * const c = new PitchClass('c')
   * console.log(c.interval(5)) // F
   */
  interval(interval) {
    if (typeof interval === 'number') {
      const normalizedInterval = interval % NUMBER_OF_PITCH_CLASSES
      if (mts.pitchClasses.includes(this.raw)) {
        const index      = Math.abs((this.classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES)
        const pitchClass = mts.getPitchClassSet(this.classSet)[index]
        return new PitchClass(pitchClass)
      } else {
        const classIndex  = mts.getPitchClassSet(this.classSet).indexOf(this.raw[0])
        const index       = Math.abs((classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES)
        let [letter, acc] = mts.getPitchClassSet(this.classSet)[index]
        const accidentals = this.raw.slice(1)
        if (acc === 'b' && !accidentals.includes('b')) {
          const pc2     = mts.flatClassNotes[(mts.flatClassNotes.indexOf(`${letter}${acc}`) - 1) % 12];
          [letter, acc] = RawHelper.enharmonicPitchClass(`${letter}${acc}`, pc2)
        }
      if(accidentals[accidentals.length-1] === '#' && acc){
        return new PitchClass(`${letter}${accidentals.slice(0, accidentals.length - 1)}x`)
      }
        return new PitchClass(`${letter}${accidentals}${acc ? acc : ''}`)
      }
    }

    throw new InvalidInput(`${interval} is not a valid interval`)
  }

  /**
   * Returns string of the pitch class.
   * @returns {String}
   */
  toString() {
    return this.raw
  }

  /**
   * Returns the pitch class as a string.
   * @returns {String}
   */
  get raw() {
    return this.attributes.raw
  }
}
