import {GuitarChordPattern} from '../../src/models/GuitarChordPattern'
import {PitchClass}         from '../../src'
import {InvalidInput}       from '../../src/Exceptions'

describe('Guitar Chord Pattern', () => {
    let c, g, gcp
    beforeEach(() => {
        c   = new PitchClass('c')
        g   = new PitchClass('g')
        gcp = new GuitarChordPattern([3, 2, 0, 0, 3, 3], new PitchClass('g'), 'Major')
    })

    describe('#ctor', () => {
        it('should throw an error when pattern is not valid', () => {
            expect(() => new GuitarChordPattern()).to.throw(InvalidInput)
        })
    })

    describe('#getChord', () => {
        it('returns a string representing the chord correctly', () => {
            const gChord = gcp.getChord(g)
            expect(gChord.chord).to.equal('320033')
            expect(gChord.name).to.equal('G Major')
            expect(gcp.getChord(c).chord).to.equal('875588')
        })

        it('throws an error when root is not an instance of pitch class', () => {
            expect(() => gcp.getChord('G')).to.throw(InvalidInput)
        })
    })
})
