import {
  Note,
  validateRawNote,
  calculateInterval,
  notesInRange,
  noteToObject,
  toPianoChordNotes,
  Chord,
  PitchClass,
}                     from '../../src'
import {InvalidInput} from '../../src/Exceptions'

describe('Music addon functions', () => {
  describe('#toPianoChordNotes', () => {
    let g, gChord
    beforeEach(() => {
      g      = new PitchClass('g')
      gChord = new Chord(g, [4, 7])
    })

    it('returns the correct notes for a chord', () => {
      const stub = [Note.builder('g3'), Note.builder('B3'), Note.builder('d4')]
      expect(toPianoChordNotes(gChord.pitchClasses, 3)).to.eql(stub)
    })

    it('should throw an error when the octave is not a valid piano octave', () => {
      expect(() => toPianoChordNotes(gChord.pitchClasses, 'NOT OCTAVE')).to.throw(InvalidInput)
    })

    it('throws an error when pitchClasses is not an array of pitch classes', () => {
      expect(() => toPianoChordNotes('omg', 2)).to.throw(InvalidInput)
    })

    it('should invert chords when called with inversion value', () => {
      const stub = [Note.builder('B3'), Note.builder('d4'), Note.builder('g4')]
      expect(toPianoChordNotes(gChord.pitchClasses, 3, 1)).to.eql(stub)
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
    it('returns an array of notes formatted as strings', () => {
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

  describe('#validateRawNote', () => {
    it('should return true when a note is valid', () => {
      expect(validateRawNote('c3')).to.be.true
      expect(validateRawNote('c#3')).to.be.true
      expect(validateRawNote('db3')).to.be.true
      expect(validateRawNote('r')).to.be.true
      expect(validateRawNote('R')).to.be.true
    })

    it('should throw an error when a note is not valid', () => {
      expect(() => {
        validateRawNote('c')
      }).to.throw(InvalidInput)
      expect(() => {
        validateRawNote(new Note('c3'))
      }).to.throw(InvalidInput)
      expect(() => {
        validateRawNote(123)
      }).to.throw(InvalidInput)
    })
  })
})
