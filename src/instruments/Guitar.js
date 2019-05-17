import {Instrument, NoteString} from '../'
import {playing}                from '../mixins/Instruments'

/**
 * @classdesc Represents a guitar which can play notes, individually or strum them together
 * using different input methods.
 * This guitar uses all the audio files from the note-art server,
 * if you wish to create a different guitar you can do so easily by using the template below
 * with your number of strings, their ranges, etc.
 */
export class Guitar {
    constructor() {
        //The ranges are set to the number of samples in the note art server.
        this.strings = [
            new NoteString('E4', 19, 1),
            new NoteString('B3', 16, 2),
            new NoteString('G3', 15, 3),
            new NoteString('D3', 16, 4),
            new NoteString('A2', 16, 5),
            new NoteString('E2', 16, 6),
        ]
    }

    /**
     * Plays a single note on a specific string for some duration.
     * @param {string} string String to play.
     * @param {string} note Note to play.
     * @param {string} duration duration to play the note for.
     */
    playString(string, note, duration) {
        this.strings[string].play(note, duration)
    }

    /**
     *
     * @param {Object} stringsAndNotes Object which contains string and notes to play.
     * @param duration Duration to play for.
     * @example
     * const stringsAndNotes = {1: 'E4', 2: 'C4'}
     * guitarInstance.play(stringsAndNotes, '4n')   //notes are played.
     */
    playMultiple(stringsAndNotes, duration) {
        Object.entries(stringsAndNotes).forEach(([string, note]) => {
                this.playString(string, note, duration)
            },
        )
    }

    //Private method to help
    playHelper(method, note, duration) {
        note = Instrument.notePipeline(note)
        for (let i = 0; i < this.strings.length; ++i) {
            if (this.strings[i].hasNote(note)) {
                return this.strings[i][method](note, duration)
            }
        }
        return false
    }

    /**
     * Syncs a note to the transport with a duration.
     * @param {string} note
     * @param {string} duration duration to play the note for.
     */
    play(note, duration = '100') {
        return this.playHelper('play', note, duration)
    }

    /**
     * Syncs a note to the transport with a duration.
     * @param {string} note
     * @param {string} duration duration to play the note for.
     */
    syncAndPlay(note, duration) {
        return this.playHelper('syncAndPlay', note, duration)
    }

    /**
     * Strums the guitar's strings using guitar pattern(low to high).
     * @param {string} pattern pattern to strum
     * @param {string} duration duration to play the note for.
     * @example
     * guitarInstance.strum('x02210', '8n') //Plays Am chord.
     * guitarInstance.strum('320033', '8n') //Plays G chord.
     */
    strum(pattern, duration) {
        Array.from(pattern).forEach((fret, index) => {
            if (fret !== 'x') {
                index = 5 - index
                this.playString(index,
                    this.strings[index].fret(fret),
                    duration)
            }
        })
    }
}

Object.assign(Guitar.prototype, playing)
