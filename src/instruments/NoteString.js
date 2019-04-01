import {app, firstToUpper, NoteBuilder, notesInRange} from '../'


export class NoteString {
    constructor(base, range, instrument) {
        const entries = Object.entries(notesInRange(base, range))
        this.notes    = new Map()
        entries.forEach((entry) => {
            this.notes.set(entry[0], new NoteBuilder({
                pitchClass: entry[1]['pitchClass'],
                octave:     entry[1]['octave'],
                instrument,
            }).build(true))
        })
    }

    note(note) {
        return this.notes.get(firstToUpper(note))
    }
}
