import { SEMITONE, NUMBER_OF_PITCH_CLASSES, PITCH_STANDARD, FLAT_CLASS_NOTES } from '../Constants'
import { getPitchClassIndex, noteToObject }                                    from './PureMusicUtils'

/**
 * Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).
 * @param {String} note
 * @returns {Number}
 */
export function freqFromPitch(note: string): number {
  const { pitchClass, octave } = noteToObject(note)
  const oct                    = octave - PITCH_STANDARD.octave // calculate octave difference
  const pitchClassIndex        = getPitchClassIndex(pitchClass)
  return Math.pow(
    SEMITONE,
    pitchClassIndex - FLAT_CLASS_NOTES.indexOf(PITCH_STANDARD.pitchClass) + oct * NUMBER_OF_PITCH_CLASSES
  ) * PITCH_STANDARD.frequency
}

/**
 * Generate real number from frequency.
 * @param frequency
 * @returns {number}
 */
export function freqToMidi(frequency: number): number {
  return Math.round(PITCH_STANDARD.midi + NUMBER_OF_PITCH_CLASSES * Math.log2(frequency / PITCH_STANDARD.frequency))
}

/**
 * Generate frequency from real number.
 * @param realNumber
 * @returns {Number}
 */
export function midiToFreq(realNumber: number): number {
  return PITCH_STANDARD.frequency * (Math.pow(2, (realNumber - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES))
}
