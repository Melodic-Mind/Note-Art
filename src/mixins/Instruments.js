import {Note, validateArray} from '../'

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
     * @param {boolean} [resolve=false] whether to resolve to tonic
     */
    playMelodically(notes, timeInterval = 300, resolve = false) {
        notes.forEach((note, i) => {
            setTimeout(() => this.play(note), i * timeInterval)
        })

        if (resolve) {
            this.resolve(notes, timeInterval)
        }
    },

    /**
     * Helper function for playMelodically, resolves a group of notes with the tonic a octave higher.
     * @param notes
     * @param timeInterval
     */
    resolve(notes, timeInterval) {
        setTimeout(
            () => this.play(Note.builder(notes[0]).interval(12).raw),
            notes.length * timeInterval,
        )
    },

    /**
     *
     * @param notes
     * @param duration
     */
    playNotes(notes, duration) {
        validateArray(notes)
        notes.forEach(note => this.play(note, duration))
    },
}
