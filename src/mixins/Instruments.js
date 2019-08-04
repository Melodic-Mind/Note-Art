import {Note, validateArray} from '../'

/**
 * @mixin playMelodically
 * @desc
 * Play a group of notes melodically.
 * If resolve is true the melody will resolve to the tonic in higher octave.
 * @param {Array} notes array of playable notes
 * @param {Number} timeInterval interval between each note in milli-seconds.
 * @param {boolean} [resolve = false] whether to resolve to tonic
 */
export function playMelodically(notes, timeInterval = 300, resolve = false)
{
    notes.forEach((note, i) => {
        setTimeout(() => this.play(note), i * timeInterval)
    })
    if (resolve) {
        setTimeout(
            () => this.play(Note.builder(notes[0]).interval(12).raw),
            notes.length * timeInterval,
        )
    }
}

/**
 * @mixin playNotes
 * @desc
 * Play a group of notes Harmonically.
 * @param {Array} notes array of playable notes
 * @param {string} duration duration to play the notes for, e.g 4n.
 */
export function playNotes(notes, duration) {
    validateArray(notes)
    notes.forEach(note => this.play(note, duration))
}
