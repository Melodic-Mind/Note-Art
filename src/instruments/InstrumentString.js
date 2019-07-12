import {Instrument} from './Instrument'

export class InstrumentString extends Instrument {
    constructor(base, range, stringNumber) {
        super()
        this.stringNumber = stringNumber
        this.init(base, range)
    }

    /**
     * @inheritDoc
     */
    static name = 'NoteString'

    /**
     * @inheritDoc
     */
    generatePath(note) {
        const set  = Instrument.normalizeSet(note.pitchClass, note.classSet)
        const file = `${set}${note.octave}`

        return `${Instrument.server}${InstrumentString.instrumentPath}/${this.stringNumber}/${file}.mp3`
    }

    fret(fret) {
        return Array.from(this.notes.keys())[fret]
    }


    toString() {
        return 'Note-String'
    }
}
