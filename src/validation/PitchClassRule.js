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
   * @param {String} str string to validate
   * @throws {InvalidInput}
   * @returns {boolean}
   */
  static exists(str) {
    if (!PitchClassRule.validLetters.includes(str[0])) {
      return false
    }

    const accidental = str[1]
    if (accidental) {
      if (accidental === 'b') {
        if (![...str].slice(2).every(char => char === 'b')) {
          return false
        }
      } else if (accidental === 'x') {
        if (![...str].slice(2, str.length - 1).every(char => char === 'x')) {
          return false
        }
        if (!['x', '#'].includes(str[str.length - 1])) {
          return false
        }
      }
      else {
        if(str.length > 2){
          return false
        }
      }
    }

    return true
  }

  static get validLetters() {
    return mts.pitchClassLetters.concat(mts.pitchClassLetters.map(letter => letter.toLowerCase()))
  }

  static isPitchClass(obj) {
    if (!PitchClass.isPitchClass(obj)) {
      throw new InvalidInput(`expected ${obj} to be an instance of PitchClass`)
    }

    return true
  }
}
