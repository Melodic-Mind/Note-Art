import {firstToUpper, transpose, isRawNote} from '../utilities'
import {MusicTheoryStructures as mts}       from '../resources/MusicTheoryStructures'
import {validateArray}                      from '../validation'

/**
 * @class Measure
 * @classdesc Represents a single measure as part of a musical score in musical notation.
 * @param {Number} [maxDuration = 0] Max duration of the measure(determined by time signature)
 */
export default class Measure {
  constructor(maxDuration = 64) {
    this.attributes = {
      maxDuration,
      duration: '4n',
      data:     [{notes: new Set(), duration: '4n'}],
    }
  }

  /**
   * Returns the data of the measure - an array of objects where each
   * object has a set of notes and the duration for those notes.
   * @returns {Array}
   */
  get data() {
    return this.attributes.data
  }

  /**
   * Returns the duration the measure will use when adding a new member to the data.
   * @returns {string}
   */
  get duration() {
    return this.attributes.duration
  }

  /**
   * Sets the duration for the measure's next data input.
   * @param {string} duration
   */
  set duration(duration) {
    if (Object.keys(mts.noteDurations).includes(duration)) {
      this.attributes.duration = duration
    }
  }

  /**
   * Returns the maximum sum of durations for the measure as a number,
   * where each unit is 1/64 bit.
   * @returns {number}
   * @readonly
   */
  get maxDuration() {
    return this.attributes.maxDuration
  }

  get length(){

  }

  /**
   * Returns a deep clone of the measure.
   * @returns {Measure}
   */
  clone() {
    return this.transpose(0)
  }

  /**
   * Returns the duration left for notes in the measure.
   * @param {number} [position=this.data.length]
   * @returns {number}
   */
  durationLeft(position = this.data.length) {
    return this.maxDuration - this.data.slice(0, position)
                                  .reduce((prev, curr) => {
                                    return curr.notes.size ?
                                           prev + mts.noteDurations[curr.duration] : prev + 0
                                  }, 0)
  }

  /**
   * Creates a slot for the next notes that will be added in the measure if there is space.
   * Should not be called as it's called automatically when needed.
   * @param {number} position Position to initialize the next notes to.
   */
  initNext(position) {
    const durationLeft = this.durationLeft(this.data.length)
    if (durationLeft > 0) {
      this.data[position] = {notes: new Set(), duration: this.duration}
    }
  }

  /**
   * Checks whether a new data member can be added at a certain position in the measure.
   * @param {number} position The position to check for.
   * @param duration
   * @returns {boolean}
   */
  validateInsertion(position, duration = this.duration) {
    return !(
        position > this.data.length
        ||
        mts.noteDurations[duration] > this.durationLeft(position) + duration
    )
  }

  /**
   * Adds a note to the measure at some position.
   * @param {string} data.note raw note representation.
   * @param {string} [data.duration=this.duration]
   * @param {number} position The position in the data to add the note to.
   * @returns {boolean}
   */
  addNote({note, duration}, position) {
    this.duration = duration
    if (isRawNote(note)) {
      note = firstToUpper(note)
    }
    if (this.validateInsertion(position + 1)) {
      this.data[position].notes.add(note)
      this.data[position].duration = this.duration
      this.initNext(position + 1)
      return true
    }
    return false
  }

  /**
   * Adds notes to the note set at the position.
   * @param {Array} notes An array of raw notes.
   * @param {string} [duration=this.duration]
   * @param {number} position The position in the data to add the notes to.
   * @returns {*}
   */
  addNotes({notes, duration}, position) {
    validateArray(notes)
    return notes.every(note => this.addNote({note, duration}, position))
  }

  /**
   * Adds notes to the measure plus a name that represents the chord and is saved in
   * the data at the position as name
   * @param notes
   * @param name
   * @param duration
   * @param position
   * @return {boolean}
   * @example
   * measure.addChord({
   *      notes: ['C3', 'E3', 'G3'],
   *      name: 'C Major',
   *      duration: '4n'
   *      }, 0)      // Adds a C major chord at the start of the measure.
   */
  addChord({notes, name = '?', duration}, position) {
    if (this.validateInsertion(position + 1)) {
      this.data[position].name = name
      return this.addNotes({notes, duration}, position)
    }

    return false
  }

  /**
   * Delete note at the position.
   * @param {string} note raw note.
   * @param {number} position The position in the data to delete the note at.
   * @returns {boolean}
   */
  deleteNote(note, position) {
    return this.data[position].notes.delete(firstToUpper(note))
  }

  /**
   * Deletes notes from the noteset at the position.
   * @param {Array} notes An array of raw notes.
   * @param {number} position The position in the data to delete the notes at.
   * @returns {*}
   */
  deleteNotes(notes, position) {
    validateArray(notes)
    return notes.every(note => this.deleteNote(note, position))
  }

  /**
   * Delete member from the measure's data - removes all the notes from it
   * and initializes a new data member with the measure's duration.
   * @param {number} position Position of the member to delete.
   * @return {boolean}
   */
  deleteMember(position) {
    if (this.data[position]) {
      this.data.splice(position, 1)
      // if the measure doesnt have a new member ready for adding new notes, create one
      if (this.data[this.data.length - 1].notes.size !== 0) {
        this.initNext(this.data.length)
      }
      return true
    }

    return false
  }

  /**
   * Returns true if the duration has space, else false.
   * @param duration
   * @returns {boolean}
   */
  isFull(duration) {
    return !(mts.noteDurations[duration] <= this.durationLeft())
  }

  /**
   * Returns a new measure where all the notes are transposed by the interval.
   * @param {number} interval Interval to transpose by.
   * @returns {Measure}
   */
  transpose(interval) {
    const transposedMeasure = new Measure(this.maxDuration)
    this.data.forEach((data, position) => {
      data.notes.forEach((note) => {
        transposedMeasure.addNote({
          note:     transpose(note, interval),
          duration: data.duration,
        }, position)
      })
    })

    return transposedMeasure
  }

  /**
   * Removes all the data from the measure.
   * @returns {boolean}
   */
  clear() {
    this.data.length = 0
    this.initNext(0)
    return true
  }
}
