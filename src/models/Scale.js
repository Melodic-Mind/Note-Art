import {InvalidInput, MissingInformation} from '../Exceptions'
import {buildString, findQuery}           from '../addons/GlobalFunctions'
import {notesDistance}                    from '../utilities/MusicalAddons'
import {Chord}                            from '../models/Chord'
import {MusicTheoryStructures as mts}     from '../resources/MusicTheoryStructures'
import {Note}                             from './Note'

/**
 * General Scale
 * @class
 * @classdesc Represents a musical scale - a series of notes following a specific pattern from a note(the tonic) which
 *     forms chords and can be used to compose infinite melodies.
 * <b>Either Name or Pattern must be provided!</b>
 * @throws {MissingInformation} When not provided with tonic and either name or pattern
 * @throws {DataNotFound} When called with name and the name cant be found in the database.
 * @example
 * const c = new Note({note: 'c'})
 * const C_Major_by_pattern = new Scale({tonic:c, pattern: [0, 2, 4, 5, 7, 9, 11]}) // new C major scale.
 * const C_minor_by_name = new Scale({tonic:c, name: 'Minor'}) // new C major scale // new C minor scale.
 */
export class Scale {
    /**
     * @param {String/Note} tonic
     * @param name
     * @param {Array} pattern
     * @constructor
     */
    constructor({tonic, name, pattern}) {
        this.info = findQuery(name, pattern, mts.scales)
        this.setNotes(tonic)
        this.normalizeIfDiatonic(tonic)
    }

    /**
     * @private
     * @param tonic
     */
    setNotes(tonic) {
        if (!(tonic instanceof Note)) {
            throw new InvalidInput(`expected ${tonic} to be an instance of Note`)
        }
        this._notes = []
        this.semitones.forEach(interval =>
            this._notes.push(tonic.interval(interval)),
        )
    }

    /**
     * @private
     * @param tonic
     */
    normalizeIfDiatonic(tonic) {
        if (Scale.validateDiatonicScale(this.pitchClasses) && this.notes.length === 7) {
            tonic.classSet     = tonic.classSet === 'b' ? '#' : 'b'
            this._notes.length = 0
            this.semitones.forEach(interval =>
                this._notes.push(tonic.interval(interval)),
            )
        }
    }

    static validateDiatonicScale(pitchClasses) {
        const valid = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
        const count = new Array(7).fill(0)
        pitchClasses.forEach(pc => {
            count[valid.indexOf(pc[0])]++
        })
        return count.some(c => c > 1)
    }

    /**
     * Gets an array of notes and returns a array of chords generated by the root +
     * the note 2 degrees up +
     * the note 4 degrees up.
     * @param {Array} notes array of notes
     * @param {Boolean} seventh whether to create a 7th chord
     * @returns {Array}
     */
    static chordsFromNotes(notes, seventh = false) {
        const chords = []
        notes.forEach((root, index) => {
            let pattern = [
                notesDistance(root, notes[(index + 2) % notes.length]),
                notesDistance(root, notes[(index + 4) % notes.length]),
            ]
            if (seventh) {
                pattern = pattern.concat(notesDistance(root, notes[(index + 6) % notes.length]))
            }
            chords.push(new Chord({root, pattern}))
        })
        return chords
    }

    /**
     * returns array that contains all the notes in the pattern.
     */
    get notes() {
        return this._notes
    }

    /**
     * Returns the pattern for the scale as an array using semi-tone notation.
     * @type {Array}
     */
    get semitones() {
        return JSON.parse(this.info['Pattern'])
    }

    /**
     * Returns the scale name.
     * @type {*}
     */
    get name() {
        return this.info['Name']
    }

    /**
     * Returns other name of the scale.
     * @returns {*|string}
     */
    get otherNames() {
        const aka = this.info['AKA']
        return aka || 'No other names'
    }

    /**
     * Returns the chords of the scale in an array, calculated by taking each note,
     * then skipping one note and taking the next, etc...to form the Chord.
     * @type {Array}
     */
    get chords() {
        if (!this._chords) {
            this._chords = Scale.chordsFromNotes(this.notes)
        }
        return this._chords
    }

    /**
     * Returns the chords of the scale in an array, calculated by taking each note,
     * then skipping one note and taking the next, etc...to form the Chord.
     * @type {Array}
     */
    get seventhChords() {
        if (!this._seventhChords) {
            this._seventhChords = Scale.chordsFromNotes(this.notes, true)
        }
        return this._seventhChords
    }

    /**
     * Returns a string of all the pitch class names in the scale.
     * @type{string}
     */
    get pitchClassNamesString() {
        let str = ''
        this.notes.forEach(note => (str += note.pitchClass + ', '))
        return str.slice(0, str.length - 2)
    }

    /**
     * Returns an array of the pitch classes in the scale.
     * @type {Array}
     */
    get pitchClasses() {
        const pClasses = []
        this.notes.forEach(note => pClasses.push(note.pitchClass))
        return pClasses
    }

    /**
     * Returns a string of the pitch class names and octaves of the scale.
     * @type{string}
     */
    get notesString() {
        return buildString(this.notes)
    }

    /**
     * returns the name of the scale.
     * @returns {String}
     */
    toString() {
        return `${this.notes[0].pitchClass} ${this.name}`
    }

    /**
     * Returns the degree inside the Scale.
     * for example - if the Scale is a C Major,
     * than interval(1) wiil return D.
     * @param {Number} degree
     */
    degree(degree) {
        return this.notes[degree - 1]
    }

    /**
     * Returns the chord that fits the scale degree note.
     * @param degree
     * @return {*}
     */
    chord(degree) {
        return this.chords[degree - 1]
    }
}
