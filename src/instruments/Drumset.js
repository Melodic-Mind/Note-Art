import {Instrument} from './Instrument'
import {app}        from '../'

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

    /** @inheritDoc */
    init() {
        drumSounds.forEach(filename => {
            this.players.set(filename, this.generatePath(filename))
            app.get('audio-manager').toMaster(this.players.get(filename))
        })
    }

    /** @inheritDoc */
    generatePath(fileName) {
        return `${Instrument.server}drums/${fileName}.mp3`
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

    /**
     * Syncs a sound to the transport and plays it.
     * @param {string} fileName
     */
    syncAndPlay(fileName) {
        if (this.players.has(fileName)) {
            this.getPlayer(fileName).sync().start()
        }
    }
}


