import {InvalidInput}   from '../Exceptions'
import {firstToUpper}   from '../utilities'
import {PitchClassRule} from '../validation'
import {PitchClass}     from '../theory'

/**
 * Validates an argument is an array, fails if not.
 * @throws InvalidInput
 * @param arg
 * @returns {boolean}
 */
export function validateArray(arg) {
  if (!Array.isArray(arg)) {
    throw new InvalidInput(`expected ${arg} to be an array`)
  }

  return true
}

export function validateInstance(instance, classToCheckFor) {
  if (!(instance instanceof classToCheckFor)) {
    throw new InvalidInput(`expected ${instance} to be an instance of ${classToCheckFor.name}`)
  }

  return true
}

export function validateNumber(val) {
  if (typeof val !== 'number') {
    throw new InvalidInput(`expected ${val} to be a number`)
  }

  return true
}

/**
 * Validate that a string is a valid representation of a raw note.
 * @param note
 * @returns {boolean}
 */
export function validateRawNote(note) {
  if (typeof note !== 'string') {
    throw new InvalidInput(`Expected ${note} to be a string representing Note`)
  }

  if (['r', 'R'].includes(note)) {
    return true
  }

  const pitchClass = firstToUpper(note.slice(0, note.length - 1))
  const octave     = parseInt(note[note.length - 1])

  PitchClassRule.exists(pitchClass)
  validateNumber(octave)

  return true
}

export function validatePitchClasses(pitchClasses) {
  validateArray(pitchClasses)
  pitchClasses.forEach(pitchClass => validateInstance(pitchClass, PitchClass))
}
