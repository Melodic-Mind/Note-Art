import {firstToUpper, PlayableNote, MusicTheoryStructures as mts} from '../'

const pianoNotes = require('../resources/piano-notes.json')

/**
 * @classdesc Piano instance - creates a piano that can play any note from any octave in any duration.
 * @class
 */
export class Piano {
    /**
     * initializes the piano object with all piano notes.
     */
    constructor() {
        this.piano = new Map()
        Object.entries(pianoNotes).forEach(([octave, pitchClassArray]) => {
            pitchClassArray.forEach(pitchClass =>
                Object.keys(mts.noteDurations).forEach(duration =>
                    this.setKey(pitchClass, Number(octave), duration),
                ))
        })
    }

    /**
     * Binds a note to the piano map object.
     * @param {String} pitchClass
     * @param {Number} octave
     * @param {String} duration
     * @private
     */
    setKey(pitchClass, octave, duration) {
        this.piano.set(pitchClass + octave + duration, new PlayableNote({
            pitchClass,
            octave,
            duration,
            instrument: 'Piano',
        }))
    }

    /**
     * Gets a string consisting of:
     * 1. The note
     * 2. The octave
     * 3. The duration
     * returns a Note object with the parameters and "Piano" as the instrument
     * @param {String} note
     * @returns {PlayableNote}
     * @example
     * const C = piano.note('c34n') // C is now a Note object
     * C.play()                    // Plays the note
     */
    note(note) { return this.piano.get(firstToUpper(note)) }
}
