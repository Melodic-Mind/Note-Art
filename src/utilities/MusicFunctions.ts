import { PITCH_CLASS_LETTERS } from '../Constants.js';
import { Note, PitchClass, Scale } from '../types.js';
import { rearrangeArray } from './GeneralFunctions.js';
import { enharmonicPitchClass, getPitchClassIndex } from './PureMusicUtils.js';

/**
 * Returns an array of notes with a specific octave.
 * @param {Array} pitchClasses Array of pitch classes.
 * @param {number} octave Octave to assign to notes..
 * @returns {Array}
 */
export function pitchClassesToNotes(pitchClasses: Array<string>, octave: number): Array<string> {
  return pitchClasses.map(pitchClass => `${pitchClass}${octave}`);
}

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

  return pitchClasses.map((pitchClass, i) => {
    if(i !== 0) {
      const pcIndex = getPitchClassIndex(pitchClass);
      const prevPcIndex = getPitchClassIndex(pitchClasses[i - 1]);
      if((i - 1) >= 0 && pcIndex < prevPcIndex) {
        currentOctave++;
      }
    }
    return `${pitchClass}${currentOctave}`;
  }) as Array<Note>;
}

/**
 * 
 * @param pitchClasses Array of pitch classes that represent a scale.
 * @returns {PitchClass[]}
 * @example
 * const EMajorScale = ['E', 'Gb', 'Ab', 'A', 'B', 'Db', 'Eb'];
 * spellScale(EMajorScale) // => ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
 */
export function spellScale(pitchClasses: any): PitchClass[] {
  const letters = rearrangeArray([...PITCH_CLASS_LETTERS], PITCH_CLASS_LETTERS.indexOf(pitchClasses[0][0]));
  const res = [pitchClasses[0]];
  [...pitchClasses].slice(1).forEach((pc, i) => {
    res.push(enharmonicPitchClass(pc, letters[(i + 1) % letters.length]));
  });
  return res;
}
