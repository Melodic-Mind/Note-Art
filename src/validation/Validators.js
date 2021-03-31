import { InvalidInput } from '../Exceptions'
import { isRawNote }    from '../utilities/MusicFunctions'
import { isDuration }   from 'src/utilities'

/**
 * Validates an argument is an array, fails if not.
 * @throws InvalidInput
 * @param arg
 * @returns {boolean}
 */
export function validateArray(arg) {
  if( !Array.isArray(arg)) {
    throw new InvalidInput(`expected ${ arg } to be an array`)
  }

  return true
}

export function validateInstance(instance, classToCheckFor) {
  if( !(instance instanceof classToCheckFor)) {
    throw new InvalidInput(`expected ${ instance } to be an instance of ${ classToCheckFor.name }`)
  }

  return true
}

export function validateNumber(val) {
  if(typeof val !== 'number') {
    throw new InvalidInput(`expected ${ val } to be a number`)
  }

  return true
}

/**
 * Validate that a string is a valid representation of a raw note.
 * @param str
 * @returns {boolean}
 */
export function validateRawNote(str) {
  if( !isRawNote(str)) {
    throw new InvalidInput(`Expected ${ str } to be a string representing a note`)
  }

  return true
}

export function validatePitchClasses(pitchClasses) {
  validateArray(pitchClasses)
  // pitchClasses.forEach( pitchClass => validateInstance( pitchClass, PitchClass ) )
}

export function validateDuration(str) {
  if( !isDuration(str)) {
    throw new InvalidInput(`Expected ${ str } to be a string representing note duration.`)
  }

  return true
}
