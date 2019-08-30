import {validateArray} from '../validation/Validators'

/**
 * @mixin playNotes
 * @desc
 * Play a group of notes Harmonically.
 * @param {Array} notes array of playable notes
 * @param {string} duration duration to play the notes for, e.g 4n.
 */
export default function playNotes(notes, duration) {
  validateArray(notes)
  notes.forEach(note => this.play(note, duration))
}
