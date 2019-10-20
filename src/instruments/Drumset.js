import Instrument from './Instrument'

/**
 * @class Drumset
 * @extends Instrument
 * @classdesc Drumset for playing files which aren't represented as notes.
 */
export default class Drumset extends Instrument {
  constructor() {
    super()
    this.notes = null
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
   * @returns {Tone.Player}
   * @param fileName
   */
  getPlayer(fileName) {
    return this.players.get(fileName)
  }

  /**
   * Load audio file specifically for the drumset, which means it doesn't have to be a note.
   * @param {string} rawNote The note to load the file for.
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
  play(fileName) {
    if (this.loadedFiles.includes(fileName)) {
      this.getPlayer(fileName).start()
    }
  }

  /**
   * @inheritDoc
   */
  toString() {
    return 'drumset'
  }
}


