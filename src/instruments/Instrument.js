import {app}                           from '../'
import {Note}                          from '../models/Note'
import {firstToUpper}                  from '../addons/GlobalFunctions'
import {notesInRange, validateRawNote} from '../utilities/MusicalAddons'
import {MusicTheoryStructures as mts}  from '../resources/MusicTheoryStructures'


/**
 * @abstract
 */
export class Instrument {
    constructor() {
        this.notes = new Map()
        this.paths = app.get('audio-manager').getAudioMap()
    }

    init(base, range) {
        Object.entries(notesInRange(base, range)).forEach(([key, {pitchClass, octave}]) => {
            const note = new Note(pitchClass, octave)

            this.notes.set(key, note)
            this.setPath(note)
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

    static getAudioMap() {
        return app.get('audio-manager').getAudioMap()
    }

    static normalizeNoteStr(noteStr) {
        return firstToUpper(noteStr)
    }

    /**
     * Must be implemented by child class.
     * @param instrument
     * @param note
     */
    generatePath(note) {
        throw new Error('Not implemented for this instrument yet')
    }

    /**
     * Add a note to the map.
     * @param {Note} note
     */
    setPath(note) {
        const key = Instrument.getKey(note)
        if (!this.paths.has(key)) {
            this.paths.set(key, this.generatePath(note))
            app.get('audio-manager').toMaster(this.paths.get(key))
        }
    }

    /**
     * Get a note's Player.
     * @param {Note} note
     * @returns {Tone.Player}
     */
    getPlayer(note) {
        return this.paths.get(Instrument.getKey(this.notes.get(note)))
    }

    /**
     * Gets a string consisting of:
     * 1. The note
     * 2. The octave
     * @param {String} note
     * @returns {Note}
     * @example
     * const C = piano.note('c34n') // C is now a Note object
     * C.play()                    // Plays the note
     */
    note(note) {
        return this.notes.get(Instrument.normalizeNoteStr(note))
    }

    hasNote(note) {
        validateRawNote(note)
        return this.notes.has(Instrument.normalizeNoteStr(note))
    }

    /**
     * Play sound by player key.
     * @param note
     * @param stopAt
     */
    play(note) {
        if (this.hasNote(note)) {
            this.getPlayer(Instrument.normalizeNoteStr(note)).start()
        }
    }

    syncAndPlay(note, duration) {
        this.getPlayer(Instrument.normalizeNoteStr(note)).sync().start().stop(duration)
    }
}
