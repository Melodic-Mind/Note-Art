import { note_durations } from '.'

/**
 * Transforms the first letter of a string to upper case.
 * @param {String} str String to transform
 * @returns {String}
 */
function firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Returns the duration of the shortest note out of an array of notes.
 * @param {Array} notes
 * @returns {Number}
 */
function getMinDuration(notes = []) {
    let min_duration
    notes.forEach((note) => {
        min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
    })
    return min_duration
}

/**
 * Returns a number formatted to show only 2 digits after the decimal point.
 * @param {Number} num
 * @returns {Number}
 */
const twoDigitFormat = (num) => Number.parseFloat(num).toFixed(2)

export {
    firstToUpper,
    getMinDuration,
    twoDigitFormat
}