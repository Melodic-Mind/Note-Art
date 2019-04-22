import {app}                           from '../'
import {Note}                          from '../models/Note'
import {firstToUpper}                  from '../addons/GlobalFunctions'
import {notesInRange, validateRawNote} from '../utilities/MusicalAddons'
import {MusicTheoryStructures as mts}  from '../resources/MusicTheoryStructures'


/**
 * @abstract
 * @classdesc Represents an abstract instrument with notes.
 */
export class Instrument {
    constructor() {
        this.notes   = new Map()
        this.players = app.get('audio-manager').getAudioMap()
    }

    /**
     * The server to load the audio files for the instrument from,
     * can be overridden.
     * @returns {string}
     */
    static get server() {
        return app.get('path')
    }

    /**
     * Should be called from any child class's constructor.
     * Initializes all the notes and audio players for the instrument.
     * @param base
     * @param range
     */
    init(base, range) {
        Object.entries(notesInRange(base, range)).forEach(([key, {pitchClass, octave}]) => {
            const note = new Note(pitchClass, octave)
            this.notes.set(key, note)
            this.setPlayer(key, note)
        })
    }

    /**
     * Trnasforms notes of type '#' to 'b'.
     * @param pitchClass
     * @param classSet
     * @private
     * @returns {String}
     */
    static normalizeSet(pitchClass, classSet) {
        if (classSet === '#') {
            const index = mts.sharpClassNotes.indexOf(pitchClass)
            pitchClass  = mts.flatClassNotes[index]
        }
        const index = mts.flatClassNotes.indexOf(pitchClass)
        return mts.flatClassNotes[index]
    }

    /**
     * Calculates a specific note's key.
     * @param {Note} note
     */
    static getKey({pitchClass, octave, classSet}) {
        return `${Instrument.normalizeSet(pitchClass, classSet)}${octave}`
    }

    /**
     * Turns a string representing a note to upper case.
     * @param noteStr
     * @returns {String}
     */
    static normalizeNoteStr(noteStr) {
        return firstToUpper(noteStr)
    }

    /**
     * Generates player for some audio.
     * @param {String} fileName
     */
    generatePath(fileName) {
        throw new Error('Not implemented for this instrument yet')
    }

    /**
     * Add a player for a note.
     * @param key
     * @param {Note} note
     */
    setPlayer(key, note) {
        this.players.set(key, this.generatePath(note))
        app.get('audio-manager').toMaster(this.players.get(key))
    }

    /**
     * Get a note's player.
     * @param {String} note
     * @returns {Tone.Player}
     */
    getPlayer(note) {
        return this.players.get(Instrument.getKey(this.notes.get(note)))
    }

    /**
     * Gets a string consisting of:
     * 1. The pitch CLASS
     * 2. The octave
     * @param {String} note
     * @returns {Note}
     * @example
     * const C = someInstrument.note('c3') // C is now a Note object
     * console.log(C.interval(2))         // D3
     */
    note(note) {
        return this.notes.get(Instrument.normalizeNoteStr(note))
    }

    /**
     * Whether an instrument has a note.
     * @param {string} note
     * @returns {boolean}
     */
    hasNote(note) {
        return this.notes.has(note)
    }

    static notePipeline(note) {
        validateRawNote(note)
        note = Instrument.normalizeNoteStr(note)
        if (note.includes('#')) {
            const pitchClass = Instrument.normalizeSet(note.slice(0, 2), '#')
            const octave     = note[note.length - 1]
            note             = `${pitchClass}${octave}`
        }
        return note
    }

    /**
     * Play sound, optionally for a duration.
     * @param {string} note
     * @param {string} [duration=false]
     */
    play(note, duration = false) {
        note = Instrument.notePipeline(note)
        if (this.hasNote(note)) {
            this.getPlayer(note).start()
            if (duration) {
                this.getPlayer(note).stop(`+${duration}`)
            }
        }
    }

    playNotes(notes, duration) {
        notes.forEach(note => this.play(note, duration))
    }

    /**
     * Syncs a note to the transport with a duration.
     * @param {string} note
     * @param {string} duration
     */
    syncAndPlay(note, duration) {
        note = Instrument.notePipeline(note)
        if (this.hasNote(note)) {
            this.getPlayer(note).sync().start().stop(duration)
        }
    }

    /**
     * Play a group of notes melodically.
     * If resolve is true the melody will resolve to the tonic in higher octave.
     * @param {Array} notes array of playable notes
     * @param {Number} timeInterval
     * @param {boolean} [resolve = false] whether to resolve to tonic
     */
    playMelodically(notes, timeInterval = 300, resolve = false) {
        notes.forEach((note, i) => {
            setTimeout(() => this.play(note), i * timeInterval)
        })
        if (resolve) {
            setTimeout(
                () => this.play(Note.builder(notes[0]).interval(12).raw),
                notes.length * timeInterval,
            )
        }
    }
}
