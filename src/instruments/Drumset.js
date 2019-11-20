import Instrument from './Instrument'
import Tone       from 'tone'

/**
 * @class Drumset
 * @extends Instrument
 * @classdesc Drumset for playing files which aren't represented as notes.
 */
export default class Drumset extends Instrument {
  constructor() {
    super()
    this.notes   = null
    this.players = Instrument.getPlaybackHandler(true)
  }

  static get name() {
    return 'Drumset'
  }

  /** @inheritDoc */
  generatePath(fileName) {
    return `${Instrument.server}${Drumset.instrumentPath}/${fileName}.mp3`
  }

  /**
   * Get a note's Player.
   * @param fileName
   * @returns {Tone.Player}
   */
  getPlayer(fileName) {
    return this.players.get(fileName)
  }

  /**
   * Add a player for a note.
   * @param {string} key Key to map the buffer to.
   * @param {string|AudioBuffer} source The source for the player, can be url or AudioBuffer.
   */
  setPlayer(key, source) {
    if (typeof source === 'string') {
      this.players.add(key, source, () => {
        this.loadedFiles.push(key)
      }).toMaster()
    } else {
      this.players.add(key, source)
      const player = this.players.get(key)
      player.fadeIn  = .05
      player.fadeOut = .3
      player.toMaster()

      this.loadedFiles.push(key)
    }
  }

  /**
   * Load audio file specifically for the drumset, which means it doesn't have to be a note.
   * @param {string} fileName The note to load the file for.
   * @param {string|AudioBuffer} [source=null] Optional: If the url is not in a path that follows the conventions
   *     created, the api expects you can simply pass the a AudioBuffer or url for each file after generating them on
   *     your own.
   * @returns {boolean}
   */
  loadFile(fileName, source = null) {
    if (!this.loadedFiles.includes(fileName)) {
      source = source || this.generatePath(fileName)
      this.setPlayer(fileName, source)
      return true
    }
    return false
  }

  /**
   * Plays audio by name.
   * @param {string} fileName
   */
  play(fileName, time = 0) {
    if (this.loadedFiles.includes(fileName)) {
      this.getPlayer(fileName).start('+0.05', 0, '1n', time + 0.05)
    }
  }

  /**
   * @inheritDoc
   */
  toString() {
    return 'drumset'
  }
}


