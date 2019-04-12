import {MusicTheoryStructures as mts}                 from '../resources/MusicTheoryStructures'
import {firstToUpper, validateArray, validateRawNote} from '../'
import {InvalidInput}                                 from '../Exceptions'
import {Note}                                         from '../models/Note'

/**
 * Represents a single measure as part of a musical piece in musical notation.
 * @class
 */
export class Measure {
    /**
     * Creates a Measure instance
     * @param {Number} [maxDuration=0] Max duration of the measure(decided by time signature)
     */
    constructor(maxDuration = 64) {
        const attributes       = {}
        attributes.notes       = [{notes: new Set(), duration: '4n'}]
        attributes.maxDuration = maxDuration
        attributes.duration    = '4n'

        this.attributes = attributes
    }

    get notes() {
        return this.attributes.notes
    }

    get duration() {
        return this.attributes.duration
    }

    set duration(duration) {
        this.attributes.duration = duration
    }

    get maxDuration() {
        return this.attributes.maxDuration
    }

    clone() {
        return this.transpose(0)
    }

    durationLeft(position = this.notes.length) {
        return this.maxDuration - this.notes.slice(0, position)
                                      .reduce((prev, curr) => {
                                          return curr.notes.size ?
                                                 prev + mts.noteDurations()[curr.duration] : prev + 0
                                      }, 0)
    }

    addNote(note, position) {
        validateRawNote(note)
        if (this.validateInsertion(position + 1)) {
            this.notes[position]['notes'].add(firstToUpper(note))
            this.notes[position]['duration'] = this.duration
            this.initNext(position + 1)
            return true
        }
        return false
    }

    initNext(position) {
        const durationLeft = this.durationLeft(this.notes.length)
        if (durationLeft > 0) {
            this.notes[position] = {notes: new Set(), duration: this.duration}
        }
    }

    validateInsertion(position) {
        return !(position > this.notes.length || mts.noteDurations()[this.duration] > this.durationLeft(position) + this.duration)
    }

    addNotes(notes, position) {
        validateArray(notes)
        return notes.every(note => this.addNote(note, position))
    }

    deleteNote(note, position) {
        return this.notes[position].notes.delete(firstToUpper(note))
    }

    deleteNotes(notes, position) {
        validateArray(notes)
        return notes.every(note => this.deleteNote(note, position))
    }

    transpose(interval) {
        const transposedMeasure = new Measure(this.maxDuration)
        this.notes.forEach((data, position) => {
            transposedMeasure.duration = data.duration
            data.notes.forEach((note) => {
                transposedMeasure.addNote(Note.builder(note).interval(interval).raw, position)
            })
        })

        return transposedMeasure
    }

    clear() {
        this.notes.length = 0
        this.initNext(0)
        return true
    }

    toString() {
        let string = 'Measure: {'
        this.notes.forEach(data => {
            if (data.notes.size) {
                string += `Duration: ${data.duration}, Notes: [`
                data.notes.forEach(note => (string += ' ' + note + ','))
                string += ' ], '
            }
        })
        string += '}'
        return string
    }
}
