import {lib}             from '../Lib'
import {InstrumentMixin} from '../mixins'
import Tone              from 'tone'

/**
 * @class Instrument
 * @abstract
 * @classdesc Represents an abstract instrument with notes.
 * ￿Should be used for creating new instruments.
 */
export default class Instrument {
  constructor(name) {
    this._name       = name
    this.loadedFiles = []
    this.players     = Instrument.getPlaybackHandler()
    this.players.toMaster()
    this.players.attack  = 0.05
    this.players.release = 0.3
    return this
  }

  /**
   * Returns a ToneJS playback handler.
   * @param {boolean} [isPlayers=false] Whether to return an instance of Tone Sampler or Players.
   * @returns {Tone.Sampler|Tone.Players}
   */
  static getPlaybackHandler(isPlayers = false) {
    return isPlayers ? new Tone.Players() : new Tone.Sampler()
  }

  /**
   * Returns the instrument's name.
   * @type {string}
   */
  get name() {
    return this._name
  }

  /**
   * Generates Tone player for some audio.
   * @param {*} fileName
   */
  generatePath(note) {
    return `${lib.get('path')}${lib.get(this.name)}/${note}.mp3`
  }

  /**
   * Play sound, optionally for a duration.
   * @param {string} note
   * @param {string} [duration='3']
   */
  play(note, duration = '3', time = 0) {
    if (!this.loadedFiles.length) {
      throw new Error('No file was loaded yet!')
    }

    this.players.triggerAttackRelease(note, `+${duration}`, time)
  }

  /**
   * Load audio file for the instrument.
   * @param {string} note The note to load the file for.
   * @param {string|AudioBuffer} [source=null] Optional: If the url is not in a path that follows the conventions
   *     created, the api expects you can simply pass the a AudioBuffer or url for each file after generating them on
   *     your own.
   * @returns {boolean}
   */
  add(note, source = '') {
    source = source || this.generatePath(note)
    this.players.add(note, source)
    this.loadedFiles.push(note)
    return true
  }

  /**
   * Returns the name of the instrument.
   * @returns {string}
   */
  toString() {
    return ''
  }
}

Object.assign(Instrument.prototype, {...InstrumentMixin})
