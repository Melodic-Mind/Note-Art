import {Constants } from '../resources/Constants'
import Measure            from './Measure'
import {DurationRule}     from '../validation'
import {longestArray}     from '../utilities/GeneralFunctions'

/**
 * @class Score
 * @classdesc Represents a full musical score consisting of a number of voices.
 * @param {number} [attributes.bpm=100] The bpm for the score.
 * @param {Array} [attributes.timeSignature=[4,4]] Time signature for the score.
 * @param {string} [attributes.name=my_score] Name for the score.
 */
export default class Score {
  constructor({bpm = 100, timeSignature = [4, 4], name = 'my_score', numberOfVoices = 1} = {}) {
    this.setTimeSignature(timeSignature)
    const voices = []
    for (let i = 0; i < numberOfVoices; ++i) {
      voices.push([])
    }
    this.attributes = {name, bpm, duration: '4n', voices}
  }

  /**
   * Returns the maximum size a measure has, calculated using the time signature.
   * @param {Array} timeSignature
   * @throws Error
   * @returns {number}
   */
  static getMeasureSize(timeSignature) {
    if (!Array.isArray(timeSignature)) {
      throw new Error('time signature must be an array, e.g [4, 4]')
    }

    const reducedTimeSig = (timeSignature[0] / timeSignature[1]) * 4
    const beatLength     = Constants.noteDurations[`${timeSignature[1]}n`]

    return reducedTimeSig * beatLength * timeSignature[1] / 4
  }

  /**
   * Set the score's time signature.
   * @param timeSignature
   */
  setTimeSignature(timeSignature) {
    this.measureSize   = Score.getMeasureSize(timeSignature)
    this.timeSignature = timeSignature
  }

  /**
   * Returns the duration the score will use when adding a new member to a measure.
   * @returns {string}
   */
  get duration() {
    return this.attributes.duration
  }

  /**
   * Sets the duration for the score's current measure next data input.
   * @param {string} duration
   */
  set duration(duration) {
    DurationRule.validate(duration)
    this.attributes.duration = duration
  }

  /**
   * Returns the score name.
   * @returns {string}
   */
  get name() {
    return this.attributes.name
  }

  /**
   * Set the score's name.
   * @param {string} name
   */
  set name(name) {
    this.attributes.name = name
  }

  /**
   * Get the score's BPM value.
   * @returns {number}
   */
  get bpm() {
    return this.attributes.bpm
  }

  /**
   * Set the score's BPM value.
   * @param bpm
   */
  set bpm(bpm) {
    if (typeof bpm === 'number') {
      this.attributes.bpm = bpm
    }
  }

  /**
   * Returns an array of voices where each voice represents an instrument.
   * @returns {Array}
   */
  get voices() {
    return this.attributes.voices
  }

  get length() {
    let longestVoice = longestArray(this.voices)
    const measure = Math.max(...this.voices.map(voice => voice.length))
    // const
    return `${longestVoice}m`
  }

  /**
   * Sets the duration for a measure.
   * @param {number} measureIndex The measure index to set the duration to.
   * @param {number} [voiceIndex=0] The voice the measure belongs to.
   */
  setMeasureDuration(measureIndex, voiceIndex = 0) {
    if (this.getMeasure(measureIndex, voiceIndex)) {
      this.getMeasure(measureIndex, voiceIndex).duration = this.duration
      return true
    }

    return false
  }

  /**
   * Returns the voice at the index, starts from voice 0.
   * If the voice doesn't exist it returns false.
   * @param {number} [index=1] The voice index.
   * @returns {Array|false}
   */
  getVoice(index = 0) {
    if (this.attributes.voices[index]) {
      return this.attributes.voices[index]
    }

    return false
  }

  getVoiceDuration(index = 0){
    const m = this.voices[index].length
  }

  /**
   * Adds a voice to the score.
   *
   * @param {number} position Position to add the voice in the score to.
   * @param {Array} [voice=false] An array of measures, defaults to an array with one empty measure.
   */
  addVoice(position, voice) {
    this.voices.splice(position, 0, voice || [])
  }

  /**
   * Deletes a voice from the score.
   * @throws Error
   * @param {number} index The index of the voice to delete.
   * @returns {Array}
   */
  deleteVoice(index) {
    if (this.voices.length > 1 && this.voices[index]) {
      return this.voices.splice(index, 1)
    }

    throw new Error('This score does not have a ${index} voice')
  }

  /**
   * Returns a measure from a voice
   * @param {number} measureIndex The index of the measure.
   * @param {number} [voiceIndex=0] The index of the voice that the measure belongs to.
   */
  getMeasure(measureIndex, voiceIndex = 0) {
    return this.voices[voiceIndex][measureIndex]
  }

  /**
   * Add measure to a voice at an index.
   * @param {number} index Index to add the measure at.
   * @param {number} [voiceIndex=0] The index of the voice.
   * @param {Measure} [measure=null] Measure to add.
   */
  addMeasure(index, voiceIndex = 0, measure = null) {
    if (index === undefined) {
      index = this.getVoice(voiceIndex).length
    }

    let newMeasure
    if (measure && measure instanceof Measure) {
      newMeasure = measure
    } else {
      newMeasure = new Measure(this.measureSize)
    }

    this.getVoice(voiceIndex).splice(index, 0, newMeasure)
  }

  /**
   * Add a note to a measure in one of the voices.
   * @param {string} data.note Raw note.
   * @param {string} [data.duration=measure.duration]
   * @param {number} position Position in the measure to add the note to.
   * @param {number} measureIndex The index of the measure to add the note to.
   * @param {number} [voiceIndex=0] The index of the voice to add the note to.
   * @returns {boolean}
   */
  addNote({note, duration}, position, measureIndex, voiceIndex = 0) {
    return this.addOperation('addNote', {note, duration}, position, measureIndex, voiceIndex)
  }

  /**
   * Add notes to a measure in one of the voices.
   * @param {obj.Array} notes An array of raw note.
   * @param {obj.string} [duration=measure.duration]
   * @param {number} position Position in the measure to add the notes to.
   * @param {number} measureIndex The index of the measure to add the notes to.
   * @param {number} [voiceIndex=0] The index of the voice to add the notes to.
   * @returns {boolean}
   */
  addNotes({notes, duration}, position, measureIndex, voiceIndex = 0) {
    return this.addOperation('addNotes', {notes, duration}, position, measureIndex, voiceIndex)
  }

  /**
   * Add notes to a measure in one of the voices with a name for representing a chord.
   * @param {obj.Array} notes An array of raw note.
   * @param {obj.name} name Name of the chord.
   * @param {obj.string} [duration=measure.duration]
   * @param {number} position Position in the measure to add the notes to.
   * @param {number} measureIndex The index of the measure to add the notes to.
   * @param {number} [voiceIndex=0] The index of the voice to add the notes to.
   * @returns {boolean}
   */
  addChord({notes, name, duration}, position, measureIndex, voiceIndex = 0) {
    return this.addOperation('addChord', {notes, name, duration}, position, measureIndex, voiceIndex)
  }

  /**
   * Private function to handle addition operations for code quality.
   * @private
   */
  addOperation(method, data, position, measureIndex, voice) {
    const measure = this.getMeasure(measureIndex, voice)

    if (measure) {
      return measure[method](data, position)
    }

    return false
  }

  /**
   * Delete a note from a measure in one of the voices.
   * @param {string} note Raw note.
   * @param {number} position Position in the measure to add the note to.
   * @param {number} measureIndex The index of the measure to add the note to.
   * @param {number} [voiceIndex=0] The index of the voice to add the note to.
   * @returns {boolean}
   */
  deleteNote(note, position, measureIndex, voiceIndex = 0) {
    return this.deleteOperation('deleteNote', note, position, measureIndex, voiceIndex)
  }

  /**
   * Delete notes from a measure in one of the voices.
   * @param {Array} notes An array of raw note.
   * @param {number} position Position in the measure to add the notes to.
   * @param {number} measureIndex The index of the measure to add the notes to.
   * @param {number} [voiceIndex=0] The index of the voice to add the notes to.
   * @returns {boolean}
   */
  deleteNotes(notes, position, measureIndex, voiceIndex = 0) {
    return this.deleteOperation('deleteNotes', notes, position, measureIndex, voiceIndex)
  }

  /**
   * Private function to handle deletion operations for code quality.
   * @private
   */
  deleteOperation(operation, data, position, measure, voice) {
    if (this.getMeasure(measure, voice)) {
      return this.getMeasure(measure, voice)[operation](data, position)
    }

    return false
  }

  deleteMember(position, measure, voice = 0) {
    if (this.getMeasure(measure, voice)) {
      return this.getMeasure(measure, voice).deleteMember(position)
    }

    return false
  }

  /**
   * Clears a measure.
   * @param {number} measureIndex The index of the measure to clear.
   * @param {number} [voiceIndex=0] The index of the voice the measure belongs to.
   * @returns {boolean}
   */
  clearMeasure(measureIndex, voiceIndex = 0) {
    if (this.getMeasure(measureIndex, voiceIndex)) {
      return this.getMeasure(measureIndex, voiceIndex).clear()
    }

    return false
  }

  /**
   * Deletes a measure.
   * @param {number} measureIndex The index of the measure to delete.
   * @param {number} [voiceIndex=0] The index of the voice the measure belongs to.
   * @returns {boolean}
   */
  deleteMeasure(measureIndex, voiceIndex = 0) {
    if (this.getMeasure(measureIndex, voiceIndex)) {
      return this.voices[voiceIndex].splice(measureIndex, 1)
    }

    return false
  }

  /**
   * Clones a measure inside a voice and adds the clone next to the original measure.
   * @param {number} measureIndex The index of the measure to clone.
   * @param {number} [voiceIndex=0] The index of the voice the measure belongs to.
   * @returns {boolean}
   */
  cloneMeasure(measureIndex, voiceIndex = 0) {
    if (this.getMeasure(measureIndex, voiceIndex)) {
      const clone = this.getMeasure(measureIndex, voiceIndex).clone()
      this.voices[voiceIndex].splice(measureIndex, 0, clone)
      return true
    }

    return false
  }

  /**
   * Transposes a voice in the score.
   * @param {number} interval The interval to transpose by.
   * @param {number} voice Index of the voice to transpose.
   */
  transpose(interval, voice) {
    this.voices[voice] = this.voices[voice].map(m => m.transpose(interval))
  }
}
