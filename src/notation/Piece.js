import {Measure}      from './Measure'
import {DurationRule} from '../validation/DurationRule'

/**
 * @classdesc Represents a full musical piece consisting of a number of voices.
 */
export class Piece {
    constructor({bpm, timeSignature} = {}) {
        this.timeSignature = timeSignature || [4, 4]
        this.bpm           = bpm || 120
        this.attributes    = {duration: '4n', voices: [[new Measure()]]}
    }

    /**
     * Returns the duration the piece will use when adding a new member to a measure.
     * @returns {string}
     */
    get duration() {
        return this.attributes.duration
    }

    /**
     * Sets the duration for the piece's current measure next data input.
     * @param {string} duration
     */
    set duration(duration) {
        DurationRule.validate(duration)
        this.attributes.duration = duration
    }

    /**
     * Returns an array of voices where each voice represents an instrument.
     * @returns {Array}
     */
    get voices() {
        return this.attributes.voices
    }

    /**
     * Sets the duration for a measure.
     * @param {number} measureIndex The measure index to set the duration to.
     * @param {number} [voiceIndex=0] The voice the measure belongs to.
     */
    setMeasureDuration(measureIndex, voiceIndex = 0) {
        if (this.getMeasure(measureIndex, voiceIndex)) {
            this.getMeasure(measureIndex, voiceIndex).duration = this.duration
        }
    }

    /**
     * Returns the voice at the index if it exists, otherwise returns false.
     * @param {number} [index=0] The voice index.
     * @returns {false|Array}
     */
    getVoice(index = 0) {
        if (this.attributes.voices[index]) {
            return this.attributes.voices[index]
        }
        return false
    }

    /**
     * Adds a new voice to the piece, initialized with one empty measure.
     */
    addVoice() {
        this.voices.push([new Measure()])
    }

    /**
     * Deletes a voice from the piece.
     * @param {number} index The index of the voice to delete.
     * @returns {boolean|Array}
     */
    deleteVoice(index) {
        if (this.voices.length > 1 && this.voices[index]) {
            return this.voices.splice(index, 1)
        }
        return false
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
     */
    addMeasure(index, voiceIndex = 0) {
        if (index === undefined) {
            index = this.getVoice(voiceIndex).length
        }
        this.getVoice(voiceIndex).splice(index, 0, new Measure())
    }

    /**
     * Add a note to a measure in one of the voices.
     * @param {string} note Raw note.
     * @param {number} position Position in the measure to add the note to.
     * @param {number} measureIndex The index of the measure to add the note to.
     * @param {number} [voiceIndex=0] The index of the voice to add the note to.
     * @returns {boolean}
     */
    addNote(note, position, measureIndex, voiceIndex = 0) {
        return this.addOperation('addNote', note, position, measureIndex, voiceIndex)
    }

    /**
     * Add notes to a measure in one of the voices.
     * @param {Array} notes An array of raw note.
     * @param {number} position Position in the measure to add the notes to.
     * @param {number} measureIndex The index of the measure to add the notes to.
     * @param {number} [voiceIndex=0] The index of the voice to add the notes to.
     * @returns {boolean}
     */
    addNotes(notes, position, measureIndex, voiceIndex = 0) {
        return this.addOperation('addNotes', notes, position, measureIndex, voiceIndex)
    }

    /**
     * Private function to handle addition operations for code quality.
     * @private
     */
    addOperation(method, data, position, measureIndex, voice) {
        const measure = this.getMeasure(measureIndex, voice)

        if (measure) {
            measure.duration = this.duration
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
     * Transposes a voice in the piece.
     * @param {number} interval The interval to transpose by.
     * @param {number} voice Index of the voice to transpose.
     */
    transpose(interval, voice) {
        this.voices[voice] = this.voices[voice].map(m => m.transpose(interval))
    }
}
