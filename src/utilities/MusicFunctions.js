import {
    MusicTheoryStructures as mts,
    Note,
    PitchClass,
    firstToUpper,
    validateInstance,
    validateArray,
    validateNumber,
    validateRawNote,
    reArrangeArray,
} from '../'

/**
 * Generates a group of notes that represent chord played on a piano in a certain octave.
 * @param {Array} {pitchClasses} An object with a pitch classes key that holds an array of pitch classes, or simple an
 *     instance of chord
 * @param {number} octave Octave for the chord root.
 * @returns {Array}
 */
export function toPianoChord({pitchClasses}, octave, inversion = 0){
    validateArray(pitchClasses)
    pitchClasses.forEach(pitchClass => validateInstance(pitchClass, PitchClass))
    validateNumber(octave)

    if (inversion) {
        pitchClasses = reArrangeArray(pitchClasses, inversion)
    }

    return pitchClasses.map(pitchClass => {
        const relativeOctave = pitchClass.classIndex < pitchClasses[0].classIndex ? octave + 1 : octave
        return new Note(pitchClass.pitchClass, relativeOctave)
    })
}

/**
 * Calculate the pure interval between 2 pitch classes.
 * @param {PitchClass} pitchClass1 first note
 * @param {PitchClass} pitchClass2 second note
 * @returns {Number}
 */
export function calculateInterval(pitchClass1, pitchClass2) {
    const i1 = pitchClass1.classIndex,
          i2 = pitchClass2.classIndex
    return i1 - i2 <= 0 ? Math.abs(i1 - i2) : 12 - (i1 - i2)
}

/**
 * Turns a note into an object with pitch class and octave.
 * @param {String} pitch Pitch as a string, e.g Ab3
 * @returns {{octave: number, pitchClass: String}}
 */
export function noteToObject(note) {
    validateRawNote(note)

    const pitchClass = firstToUpper(note.slice(0, note.length - 1))
    const octave     = parseInt(note[note.length - 1])

    return {pitchClass, octave}
}

export function isRest(note) {
    return note === 'R' || note === 'r'
}

export function transposeNote(note, interval) {
    if (!isRest(note)) {
        return Note.builder(note).interval(interval).raw
    }

    return note
}

/**
 * Returns an object where the keys are raw notes and their value is an instance of that note.
 * @param base
 * @param range
 */
export function notesInRange(base, range) {
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

// export {
//     calculateInterval,
//     notesInRange,
//     noteToObject,
//     isRest,
//     transposeNote,
//     toPianoChord,
// }
