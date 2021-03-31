import ModelHelper from './ModelHelper'
import PitchClass  from '../theory/PitchClass'

/**
 * A wrapper for the ModelHelper class for manipulations from and to strings that represent music.
 */
export default class RawHelper extends ModelHelper {
  /**
   * Returns an array of raw notes with a specific octave.
   * @param {Array} pitchClasses Array of pitch classes.
   * @param {number} octave Octave to assign to notes..
   * @returns {Array}
   */
  static pitchClassesToNotes(pitchClasses, octave) {
    return super.pitchClassesToNotes(pitchClasses.map(pc => new PitchClass(pc)), octave).map(note => note.toString())
  }

  /**
   * Returns an array of notes that represent a chord played on a piano in a certain octave.
   * @param {Array} {pitchClasses} Array of pitch classes.
   * @param {number} octave Octave for the chord root.
   * @param {number} inversion Whhether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
   *     etc...
   * @returns {Array}
   */
  static pitchClassesToPianoChordNotes(pitchClasses, octave, inversion = 0) {
    return super.pitchClassesToPianoChordNotes(
      pitchClasses.map(pc => new PitchClass(pc)),
      octave,
      inversion
    ).map(n => n.toString())
  }

  /**
   * Transforms a pitch class to it's enharmonic equivalent of another pitch class.
   * @param {string} pc1 pitch class to transform to.
   * @param {string} pc2 pitch class to transform.
   * @returns {string}
   */
  static enharmonicPitchClass(pc1, pc2) {
    return super.enharmonicPitchClass(new PitchClass(pc1), new PitchClass(pc2))
  }
}
