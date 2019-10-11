import ModelHelper from './ModelHelper'
import {PitchClass}  from '../theory'

export default class RawHelper extends ModelHelper {
  /**
   * Returns an array of raw notes with a specific octave.
   * @param {Array[string]} {pitchClasses} Array of pitch classes.
   * @param {number} octave Octave to assign to notes..
   * @returns {Array}
   */
  static pitchClassesToNotes(pitchClasses, octave) {
    const pcInstances = pitchClasses.map(pc => new PitchClass(pc))
    return super.pitchClassesToNotes(pcInstances, octave).map(note => note.raw)
  }

  /**
   * Returns an array of notes that represent a chord played on a piano in a certain octave.
   * @param {Array[string]} {pitchClasses} Array of pitch classes.
   * @param {number} octave Octave for the chord root.
   * @param {number} inversion Whhether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
   *     etc...
   * @returns {Array}
   */
  static pitchClassesToPianoChordNotes(pitchClasses, octave, inversion = 0) {
    const pcs = pitchClasses.map(pc => new PitchClass(pc))
    return super.pitchClassesToPianoChordNotes(pcs, octave, inversion).map(n => n.raw)
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
