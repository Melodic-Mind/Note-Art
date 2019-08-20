import {Instrument} from './Instrument'
import {lib}        from '../'

const drumSounds = [
    'clap',
    'hihat-closed',
    'hihat-open',
    'kick',
    'snare',
    'tom-high',
    'tom-low',
    'tom-mid',
]

/**
 * @extends Instrument
 * @classdesc Can play drum sounds, has clap, hihat-closed, hihat-open, kick, snare, tom-high, tom-low, tom-mid.
 */
export class Drumset extends Instrument {
    constructor() {
        super()
        this.init()
    }

    /**
     * @inheritDoc
     */
    static name = 'Drumset'

    /** @inheritDoc */
    init() {
        drumSounds.forEach(filename => {
            const context = this.generatePath(filename)
            this.players.set(filename, context)
            Instrument.toMaster(context)
        })
    }

    /** @inheritDoc */
    generatePath(fileName) {
        return `${Instrument.server}${Drumset.instrumentPath}/${fileName}.mp3`
    }

    /**
     * Get a note's Player.
     * @returns {Tone.Player}
     * @param fileName
     */
    getPlayer(fileName) {
        return this.players.get(fileName)
    }

    /**
     * Plays audio by name.
     * @param {string} fileName
     */
    play(fileName) {
        if (this.players.has(fileName)) {
            this.getPlayer(fileName).start()
        }
    }

    toString() {
        return 'Drumset'
    }
}


