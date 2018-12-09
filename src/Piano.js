import { Note, allNotes, noteDurations, firstToUpper } from '.'

<<<<<<< HEAD
/**
 * @class
 */
export class Piano {
    /**
     * @classdesc Piano instance - creates a piano that can play any note from any octave for any duration.
     * initializes the piano object with all piano notes.
     */
=======
class Piano {
>>>>>>> 0c418e50ea9273d341f0399cc468c62df27fa305
    constructor() {
        this.piano = new Map()
        for (let i = 1; i <= 7; i++)
            for (const n of allNotes)
                for (let l in noteDurations)
<<<<<<< HEAD
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
=======
                    this.piano.set(n + i + l, new Note({ note: n, octave: i, duration: l, instrument: 'Piano' }))
        for (let l in noteDurations) {
            this.piano.set('A0' + l, new Note({ note: 'a', octave: 0, duration: l, instrument: 'Piano' }))
            this.piano.set('Bb0' + l, new Note({ note: 'bb', octave: 0, duration: l, instrument: 'Piano' }))
            this.piano.set('B0' + l, new Note({ note: 'B', octave: 0, duration: l, instrument: 'Piano' }))
            this.piano.set('C8' + l, new Note({ note: 'C', octave: 8, duration: l, instrument: 'Piano' }))
        }
    }

    note(note) { return this.piano.get(firstToUpper(note)) }
}

export { Piano }
>>>>>>> 0c418e50ea9273d341f0399cc468c62df27fa305
