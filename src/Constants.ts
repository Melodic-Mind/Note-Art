export const PITCH_STANDARD: {
  pitchClass: string;
  octave: number;
  midi: number;
  frequency: number;
}                                                 = { pitchClass: 'A', octave: 4, midi: 69, frequency: 440 }
export const NUMBER_OF_PITCH_CLASSES: number      = 12
export const SEMITONE: number                     = Math.pow(2, 1 / 12)
export const SHARP_CLASS_NOTES: Array<string>     = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const FLAT_CLASS_NOTES: Array<string>      = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
export const PITCH_CLASS_LETTERS: Array<string>   = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const PITCH_CLASSES: Array<string>         = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#',
  'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'
]
export const INTERVALS: { [key: string]: number } = {
  U:    0,
  m2:   1,
  M2:   2,
  m3:   3,
  M3:   4,
  P4:   5,
  aug4: 6,
  dim5: 6,
  P5:   7,
  m6:   8,
  M6:   9,
  m7:   10,
  M7:   11,
  P8:   12
}
export const OCTAVES_ON_PIANO: number             = 8

export const NOTE_DURATIONS: Array<number>                                = [1, 2, 4, 8, 16, 32, 64]
export const TIME_SIG_NUMERATORS: Array<number>                           = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const NOTE_DURATIONS_AS_SIZE_IN_MEASURE: { [key: string]: number } = {
  '1n':  64,
  '2n':  32,
  '2n.': 48,
  '2t':  21,
  '4n':  16,
  '8n':  8,
  '16n': 4,
  '32n': 2,
  '64n': 1
}
