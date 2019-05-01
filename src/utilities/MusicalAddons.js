import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {firstToUpper}                 from '../addons/GlobalFunctions'
import {PitchClassRule}               from '../validation/PitchClassRule'
import {PianoOctaveRule}              from '../validation/PianoOctaveRule'
import {InvalidInput}                 from '../Exceptions'

/**
 * Calculate the pure interval(not considering octave) between 2 notes(in semitones).
 * @param {Note} n1 first note
 * @param {Note} n2 second note
 * @returns {Number}
 */
function notesDistance(n1, n2) {
    const i1 = n1.classIndex,
          i2 = n2.classIndex
    return i1 - i2 < 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
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

export {notesDistance, notesInRange, noteToObject, validateRawNote}
