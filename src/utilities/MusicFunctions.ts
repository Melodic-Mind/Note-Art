import { PITCH_CLASS_LETTERS } from '../Constants.js';
import { Note, PitchClass } from '../types.js';
import { rearrangeArray } from './GeneralFunctions.js';
import { enharmonicPitchClass, getPitchClassIndex, normalizePitchClass } from './PureMusicUtils.js';

/**
 * Returns an array of notes that represent a chord played on a piano in a certain octave.
 * @param {Array} pitchClasses
 * @param {number} octave Octave for the chord root.
 * @param {number} inversion Whether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,
 *     etc...
 * @returns {Array}
 */
export function pitchClassesToPianoChordNotes(pitchClasses: Array<PitchClass>, octave: number, inversion = 0): Array<Note> {
  if(inversion) {
    pitchClasses = rearrangeArray(pitchClasses, inversion) as Array<PitchClass>;
  }
  let currentOctave = octave;
  let wasNextOctave = false;

  // The reason this implementation is so complicated is that it can handle any raw pitch classes given to it properly, e.g Cb, Bx, Dbbb, etc.
  const notes = pitchClasses.map((pitchClass, i) => {
    if(i !== 0) {
      const pcIndex = getPitchClassIndex(normalizePitchClass(pitchClass));
      const prevPcIndex = getPitchClassIndex(normalizePitchClass(pitchClasses[i - 1]));
      // Checking if the octave needs to be incremented:
      // We can know it definitely needs to be incremented if the current *ABSOLUTE* pitch class is C and the raw pitch class is not B.
      const isC = normalizePitchClass(pitchClass) === 'C' && pitchClass[0] !== 'B';
      // Otherwise, we need to check if the current pitch class index is smaller than the previous one, as that would indicate that we've passed the B pitch class.
      const isPassedB = pcIndex < prevPcIndex && pitchClass[0] !== 'B';
      // It should also be incremented if the raw pitch class is from the next octave regardless of the pitch class.
      const isNextOctave = ['C', 'D'].includes(pitchClass[0]) && ['A', 'B'].includes(pitchClasses[i - 1][0]);
      if((isPassedB || (isC) || isNextOctave) && !wasNextOctave) {
        currentOctave++;
      } 
      if(wasNextOctave) {
        wasNextOctave = false;
      }
      if(isNextOctave) {
        wasNextOctave = true;
      }
    }
    return `${pitchClass}${currentOctave}`;
  }) as Array<Note>;
  return notes;
}

/**
 * 
 * @param pitchClasses Array of pitch classes that represent a scale.
 * @returns {PitchClass[]}
 * @example
 * const EMajorScale = ['E', 'Gb', 'Ab', 'A', 'B', 'Db', 'Eb'];
 * spellScale(EMajorScale) // => ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
 */
export function spellScale(pitchClasses: Array<any>): PitchClass[] {
  const letters = rearrangeArray([...PITCH_CLASS_LETTERS], PITCH_CLASS_LETTERS.indexOf(pitchClasses[0][0]));
  const res = [pitchClasses[0]];
  [...pitchClasses].slice(1).forEach((pc, i) => {
    res.push(enharmonicPitchClass(pc, letters[(i + 1) % letters.length]));
  });
  return res;
}
