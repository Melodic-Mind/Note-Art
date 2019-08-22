import {Note} from '../theory'

/**
 * @mixin playMelodically
 * @desc
 * Play a group of notes melodically.
 * If resolve is true the melody will resolve to the tonic in higher octave.
 * @param {Array} notes array of playable notes
 * @param {Number} timeInterval interval between each note in milli-seconds.
 * @param {boolean} [resolve = false] whether to resolve to tonic
 */
export default function playMelodically(notes, timeInterval = 300, resolve = false) {
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
