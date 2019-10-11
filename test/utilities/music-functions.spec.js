import {
  Note,
  calculateInterval,
  notesInRange,
  noteToObject,
  Chord,
  PitchClass,
  spellScale,
  Scale,
}                     from '../../src'
import {InvalidInput} from '../../src/Exceptions'

describe('Music addon functions', () => {
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


  describe('#spellScale', () => {
    describe('spells a scale correctly', () => {
      it('Locrian - [1, 3, 5, 6, 8, 10])', () => {
        const pc    = new PitchClass('g')
        const scale = new Scale(pc, [1, 3, 5, 6, 8, 10])
        const stub  = ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
        expect(spellScale(scale)).to.eql(stub)
      })

      it('with [1, 3, 5, 6, 8, 10])', () => {
        const pc    = new PitchClass('f')
        const scale = new Scale(pc, [1, 2, 5, 6, 7, 8])
        const stub  = ['F', 'Gb', 'Abb', 'Bb', 'Cb', 'Dbb', 'Ebbb']
        expect(spellScale(scale)).to.eql(stub)
      })

        it('with [1, 2, 6, 8, 9, 11]', () => {
        const pc    = new PitchClass('db')
        const scale = new Scale(pc, [1, 2, 6, 8, 9, 11])
        const stub  = ['Db', 'Ebb', 'Fbb', 'G', 'A', 'Bb', 'C']
        expect(spellScale(scale)).to.eql(stub)
      })
    })
  })
})
