import PitchClass                       from '../theory/PitchClass'
import { firstToUpper, rearrangeArray } from '../utilities/GeneralFunctions'
import PitchClassRule                   from '../validation/PitchClassRule'
import { PITCH_CLASS_LETTERS }          from '../Constants'
import { enharmonicPitchClass, isRest } from 'src/utilities/PureMusicUtils'

/**
 * Checks if a string represents a raw musical note.
 * @param str
 * @returns {boolean}
 */
export function isRawNote(str) {
  if(typeof str !== 'string') {
    return false
  }

  if(isRest(str)) {
    return true
  }

  const pitchClass = firstToUpper(str.slice(0, str.length - 1))
  const octave     = parseInt(str[str.length - 1])

  return !( !PitchClassRule.exists(pitchClass) || typeof octave !== 'number')
}

/**
 * Transpose a raw note by interval.
 * @param {string} note Either pitch class or note as string.
 * @param {number} interval Interval to transpose by.
 * @returns {string|*}
 */
// export function transpose(note, interval) {
//   validateRawNote(note)
//
//   if( !isRest(note)) {
//     return Note.builder(note).interval(interval).toString()
//   }
//
//   return note
// }

/**
 * Returns a correctly spelled scale where no pitch class appears more than once.
 * @param scale
 * @returns {Array}
 */
export function spellScale(scale) {
  const letters = rearrangeArray(PITCH_CLASS_LETTERS, PITCH_CLASS_LETTERS.indexOf(scale.root.pitchClass[0]))
  const res     = [scale.root.pitchClass];
  [...scale.pitchClasses].slice(1).forEach((pc, i) => {
    res.push(enharmonicPitchClass(pc.raw, new PitchClass(letters[i + 1])))
  })

  return res
}
