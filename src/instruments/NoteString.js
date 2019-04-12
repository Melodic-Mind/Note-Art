import {Instrument} from './Instrument'

export class NoteString extends Instrument {
    constructor(base, range, stringNumber) {
        super()
        this.stringNumber = stringNumber
        this.init(base, range)
    }

    generatePath(note) {
        const server = 'http://localhost:8000/'
        const set    = Instrument.normalizeSet(note.pitchClass, note.classSet)
        const file   = `${set}${note.octave}`

        return `${server}Guitar/_${this.stringNumber}/${file}_long.mp3`
    }
}
