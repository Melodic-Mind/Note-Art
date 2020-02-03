import { Constants  } from '../resources/Constants';
import { InvalidInput }     from '../Exceptions';
import { PitchClass }       from '../theory';

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
    const [letter, accidental] = str;
    if (!PitchClassRule.validLetters.includes(letter)) {
      return false;
    }

    switch (accidental) {
      case 'b':
        if (![...str].slice(2).every(char => char === 'b')) {
          return false;
        }
        break;

      case 'x':
        if (![...str].slice(2, str.length - 1).every(char => char === 'x')) {
          return false;
        }
        if (!['x', '#'].includes(str[str.length - 1])) {
          return false;
        }
        break;

      case '#':
        if (str.length > 2) {
          return false;
        }
        break;
    }

    return true;
  }

  static get validLetters() {
    return Constants.pitchClassLetters.concat(Constants.pitchClassLetters.map(letter => letter.toLowerCase()));
  }

  static isPitchClass(obj) {
    if (!PitchClass.isPitchClass(obj)) {
      throw new InvalidInput(`expected ${obj} to be an instance of PitchClass`);
    }

    return true;
  }
}
