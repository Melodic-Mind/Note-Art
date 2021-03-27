import Measure            from './Measure'
import { longestArray }   from '../utilities/GeneralFunctions'
import { InvalidInput }   from '../Exceptions'
import { NOTE_DURATIONS } from '../Constants'

/**
 * @class Score
 * @classdesc Represents a full musical score consisting of a number of voices.
 * @param {number} attributes.bpm=100 The bpm for the score.
 * @param {Array} attributes.timeSignature=[4,4] Time signature for the score.
 * @param {string} attributes.name=my_score Name for the score.
 * @param {Array} voiceNames=[] Array with the names of the voices in the score.
 */
export default class Score {
  constructor ( { bpm = 100, timeSignature = [ 4, 4 ], name = 'my_score', voiceNames = [] } = {} ) {
    this.setTimeSignature( timeSignature )
    const voices = {}
    for ( const name of voiceNames ) {
      voices[name] = []
    }
    this.attributes = { name, bpm, voices }
  }

  /**
   * Returns the maximum size a measure has, calculated using the time signature.
   * @param {Array} timeSignature
   * @throws Error
   * @returns {number}
   */
  static getMeasureSize ( timeSignature ) {
    if ( !Array.isArray( timeSignature ) ) {
      throw new Error( 'time signature must be an array, e.g [4, 4]' )
    }

    const reducedTimeSig = (timeSignature[0] / timeSignature[1]) * 4
    const beatLength     = NOTE_DURATIONS[`${ timeSignature[1] }n`]

    return reducedTimeSig * beatLength * timeSignature[1] / 4
  }

  /**
   * Set the score's time signature.
   * @param timeSignature
   */
  setTimeSignature ( timeSignature ) {
    this.measureSize   = Score.getMeasureSize( timeSignature )
    this.timeSignature = timeSignature
  }

  /**
   * Returns the score name.
   * @returns {string}
   */
  get name () {
    return this.attributes.name
  }

  /**
   * Set the score's name.
   * @param {string} name
   * @throws InvalidInput
   */
  set name ( name ) {
    if ( typeof name != 'string' ) {
      throw new InvalidInput( `Expected name to be a string but got ${ typeof name }` )
    }
    this.attributes.name = name
  }

  /**
   * Get the score's BPM value.
   * @returns {number}
   */
  get bpm () {
    return this.attributes.bpm
  }

  /**
   * Set the score's BPM value.
   * @param bpm
   * @throws InvalidInput
   */
  set bpm ( bpm ) {
    if ( typeof bpm != 'number' ) {
      throw new InvalidInput( `Expected bpm to be a number but got ${ typeof name }` )
    }
    this.attributes.bpm = bpm
  }

  /**
   * Returns an object with the scores voices.
   * @returns {Array}
   */
  get voices () {
    return this.attributes.voices
  }

  /**
   * Returns the length of the score as the length if it's longest voice.
   * The format is 'MM:QQ:SS' - Measures:Quarter-notes:Sixteenth-notes
   * @returns {0|string}
   */
  get length () {
    let longestVoice = longestArray( Object.values( this.voices ) )
    return longestVoice.length ?
           `${ longestVoice.length - 1 }:0:${ longestVoice[longestVoice.length - 1].length }` : 0
  }

  /**
   * Returns the voice with name.
   * If the voice doesn't exist it throws an error.
   * @param {string} name The voice name.
   * @throws InvalidInput
   * @returns {Array|undefined}
   */
  getVoice ( voiceName ) {
    const voice = this.voices[voiceName]
    if ( !voice ) {
      throw new InvalidInput( `the voice name ${ voiceName } does not exist!` )
    }
    return voice
  }

  /**
   * Adds a voice to the score.
   *
   * @param {string} voiceName The voice's name.
   * @param {data} data=[] An array of measures.
   */
  addVoice ( voiceName, voiceData = [] ) {
    this.voices[voiceName] = voiceData
  }

  /**
   * Deletes a voice from the score.
   * @throws Error
   * @param {string} voiceName The name of the voice to delete.
   * @returns {boolean}
   */
  deleteVoice ( voiceName ) {
    return (delete this.voices[voiceName])
  }

  /**
   * Returns a measure from a voice
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The index of the measure.
   */
  getMeasure ( voiceName, measureIndex ) {
    return this.getVoice( voiceName )[measureIndex]
  }

  /**
   * Add measure to a voice at an index.
   * If no data object is sent it simply adds an empty measure to the end of the voice.
   * @param {string} voiceName The voice name.
   * @param {Object} data
   * @param {Measure} data.measure=new Measure() The measure to add.
   * @param {Number} data.index=voice.length Index to add the measure at.
   */
  addMeasure ( voiceName, { measure, index } = {} ) {
    const voice = this.getVoice( voiceName )
    index       = index || voice.length
    measure     = measure instanceof Measure ? measure : new Measure( this.measureSize )
    voice.splice( index, 0, measure )
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
  addNote ( voiceName, measureIndex, position, { note, duration } ) {
    return this.addOperation( 'addNote', voiceName, measureIndex, position, { note, duration } )
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
  addNotes ( voiceName, measureIndex, position, { notes, duration } ) {
    return this.addOperation( 'addNotes', voiceName, measureIndex, position, { notes, duration } )
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
  addChord ( voiceName, measureIndex, position, { notes, name, duration } ) {
    return this.addOperation( 'addChord', voiceName, measureIndex, position, { notes, name, duration } )
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
  addOperation ( operation, voiceName, measureIndex, position, data ) {
    const measure = this.getMeasure( voiceName, measureIndex )

    return measure ? measure[operation]( data, position ) : false
  }

  /**
   * Delete note from measure.
   * @param {number} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {string} note Note to delete.
   * @returns {boolean}
   */
  deleteNote ( voiceName, measureIndex, position, note ) {
    return this.deleteOperation( 'deleteNote', voiceName, measureIndex, position, note )
  }

  /**
   * Delete notes from measure.
   * @param {number} voiceName The voice name.
   * @param {number} measureIndex The measure's index.
   * @param {number} position Position in the measure.
   * @param {Array} notes Array of notes to delete.
   * @returns {boolean}
   */
  deleteNotes ( voiceName, measureIndex, position, notes ) {
    return this.deleteOperation( 'deleteNotes', voiceName, measureIndex, position, notes )
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
  deleteOperation ( operation, voiceName, measureIndex, position, data ) {
    const m = this.getMeasure( voiceName, measureIndex )
    return m ? m[operation]( data, position ) : false
  }

  /**
   * Deletes
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @param {number} position Position in the measure.
   * @returns {*|boolean}
   */
  deleteMember ( voiceName, measureIndex, position ) {
    const m = this.getMeasure( voiceName, measureIndex )
    return m ? m.deleteMember( position ) : false
  }

  /**
   * Clears a measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}
   */
  clearMeasure ( voiceName, measureIndex ) {
    const m = this.getMeasure( voiceName, measureIndex )
    return m ? m.clear() : false
  }

  /**
   * Deletes a measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}
   */
  deleteMeasure ( voiceName, measureIndex ) {
    if ( this.getMeasure( voiceName, measureIndex ) ) {
      return this.voices[voiceName].splice( measureIndex, 1 )
    }
    return false
  }

  /**
   * Clones a measure inside a voice and adds the clone next to the original measure.
   * @param {string} voiceName The voice name.
   * @param {number} measureIndex The measure index.
   * @returns {boolean}`
   */
  cloneMeasure ( voiceName, measureIndex ) {
    const m = this.getMeasure( voiceName, measureIndex )
    if ( m ) {
      const clone = m.clone()
      this.voices[voiceName].splice( measureIndex, 0, clone )
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
  transposeMeasure ( voiceName, measureIndex, interval ) {
    const m = this.getMeasure( voiceName, measureIndex )
    if ( m ) {
      const transposedMeasure = m.transpose( interval )
      this.voices[voiceName].splice( measureIndex, 1, transposedMeasure )
      return true
    }

    return false
  }

  /**
   * Transposes a voice in the score.
   * @param {string} voiceName The voice name.
   * @param {number} interval The interval to transpose by.
   */
  transpose ( voiceName, interval ) {
    this.voices[voiceName] = this.voices[voiceName].map( m => m.transpose( interval ) )
  }
}
