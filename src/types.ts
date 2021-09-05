export type NoteAsObject = {
  pitchClass: PitchClass;
  octave: Octave;
}

export type PitchClassLetter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

type FlatAccidental = 'b' | 'bb' | 'bbb';
type SharpAccidental = '#' | 'x' | '#x';

export type Accidental = '' | FlatAccidental | SharpAccidental;


export type Octave = number;

export type FlatPitchClass = `${PitchClassLetter}${FlatAccidental}`;
export type SharpPitchClass = `${PitchClassLetter}${SharpAccidental}`;

export type PitchClass = PitchClassLetter | FlatPitchClass | SharpPitchClass;

export type PureFlatPitchClass = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export type PureSharpPitchClass = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type PurePitchClass = PureFlatPitchClass | PureSharpPitchClass;

export type Note = `${PitchClass}${Octave}`;
export type PureNote = `${PurePitchClass}${Octave}`;

export type Chord = Array<PitchClass | Note>;
export type Scale = Array<PitchClass | Note>;

export type NoteDuration = '';