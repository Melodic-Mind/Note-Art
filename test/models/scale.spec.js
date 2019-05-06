import {Scale, Note, Chord}         from '../../src'
import {DataNotFound, InvalidInput} from '../../src/Exceptions'

let c, C_Major
beforeEach(() => {
    c       = new Note('c', 3)
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
            expect(() => new Scale({name: 'Major'})).to.throw(InvalidInput)
        })

        it('Throws exception when attempting to build scale without scale name or pattern', () => {
            expect(() => new Scale({tonic: c})).to.throw(Error)
        })

        it('throws exception when the tonic is not a Note instance', () => {
            expect(() => new Scale({tonic: 'Not A Note', name: 'Major'})).to.throw(InvalidInput)
        })
    })

    describe('#normalizeIfDiatonic', () => {
        it('should normalize a diatonic scale with 2 consecutive pitch classes', () => {
            const diatonic = new Scale({tonic: new Note('g#', 4), name: 'Lydian'})
            expect(diatonic.notes[0].classSet).to.be.equal('b')
        })
    })

    it('#properties', () => {
        const stub = [
            [
                new Note('c', 3),
                new Note('d', 3),
                new Note('e', 3),
                new Note('f', 3),
                new Note('g', 3),
                new Note('a', 3),
                new Note('b', 3),
            ], 'Major', 'Ionian',
        ]
        expect(C_Major.notes).to.eql(stub[0])
        expect(C_Major.name).to.eql(stub[1])
        expect(C_Major.otherNames).to.eql(stub[2])
        expect(new Scale({
            tonic: new Note('f', 3),
            name:  'Blues with Leading Tone',
        }).otherNames).to.eql('No other names')
    })

    it('#toString', () => {
        expect(C_Major.toString()).to.eql('C Major')
    })

    it('#degree', () => {
        expect(C_Major.degree(1)).to.eql(new Note('c', 3))
    })

    describe('#chords', () => {
        it('should have these chords with a C Major scale', () => {
            const stub = [
                new Chord({root: c, name: 'M'}),
                new Chord({root: new Note('d', 3), name: 'm'}),
                new Chord({root: new Note('e', 3), name: 'm'}),
                new Chord({root: new Note('f', 3), name: 'M'}),
                new Chord({root: new Note('g', 3), name: 'M'}),
                new Chord({root: new Note('a', 3), name: 'm'}),
                new Chord({root: new Note('b', 3), name: 'dim'}),
            ]
            stub.forEach((chord, index) => assertChord(C_Major, index + 1, chord))
        })
    })

    describe('#seventhChords', () => {
        it('should call chordFromNotes once even when called multiple times', () => {
            const spy = sinon.spy(Scale, 'chordsFromNotes')
            C_Major.seventhChords
            C_Major.seventhChords
            expect(spy).to.have.been.calledOnceWithExactly(C_Major.notes, true)
        })
    })

    describe('#pitchClassNamesString', () => {
        it('should return the pitch class names of the scale', () => {
            expect(C_Major.pitchClassesString).to.equal('C, D, E, F, G, A, B')
        })
    })

    describe('#notesString', () => {
        it('should return the note names of the scale', () => {
            expect(C_Major.notesString).to.equal('C3, D3, E3, F3, G3, A3, B3')
        })
    })

    describe('#raw', () => {
        it('should return an array of the scales raw notes', () => {
            console.log(C_Major.raw)
            expect(C_Major.raw).to.eql(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'])
        })
    })
})

function assertChord(scale, chord_degree, stub) {
    expect(scale.chord(chord_degree)).to.eql(stub)
}
