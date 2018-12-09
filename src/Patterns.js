/**
 * All music theory patterns that are used in the project
 */

const scales = require('./Scales.json') //with path

const diatonicScales = scales.filter(scale => scale.Length == 7)

const FifthsCircle = ['C', 'G', 'D', 'A', 'E', 'B', 'F#']
const FourthsCircle = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']
const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const wholeToneNotes = ['C', 'D', 'F', 'G', 'A']
const HalfToneNotes = ['E', 'B']
const notes = {
    '#': ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    'b': ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
}
const allNotes = [
    'C',
    'C#',
    'Db',
    'D',
    'D#',
    'Eb',
    'E',
    'F',
    'F#',
    'Gb',
    'G',
    'G#',
    'Ab',
    'A',
    'A#',
    'Bb',
    'B',
]

const noteDurations = {
    'w': 1,
    'h': 1 / 2,
    'q': 1 / 4,
    'e': 1 / 8,
    's': 1 / 16,
    't': 1 / 32,
    'sf': 1 / 64,
}

const time_signature_note_types = {
    4: 1 / 4,
    8: 1 / 8,
}

const semitone = Math.pow(2, 1 / 12)

const octaveFrequencies = {
    '0': [0, 31],
    '1': [31, 63],
    '2': [63, 127],
    '3': [127, 253],
    '4': [253, 508],
    '5': [508, 1017],
    '6': [1017, 2034],
    '7': [2034, 4068],
    '8': [4068, 8137],
    '9': [8137, 16000],
}

const instruments = ['Piano']

export {
    notes,
    FourthsCircle,
    FifthsCircle,
    octaveFrequencies,
    semitone,
    time_signature_note_types,
    noteDurations,
    allNotes,
    noteLetters,
    scales,
    diatonicScales,
    instruments
}