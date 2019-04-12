import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {firstToUpper}                 from '../addons/GlobalFunctions'
import {PitchClassRule}               from '../validation/PitchClassRule'
import {PianoOctaveRule}              from '../validation/PianoOctaveRule'
import {InvalidInput}                 from '../Exceptions'

// /**
//  * Returns the duration value of the note with the shortest duration out of an array of notes.
//  * @param {Array} notes
//  * @returns {Number}
//  */
// function getMinDuration(notes = []) {
//     if (notes.length) {
//         let min
//         notes.forEach(note => {
//             min =
//                 min < mts.noteDurations[note.duration]
//                 ? min
//                 : mts.noteDurations[note.duration]
//         })
//         return min
//     }
//     return 0
// }

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
 * Play a group of notes melodically.
 * if resolve is true the melody will resolve to the tonic in higher octave.
 * @param {Array} notes array of playable notes
 * @param {Number} timeInterval
 * @param {boolean} [resolve = false] whether to resolve to tonic
 */
// function playMelodically(notes, timeInterval, resolve = false) {
//     notes.forEach((note, i) => {
//         setTimeout(() => note.play(), i * timeInterval)
//     })
//     if (resolve) {
//         setTimeout(
//             () => notes[0].interval(12).play(),
//             notes.length * timeInterval,
//         )
//     }
//     return true
// }

/**
 * Turns a pitch into an object with pitch class and octave.
 * @param {String} pitch Pitch as a string, e.g Ab3
 * @return {{octave: number, pitchClass: String}}
 */
function noteToObject(note) {
    validateRawNote(note)

    const pitchClass = firstToUpper(note.slice(0, note.length - 1))
    const octave     = parseInt(note[note.length - 1])

    return {pitchClass, octave}
}

function validateRawNote(note) {
    if (typeof note !== 'string') {
        throw new InvalidInput(`Expected ${note} to be a string representing Note`)
    }
    const pitchClass = firstToUpper(note.slice(0, note.length - 1))
    const octave     = parseInt(note[note.length - 1])

    PitchClassRule.exists(pitchClass)
    PianoOctaveRule.validatePossible(octave)

    return true
}

function notesInRange(base, range) {
    let {pitchClass, octave} = noteToObject(base)
    const notes              = {}
    let tmpPitchClass

    for (let i = 0; i <= range; ++i) {
        tmpPitchClass                 = mts.flatClassNotes[(mts.flatClassNotes.indexOf(pitchClass) + i) % 12]
        notes[tmpPitchClass + octave] = {pitchClass: tmpPitchClass, octave}
        if (tmpPitchClass === 'B') {
            octave++
        }
    }

    return notes
}

export { notesDistance, notesInRange, noteToObject, validateRawNote}
