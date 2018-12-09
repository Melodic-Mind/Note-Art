import { allNotes, noteDurations, instruments } from '.'

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
        min_duration = min_duration < noteDurations[note.duration] ? min_duration : noteDurations[note.duration]
    })
    return min_duration
}

/**
 * Returns a number formatted to show only 2 digits after the decimal point.
 * @param {Number} num
 * @returns {Number}
 */
const twoDigitFormat = (num) => Number.parseFloat(num).toFixed(2)

/**
 * Gets a string, returns it if its a valid note, else returns the 'C'
 * @param {String} note
 * @returns {String}
 */
const validateNoteName = (note) => {
    note = note ? firstToUpper(note) : null
    return allNotes.includes(note) ? note : 'C'
}

/**
 * gets a note name and octave number, checks if they are valid
 * if they are it returns them
 * if the note is not valid returns 'C'
 * if the octave is not valid returns 3
 * @param {String} note 
 * @param {Number} octave 
 */
const validateNoteAndOctave = (note, octave) => {
    const zero_octave_notes = ['B', 'Bb', 'A#', 'A']
    note = validateNoteName(note)
    if (!(octave > 0 && octave < 8))
        if (!((octave === 0 && zero_octave_notes.includes(note)) || (octave === 8 && note === 'C')))
            octave = 3
    return [note, octave]
}

/**
 * gets a string that represents a duration, if its valid returns it,
 * else return 'q' (quarter note)
 * @param {String} duration 
 * @returns {string}
 */
const validateDuration = (duration) => noteDurations.hasOwnProperty(duration) ? duration : 'q'

/**
 * gets a string that represents a instument, if its valid returns it,
 * else returns 'Piano'
 * @param {String} instrument
 * @returns {String} 
 */
const validateInstrument = (instrument) => instruments.includes(instrument) ? instrument : 'Piano'

export {
    firstToUpper,
    getMinDuration,
    twoDigitFormat,
    validateNoteAndOctave,
    validateDuration,
    validateInstrument
}