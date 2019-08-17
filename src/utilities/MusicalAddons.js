import {firstToUpper}                       from './Utilities'
import {PitchClassRule}                     from '../validation/PitchClassRule'
import {PianoOctaveRule}                    from '../validation/PianoOctaveRule'
import {InvalidInput}                       from '../Exceptions'
import {MusicTheoryStructures as mts, Note} from '../'

/**
 * Generates a group of notes that represent chord played on a piano in a certain octave.
 * @param pitchClasses
 * @param octave
 * @returns {*}
 */
function toPianoChord({pitchClasses}, octave) {
    PianoOctaveRule.validatePossible(octave)
    return pitchClasses.map(pitchClass => {
        const relativeOctave = pitchClass.classIndex < pitchClasses[0].classIndex ? octave + 1 : octave
        return new Note(pitchClass, relativeOctave)
    })
}

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {PitchClass} pitchClass1 first note
 * @param {PitchClass} pitchClass2 second note
 * @returns {Number}
 */
function calculateInterval(pitchClass1, pitchClass2) {
    const i1 = pitchClass1.classIndex,
          i2 = pitchClass2.classIndex
    return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
}

/**
 * Turns a note into an object with pitch class and octave.
 * @param {String} pitch Pitch as a string, e.g Ab3
 * @returns {{octave: number, pitchClass: String}}
 */
function noteToObject(note) {
    validateRawNote(note)

    const pitchClass = firstToUpper(note.slice(0, note.length - 1))
    const octave     = parseInt(note[note.length - 1])

    return {pitchClass, octave}
}

function isRest(note) {
    return note === 'R' || note === 'r'
}

function transposeNote(note, interval) {
    if (!isRest(note)) {
        return Note.builder(note).interval(interval).raw
    }

    return note
}


/**
 * Validate that a string is a valid representation of a raw note.
 * @param note
 * @returns {boolean}
 */
function validateRawNote(note) {
    if (typeof note !== 'string') {
        throw new InvalidInput(`Expected ${note} to be a string representing Note`)
    }

    if (['r', 'R'].includes(note)) {
        return true
    }

    const pitchClass = firstToUpper(note.slice(0, note.length - 1))
    const octave     = parseInt(note[note.length - 1])

    PitchClassRule.exists(pitchClass)
    PianoOctaveRule.validatePossible(octave)

    return true
}

/**
 * Returns an object where the keys are raw notes and their value is an instance of that note.
 * @param base
 * @param range
 */
function notesInRange(base, range) {
    let {pitchClass, octave} = noteToObject(base)
    const notes              = {}
    let tmpPitchClass

    for (let i = 0; i <= range; ++i) {
        tmpPitchClass = mts.flatClassNotes[(mts.flatClassNotes.indexOf(pitchClass) + i) % 12]

        notes[tmpPitchClass + octave] = {pitchClass: tmpPitchClass, octave}

        if (tmpPitchClass === 'B') {
            octave++
        }
    }

    return notes
}

export {calculateInterval, notesInRange, noteToObject, validateRawNote, isRest, transposeNote}
