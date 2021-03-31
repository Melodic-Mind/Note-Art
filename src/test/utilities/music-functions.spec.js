import {
  Note,
  calculateInterval,
  notesInRange,
  noteToObject,
  PitchClass,
  spellScale,
  Scale, extractOctave, extractPitchClass
}                       from '../../'
import { InvalidInput } from '../../Exceptions'

describe('Music addon functions', () => {
  describe('#calculateInterval', () => {
    it('calculates the correct interval between two pitch classes', () => {
      expect(calculateInterval('C', 'G')).to.eql(7)
    })
  })

  describe('#extractFromPitch', () => {
    it('returns an object with pitch class and octave', () => {
      expect(noteToObject('e3')).to.eql({ pitchClass: 'E', octave: 3 })
      expect(noteToObject('bb4')).to.eql({ pitchClass: 'Bb', octave: 4 })
    })
  })

  describe('#notesInRange', () => {
    it('returns an array of notes formatted as cords', () => {
      expect(Object.keys(notesInRange('a3', 3))).to.eql(['A3', 'Bb3', 'B3', 'C4'])
    })
  })

  describe('#extractOctave', () => {
    it('returns the octave of a raw note', () => {
      expect(extractOctave('c5')).to.equal('5')
      expect(extractOctave('ebb4')).to.equal('4')
    })
  })

  describe('#extractPitchClass', () => {
    it('returns the pitch class of a raw note', () => {
      expect(extractPitchClass('c5')).to.equal('c')
      expect(extractPitchClass('ebb4')).to.equal('ebb')
    })
  })
})
