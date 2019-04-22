import {MissingInformation, DataNotFound, InvalidInput} from '../Exceptions'
import {buildString, findQuery}                         from '../addons/GlobalFunctions'
import {MusicTheoryStructures as mts}                   from '../resources/MusicTheoryStructures'
import {Note}                                           from '../models/Note'

/**
 * @classdesc Represents a musical Chord - a number of notes with a specific
 * pattern which can be played together to form a harmonic sound.
 * @param {Object} attributes Object that contains some of the following keys:
 * @param {Note} [attributes.root] - chords root note
 * @param {String} [attributes.name] - the chords name(e.g 'M')
 * @param {Array} [attributes.pattern] - the pattern to build the chord by pitch intervals(e.g [3, 7]
 * @throws {MissingInformation} When not provided with root and either name or pattern
 * @throws {DataNotFound} When called with name and the name cant be found in the
 * @example
 * const c = new Note({note: 'c'})
 * const C_Maj_by_pattern = new Chord({root:c, pattern: [4, 7]}) // new C major chord.
 * const C_min_by_name = new Chord({root:c, name: 'm'}) // new C minor chord.
 */
export class Chord {
    constructor({root, name, pattern}) {
        this.info   = findQuery(name, pattern, mts.Chords)
        this._notes = []
        this.pushNotes(root)
    }

    /**
     * Creates notes and adds them to the chord.
     * @throws InvalidInput
     * @private
     */
    pushNotes(root) {
        if (!(root instanceof Note)) {
            throw new InvalidInput(`expected ${root} to be an instance of Note`)
        }
        this._notes.push(root)
        this.pitchIntervals.forEach(interval =>
            this._notes.push(root.interval(interval)),
        )
    }

    /**
     * Array of the notes in the chord.
     * @type {Array}
     */
    get notes() {
        return this._notes
    }

    /**
     * Name of the chord.
     * @type {String}
     */
    get fullName() {
        return this.info['Chord']
    }

    /**
     * Chord type representation.
     * @type {String}
     */
    get name() {
        return this.info['Name']
    }

    /**
     * Returns chord root octave.
     * @type {Number}
     */
    get octave() {
        return this.notes[0].octave
    }

    /**
     * Array of the intervals from the root to each note in the chord(excluding the root)
     * @type {Array}
     */
    get pitchIntervals() {
        return JSON.parse(this.info['Pattern'])
    }

    /**
     * Whether chord is major, minor or neither.
     * @returns {string|undefined}
     */
    get type() {
        if (this.pitchIntervals.includes(4)) {
            return 'major'
        } else if (this.pitchIntervals.includes(3)) {
            return 'minor'
        } else {
            return undefined
        }
    }

    // /**
    //  * Transforms the chord into its root position.
    //  */
    // rootPosition() {
    //     // TODO
    // }
    //
    // /**
    //  * Transforms the chord into its 1st-inversion.
    //  */
    // inversionFirst() {
    //     //TODO
    // }
    //
    // /**
    //  * Transforms the chord into its 2st-inversion.
    //  */
    // inversionSecond() {
    //     //TODO
    // }

    /**
     * Returns a string of the chord's name.
     * @returns {String}
     */
    toString() {
        return `${this.notes[0].pitchClass} ${this.name}`
    }

    /**
     * Returns a string of the chord notes pitch classes.
     * @returns {string}
     */
    get pitchClasses() {
        return buildString(this.notes)
    }

    get raw() {
        return this.notes.map(note => note.raw)
    }

    /**
     * Generates a new chord with the interval applied
     * @param {Number} interval the interval to apply
     * @returns {Chord}
     */
    transpose(interval) {
        const root = this.notes[0].transpose(interval)
        return new Chord({root, pattern: this.pitchIntervals})
    }
}
