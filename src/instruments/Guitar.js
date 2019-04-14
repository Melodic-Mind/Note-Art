import {NoteString} from '../instruments/NoteString'

/**
 * @classdesc Piano instance - creates a piano that can play any note from any octave in any duration.
 * @class
 */
export class Guitar {
    constructor() {
        const range  = 12
        this.strings = [
            new NoteString('E4', range, 1),
            new NoteString('B3', range, 2),
            new NoteString('G3', range, 3),
            new NoteString('D3', range, 4),
            new NoteString('A2', range, 5),
            new NoteString('E2', range, 6),
        ]
    }

    playString(string, note, duration) {
        this.strings[string].play(note, duration)
    }

    play(stringsAndNotes, duration) {
        Object.entries(stringsAndNotes).forEach(([string, note]) => {
                this.playString(string, note, duration)
            },
        )
    }

    strum(pattern, duration, up = false) {
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
