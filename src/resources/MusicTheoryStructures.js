const scales = require('./scales.json')

/**
 * @classdesc Contains music theory structures and databases
 * e.g pitch classes, interval names, scales and more.
 */
export class MusicTheoryStructures {
    static circleOfFourths = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']

    static circleOfFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#']

    static pitchClassSets = ['#', 'b']

    static sharpClassNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    static flatClassNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

    static getPitchClassSet(set) {
        if (set === '#') {
            return MusicTheoryStructures.sharpClassNotes
        }
        if (set === 'b') {
            return MusicTheoryStructures.flatClassNotes
        }
        return null
    }

    static pitchClasses = [
        'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#',
        'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
    ]


    static intervals = {
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
        P8:   12,
    }

    static noteDurations(backwards = false) {
        return backwards ?
               {
                   64: '1',
                   32: '2n',
                   16: '4n',
                   8:  '8n',
                   4:  '16n',
                   2:  '32n',
                   1:  '64n',
               }
                         :
               {
                   '1n':  64,
                   '2n':  32,
                   '4n':  16,
                   '8n':  8,
                   '16n': 4,
                   '32n': 2,
                   '64n': 1,
               }

    }

    static degrees = {
        major: [
            'I', 'II', 'III', 'IV', 'V', 'VI',
            'VII', 'VIII', 'IX', 'X', 'XI',
        ],
        minor: [
            'i', 'ii', 'iii', 'iv', 'v',
            'vi', 'vii', 'viii', 'ix', 'x', 'xi',
        ],
    }

    static NamedScales = scales.filter((scale => scale['Name'] !== 'Theoretical'))

    static HeptatonicScales = scales.filter((scale) => {
        return scale['Length'] === '7' && scale['Name'] !== 'Theoretical'
    })

    static HexatonicScales = scales.filter((scale) => {
        return scale['Length'] === '6' && scale['Name'] !== 'Theoretical'
    })

    static OctatonicScales = scales.filter((scale) => {
        return scale['Length'] === '8' && scale['Name'] !== 'Theoretical'
    })

    static AboveOctaScales = scales.filter((scale) => {
        return parseInt(scale['Length']) > 8 && scale['Name'] !== 'Theoretical'
    })


    static PentatonicScales = scales.filter((scale) => {
        return scale['Length'] === '5' && scale['Name'] !== 'Theoretical'
    })

    static TheoreticalScales = scales.filter((scale) => {
        return scale['Name'] === 'Theoretical'
    })

    static scales = scales

    static ClassicScales = require('./classic-scales.json')

    static Chords = require('./chords.json')
}
