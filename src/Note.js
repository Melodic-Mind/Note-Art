import { notes, FourthsCircle, semitone, validateNoteAndOctave, validateDuration, validateInstrument } from "."
import { NotesHash } from './NotesHash'
const sounds = NotesHash.getNotesHash()

/**
 * @class
 * @classdesc Represents a single musical note.
 * @example
 * const n = new Note({note: 'c', octave: 3, duration: 'q', instrument: 'Piano'})
 */
export class Note {
    /**
     * @param {Object} attributes Object that contains some or all of the following keys:
     * {String} note Musical Note
     * {number} octave Note Octave
     * {String} duration Note duration
     * {String} instrument Piano/Guitar/etc...
     */
    constructor({ note, octave, duration, instrument }) {
        this.attributes = [];
        [this.attributes[Note.NOTE], this.attributes[Note.OCTAVE], this.attributes[Note.DURATION], this.attributes[Note.INSTRUMENT]] = Note.validateProperties(note, octave, duration, instrument)
        this.attributes[Note.FAMILY] = FourthsCircle.includes(this.note) ? "b" : "#"
        this.attributes[Note.INDEX] = notes[this.family].indexOf(this.note)
        this.attributes[Note.FREQUENCY] = this.calculateFrequency()
        sounds.set(this)
    }

    /**
     * Validates the properties the user entered.
     * @param {String} note 
     * @param {Number} octave 
     * @param {String} duration 
     * @param {String} instrument 
     */
    static validateProperties(note, octave, duration, instrument){
        const valid_values = validateNoteAndOctave(note, octave)
        valid_values.push(validateDuration(duration))
        valid_values.push(validateInstrument(instrument))
        return valid_values
    }

    /**
     * Index of note in attributes
     * @type    {Number}
     * @readonly
     */
    static get NOTE() { return 0 }

    /**
     * Index of octave in attributes
     * @type    {Number}
     * @readonly
     */
    static get OCTAVE() { return 1 }

    /**
     * Index of duration in attributes
     * @type    {Number}
     * @readonly
     */
    static get DURATION() { return 2 }

    /**
     * Index of instrument in attributes
     * @type    {Number}
     * @readonly
     */
    static get INSTRUMENT() { return 3 }

    /**
     * Index of family in attributes
     * @type    {Number}
     * @readonly
     */
    static get FAMILY() { return 4 }

    /**
     * Index of note index in attributes
     * @type    {Number}
     * @readonly
     */
    static get INDEX() { return 5 }

    /**
     * Index of frequency in attributes
     * @type    {Number}
     * @readonly
     */
    static get FREQUENCY() { return 6 }

    /**
     * Returns the note alphabet representation as a string.
     * @type {String}
     * @readonly
     */
    get note() { return this.attributes[Note.NOTE] }

    /**
     * Get octave of note.
     * @type {Number}
     * @readonly
     */
    get octave() { return this.attributes[Note.OCTAVE] }

    /**
     * Get the duration of a note
     * @type {String}
     * @readonly
     */
    get duration() { return this.attributes[Note.DURATION] }

    /**
     * Get the instrument that plays the note
     * @type {String}
     * @readonly
     */
    get instrument() { return this.attributes[Note.INSTRUMENT] }

    /**
     * Get the family of notes the note belnogs to - sharps or flats
     * @type {String}
     * @readonly
     */
    get family() { return this.attributes[Note.FAMILY] }

    /**
     * Set the notes family in case needed.
     * @type {String}
     */
    set family(family) { this.attributes[Note.family] = ['#', 'b'].includes(family) ? family : this.family }

    /**
     * Get the index of the note from the 12 notes (C, Db, etc...).
     * @type {String}
     * @readonly
     */
    get index() { return this.attributes[Note.INDEX] }

    /**
     * Get the frequency of the note.
     * @type {String}
     * @readonly
     */
    get frequency() { return this.attributes[Note.FREQUENCY] }

    /**
     * Calculate the frequancy of a note.
     * @type {Number}
     * @private
     */
    calculateFrequency() {
        let octave_interval = this.octave - 4 //calculate octave difference
        return Math.pow(semitone, this.index - 9 + octave_interval * 12) * 440
    }

    /**
     * returns a clone of the note(new instance).
     * @type {Note}
     */
    changeDuration(duration) {
        const { note, octave, instrument } = this
        return new Note({ note, octave, duration, instrument })
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
    interval(interval) {
        let oct_diff = Math.floor((this.index + interval) / 12)
        const { duration, instrument } = this
        let new_note = null
        if (interval >= 0)
            new_note = notes[this.family][(this.index + interval) % 12]
        else {
            oct_diff = this.index + interval < 0 ? oct_diff : 0
            new_note = notes[this.family][Math.abs((this.index + (12 + (interval % 12))) % 12)]
        }
        return new Note({
            note: new_note,
            octave: this.octave + oct_diff,
            duration,
            instrument
        })
    }

    /**
     * Alias for interval()
     * @param {Number} interval 
     */
    transpose(interval) { return this.interval(interval) }

    /**
     * Returns the note name and octave.
     * @example
     * 'C3'
     */
    toString() { return this.note + this.octave }

    /**
     * Check if 2 notes are equal in letter and octave.
     * @param {Note} note
     */
    isEqual({ note, octave }) { return this.note === note && this.octave === octave }

    /**
     * Play the note.
     */
    play() {
        sounds.get(this).play()
    }
}