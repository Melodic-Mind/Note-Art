import {Note, PitchClass}                                                  from '../theory'
import {rearrangeArray, mapString, calculateInterval, occurrencesInString} from '../utilities'
import {validateNumber, validatePitchClasses}                              from '../validation'
import {Constants }                                                  from '../resources/Constants'
import {NUMBER_OF_PITCH_CLASSES}                                           from '../Constants'

export default class ModelHelper {
  /**
   * Returns an array of notes with a specific octave.
   * @param {Array} {pitchClasses} Array of pitch classes.
   * @param {number} octave Octave to assign to notes..
   * @returns {Array}
   */
  static pitchClassesToNotes(pitchClasses, octave) {
    validatePitchClasses(pitchClasses)
    validateNumber(octave)

    return pitchClasses.map(pitchClass => new Note(pitchClass.pitchClass, octave))
  }

  /**
   * Returns an array of notes that represent a chord played on a piano in a certain octave.
   * @param {Array} {pitchClasses} Array of pitch classes.
   * @param {number} octave Octave for the chord root.
   * @param {number} inversion Whether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
   *     etc...
   * @returns {Array}
   */
  static pitchClassesToPianoChordNotes(pitchClasses, octave, inversion = 0) {
    validatePitchClasses(pitchClasses)
    validateNumber(octave)

    if (inversion) {
      pitchClasses = rearrangeArray(pitchClasses, inversion)
    }

    let currentOctave = octave

    return pitchClasses.map((pitchClass, i) => {
      if ((i - 1) >= 0 && pitchClass.classIndex < pitchClasses[i - 1].classIndex) {
        currentOctave++
      }
      return new Note(pitchClass.pitchClass, currentOctave)
    })
  }

  /**
   * Transforms a pitch class to it's enharmonic equivalent of another pitch class.
   * @param {PitchClass} pc1 pitch class to transform to.
   * @param {PitchClass} pc2 pitch class to transform. Should have no accidentals.
   * @returns {string}
   */
  static enharmonicPitchClass(pc1, pc2) {
    const interval = calculateInterval(pc1, pc2)

    const type = interval >= 7 ? '#' : 'b'

    let times = interval >= 7 ? 12 - interval : interval

    let str = ''
    for (let i = 0; i < times; ++i) {
      str = str.concat(type)
    }

    if (type === '#') {
      str = mapString(str, '##', 'x')
    }

    return `${pc2.raw}${str}`
  }

  /**
   * Transform a pitch class to it's basic form.
   * @param {PitchClass} pc
   */
  static transformPitchClass(pc) {
    const [pitchLetter, accidental] = pc.raw
    let times
    switch (accidental) {
      case '#':
        return !['E', 'B'].includes(pitchLetter) ?
               pc.raw :
               Constants.sharpClassNotes[(Constants.sharpClassNotes.indexOf(pitchLetter) + 1) % 12]

      case 'x':
        times = occurrencesInString(pc.raw, 'x') * 2
        if (pc.raw[pc.raw.length - 1] === '#') {
          ++times
        }
        return Constants.sharpClassNotes[(Constants.sharpClassNotes.indexOf(pitchLetter) + times) % NUMBER_OF_PITCH_CLASSES]

      case 'b':
        if (!['C', 'F'].includes(pitchLetter) && pc.raw.length === 2) {
          return pc.raw
        }

        times               = occurrencesInString(pc.raw, 'b')
        const index         = Constants.flatClassNotes.indexOf(pitchLetter) - times
        const accurateIndex = index >= 0 ? index : NUMBER_OF_PITCH_CLASSES + index
        return Constants.flatClassNotes[(accurateIndex) % NUMBER_OF_PITCH_CLASSES]

      default:
        return pitchLetter
    }
  }
}
