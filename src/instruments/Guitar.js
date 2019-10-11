import {InstrumentMixin} from '../mixins'
import Instrument        from './Instrument'
import Cord              from './Cord'

/**
 * @class Guitar
 * @classdesc Represents a guitar which can play notes, individually or strum them together
 * using different input methods.
 * This guitar uses all the audio files from the note-art server,
 * if you wish to create a different guitar you can do so easily by using the template below
 * with your number of cords, their ranges, etc.
 */
export default class Guitar {
  constructor() {
    this._cords = [
      new Cord('E4', 19, 1),
      new Cord('B3', 16, 2),
      new Cord('G3', 15, 3),
      new Cord('D3', 16, 4),
      new Cord('A2', 16, 5),
      new Cord('E2', 16, 6),
    ]
  }

  get cords() {
    return this._cords
  }

  /**
   * Plays a single note on a specific string for some duration.
   * @param {string} cord Cord to play.
   * @param {string} note Note to play.
   * @param {string} duration duration to play the note for.
   */
  playCord(cord, note, duration) {
    this.cords[cord].play(note, duration)
  }

  /**
   *
   * @param {Object} cordsAndNotes Object which contains string and notes to play.
   * @param duration Duration to play for.
   * @example
   * const cordsAndNotes = {1: 'E4', 2: 'C4'}
   * guitarInstance.play(cordsAndNotes, '4n')   //notes are played.
   */
  playMultiple(cordsAndNotes, duration) {
    Object.entries(cordsAndNotes).forEach(([string, note]) => {
          this.playCord(string, note, duration)
        },
    )
  }

  /**
   * Play Helper, should not be called!
   * @param {function} method Method to invoke.
   * @param {string} rawNote
   * @param {string} duration
   * @private
   * @returns {*}
   */
  playHelper(method, rawNote, duration) {
    rawNote = Instrument.notePipeline(rawNote)
    for (let i = 0; i < this.cords.length; ++i) {
      if (this.cords[i].hasNote(rawNote)) {
        return this.cords[i][method](rawNote, duration)
      }
    }
    return false
  }

  /**
   * Load a note for any string that contains that note.
   * @param {number} cord Cord to load the file for.
   * @param {string} rawNote The note
   * @param {string|AudioBuffer} source The source for the file as a string or a AudioBuffer.
   */
  loadFile(cord, rawNote, source = null) {
    for (let i = 0; i < this.cords.length; ++i) {
      if (this.cords[i].hasNote(rawNote)) {
        this.cords[i].loadFile(rawNote, source)
      }
    }
  }

  /**
   * Syncs a note to the transport with a duration.
   * @param {string} note
   * @param {string} duration duration to play the note for.
   */
  play(note, duration = '100') {
    return this.playHelper('play', note, duration)
  }

  /**
   * Strums the guitar's cords using guitar pattern(low to high).
   * @param {Array} pattern pattern to strum
   * @param {string} duration duration to play the note for.
   * @example
   * guitarInstance.strum(['x', 0, 2, 2, 1, 0], '8n') //Plays Am chord.
   * guitarInstance.strum([3, 2, 0, 0, 3, 3], '8n') //Plays G chord.
   */
  strum(pattern, duration) {
    pattern.forEach((fret, index) => {
      if (fret !== 'x') {
        index      = 5 - index
        const note = this.cords[index].fret(fret)
        this.playCord(index.toString(), note, duration)
      }
    })
  }

  /**
   * Returns the name of the instrument.
   * @returns {string}
   */
  toString() {
    return 'guitar'
  }
}

Object.assign(Guitar.prototype, {...InstrumentMixin})
