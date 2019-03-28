import {MusicTheoryStructures as mts} from '../'
import {PitchClass}                   from './PitchClass'
import {PianoOctaveRule}              from '../validation/PianoOctaveRule'
import {realNumberFromFreq}           from '../utilities/ScientificFuncs'

/**
 * @classdesc A pitch class, representing a pitch class and an octave.
 * @extends PitchClass
 */
export class Pitch extends PitchClass {
    /**
     * Creates a new Pitch instance.
     * @param pitchClass
     * @param octave
     */
    constructor(pitchClass, octave) {
        PianoOctaveRule.validatePossible(octave)
        super(pitchClass)
        this.attributes.octave = octave
    }

    /**
     * Generates a new pitch from frequency.
     * @param frequency
     * @returns {Pitch}
     */
    static fromFrequency(frequency) {
        const n          = realNumberFromFreq(frequency)
        const pitchClass = mts.sharpClassNotes[n % 12]
        const octave     = Math.floor(n / 12 - 1)

        return new Pitch(pitchClass, octave)
    }

    /**
     * Returns the octave of the pitch.
     * @type {String}
     */
    get octave() { return this.attributes.octave }

    /**
     * Gets interval size and returns new pitch instance
     * which is calculated by the musical interval formula.
     * @example
     * let c = new Note({note:'c', octave:3}) //create a C3 note.
     * let interval = c.interval(4) //calling the function with the number 4(which is a major third).
     * console.log(interval.toStrring()) //should output 'E3'.
     * console.log(interval.constructor.name) //should output Note.
     * @param {number} interval Musical Interval
     */
    interval(interval) {
        if(interval === parseInt(interval)) {
            let octDiff = Math.floor((this.classIndex + interval) / 12)
            let pitchClass
            if (interval >= 0) {
                pitchClass = mts.getPitchClassSet(this.classSet)[(this.classIndex + interval) % 12]
            } else {
                octDiff    = this.classIndex + interval < 0 ? octDiff : 0
                pitchClass = mts.getPitchClassSet(this.classSet)[Math.abs((this.classIndex + (12 + (interval % 12))) % 12)]
            }
            return new Pitch(pitchClass, this.octave + octDiff)
        }
        return undefined
    }

    /**
     * Returns a string of the pitch class and octave of the pitch.
     * @returns {string}
     */
    toString() {
        return `${super.toString()}${this.octave}`
    }
}
