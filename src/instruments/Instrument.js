import {lib}                          from '../Lib'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {Note}                         from '../theory'
import {notesInRange, firstToUpper}   from '../utilities'
import {validateRawNote}              from '../validation'
import {InstrumentMixin}              from '../mixins'
import Players                        from 'Tone/source/Players'

//TODO Check possibility of using Tone.Sampler instead of Tone.Player to save loading time

/**
 * @class Instrument
 * @abstract
 * @classdesc Represents an abstract instrument with notes.
 */
export default class Instrument {
  constructor() {
    this.notes   = new Map()
    this.players = Instrument.getTonePlayers()
  }

  /**
   * @returns {Tone.Players}
   */
  static getTonePlayers() {
    return new Players()
  }

  /**
   * Connects audio node to master.
   * @param context File context instance.
   */
  static toMaster(context) {
    context.toMaster()
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
   * Can be easily over-riden for a specific intrument by using the lib to set the instruments name.
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
   */
  init(base, range) {
    Object.entries(notesInRange(base, range)).forEach(([key, {pitchClass, octave}]) => {
      const note = new Note(pitchClass, octave)
      this.notes.set(key, note)
      this.setPlayer(key, note)
    })
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
   * Generates player for some audio.
   * @param {String} fileName
   */
  generatePath(fileName) {
    throw new Error('Not implemented for this instrument yet')
  }

  /**
   * Add a player for a note.
   * @param key
   * @param {Note} note
   */
  setPlayer(key, note) {
    const context = this.generatePath(note)
    this.players.add(key, context)
    Instrument.toMaster(this.players.get(key))
  }

  /**
   * Get a note's player.
   * @param {String} note
   * @returns {Tone.Player}
   */
  getPlayer(note) {
    return this.players.get(Instrument.getKey(this.notes.get(note)))
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

  static notePipeline(note) {
    validateRawNote(note)
    note = Instrument.normalizeNoteStr(note)
    if (note.includes('#')) {
      const pitchClass = Instrument.normalizeSet(note.slice(0, 2), '#')
      const octave     = note[note.length - 1]
      note             = `${pitchClass}${octave}`
    }
    return note
  }

  /**
   * Play sound, optionally for a duration.
   * @param {string} note
   * @param {string} [duration='10']
   */
  play(note, duration = '10') {
    note = Instrument.notePipeline(note)
    if (this.hasNote(note)) {
      this.getPlayer(note).start().stop(`+${duration}`)
    }
  }
}

Object.assign(Instrument.prototype, {...InstrumentMixin})
