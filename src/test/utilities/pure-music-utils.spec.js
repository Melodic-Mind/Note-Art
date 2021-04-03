import {
  enharmonicPitchClass, getNotesInterval, getPatternFromNotes, getPatternFromPitchClasses, normalizePitchClass, toFlat
} from '../../utilities'

describe('#PureMusicUtils', () => {
  describe('#enharmonicPitchClass', () => {
    it('returns a pitch class properly spelled through 4 semitones', () => {
      expect(enharmonicPitchClass('B', 'G')).to.equal('Gxx')
    })

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('A#', 'G')).to.equal('Gx#')
    })

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('E', 'G')).to.equal('Gbbb')
    })

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('Ab', 'G')).to.equal('G#')
    })
  })

  describe('#normalizePitchClass', () => {
    it('just a letter', () => {
      expect(normalizePitchClass('C')).to.equal('C')
    })

    describe('with one sharp', () => {
      it('C# to C#', () => {
        expect(normalizePitchClass('C#')).to.equal('C#')
      })

      it('E# to F', () => {
        expect(normalizePitchClass('E#')).to.equal('F')
      })

      it('B# to C', () => {
        expect(normalizePitchClass('B#')).to.equal('C')
      })
    })

    describe('multiple sharps', () => {
      it('Cx to D', () => {
        expect(normalizePitchClass('Cx')).to.equal('D')
      })

      it('Bx to C#', () => {
        expect(normalizePitchClass('bx')).to.equal('C#')
      })

      it('Fxx to A', () => {
        expect(normalizePitchClass('Fxx')).to.equal('A')
      })

      it('gxxx# to D', () => {
        expect(normalizePitchClass('Gxxx#')).to.equal('D')
      })

      it('Dxxxxxx to D', () => {
        expect(normalizePitchClass('Dxxxxxx')).to.equal('D')
      })
    })

    describe('flats', () => {
      it('Cb to B', () => {
        expect(normalizePitchClass('Cb')).to.equal('B')
      })

      it('Cbbb to A', () => {
        expect(normalizePitchClass('Cbbb')).to.equal('A')
      })

      it('Gb to Gb', () => {
        expect(normalizePitchClass('Gb')).to.equal('Gb')
      })

      it('Gbb to F', () => {
        expect(normalizePitchClass('Gbb')).to.equal('F')
      })

      it('Ebbbb to C', () => {
        expect(normalizePitchClass('Ebbbb')).to.equal('C')
      })

      it('Ebbbbb to B', () => {
        expect(normalizePitchClass('Ebbbbb')).to.equal('B')
      })

      it('Fbbb to D', () => {
        expect(normalizePitchClass('Fbbb')).to.equal('D')
      })

      it('Bbbbbbbbbbbbb to B', () => {
        expect(normalizePitchClass('Bbbbbbbbbbbbb')).to.equal('B')
      })

      it('Dbbbb to Bb', () => {
        expect(normalizePitchClass('Dbbbb')).to.equal('Bb')
      })
    })
  })

  describe('#toFlat', () => {
    it('should turn sharp pitch classes flat', () => {
      expect(toFlat('C#')).to.equal('Db')
      expect(toFlat('D#')).to.equal('Eb')
    })

    it('should do nothing to other pitch classes', () => {
      expect(toFlat('C')).to.equal('C')
      expect(toFlat('Gb')).to.equal('Gb')
    })

    it('should turn sharp notes flat', () => {
      expect(toFlat('C#3')).to.equal('Db3')
      expect(toFlat('D#4')).to.equal('Eb4')
    })

    it('should do nothing to other notes', () => {
      expect(toFlat('C3')).to.equal('C3')
      expect(toFlat('Gb6')).to.equal('Gb6')
    })
  })

  describe('#getNotesInterval', () => {
    it('should return the correct interval between 2 notes', () => {
      expect(getNotesInterval('C3', 'G3')).to.equal(7)
      expect(getNotesInterval('C3', 'G4')).to.equal(19)
      expect(getNotesInterval('C3', 'G2')).to.equal(-5)
      expect(getNotesInterval('F3', 'Bb3')).to.equal(5)
    })
  })

  describe('#getPatternFromPitchClasses', () => {
    it('should return the correct pattern for pitch classes', () => {
      const pitchClasses = ['C', 'E', 'G', 'B']
      expect(getPatternFromPitchClasses(pitchClasses)).to.eql([0, 4, 7, 11])
    })

    it('should return the correct pattern for pitch classes - multiple octaves', () => {
      const pitchClasses = ['C', 'E', 'G', 'B', 'C', 'G', 'C']
      expect(getPatternFromPitchClasses(pitchClasses)).to.eql([0, 4, 7, 11, 12, 19, 24])
    })
  })

  describe('#getPatternFromNotes', () => {
    it('should return the correct pattern for notes', () => {
      const notes = ['C3', 'E3', 'G3', 'B2']
      expect(getPatternFromNotes(notes)).to.eql([0, 4, 7, -1])
    })

    it('should return the correct pattern for notes - multiple octaves', () => {
      const notes = ['C3', 'E3', 'G3', 'B2', 'C3', 'G4', 'C4']
      expect(getPatternFromNotes(notes)).to.eql([0, 4, 7, -1, 0, 19, 12])
    })
  })
})
