import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {InvalidInput}                 from '../Exceptions'
import {PitchClass}                   from '../theory'

/**
 * @classdesc Rules for validating a pitchClass
 * @class
 */
export default class PitchClassRule {
  /**
   * Check if pitch class exists.
   * @param {String} pitchCls pitch class to validate
   * @throws {InvalidInput}
   * @returns {boolean}
   */
  static exists(pitchCls) {
    if (PitchClassRule.validNotes().includes(pitchCls)) {
      return true
    }

    return false
  }

  static validNotes() {
    return mts.pitchClasses.concat(mts.pitchClasses.map(pitchcls => pitchcls.toLowerCase()))
  }

  static isPitchClass(obj) {
    if (!PitchClass.isPitchClass(obj)) {
      throw new InvalidInput('expected _ to be an instance of PitchClass')
    }

    return true
  }
}
