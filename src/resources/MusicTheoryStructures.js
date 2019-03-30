const scales = require('./scales.json')

/**
 * @classdesc Contains music theory structures and databases
 * e.g pitch classes, interval names, scales and more.
 */
export class MusicTheoryStructures {
    static get circleOfFourths() {
        return ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']
    }

    static get circleOfFifths() {
        return ['C', 'G', 'D', 'A', 'E', 'B', 'F#']
    }

    static get sharpClassNotes() {
        return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    }

    static get flatClassNotes() {
        return ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    }

    static getPitchClassSet(set) {
        if (set === '#') {
            return MusicTheoryStructures.sharpClassNotes
        }
        if (set === 'b') {
            return MusicTheoryStructures.flatClassNotes
        }
        return null
    }

    static get pitchClasses() {
        return [
            'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#',
            'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
        ]
    }

    static get intervals() {
        return {
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
    }

    static get noteDurations() {
        return {
            '1':   16,
            '2n':  8,
            '4n':  4,
            '8n':  2,
            '16n': 1,
        }
    }

    static get degrees() {
        return {
            major: [
                'I', 'II', 'III', 'IV', 'V', 'VI',
                'VII', 'VIII', 'IX', 'X', 'XI',
            ],
            minor: [
                'i', 'ii', 'iii', 'iv', 'v',
                'vi', 'vii', 'viii', 'ix', 'x', 'xi',
            ],
        }
    }

    static get NamedScales() {
        return scales.filter((scale => scale['Name'] !== 'Theoretical'))
    }

    static get HeptatonicScales() {
        return scales.filter((scale) => {
            return scale['Length'] === '7' && scale['Name'] !== 'Theoretical'
        })
    }

    static get HexatonicScales() {
        return scales.filter((scale) => {
            return scale['Length'] === '6' && scale['Name'] !== 'Theoretical'
        })
    }

    static get OctatonicScales() {
        return scales.filter((scale) => {
            return scale['Length'] === '8' && scale['Name'] !== 'Theoretical'
        })
    }

    static get AboveOctaScales() {
        return scales.filter((scale) => {
            return parseInt(scale['Length']) > 8 && scale['Name'] !== 'Theoretical'
        })
    }

    static get PentatonicScales() {
        return scales.filter((scale) => {
            return scale['Length'] === '5' && scale['Name'] !== 'Theoretical'
        })    }

    static get TheoreticalScales() {
        return scales.filter((scale) => {
            return scale['Name'] === 'Theoretical'
        })    }

    static get scales() {
        return scales
    }

    static get ClassicScales() {
        return require('./classic-scales.json')
    }

    static get Chords() {
        return require('./chords.json')
    }
}
