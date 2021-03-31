import {
  calculateInterval,
  notesInRange,
  noteToObject,
  extractOctave, extractPitchClass, pitchClassesToPianoChordNotes, pitchClassesToNotes, transposeNote
} from '../../utilities'
import { PitchClass, Chord } from '../../theory'

describe('Music addon functions', () => {
  describe('#calculateInterval', () => {
    it('calculates the correct interval between two pitch classes', () => {
      expect(calculateInterval('C', 'G')).to.eql(7)
    })
  })

  describe('#transposeNote', () => {
    it('transpose a note correctly by interval', () => {
      expect(transposeNote('C3', 7)).to.eql('G3')
      expect(transposeNote('C3', -7)).to.eql('F2')
      expect(transposeNote('G3', 7)).to.eql('D4')
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

  describe('#pitchClassesToNotes', () => {
    it('should return an array of notes when input is valid', () => {
      const pitchClasses = ['C', 'E']
      const stub         = ['C3', 'E3']
      expect(pitchClassesToNotes(pitchClasses, 3)).to.eql(stub)
    })
  })

  describe('#pitchClassesToPianoChordNotes', () => {
    let g, gChord
    beforeEach(() => {
      g      = new PitchClass('g')
      gChord = new Chord(g, [4, 7])
    })

    describe('returns the correct notes for a chord', () => {
      it('normal chord', () => {
        const stub = ['G3', 'B3', 'D4']
        expect(pitchClassesToPianoChordNotes(gChord.raw, 3)).to.eql(stub)
      })

      it('another normal chord', () => {
        const pitchClasses = ['G#', 'B', 'D']
        const stub         = ['G#3', 'B3', 'D4']
        expect(pitchClassesToPianoChordNotes(pitchClasses, 3)).to.eql(stub)
      })

      it('big Chord', () => {
        const bigChord = new Chord(g, [4, 7, 13, 17])
        const stub2    = ['G3', 'B3', 'D4', 'Ab4', 'C5']

        expect(pitchClassesToPianoChordNotes(bigChord.raw, 3)).to.eql(stub2)
      })
    })

    it('should invert chords when called with inversion value', () => {
      const stub = ['B3', 'D4', 'G4']
      expect(pitchClassesToPianoChordNotes(gChord.raw, 3, 1)).to.eql(stub)
    })
  })
})
