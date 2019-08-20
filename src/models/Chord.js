import {MusicalPattern} from './MusicalPattern'

/**
 * @extends MusicalPattern
 * @classdesc Represents a musical Chord - a number of pitch classes with a specific
 * pattern which can be played together to form a harmonic sound.
 * @param {PitchClass} root - chords root note
 * @param {Array} pattern - the pattern to build the chord by pitch intervals(e.g [3, 7])
 * @example
 * const c = new PitchClass('c')
 * const C_Maj = new Chord(c, [4, 7]) // new C major chord.
 */
export class Chord extends MusicalPattern {
}
