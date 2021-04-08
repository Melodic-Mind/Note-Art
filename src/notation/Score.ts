import Measure, { MeasureData } from './Measure'
import { longestArray } from '../utilities/GeneralFunctions'
import { InvalidInput } from '../Exceptions'
import { NOTE_DURATIONS_AS_SIZE_IN_MEASURE } from '../Constants'

interface ScoreProps {
  name?: string;
  voiceNames?: Array<string>;
  bpm?: number;
  timeSignature?: Array<number>;
}

/**
 * @class Score
 * @classdesc Represents a full musical score consisting of a number of voices.
 * @param {number} attributes.bpm=100 The bpm for the score.
 * @param {Array} attributes.timeSignature=[4,4] Time signature for the score.
 * @param {string} attributes.name=my_score Name for the score.
 * @param {Array} voiceNames=[] Array with the names of the voices in the score.
 */
export default class Score {
  measureSize: number
  timeSignature: Array<number>

  constructor({ bpm, timeSignature, name, voiceNames = [] }: ScoreProps = {}) {
    this._name = name || 'my_score'
    this._bpm  = bpm || 100

    const voices: { [key: string]: Array<Measure> } = {}
    for(const name of voiceNames) {
      voices[name] = []
    }
    this._voices = voices

    this.timeSignature = timeSignature || [4, 4]
    this.measureSize   = Score.getMeasureSize(this.timeSignature)
  }

  _name: string

  /**
   * Returns the score name.
   * @returns {string}
   */
  get name() {
    return this._name
  }

  /**
   * Set the score's name.
   * @param {string} name
   * @throws InvalidInput
   */
  set name(name: string) {
    this._name = name
  }

  _bpm: number

  /**
   * Get the score's BPM value.
   * @returns {number}
   */
  get bpm() {
    return this._bpm
  }

  /**
   * Set the score's BPM value.
   * @param bpm
   * @throws InvalidInput
   */
  set bpm(bpm) {
    this._bpm = bpm
  }

  _voices: { [key: string]: Array<Measure> }

  /**
   * Returns an object with the scores voices.
   * @returns {Array}
   */
  get voices() {
    return this._voices
  }

  /**
   * Returns the length of the score as the length if it's longest voice.
   * The format is 'MM:QQ:SS' - Measures:Quarter-notes:Sixteenth-notes
   * @returns {string}
   */
  get length() {
    const voicesData = Object.values(this.voices)
    if(voicesData.length) {
      const longestVoice = longestArray(voicesData)
      return `${ longestVoice.length - 1 }:0:${ longestVoice[longestVoice.length - 1].length }`
    }
    return '0:0:0'
  }

  /**
   * Returns the maximum size a measure has, calculated using the time signature.
   * @param {Array} timeSignature
   * @throws Error
   * @returns {number}
   */
  static getMeasureSize(timeSignature: Array<number>) {
    if( !Array.isArray(timeSignature)) {
      throw new Error('time signature must be an array, e.g [4, 4]')
    }

    const reducedTimeSig = (timeSignature[0] / timeSignature[1]) * 4
    const beatLength     = NOTE_DURATIONS_AS_SIZE_IN_MEASURE[`${ timeSignature[1] }n`]

    return reducedTimeSig * beatLength * timeSignature[1] / 4
  }

  static stringToScore(str: string) {
    const [name, bpm, timeSig, voiceNames] = str.split('___')

    const timeSignature = timeSig.split(',').map(num => parseInt(num))

    const score = new Score({
      name,
      timeSignature,
      bpm: parseFloat(bpm)
    })

    const voices              = voiceNames.split('_v_').map(voice => voice.split('_d_'))
    const maxDuration: number = Score.getMeasureSize(timeSignature)

    voices.forEach(([voiceName, voiceData]) => {
      score.addVoice(voiceName)
      voiceData.split('_m_').forEach((str: string, measureIndex: number) => {
        const measure = Measure.stringToMeasure({ str, maxDuration })
        score.addMeasure(voiceName, { index: measureIndex, measure })
      })
    })

    return score
  }

  /**
   * Set the score's time signature.
   * @param timeSignature
   */
  setTimeSignature(timeSignature: Array<number>) {
    this.measureSize   = Score.getMeasureSize(timeSignature)
    this.timeSignature = timeSignature
  }

  /**
   * Returns the voice with name.
   * If the voice doesn't exist it throws an error.
   * @throws InvalidInput
   * @returns {Array|undefined}
   * @param voiceName
   */
  getVoice(voiceName: string) {
    const voice: Array<Measure> = this.voices[voiceName]
    if( !voice) {
      throw new InvalidInput(`the voice name ${ voiceName } does not exist!`)
    }
    return voice
  }

  /**
   * Adds a voice to the score.
   *
   * @param {string} voiceName The voice's name.
   * @param {data} voiceData=[] An array of measures.
   */
  addVoice(voiceName: string, voiceData: Array<Measure> = []) {
    this.voices[voiceName] = voiceData
  }

  /**
   * Deletes a voice from the score.
   * @throws Error
   * @param {string} voiceName The name of the voice to delete.
   * @returns {boolean}
   */
  deleteVoice(voiceName: string) {
    return (delete this.voices[voiceName])
  }

  /**
   * Returns a measure from a voice
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The index of the measure.
   */
  getMeasure(voiceName: string, measureIndex: number) {
    return this.getVoice(voiceName)[measureIndex]
  }

  /**
   * Add measure to a voice at an index.
   * If no data object is sent it simply adds an empty measure to the end of the voice.
   * @param {string} voiceName The voice name.
   * @param {Object} data
   * @param {Measure} data.measure=new Measure() The measure to add.
   * @param {Number} data.index=voice.length Index to add the measure at.
   */
  addMeasure(voiceName: string, { measure, index }: { measure?: Measure, index?: number } = {}) {
    const voice = this.getVoice(voiceName)
    index       = index || voice.length
    measure     = measure instanceof Measure ? measure : new Measure(this.measureSize)
    voice.splice(index, 0, measure)
  }

  /**
   * Add note to measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Object} data
   * @param {string} data.note Raw note.
   * @param {string} data.duration Duration of the note.
   * @returns {boolean}
   */
  addNote(voiceName: string, measureIndex: number, position: number, {
    note,
    duration
  }: { note: string, duration: string }) {
    return this.addOperation('addNote', voiceName, measureIndex, position, { note, duration })
  }

  /**
   * Add notes to measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Object} data
   * @param {Array} data.notes An array of notes.
   * @param {string} data.duration Duration of the note.
   * @returns {boolean}
   */
  addNotes(voiceName: string, measureIndex: number, position: number, { notes, duration }: MeasureData) {
    return this.addOperation('addNotes', voiceName, measureIndex, position, { notes, duration })
  }

  /**
   * Add chord to measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Object} data
   * @param {Array} data.notes An array of notes.
   * @param {string} data.duration Duration of the note.
   * @param {name} data.name Name of the chord.
   * @returns {boolean}
   */
  addChord(voiceName: string, measureIndex: number, position: number, { notes, name, duration }: MeasureData) {
    return this.addOperation('addChord', voiceName, measureIndex, position, { notes, name, duration })
  }

  /**
   * Private function to handle addition operations.
   * Should not be called.
   * @param {string} operation Operation to execute.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Object} data
   * @returns {boolean}
   * @private
   */
  addOperation(operation: string, voiceName: string, measureIndex: number, position: number, data: Object) {
    const measure = this.getMeasure(voiceName, measureIndex)

    return measure ? measure[operation](data, position) : false
  }

  /**
   * Delete note from measure.
   * @param {number} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {string} note Note to delete.
   * @returns {boolean}
   */
  deleteNote(voiceName: string, measureIndex: number, position: number, note: string) {
    return this.deleteOperation('deleteNote', voiceName, measureIndex, position, note)
  }

  /**
   * Delete notes from measure.
   * @param {number} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Array} notes Array of notes to delete.
   * @returns {boolean}
   */
  deleteNotes(voiceName: string, measureIndex: number, position: number, notes: Array<string>) {
    return this.deleteOperation('deleteNotes', voiceName, measureIndex, position, notes)
  }

  /**
   * Private function to handle deletion operations.
   * Should not be called.
   * @param {string} operation Operation to execute.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Object} data
   * @returns {boolean}
   * @private
   */
  deleteOperation(operation: string, voiceName: string, measureIndex: number, position: number, data: Object) {
    const m = this.getMeasure(voiceName, measureIndex)
    return m ? m[operation](data, position) : false
  }

  /**
   * Deletes
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @param {number} position Position in the measure.
   * @returns {*|boolean}
   */
  deleteMember(voiceName: string, measureIndex: number, position: number) {
    const m = this.getMeasure(voiceName, measureIndex)
    return m ? m.deleteMember(position) : false
  }

  /**
   * Clears a measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}
   */
  clearMeasure(voiceName: string, measureIndex: number) {
    const m = this.getMeasure(voiceName, measureIndex)
    return m ? m.clear() : false
  }

  /**
   * Deletes a measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}
   */
  deleteMeasure(voiceName: string, measureIndex: number) {
    if(this.getMeasure(voiceName, measureIndex)) {
      return this.voices[voiceName].splice(measureIndex, 1)
    }
    return false
  }

  /**
   * Clones a measure inside a voice and adds the clone next to the original measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}`
   */
  cloneMeasure(voiceName: string, measureIndex: number) {
    const m = this.getMeasure(voiceName, measureIndex)
    if(m) {
      const clone = m.clone()
      this.voices[voiceName].splice(measureIndex, 0, clone)
      return true
    }

    return false
  }

  /**
   * Transpose a measure in one of the voices.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @param {number} interval The interval to transpose by.
   * @returns {boolean}
   */
  transposeMeasure(voiceName: string, measureIndex: number, interval: number) {
    const m = this.getMeasure(voiceName, measureIndex)
    if(m) {
      const transposedMeasure = m.transpose(interval)
      this.voices[voiceName].splice(measureIndex, 1, transposedMeasure)
      return true
    }

    return false
  }

  /**
   * Transposes a voice in the score.
   * @param {string} voiceName The voice name.
   * @param {number} interval The interval to transpose by.
   */
  transpose(voiceName: string, interval: number) {
    this.voices[voiceName] = this.voices[voiceName].map(m => m.transpose(interval))
  }

  toString() {
    const voices = Object.entries(this.voices)
      .map(([voiceName, voiceData]) =>
        `${ voiceName }_d_${ voiceData.map(measure => measure.toString()).join('_m_') }`
      )
      .filter(el => el !== '')
      .join('_v_')

    return `${ this.name }___${ this.timeSignature }___${ this.bpm }___${ voices }`
  }
}
