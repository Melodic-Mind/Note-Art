import { SEMITONE, NUMBER_OF_PITCH_CLASSES, PITCH_STANDARD, FLAT_CLASS_NOTES } from '../Constants'

/**
 * Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).
 * @returns {Number}
 */
export function freqFromPitch ( pitch ) {
  const oct = pitch.octave - PITCH_STANDARD.octave //calculate octave difference
  return Math.pow( SEMITONE, pitch.classIndex - FLAT_CLASS_NOTES.indexOf( PITCH_STANDARD.pitchClass ) + oct * NUMBER_OF_PITCH_CLASSES ) * PITCH_STANDARD.frequency
}

/**
 * Generate real number from frequency.
 * @param frequency
 * @returns {number}
 */
export function freqToMidi ( frequency ) {
  return Math.round( PITCH_STANDARD.midi + NUMBER_OF_PITCH_CLASSES * Math.log2( frequency / PITCH_STANDARD.frequency ) )
}

/**
 * Generate frequency from real number.
 * @param realNumber
 * @returns {Number}
 */
export function midiToFreq ( realNumber ) {
  return PITCH_STANDARD.frequency * (Math.pow( 2, (realNumber - PITCH_STANDARD.midi) / NUMBER_OF_PITCH_CLASSES ))
}
