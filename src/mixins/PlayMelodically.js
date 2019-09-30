import {Note} from '../theory'
import {lib}  from '../Lib'
import Tone   from 'tone'

/**
 * @mixin playMelodically
 * @desc
 * Play a group of notes melodically.
 * If resolve is true the melody will resolve to the tonic in higher octave.
 * @param {Array} notes array of playable notes
 * @param {string} duration Duration to play each note for in seconds.
 * @param {Number} timeInterval interval between each note in seconds.
 * @param {boolean} [resolve = false] whether to resolve to tonic
 */
export default function playMelodically(notes, duration, timeInterval = 0.3, resolve = false) {
  const context = Tone.context
  notes.forEach((note, i) => {
    context.setTimeout(() => this.play(note, duration), i * timeInterval)
  })
  if (resolve) {
    context.setTimeout(
        () => this.play(Note.builder(notes[0]).interval(12).raw, duration),
        notes.length * timeInterval,
    )
  }
}
