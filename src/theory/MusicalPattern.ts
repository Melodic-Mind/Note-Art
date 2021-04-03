import PitchClass from './PitchClass'

/**
 * @class MusicalPattern
 * @classdesc Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.
 * @param {PitchClass} pitchClass The pitch class to create the pattern from.
 * @param {Array} pattern The pattern to use.
 * @param {Object} [info={}] Any additional information to save about the pattern.
 */
export default class MusicalPattern {
  _info: {
    pattern: Array<number>;
  }
  _pitchClasses: Array<PitchClass>

  constructor(pitchClass: string | PitchClass, pattern: Array<number>, info: Object = {}) {
    const pc: PitchClass = typeof pitchClass === 'string' ? new PitchClass(pitchClass) : pitchClass
    this._pitchClasses   = [pc]
    pattern.forEach(interval => this._pitchClasses.push(pc.interval(interval)))

    this._info = { ...info, pattern }
  }

  /**
   * Returns an array of the pitch classes.
   * @returns {Array}
   */
  get pitchClasses() {
    return this._pitchClasses
  }

  /**
   * Returns the root pitch class.
   * @returns {*}
   */
  get root() {
    return this._pitchClasses[0]
  }

  /**
   * Returns the information object the pattern was created with.
   * @returns {{}}
   */
  get info() {
    return this._info
  }

  /**
   * Returns the pattern it self.
   * @returns {Array}
   */
  get pattern() {
    return this._info.pattern
  }

  /**
   * Returns an array of the raw pitch classes.
   * @returns {Array}
   */
  get raw() {
    return this._pitchClasses.map(pitchClass => pitchClass.raw)
  }

  /**
   * Returns a string of the musical pattern's pitch classes.
   * @returns {String}
   */
  toString() {
    return this._pitchClasses.map(pc => pc.toString()).join(', ')
  }

  /**
   * Generates a new pattern with the interval applied
   * @param {Number} interval the interval to apply
   * @returns {MusicalPattern}
   */
  transpose(interval: number) {
    const root = this.root.interval(interval)
    return new MusicalPattern(root, this.pattern, this.info)
  }
}
