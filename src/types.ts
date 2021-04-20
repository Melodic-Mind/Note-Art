export type NoteAsObject = {
  pitchClass: PitchClass;
  octave: Octave;
}

export type PitchClassLetter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

type FlatAccidental = 'b' | 'bb' | 'bbb';
type SharpAccidental = '#' | 'x' | '#x';

export type Accidental = '' | FlatAccidental | SharpAccidental;
export type Octave = number;

export type FlatPitchClass = `${ PitchClassLetter }${ FlatAccidental }`;
export type SharpPitchClass = `${ PitchClassLetter }${ SharpAccidental }`;

export type PitchClass = PitchClassLetter | FlatPitchClass | SharpPitchClass;


export type Note = `${ PitchClass }${ number }`
