import {Pitch}           from './Pitch'
import {PianoOctaveRule} from '../validation/PianoOctaveRule'
import {DurationRule}    from '../validation/DurationRule'
import {InvalidInput}    from '../Exceptions'

/**
 * @class
 * @classdesc Represents an abstract musical note.
 * @example
 * const n = new Note({note: 'c', octave: 3, duration: '4n', instrument: 'Piano'})
 */
export class Note extends Pitch {
    /**
     * @param {Object} attributes Object that contains some or all of the following keys:
     * @param {String} attributes.pitchClass one of the pitch classes('c', 'd', etc...)
     * @param {number} attributes.octave note octave
     * @param {String} attributes.duration note duration
     */
    constructor({pitchClass, octave, duration}) {
        super(pitchClass, octave)
        PianoOctaveRule.validateAudible(octave)
        if (!DurationRule.validate(duration)) {
            throw new InvalidInput(`${duration} is not a valid duration`)
        }
        this.attributes.duration = duration
    }

    /**
     * Get the duration of a note
     * @type {String}
     */
    get duration() { return this.attributes.duration }

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
        const newPitch = super.interval(interval)
        return newPitch ?
               new Note({...newPitch.attributes, duration: this.duration}) :
               undefined
    }

    /**
     * Returns a new Note with the new duration.
     * @param duration
     * @return {Note}
     */
    setDuration(duration) {
        return new Note({...this.attributes, duration})
    }

    /**
     * Returns a new Note with the new octave.
     * @param {Number} octave
     * @return {Note}
     */
    setOctave(octave) {
        return new Note({...this.attributes, octave})
    }

    /**
     * Alias for interval()
     * @param {Number} interval
     */
    transpose(interval) {
        return this.interval(interval)
    }

    /**
     * Returns a string of the note.
     * @returns {string}
     */
    toString() { return `${super.toString()}` }
}
