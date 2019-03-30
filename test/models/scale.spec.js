import {Scale, Note, Piano, chords, Chord} from '../../src'
import {DataNotFound, MissingInformation}  from '../../src/Exceptions'

let c, C_Major
beforeEach(() => {
    c       = new Note({pitchClass: 'c', octave: 3, duration: '4n'})
    C_Major = new Scale({tonic: c, name: 'Major'})
})

describe('Scale', () => {
    describe('#constructor', () => {
        it('Throws exception when a scale name is not valid', () => {
            expect(() => new Scale({tonic: c, name: 'blob'})).to.throw(DataNotFound)
        })

        it('Builds a scale with a valid scale name', () => {
            expect(new Scale({tonic: c, name: 'Major'})).to.be.instanceOf(Scale)
        })

        it('Builds scale with pattern that is not in the scales db', () => {
            expect(() => new Scale({tonic: c, pattern: [1, 2]})).to.not.throw(DataNotFound)
        })

        it('Builds a scale with a valid pattern', () => {
            expect(new Scale({tonic: c, pattern: [0, 2, 4, 5, 7, 9, 11]})).to.be.instanceOf(Scale)
        })

        it('Throws exception when attempting to build scale without tonic', () => {
            expect(() => new Scale({name: 'Major'})).to.throw(MissingInformation)
        })

        it('Throws exception when attempting to build scale without scale name or pattern', () => {
            expect(() => new Scale({tonic: c})).to.throw(MissingInformation)
        })

        it('throws exception when the tonic is not a Note instance', () => {

        })
    })

    it('#properties', () => {
        const stub = [
            [
                new Note({pitchClass: 'c', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'd', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'e', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'f', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'g', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'a', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'b', octave: 3, duration: '4n'}),
            ], 'Major', 'Ionian',
        ]
        expect(C_Major.notes).to.eql(stub[0])
        expect(C_Major.name).to.eql(stub[1])
        expect(C_Major.otherNames).to.eql(stub[2])
        expect(new Scale({
            tonic: new Note({pitchClass: 'f', octave: 3, duration: '4n'}),
            name:  'Blues with Leading Tone',
        }).otherNames).to.eql('No other names')
    })

    it('#toString', () => {
        expect(C_Major.toString()).to.eql('C Major')
    })

    it('#degree', () => {
        expect(C_Major.degree(1)).to.eql(new Note({pitchClass: 'c', octave: 3, duration: '4n'}))
    })

    describe('#chords', () => {
        it('Testing on C major', () => {
            const stub = [
                new Chord({root: c, name: 'M'}),
                new Chord({root: new Note({pitchClass: 'd', octave: 3, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'e', octave: 3, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'f', octave: 3, duration: '4n'}), name: 'M'}),
                new Chord({root: new Note({pitchClass: 'g', octave: 3, duration: '4n'}), name: 'M'}),
                new Chord({root: new Note({pitchClass: 'a', octave: 3, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'b', octave: 3, duration: '4n'}), name: 'dim'}),
            ]
            stub.forEach((chord, index) => assertChord(C_Major, index + 1, chord))
        })

        it('Testing on E major', () => {
            const stub    = [
                new Chord({root: new Note({pitchClass: 'e', octave: 3, duration: '4n'}), name: 'M'}),
                new Chord({root: new Note({pitchClass: 'f#', octave: 3, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'g#', octave: 3, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'a', octave: 3, duration: '4n'}), name: 'M'}),
                new Chord({root: new Note({pitchClass: 'b', octave: 3, duration: '4n'}), name: 'M'}),
                new Chord({root: new Note({pitchClass: 'c#', octave: 4, duration: '4n'}), name: 'm'}),
                new Chord({root: new Note({pitchClass: 'd#', octave: 4, duration: '4n'}), name: 'dim'}),
            ]
            const D_Major = new Scale({tonic: new Note({pitchClass: 'e', octave: 3, duration: '4n'}), name: 'Major'})
            stub.forEach((chord, index) => assertChord(D_Major, index + 1, chord))
        })

        it('Testing on Gb major', () => {
            const stub     =
                      [
                          new Chord({root: new Note({pitchClass: 'bb', octave: 3, duration: '4n'}), name: 'M'}),
                          new Chord({root: new Note({pitchClass: 'c', octave: 4, duration: '4n'}), name: 'm'}),
                          new Chord({root: new Note({pitchClass: 'd', octave: 4, duration: '4n'}), name: 'm'}),
                          new Chord({root: new Note({pitchClass: 'eb', octave: 4, duration: '4n'}), name: 'M'}),
                          new Chord({root: new Note({pitchClass: 'f', octave: 4, duration: '4n'}), name: 'M'}),
                          new Chord({root: new Note({pitchClass: 'g', octave: 4, duration: '4n'}), name: 'm'}),
                          new Chord({root: new Note({pitchClass: 'a', octave: 4, duration: '4n'}), name: 'dim'}),
                      ]
            const Bb_Major = new Scale({tonic: new Note({pitchClass: 'bb', octave: 3, duration: '4n'}), name: 'Major'})
            stub.forEach((chord, index) => assertChord(Bb_Major, index + 1, chord))
        })
    })
})

function assertChord(scale, chord_degree, stub) {
    expect(scale.chord(chord_degree)).to.eql(stub)
}
