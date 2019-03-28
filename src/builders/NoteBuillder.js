import {firstToUpper, app, MusicTheoryStructures as mts, PlayableNote, Note} from '..'
import {PianoOctaveRule}                                                     from '../validation/PianoOctaveRule'

export class NoteBuilder {
    constructor(raw = {}) {
        this.attributes = {pitchClass: 'C', octave: 3, duration: '4n', instrument: 'Piano'}
        this.pitchClass(raw.pitchClass)
            .octave(raw.octave)
            .duration(raw.duration)
            .instrument(raw.instrument)
    }

    octave(value) {
        if (PianoOctaveRule.validateAudible(value, this.attributes.note)) {
            this.attributes.octave = value
        }
        return this
    }

    duration(value) {
        if (Object.keys(mts.noteDurations).includes(value)) {
            this.attributes.duration = value
        }
        return this
    }

    pitchClass(value) {
        if (typeof value === 'string') {
            value = firstToUpper(value)
        }
        if (mts.pitchClasses.includes(value)) {
            this.attributes.pitchClass = value
        }
        return this
    }

    instrument(value) {
        if (app.get('instruments').includes(value)) {
            this.attributes.instrument = value
        }
        return this
    }

    build(playable = false) {
        return playable ?
               new PlayableNote(this.attributes) :
               new Note(this.attributes)
    }
}
