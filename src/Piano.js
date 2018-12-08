import { Note, allNotes, noteDurations, firstToUpper } from '.'

class Piano {
    constructor() {
        this.piano = new Map()
        for (let i = 1; i <= 7; i++)
            for (const n of allNotes)
                for (let l in noteDurations)
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