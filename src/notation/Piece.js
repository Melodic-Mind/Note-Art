import {Measure}      from './Measure'
import {DurationRule} from '../validation/DurationRule'

export class Piece {
    constructor({bpm, timeSignature} = {}) {
        this.timeSignature     = timeSignature || [4, 4]
        this.bpm               = bpm || 120
        this.attributes        = {duration: '4n', voices: [[new Measure()]]}
    }

    get duration() {
        return this.attributes.duration
    }

    set duration(duration) {
        DurationRule.validate(duration)
        this.attributes.duration = duration
    }

    get voices() {
        return this.attributes.voices
    }

    setMeasureDuration(measure, voice = 0) {
        if (this.getMeasure(measure, voice)) {
            this.getMeasure(measure, voice).duration = this.duration
        }
    }

    getVoice(voice = 0) {
        if (this.attributes.voices[voice]) {
            return this.attributes.voices[voice]
        }
        return false
    }

    addVoice() {
        this.voices.push([new Measure()])
    }

    deleteVoice(voice) {
        if (this.voices.length > 1 && this.voices[voice]) {
            return this.voices.splice(voice, 1)
        }
        return false
    }

    getMeasure(measure, voice = 0) {
        return this.voices[voice][measure]
    }

    addMeasure(index, voice = 0) {
        if (index === undefined) {
            index = this.getVoice(voice).length
        }
        this.getVoice(voice).splice(index, 0, new Measure())
    }

    addNote(note, position, measureIndex, voice = 0) {
        return this.addOperation('addNote', note, position, measureIndex, voice)
    }

    addNotes(notes, position, measureIndex, voice = 0) {
        return this.addOperation('addNotes', notes, position, measureIndex, voice)
    }

    addOperation(method, data, position, measureIndex, voice) {
        const measure = this.getMeasure(measureIndex, voice)

        if (measure) {
            measure.duration = this.duration
            return measure[method](data, position)
        }
        return false
    }

    deleteNote(note, position, measure, voice = 0) {
        return this.deleteOperation('deleteNote', note, position, measure, voice)
    }

    deleteNotes(notes, position, measure, voice = 0) {
        return this.deleteOperation('deleteNotes', notes, position, measure, voice)
    }

    deleteOperation(operation, data, position, measure, voice) {
        if (this.getMeasure(measure, voice)) {
            return this.getMeasure(measure, voice)[operation](data, position)
        }
        return false
    }

    clearMeasure(measure, voice = 0) {
        if (this.getMeasure(measure, voice)) {
            return this.getMeasure(measure, voice).clear()
        }
        return false
    }

    deleteMeasure(measure, voice = 0) {
        if (this.getMeasure(measure, voice)) {
            return this.voices[voice].splice(measure, 1)
        }
        return false
    }

    cloneMeasure(measure, voice = 0) {
        if (this.getMeasure(measure, voice)) {
            const clone = this.getMeasure(measure, voice).clone()
            this.voices[voice].splice(measure, 0, clone)
            return true
        }
        return false
    }

    transpose(interval, voice = 0) {
        this.voices[voice] = this.voices[voice].map(m => m.transpose(interval))
    }
}
