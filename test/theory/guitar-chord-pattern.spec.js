import {PitchClass, GuitarChordPattern} from '../../src'
import {InvalidInput}                   from '../../src/Exceptions'

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
      expect(gChord.pattern).to.eql([3, 2, 0, 0, 3, 3])
      expect(gChord.name).to.equal('G Major')
      expect(gcp.getChord(c).pattern).to.eql([8, 7, 5, 5, 8, 8])
    })

    it('throws an error when root is not an instance of pitch class', () => {
      expect(() => gcp.getChord('G')).to.throw(InvalidInput)
    })

    it('works for chord with x is well', () => {
      const C_gcp = new GuitarChordPattern(['x', 3, 2, 0, 1, 0], c, 'Major')
      expect(C_gcp.getChord(c).pattern).to.eql(['x', 3, 2, 0, 1, 0])
      expect(C_gcp.getChord(g).pattern).to.eql(['x', 10, 9, 7, 8, 7])
    })
  })
})
