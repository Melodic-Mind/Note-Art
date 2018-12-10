import {
    Note,
    chords
} from '.'
import { NotAChordException } from './Exceptions'

/**
 * @classdesc Represents a Chord.
 * @class
 */
export class Chord {
    /**
     * Creates a Chord instance.
     * @param {Note} root root of the chord
     * @param {String} chord_type type of the chord
     */
    constructor(root, chord_type) {
        this.attributes = []
        this.attributes[Chord.INFO] = chords.find((chord) => chord_type === chord['Type'])
        if (!this.attributes[Chord.INFO]) throw new NotAChordException(chord_type)
        this.attributes[Chord.NOTES] = []
        this.attributes[Chord.NOTES].push(root)
        JSON.parse(this.attributes[Chord.INFO]['Formula(semi-tones)'])
            .forEach(interval => this.attributes[Chord.NOTES].push(root.interval(interval)))
    }

    /**
     * Index of chord information object.
     * @returns {Number}
     */
    static get INFO() { return 0 }

    /**
     * Index of chord notes array.
     * @returns {Number}
     */
    static get NOTES() { return 1 }

    /**
     * Array of the notes in the chord.
     * @type {Array}
     * @readonly
     */
    get notes() { return this.attributes[Chord.NOTES] }

    /**
     * Name of the chord.
     * @type {String}
     * @readonly
     */
    get name() { return this.attributes[Chord.INFO]['Name'] }

    /**
     * Type of the chord.
     * @type {String}
     * @readonly
     */
    get type() { return this.attributes[Chord.INFO]['Type'] }

    /**
     * Play the chord.
     * @type {void}
     */
    play() { this.notes.forEach(note => note.play()) }

    /**
     * Transforms the chord into its root position.
     */
    rootPosition() {
        // TODO
    }

    /**
     * Transforms the chord into its 1st-inversion.
     */
    inversionFirst() {
        //TODO
    }

    /**
     * Transforms the chord into its 2st-inversion.
     */
    inversionSecond() {
        //TODO
    }

    /**
     * Get a string of the chord's name
     * @returns {String}
     */
    toString() {
        return `${this.notes[0].note} ${this.name}`
    }

    /**
     * Generate a new chord with the same notes but a different duration.
     * @param {String} duration the new duration
     * @returns {Chord}
     */
    newDuration(duration) {
        return new Chord(this.notes[0].changeDuration(duration), this.type)
    }

    /**
     * Generates a new chord with the interval applied
     * @param {Number} interval the interval to apply
     * @returns {Chord}
     */
    tranpose(interval) {
        return new Chord(this.notes[0].transpose(interval), this.type)
    }
}