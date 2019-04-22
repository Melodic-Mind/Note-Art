import {Instrument} from './Instrument'

export class NoteString extends Instrument {
    constructor(base, range, stringNumber) {
        super()
        this.stringNumber = stringNumber
        this.init(base, range)
    }

    generatePath(note) {
        const set  = Instrument.normalizeSet(note.pitchClass, note.classSet)
        const file = `${set}${note.octave}`

        return `${Instrument.server}guitar/${this.stringNumber}/${file}_long.mp3`
    }

    fret(fret) {
        return Array.from(this.notes.keys())[fret]
    }
}
