import {lib}                          from '../Lib'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import Note                           from '../theory/Note'
import {notesInRange, firstToUpper}   from '../utilities'
import {validateRawNote}              from '../validation'
import {InstrumentMixin}              from '../mixins'
// import Players                        from 'tone/Tone/source/Players'
import Tone                           from 'tone'

//TODO Check possibility of using Tone.Sampler instead of Tone.Player to save loading time

/**
 * @class Instrument
 * @abstract
 * @classdesc Represents an abstract instrument with notes.
 * ￿Should be used for creating new instruments.
 */
export default class Instrument {
  constructor() {
    this.notes       = new Map()
    this.players     = Instrument.getTonePlayers()
    this.loadedFiles = []
  }

  /**
   * @returns {Tone.Players}
   */
  static getTonePlayers() {
    return new Tone.Players()
  }

  /**
   * Returns the instrument's name.
   * @type {string}
   */
  static get name() {
    throw new Error('Not implemented for this instrument yet')
  }

  /**
   * The server to load the audio files for the instrument from,
   * can be overridden.
   * @returns {string}
   */
  static get server() {
    return lib.get('path')
  }

  /**
   * Returns string to be used when loading audio files from a specific path.
   * Can be easily over-ridden for a specific intrument by using the lib to set the instruments name.
   * @return {string}
   * @example
   * lib.set('Piano', () => {return 'MyUltimatePiano'}) // Piano will now load audio files from the
   *     server/MyUltimatePiano
   */
  static get instrumentPath() {
    return lib.get(this.name)
  }

  /**
   * Should be called from any child class's constructor.
   * Initializes all the notes and audio players for the instrument.
   * @param base
   * @param range
   * @returns {this}
   */
  init(base, range) {
    Object.entries(notesInRange(base, range)).forEach(([key, {pitchClass, octave}]) => {
      const note = new Note(pitchClass, octave)
      this.notes.set(key, note)
    })
    return this
  }

  /**
   * Trnasforms notes of type '#' to 'b'.
   * @param pitchClass
   * @param classSet
   * @private
   * @returns {String}
   */
  static normalizeSet(pitchClass, classSet) {
    if (classSet === '#') {
      const index = mts.sharpClassNotes.indexOf(pitchClass)
      pitchClass  = mts.flatClassNotes[index]
    }

    const index = mts.flatClassNotes.indexOf(pitchClass)
    return mts.flatClassNotes[index]
  }

  /**
   * Calculates a specific note's key.
   * @param {Note} note
   */
  static getKey({pitchClass, octave, classSet}) {
    return `${Instrument.normalizeSet(pitchClass, classSet)}${octave}`
  }

  /**
   * Turns a string representing a note to upper case.
   * @param noteStr
   * @returns {String}
   */
  static normalizeNoteStr(noteStr) {
    return firstToUpper(noteStr)
  }

  /**
   * Generates Tone player for some audio.
   * @param {*} fileName
   */
  generatePath(fileName) {
    throw new Error('Not implemented for this instrument yet')
  }

  /**
   * Add a player for a note.
   * @param key
   * @param {Note} note
   */
  setPlayer(key, source) {
    if (typeof source === 'string') {
      this.players.add(key, source, () => {
        this.loadedFiles.push(key)
      }).toMaster()
    } else {
      this.players.add(key, source)
      const player   = this.players.get(key)
      player.fadeIn  = .1
      player.fadeOut = .5
      player.toMaster()

      this.loadedFiles.push(key)
    }
  }

  /**
   * Get a note's player.
   * @param {String} key
   * @returns {Tone.Player}
   */
  getPlayer(key) {
    return this.players.get(key)
  }

  /**
   * Gets a string consisting of:
   * 1. The pitch CLASS
   * 2. The octave
   * @param {String} note
   * @returns {Note}
   * @example
   * const C = someInstrument.note('c3') // C is now a Note object
   * console.log(C.interval(2))         // D3
   */
  note(note) {
    return this.notes.get(Instrument.normalizeNoteStr(note))
  }

  /**
   * Whether an instrument has a note.
   * @param {string} note
   * @returns {boolean}
   */
  hasNote(note) {
    return this.notes.has(note)
  }

  /**
   * Returns the key for a raw note.
   * @param {string} rawNote
   * @returns {String}
   */
  static notePipeline(rawNote) {
    validateRawNote(rawNote)
    rawNote = Instrument.normalizeNoteStr(rawNote)
    if (rawNote.includes('#')) {
      const pitchClass = Instrument.normalizeSet(rawNote.slice(0, 2), '#')
      const octave     = rawNote[rawNote.length - 1]
      rawNote          = `${pitchClass}${octave}`
    }
    return rawNote
  }

  /**
   * Play sound, optionally for a duration.
   * @param {string} note
   * @param {string} [duration='3']
   */
  play(rawNote, duration = '3', time = 0) {
    const key = Instrument.notePipeline(rawNote)
    if (!this.loadedFiles.includes(key)) {
      throw new Error('File was not loaded!')
      return false
    }
    const player = this.players.get(key)
    player.start(time + 0.10).stop(`+${duration}`)

    return true
  }

  /**
   * Load audio file for the instrument.
   * @param {string} rawNote The note to load the file for.
   * @param {string|AudioBuffer} [source=null] Optional: If the url is not in a path that follows the conventions
   *     created, the api expects you can simply pass the a AudioBuffer or url for each file after generating them on
   *     your own.
   * @returns {boolean}
   */
  loadFile(rawNote, source = '') {
    const key = Instrument.notePipeline(rawNote)
    if (!this.loadedFiles.includes(key)) {
      const note = this.notes.get(key)
      if (!note) {
        throw new Error('This note does not exist in the instrument')
      }
      source = source || this.generatePath(note)
      this.setPlayer(key, source)
      return true
    }
    return false
  }

  getBuffer(rawNote) {
    const key = Instrument.notePipeline(rawNote)
    return this.players.get(key).buffer
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
