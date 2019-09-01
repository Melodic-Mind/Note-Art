import Instrument from './Instrument'

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
 * @class Drumset
 * @extends Instrument
 * @classdesc Can play drum sounds, has clap, hihat-closed, hihat-open, kick, snare, tom-high, tom-low, tom-mid.
 */
export default class Drumset extends Instrument {
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
    drumSounds.forEach(filename => this.setPlayer(filename, filename))
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

  /**
   * @inheritDoc
   */
  toString() {
    return 'Drumset'
  }
}


