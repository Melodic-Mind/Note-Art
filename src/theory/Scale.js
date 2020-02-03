import {calculateInterval, spellScale} from '../utilities'
import Chord                           from './Chord'
import MusicalPattern                  from './MusicalPattern'

/**
 * @class Scale
 * @extends MusicalPattern
 * @classdesc Represents a musical scale - a series of pitch classes following a specific pattern from a root(the
 *     tonic) which forms chords and can be used to compose melodies.
 * @param {String/Note} tonic
 * @param name
 * @param {Array} pattern
 * @example
 * const c = new PitchClass('c')
 * const C_Major_by_pattern = new Scale(c, [0, 2, 4, 5, 7, 9, 11]) // new C major scale.
 */
export default class Scale extends MusicalPattern {
  /**
   * Returns an array of chords where each member is the chord at the degree where 0 is the root chord.
   * @param {boolean} [seventh=false] Whether to return seventh chords or triads.
   * @type {Array}
   */
  chords(seventh = false) {
    return this.pitchClasses.map((pitchClass, degree) => this.chord(degree + 1, seventh ? 4 : 3))
  }

  /**
   * Returns the degree inside the Scale.
   * for example - if the Scale is a C Major,
   * than interval(1) will return D.
   * @param {Number} degree
   * @returns {PitchClass}
   */
  degree(degree) {
    return this.pitchClasses[degree - 1]
  }

  get raw() {
    if (this.pattern.length === 6) {
      return spellScale(this)
    }
    return super.raw
  }

  /**
   * Returns the chord at the degree with size.
   * @param {number} degree Degree to get chord at.
   * @param {number} [size=3] Number of pitch classes in the chord.
   * @returns {*}
   */
  chord(degree, size = 3) {
    const pc      = this.pitchClasses,
          root    = this.degree(degree),
          index   = degree - 1,
          pattern = []

    for (let i = 1; i < size; ++i) {
      pattern.push(calculateInterval(root, pc[(index + (i * 2)) % pc.length]))
    }

    return new Chord(root, pattern)
  }
}
