import {firstToUpper, app, MusicTheoryStructures as mts, PlayableNote, Note} from '..'
import {PianoOctaveRule}                                                     from '../validation/PianoOctaveRule'

/**
 * @classdesc A builder that can build both a Note and a PlayableNote.,
 *            doesn't throw exceptions and defaults to:
 *            pitch class: C
 *            octave: 3
 *            duration: 4m
 *            instrument(in case of PlayableNote): Piano
 * @example
 *          Build Note:
 *          const c1 = new NoteBuilder({pitchClass: 'F'}).build()       // Builds Note
 *          const c2 = new NoteBuilder({pitchClass: 'F'}).build(true)   // Builds PlayableNote
 */
export class NoteBuilder {
    /**
     *
     * @param {Object} [raw={}] Raw attributes for the new note.
     * @param {String} [raw.pitchCLass='C'] Pitch CLass.
     * @param {Number} [raw.octave=3] Octave.
     * @param {String} [raw.duration='4n] Duration.
     * @param {String} [raw.instrument='Piano'] Instrument.
     */
    constructor(raw = {}) {
        this.attributes = {pitchClass: 'C', octave: 3, duration: '4n', instrument: 'Piano'}
        this.pitchClass(raw.pitchClass)
            .octave(raw.octave)
            .duration(raw.duration)
            .instrument(raw.instrument)
    }

    /**
     * Verify octave.
     * @param value
     * @return {NoteBuilder}
     */
    octave(value) {
        if (PianoOctaveRule.validateAudible(value, this.attributes.note)) {
            this.attributes.octave = value
        }
        return this
    }

    /**
     * Verify duration.
     * @param value
     * @return {NoteBuilder}
     */
    duration(value) {
        if (Object.keys(mts.noteDurations).includes(value)) {
            this.attributes.duration = value
        }
        return this
    }

    /**
     * Verify pitch cLass.
     * @param value
     * @return {NoteBuilder}
     */
    pitchClass(value) {
        if (typeof value === 'string') {
            value = firstToUpper(value)
        }
        if (mts.pitchClasses.includes(value)) {
            this.attributes.pitchClass = value
        }
        return this
    }

    /**
     * Verify instrument.
     * @param value
     * @return {NoteBuilder}
     */
    instrument(value) {
        if (app.get('instruments').includes(value)) {
            this.attributes.instrument = value
        }
        return this
    }

    /**
     * Builds a new Note/PLayableNote.
     * @param {boolean} [playable=false] Whether to build a PlayableNote.
     * @return {Note|PlayableNote}
     */
    build(playable = false) {
        return playable ?
               new PlayableNote(this.attributes) :
               new Note(this.attributes)
    }
}
