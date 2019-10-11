import {PitchClass, Chord} from '../../src'
import {InvalidInput}      from '../../src/Exceptions'

const c = new PitchClass('c')

describe('Chord', () => {
  describe('#inversion', () => {
    it('Returns the pitch classes in the inversion order', () => {
      const chord = new Chord(c, [4, 7])
      const stub  = [
        new PitchClass('e'),
        new PitchClass('g'),
        new PitchClass('c'),
      ]
      expect(chord.inversion(1)).to.eql(stub)
    })

    it('throws InvalidInput error when the type is not valid', () => {
      expect(() => new Chord(c, [1,2,3]).inversion(20)).to.throw(InvalidInput)
    })
  })
})
