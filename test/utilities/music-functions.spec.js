import {
    Note,
    calculateInterval,
    notesInRange,
    noteToObject,
    pitchClassesToPianoChordNotes,
    Chord,
    PitchClass,
    pitchClassesToNotes,
}                     from '../../src'
import {InvalidInput} from '../../src/Exceptions'

describe('Music addon functions', () => {
    describe('#pitchClassesToNotes', () => {
        it('should throw an Invalid Input error when pitch classes is not an array containing only pitch classes', () => {
            expect(() => pitchClassesToNotes('OMG')).to.throw(InvalidInput)
            expect(() => pitchClassesToNotes(['blob'])).to.throw(InvalidInput)
        })

        it('should throw an Invalid Input error when octave is not a number', () => {
            expect(() => pitchClassesToNotes([new PitchClass('c'), 'NOT NUMBER'])).to.throw(InvalidInput)
        })

        it('should return an array of notes when input is valid', () => {
            const pitchClasses = [new PitchClass('c'), new PitchClass('e')]
            const stub         = [new Note('c', 3), new Note('e', 3)]
            expect(pitchClassesToNotes(pitchClasses, 3)).to.eql(stub)
        })
    })

    describe('#pitchClassesToPianoChordNotes', () => {
        let g, gChord
        beforeEach(() => {
            g      = new PitchClass('g')
            gChord = new Chord(g, [4, 7])
        })

        describe('returns the correct notes for a chord', () => {
            it('normal chord', () => {
                const stub = [Note.builder('g3'), Note.builder('B3'), Note.builder('d4')]
                expect(pitchClassesToPianoChordNotes(gChord.pitchClasses, 3)).to.eql(stub)
            })

            it('another normal chord', () => {
                const pitchClasses = [new PitchClass('g#'), new PitchClass('b'), new PitchClass('d')]
                const stub = [Note.builder('g#3'), Note.builder('B3'), Note.builder('d4')]
                expect(pitchClassesToPianoChordNotes(pitchClasses, 3)).to.eql(stub)
            })

            it('big Chord', () => {
                const bigChord = new Chord(g, [4, 7, 13, 17])
                const stub2    = [
                    Note.builder('g3'),
                    Note.builder('B3'),
                    Note.builder('d4'),
                    Note.builder('g#4'),
                    Note.builder('c5'),
                ]

                expect(pitchClassesToPianoChordNotes(bigChord.pitchClasses, 3)).to.eql(stub2)
            })
        })

        it('should throw an error when the octave is not a valid piano octave', () => {
            expect(() => pitchClassesToPianoChordNotes(gChord.pitchClasses, 'NOT OCTAVE')).to.throw(InvalidInput)
        })

        it('throws an error when pitchClasses is not an array of pitch classes', () => {
            expect(() => pitchClassesToPianoChordNotes('omg', 2)).to.throw(InvalidInput)
        })

        it('should invert chords when called with inversion value', () => {
            const stub = [Note.builder('B3'), Note.builder('d4'), Note.builder('g4')]
            expect(pitchClassesToPianoChordNotes(gChord.pitchClasses, 3, 1)).to.eql(stub)
        })
    })

    describe('#calculateInterval', () => {
        it('calculates the correct interval between two pitch classes', () => {
            const n1 = new Note('c', 5),
                  n2 = new Note('g', 5)
            expect(calculateInterval(n1, n2)).to.eql(7)
        })
    })

    describe('#extractFromPitch', () => {
        it('returns an object with pitch class and octave', () => {
            expect(noteToObject('e3')).to.eql({pitchClass: 'E', octave: 3})
            expect(noteToObject('bb4')).to.eql({pitchClass: 'Bb', octave: 4})
        })
    })

    describe('#notesInRange', () => {
        it('returns an array of notes formatted as cords', () => {
            expect(Object.keys(notesInRange('a3', 3))).to.eql(['A3', 'Bb3', 'B3', 'C4'])
        })

        it('throws an error when an argument is invalid', () => {
            expect(() => {
                return notesInRange(2, 3)
            }).to.throw(InvalidInput)
            expect(() => {
                return notesInRange(2, 'qwe')
            }).to.throw(InvalidInput)
        })
    })
})
