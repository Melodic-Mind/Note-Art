import {Note, PitchClass}                                                  from '../theory'
import {rearrangeArray, mapString, calculateInterval, occurrencesInString} from '../utilities'
import {validateNumber, validatePitchClasses}                              from '../validation'
import {MusicTheoryStructures as mts}                                      from '../resources/MusicTheoryStructures'
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
   * @param {number} inversion Whhether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
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

    return `${pc2.pitchClass}${str}`
  }

  /**
   * Transform a pitch class to it's basic form.
   * @param {PitchClass} pc
   */
  static reducePitchClass(pc) {
    const [pitchLetter, accidental] = pc.pitchClass

    if (!accidental) {
      return pitchLetter
    }

    if (accidental === '#') {
      return !['E', 'B'].includes(accidental) ?
             pc.pitchClass :
             mts.sharpClassNotes[mts.sharpClassNotes.indexOf(pitchLetter) + 1]
    }

    if (accidental === 'x') {
      let times = occurrencesInString(pc.pitchClass, 'x') * 2
      if (pc.pitchClass[pc.pitchClass.length - 1] === '#') {
        ++times
      }

      return mts.sharpClassNotes[(mts.sharpClassNotes.indexOf(pitchLetter) + times) % NUMBER_OF_PITCH_CLASSES]
    }

    if (!['C', 'F'].includes(pitchLetter) && pc.pitchClass.length === 2) {
      return pc.pitchClass
    }

    let times           = occurrencesInString(pc.pitchClass, 'b')
    const index         = mts.flatClassNotes.indexOf(pitchLetter) - times
    const accurateIndex = index >= 0 ? index : 12 + index
    return mts.flatClassNotes[(accurateIndex) % NUMBER_OF_PITCH_CLASSES]
  }
}
