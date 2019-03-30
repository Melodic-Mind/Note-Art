import {MissingInformation, DataNotFound}                         from '../Exceptions'
import {findQuery, playMelodically, MusicTheoryStructures as mts} from '../'

/**
 * @classdesc Represents a musical Chord - a number of notes with a specific
 * pattern which can be played together to form a harmonic sound.
 * @throws {MissingInformation} When not provided with root and either name or pattern
 * @throws {DataNotFound} When called with name and the name cant be found in the
 * @example
 * const c = new Note({note: 'c'})
 * const C_Maj_by_pattern = new Chord({root:c, pattern: [4, 7]}) // new C major chord.
 * const C_min_by_name = new Chord({root:c, name: 'm'}) // new C minor chord.
 */
export class Chord {
    /**
     * <b>Either Name or Pattern must be provided!</b>
     * @param {Object} attributes Object that contains some of the following keys:
     * @param {Note|PlayableNote} [attributes.root] - chords root note
     * @param {String} [attributes.name] - the chords name(e.g 'M')
     * @param {Array} [attributes.pattern] - the pattern to build the chord by pitch intervals(e.g [3, 7]
     */
    constructor({root, name, pattern}) {
        const attributes = {}
        if (!root) {
            throw new MissingInformation('root')
        }
        attributes.info = findQuery(name, pattern, mts.Chords)
        if (!attributes.info['Chord']) {
            attributes.info['Chord'] = ''
        }
        attributes.notes = []

        this.attributes = attributes
        this.notes.push(root)
        this.pitchIntervals.forEach(interval =>
            this.notes.push(root.interval(interval)),
        )
    }

    /**
     * Array of the notes in the chord.
     * @type {Array}
     */
    get notes() {
        return this.attributes.notes
    }

    /**
     * Name of the chord.
     * @type {String}
     */
    get fullName() {
        return this.attributes.info['Chord']
    }

    /**
     * Marking of the chord.
     * @type {String}
     */
    get name() {
        return this.attributes.info['Name']
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
        return JSON.parse(this.attributes.info['Pattern'])
    }

    get duration() {
        return this.notes[0].duration
    }

    get type() {
        if (this.pitchIntervals.includes(4)) {
            return 'major'
        } else if (this.pitchIntervals.includes(3)) {
            return 'minor'
        } else {
            return undefined
        }
    }

    /**
     * Play the chord.
     * @type {boolean}
     */
    play() {
        if (this.notes[0].isPlayable) {
            this.notes.forEach(note => note.play())
            return true
        }
        return false
    }

    /**
     * Play chord notes melodically.
     */
    playMelody() {
        playMelodically(this.notes, 400)
    }

    /**
     * Generate the same chord with a new duration.
     * @param duration
     * @returns {Chord}
     */
    setDuration(duration) {
        return new Chord({
            root:    this.notes[0].setDuration(duration),
            pattern: this.pitchIntervals,
        })
    }

    /**
     * Generate the same chord with a new octave.
     * @param octave
     * @returns {Chord}
     */
    setOctave(octave) {
        return new Chord({
            root:    this.notes[0].setOctave(octave),
            pattern: this.pitchIntervals,
        })
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
     * Get a string of the chord's name.
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
        let s = ''
        this.notes.forEach(note => s += note.toString() + ', ')
        return s
    }

    /**
     * Generates a new chord with the interval applied
     * @param {Number} interval the interval to apply
     * @returns {Chord}
     */
    transpose(interval) {
        const root = this.notes[0].transpose(interval)
        return root ? new Chord({root, pattern: this.pitchIntervals}) : undefined
    }
}
