import { noteToObject } from '../utilities/PureMusicUtils'
import { freqToMidi } from '../utilities/ScientificFunctions'
import { validateNumber } from '../validation/Validators'
import { NUMBER_OF_PITCH_CLASSES, SHARP_CLASS_NOTES } from '../Constants'
import { PitchClass } from './PitchClass'

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
export class Note extends PitchClass {
  constructor(pitchClass: string, octave: number) {
    super(pitchClass)
    validateNumber(octave)
    this._octave = octave
  }

  _octave: number

  /**
   * Returns the octave of the note.
   * @type {String}
   */
  get octave(): number { return this._octave }

  /**
   * Builds a Note instance from string representing a note.
   * @returns {Note}
   * @param note
   */
  static builder(note: string): Note {
    const { pitchClass, octave } = noteToObject(note)
    return new Note(pitchClass, octave)
  }

  /**
   * Generates a new pitch from frequency.
   * @param frequency
   * @returns {Note}
   */
  static fromFrequency(frequency: number): Note {
    const n          = freqToMidi(frequency)
    const pitchClass = SHARP_CLASS_NOTES[n % NUMBER_OF_PITCH_CLASSES]
    const octave     = Math.floor(n / NUMBER_OF_PITCH_CLASSES - 1)

    return new Note(pitchClass, octave)
  }

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
  interval(interval: number): Note {
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
  transpose(interval: number): Note {
    return this.interval(interval)
  }

  /**
   * Returns a string of the pitch class and octave of the Note.
   * @returns {string}
   */
  toString(): string {
    return `${ super.toString() }${ this.octave }`
  }
}
