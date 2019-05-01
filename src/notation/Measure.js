import {MusicTheoryStructures as mts}                 from '../resources/MusicTheoryStructures'
import {firstToUpper, validateArray, validateRawNote} from '../'
import {Note}                                         from '../models/Note'

/**
 * @classdesc Represents a single measure as part of a musical piece in musical notation.
 * @param {Number} [maxDuration = 0] Max duration of the measure(decided by time signature)
 */
export class Measure {
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
        if (Object.keys(mts.noteDurations()).includes(duration)) {
            this.attributes.duration = duration
        }
    }

    /**
     * Returns the maximum sum of durations for the measure as a number,
     * where each unit is 1/64 bit.
     * @returns {number}
     */
    get maxDuration() {
        return this.attributes.maxDuration
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
                                                 prev + mts.noteDurations()[curr.duration] : prev + 0
                                      }, 0)
    }

    /**
     * Adds a note to the measure at some position.
     * @param {string} note raw note representation.
     * @param {string} [duration=this.duration]
     * @param {number} position The position in the data to add the note to.
     * @returns {boolean}
     */
    addNote({note, duration}, position) {
        this.duration = duration
        validateRawNote(note)
        if (this.validateInsertion(position + 1)) {
            this.data[position]['notes'].add(firstToUpper(note))
            this.data[position]['duration'] = this.duration
            this.initNext(position + 1)
            return true
        }
        return false
    }

    /**
     * Creates a slot for the next notes that will be added in the measure if there is space.
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
     * @returns {boolean}
     */
    validateInsertion(position) {
        return !(
            position > this.data.length
            ||
            mts.noteDurations()[this.duration] > this.durationLeft(position) + this.duration
        )
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
     * Returns a new measure where all the notes are transposed by the interval.
     * @param {number} interval Interval to transpose by.
     * @returns {Measure}
     */
    transpose(interval) {
        const transposedMeasure = new Measure(this.maxDuration)
        this.data.forEach((data, position) => {
            transposedMeasure.duration =
                data.notes.forEach((currentNote) => {
                    const note = currentNote === 'R' ?
                                 'R' : Note.builder(currentNote).interval(interval).raw
                    transposedMeasure.addNote({
                        note,
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

    /**
     * Returns a simple representation of the measure as a string.
     * @returns {string}
     */
    toString() {
        let string = 'Measure: {'
        this.data.forEach(data => {
            if (data.notes.size) {
                string += `Duration: ${data.duration}, Data: [`
                data.notes.forEach(note => (string += ' ' + note + ','))
                string += ' ], '
            }
        })
        string += '}'
        return string
    }
}
