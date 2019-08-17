import {Scale, PitchClass, Chord} from '../../src'

describe('Scale', () => {

    let C_Major
    beforeEach(() => {
        C_Major = new Scale(new PitchClass('c'), [2, 4, 5, 7, 9, 11])
    })

    it('#properties', () => {
        const stub = [
            new PitchClass('c'),
            new PitchClass('d'),
            new PitchClass('e'),
            new PitchClass('f'),
            new PitchClass('g'),
            new PitchClass('a'),
            new PitchClass('b'),
        ]

        expect(C_Major.pitchClasses).to.eql(stub)
    })

    it('#degree', () => {
        expect(C_Major.degree(1)).to.eql(new PitchClass('c'))
    })

    describe('#chords', () => {
        it('should have these chords with a C Major scale', () => {
            const stub = [
                new Chord(new PitchClass('c'), [4, 7]),
                new Chord(new PitchClass('d'), [3, 7]),
                new Chord(new PitchClass('e'), [3, 7]),
                new Chord(new PitchClass('f'), [4, 7]),
                new Chord(new PitchClass('g'), [4, 7]),
                new Chord(new PitchClass('a'), [3, 7]),
                new Chord(new PitchClass('b'), [3, 6]),
            ]
            expect(C_Major.chords).to.eql(stub)
        })
    })

    describe('#seventhChords', () => {
        it('should have these seventh chords with a C Major scale', () => {
            const stub = [
                new Chord(new PitchClass('c'), [4, 7, 11]),
                new Chord(new PitchClass('d'), [3, 7, 10]),
                new Chord(new PitchClass('e'), [3, 7, 10]),
                new Chord(new PitchClass('f'), [4, 7, 11]),
                new Chord(new PitchClass('g'), [4, 7, 10]),
                new Chord(new PitchClass('a'), [3, 7, 10]),
                new Chord(new PitchClass('b'), [3, 6, 10]),
            ]
            expect(C_Major.seventhChords).to.eql(stub)
        })
    })
})
