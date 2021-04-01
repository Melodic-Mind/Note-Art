import { PitchClass, GuitarChordPattern } from '../..'
import { InvalidInput }                   from '../../Exceptions'

describe('Guitar Chord Pattern', () => {
  let c, g, gcp
  beforeEach(() => {
    c = 'C'
    g   = 'G'
    gcp = new GuitarChordPattern([3, 2, 0, 0, 3, 3], new PitchClass('g'), 'Major')
  })

  describe('#getChord', () => {
    it('returns a string representing the chord correctly', () => {
      const gChord = gcp.getChord(g)
      expect(gChord.pattern).to.eql([3, 2, 0, 0, 3, 3])
      expect(gChord.name).to.equal('G Major')
      expect(gcp.getChord(c).pattern).to.eql([8, 7, 5, 5, 8, 8])
    })

    it('works for chord with x is well', () => {
      const C_gcp = new GuitarChordPattern(['x', 3, 2, 0, 1, 0], new PitchClass(c), 'Major')
      expect(C_gcp.getChord(c).pattern).to.eql(['x', 3, 2, 0, 1, 0])
      expect(C_gcp.getChord(g).pattern).to.eql(['x', 10, 9, 7, 8, 7])
    })
  })
})
