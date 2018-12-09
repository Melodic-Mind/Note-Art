import { Note, allNotes, noteDurations, firstToUpper } from '.'

/**
 * @class
 */
export class Piano {
    /**
     * @classdesc Piano instance - creates a piano that can play any note from any octave for any duration.
     * initializes the piano object with all piano notes.
     */
    constructor() {
        this.piano = new Map()
        for (let i = 1; i <= 7; i++)
            for (const n of allNotes)
                for (let l in noteDurations)
                    this.setKey(n, i, l)
        const otherNotes = [{ note: 'A', octave: 0 }, { note: 'A#', octave: 0 }, { note: 'Bb', octave: 0 }, { note: 'B', octave: 0 }, { note: 'C', octave: 8 }]
        for (let l in noteDurations)
            for (const n of otherNotes)
                this.setKey(n.note, n.octave, l)
    }
    /**
     * Binds a note to the piano map object.
     * @param {String} note 
     * @param {Number} octave 
     * @param {String} duration 
     * @private
     */
    setKey( note, octave, duration ) { this.piano.set(note + octave + duration, new Note({ note, octave, duration, instrument: 'Piano' })) }

    /**
     * Gets a string consisting of:
     * 1. The note
     * 2. The octave
     * 3. The duration
     * returns a Note object with the parameters and "Piano" as the instrument
     * @param {String} note 
     * @returns {Note}
     * @example
     * const C = piano.note('c3q') // C is now a Note object
     * C.play()                    // Plays the note
     */
    note(note) { return this.piano.get(firstToUpper(note)) }
}
