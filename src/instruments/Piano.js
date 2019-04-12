import {Instrument} from '../instruments/Instrument'

/**
 * @classdesc Piano instance - creates a piano that can play any note from any octave in any duration.
 * @class
 */
export class Piano extends Instrument {
    constructor(base = 'A0', range = 87) {
        super()
        this.init(base, range)
    }


    generatePath(note) {
        const server = 'http://localhost:8000/'
        const set    = Instrument.normalizeSet(note.pitchClass, note.classSet)
        const file   = `/FF_${set}${note.octave}`

        return `${server}Piano${file}.mp3`
    }
}
