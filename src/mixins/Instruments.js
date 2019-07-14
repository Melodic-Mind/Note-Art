import {Note}          from '../'
import {validateArray} from '../'

/**
 * @mixin
 * @type {{playMelodically(Array, Number=, boolean=): void}}
 */
export const playing = {
    /**
     * Play a group of notes melodically.
     * If resolve is true the melody will resolve to the tonic in higher octave.
     * @param {Array} notes array of playable notes
     * @param {Number} timeInterval interval between each note in milli-seconds.
     * @param {boolean} [resolve = false] whether to resolve to tonic
     */
    playMelodically(notes, timeInterval = 300, resolve = false) {
        notes.forEach((note, i) => {
            setTimeout(() => this.play(note), i * timeInterval)
        })
        if (resolve) {
            setTimeout(
                () => this.play(Note.builder(notes[0]).interval(12).raw),
                notes.length * timeInterval,
            )
        }
    },

    playNotes(notes, duration) {
        validateArray(notes)
        notes.forEach(note => this.play(note, duration))
    },
}
