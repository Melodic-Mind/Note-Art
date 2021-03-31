import PitchClass            from './PitchClass'
import { freqToMidi }        from '../utilities/ScientificFunctions'
import { validateNumber }    from '../validation'
import { SHARP_CLASS_NOTES } from '../Constants'
import { noteToObject }      from 'src/utilities/PureMusicUtils'

/**
 * @class Note
 * @extends PitchClass
 * @classdesc Represents an abstract musical note.
 * @param {string} pitchClass
 * @param {number} octave
 * @example
 * // Creating a note instance
 * let c = new Note('c', 3)
 *
 * // Getting it's properties
 * console.log(c.pitchClass) // C
 * console.log(c.octave) // 3
 *
 * // Getting a notes interval
 * let interval = c.interval(4)
 * console.log(interval.toString()) //E3
 * console.log(interval.constructor.name) //should output Note.
 *
 * // Using the builder
 * const f = Note.builder('f4')
 * console.log(f) //F4
 *
 * // Generating note from frequency
 * const a = Note.fromFrequency(440)
 * console.log(a) //A4
 */
class Note extends PitchClass {
  constructor(pitchClass, octave) {
    super(pitchClass)
    validateNumber(octave)
    this.attributes.octave = octave
  }

  /**
   * Builds a Note instance from string representing a note.
   * @param {string} noteString
   * @returns {Note}
   */
  static builder(noteString) {
    const { pitchClass, octave } = noteToObject(noteString)
    return new Note(pitchClass, octave)
  }

  /**
   * Generates a new pitch from frequency.
   * @param frequency
   * @returns {Note}
   */
  static fromFrequency(frequency) {
    const n          = freqToMidi(frequency)
    const pitchClass = SHARP_CLASS_NOTES[n % 12]
    const octave     = Math.floor(n / 12 - 1)

    return new Note(pitchClass, octave)
  }

  /**
   * Returns the octave of the note.
   * @type {String}
   */
  get octave() { return this.attributes.octave }

  /**
   * Gets interval size (Number) and returns a new instance of a note
   * which is calculated by the musical interval formula.
   * @example
   * let c = new Note({note:'c', octave:3}) //create a C3 note.
   * let interval = c.interval(4) //calling the function with the number 4(which is a major third).
   * console.log(interval.toStrring()) //should output 'E3'.
   * console.log(interval.constructor.name) //should output Note.
   * @param {number} interval Musical Interval
   */
  interval(interval) {
    const pitchClass = super.interval(interval).pitchClass
    let octDiff      = Math.floor((this.classIndex + interval) / 12)
    if(interval < 0) {
      octDiff = this.classIndex + interval < 0 ? octDiff : 0
    }
    return new Note(pitchClass, this.octave + octDiff)
  }

  /**
   * Alias for interval()
   * @param {Number} interval
   */
  transpose(interval) {
    return this.interval(interval)
  }

  /**
   * Returns a string of the pitch class and octave of the Note.
   * @returns {string}
   */
  toString() {
    return `${ super.toString() }${ this.octave }`
  }
}

export default Note
