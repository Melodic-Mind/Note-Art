import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {Pitch}                        from '../models/Pitch'

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
const notesDistance = (n1, n2) => {
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

export {getMinDuration, playMelodically, notesDistance}
