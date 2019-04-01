import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {Pitch}                        from '../models/Pitch'
import {firstToUpper}                 from '../addons/GlobalFunctions'
import {PitchClassRule}               from '../validation/PitchClassRule'
import {PianoOctaveRule}              from '../validation/PianoOctaveRule'
import {InvalidInput}                 from '../Exceptions'

/**
 * Returns the duration value of the note with the shortest duration out of an array of notes.
 * @param {Array} notes
 * @returns {Number}
 */
function getMinDuration(notes = []) {
    if (notes.length) {
        let min
        notes.forEach(note => {
            min =
                min < mts.noteDurations[note.duration]
                ? min
                : mts.noteDurations[note.duration]
        })
        return min
    }
    return 0
}

/**
 * Calculate the pure interval(not considering octave) between 2 notes(in semitones).
 * @param {Pitch} n1 first note
 * @param {Pitch} n2 second note
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
function playMelodically(notes, timeInterval, resolve = false) {
    if (notes[0].isPlayable) {
        notes.forEach((note, i) => {
            setTimeout(() => note.play(), i * timeInterval)
        })
        if (resolve) {
            setTimeout(
                () => notes[0].interval(12).play(),
                notes.length * timeInterval,
            )
        }
        return true
    }
    return false
}

/**
 * Turns a pitch into an object with pitch class and octave.
 * @param {String} pitch Pitch as a string, e.g Ab3
 * @return {{octave: number, pitchClass: String}}
 */
function pitchToObject(pitch) {
    if (typeof pitch !== 'string') {
        throw new InvalidInput(`Expected ${pitch} to be a string representing pitch`)
    }
    const pitchClass = firstToUpper(pitch.slice(0, pitch.length - 1))
    const octave     = parseInt(pitch[pitch.length - 1])

    PitchClassRule.exists(pitchClass)
    PianoOctaveRule.validatePossible(octave)

    return {pitchClass, octave}
}

function notesInRange(base, range) {
    let {pitchClass, octave} = pitchToObject(base)
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

export {getMinDuration, playMelodically, notesDistance, notesInRange, pitchToObject}
