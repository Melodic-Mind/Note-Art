import {Instrument} from './Instrument'
import {app}        from '../'

const drumSounds = [
    'clap',
    'hihat-closed',
    'hihat-open',
    'kick',
    'ride',
    'snare',
    'tom-high',
    'tom-low',
    'tom-mid',
]

/**
 * A drumset which can play
 */
export class Drumset extends Instrument {
    constructor() {
        super()
        this.init()
    }

    init() {
        drumSounds.forEach(filename => {
            this.paths.set(filename, this.generatePath(filename))
            app.get('audio-manager').toMaster(this.paths.get(filename))
        })
    }

    generatePath(fileName) {
        return `${Instrument.server}Drums/${fileName}.mp3`
    }

    /**
     * Get a note's Player.
     * @returns {Tone.Player}
     * @param fileName
     */
    getPlayer(fileName) {
        return this.paths.get(fileName)
    }

    /**
     * Play sound by player key.
     * @param fileName
     */
    play(fileName) {
        if (this.paths.has(fileName)) {
            this.getPlayer(fileName).start()
        }
    }

    syncAndPlay(fileName) {
        if (this.paths.has(fileName)) {
            this.getPlayer(fileName).sync().start()
        }
    }
}


