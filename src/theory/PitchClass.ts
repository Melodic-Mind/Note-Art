import { firstToUpper }                                                from '../utilities'
import PitchClassRule                                                  from '../validation/PitchClassRule'
import { InvalidInput }                                                from '../Exceptions'
import { FLAT_CLASS_NOTES, NUMBER_OF_PITCH_CLASSES, PITCH_CLASSES }    from '../Constants'
import { getPitchClassSet, normalizePitchClass, enharmonicPitchClass } from '../utilities/PureMusicUtils'

/**
 * @class PitchClass
 * @classdesc Represents a pitch class.
 * @example
 * const c = new PitchClass('d')
 * @param {String} pitchClass
 */
export default class PitchClass {
  _raw: string
  _classSet: '#' | 'b'
  _pitchClass: string
  _classIndex: number

  constructor(pitchClass: string) {
    if( !PitchClassRule.exists(pitchClass)) {
      throw new InvalidInput(`${ pitchClass } should be a string representing a pitch class.`)
    }

    this._raw        = firstToUpper(pitchClass)
    this._classSet   = pitchClass.includes('#') ? '#' : 'b'
    this._pitchClass = normalizePitchClass(this._raw)
    this._classIndex = getPitchClassSet(this._classSet).indexOf(this._pitchClass)
  }

  /**
   * Returns the pitch class.
   * @type {String}
   */
  get pitchClass() {
    return this._pitchClass
  }

  /**
   * Get the set of the pitch class - sharp or flat.
   * @type {String}
   */
  get classSet() {
    return this._classSet
  }

  /**
   * Returns true if pitch class has a flat in it, else false.
   * @static
   * @param {String} pitchClass
   * @returns {boolean}
   */
  static isFlat(pitchClass: string) {
    return pitchClass.includes('b')
  }

  /**
   * Returns true if pitch class has a sharp in it, else false.
   * @static
   * @param pitchClass
   * @returns {boolean}
   */
  static isSharp(pitchClass: string) {
    return ['#', 'x'].includes(pitchClass[1])
  }

  /**
   * Returns true if obj is an instance of PitchClass, else false.
   * @static
   * @param obj
   * @returns {boolean}
   */
  static isPitchClass(obj: any): boolean {
    return obj instanceof PitchClass
  }

  /**
   * Get the index of the pitch class out of the 12 classes (C, Db, etc...).
   * @type {Number}
   */
  get classIndex(): number {
    return this._classIndex
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
  interval(interval: number): PitchClass {
    const normalizedInterval = interval % NUMBER_OF_PITCH_CLASSES
    if(PITCH_CLASSES.includes(this.raw)) {
      const index      = Math.abs((this.classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES)
      const pitchClass = getPitchClassSet(this.classSet)[index]
      return new PitchClass(pitchClass)
    } else {
      const classIndex  = getPitchClassSet(this.classSet).indexOf(this.raw[0])
      const index       = Math.abs((classIndex + NUMBER_OF_PITCH_CLASSES + normalizedInterval) % NUMBER_OF_PITCH_CLASSES)
      let [letter, acc] = getPitchClassSet(this.classSet)[index]
      const accidentals = this.raw.slice(1)
      if(acc === 'b' && !accidentals.includes('b')) {
        const pc2        = FLAT_CLASS_NOTES[(FLAT_CLASS_NOTES.indexOf(`${ letter }${ acc }`) - 1) % 12]
        const enharmonic = enharmonicPitchClass(`${ letter }${ acc }`, pc2)
        letter           = enharmonic[0]
        acc              = enharmonic[1]
      }
      if(accidentals[accidentals.length - 1] === '#' && acc) {
        return new PitchClass(`${ letter }${ accidentals.slice(0, accidentals.length - 1) }x`)
      }
      return new PitchClass(`${ letter }${ accidentals }${ acc ? acc : '' }`)
    }
  }

  /**
   * Returns string of the pitch class.
   * @returns {String}
   */
  toString() {
    return this._raw
  }

  /**
   * Returns the pitch class as a string.
   * @returns {String}
   */
  get raw() {
    return this._raw
  }
}
