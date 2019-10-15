import {Chord, Note, PitchClass} from '../../src'
import {InvalidInput}            from '../../src/Exceptions'
import {ModelHelper}             from '../../src/utilities'

describe('ModelHelper', () => {
  describe('#pitchClassesToNotes', () => {
    it('should throw an Invalid Input error when pitch classes is not an array containing only pitch classes', () => {
      expect(() => ModelHelper.pitchClassesToNotes('OMG')).to.throw(InvalidInput)
      expect(() => ModelHelper.pitchClassesToNotes(['blob'])).to.throw(InvalidInput)
    })

    it('should throw an Invalid Input error when octave is not a number', () => {
      expect(() => ModelHelper.pitchClassesToNotes([new PitchClass('c'), 'NOT NUMBER'])).to.throw(InvalidInput)
    })

    it('should return an array of notes when input is valid', () => {
      const pitchClasses = [new PitchClass('c'), new PitchClass('e')]
      const stub         = [new Note('c', 3), new Note('e', 3)]
      expect(ModelHelper.pitchClassesToNotes(pitchClasses, 3)).to.eql(stub)
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
        const stub = [Note.builder('g3'), Note.builder('B3'), Note.builder('d4')]
        expect(ModelHelper.pitchClassesToPianoChordNotes(gChord.pitchClasses, 3)).to.eql(stub)
      })

      it('another normal chord', () => {
        const pitchClasses = [new PitchClass('g#'), new PitchClass('b'), new PitchClass('d')]
        const stub         = [Note.builder('g#3'), Note.builder('B3'), Note.builder('d4')]
        expect(ModelHelper.pitchClassesToPianoChordNotes(pitchClasses, 3)).to.eql(stub)
      })

      it('big Chord', () => {
        const bigChord = new Chord(g, [4, 7, 13, 17])
        const stub2    = [
          Note.builder('g3'),
          Note.builder('B3'),
          Note.builder('d4'),
          Note.builder('Ab4'),
          Note.builder('c5'),
        ]

        expect(ModelHelper.pitchClassesToPianoChordNotes(bigChord.pitchClasses, 3)).to.eql(stub2)
      })
    })

    it('should throw an error when the octave is not a valid piano octave', () => {
      expect(() => ModelHelper.pitchClassesToPianoChordNotes(gChord.pitchClasses, 'NOT OCTAVE')).to.throw(InvalidInput)
    })

    it('throws an error when pitchClasses is not an array of pitch classes', () => {
      expect(() => ModelHelper.pitchClassesToPianoChordNotes('omg', 2)).to.throw(InvalidInput)
    })

    it('should invert chords when called with inversion value', () => {
      const stub = [Note.builder('B3'), Note.builder('d4'), Note.builder('g4')]
      expect(ModelHelper.pitchClassesToPianoChordNotes(gChord.pitchClasses, 3, 1)).to.eql(stub)
    })
  })

  describe('#enharmonicPitchClass', () => {
    it('returns a pitch class properly spelled through 4 semitones', () => {
      const pc1 = new PitchClass('b'),
            pc2 = new PitchClass('g')
      expect(ModelHelper.enharmonicPitchClass(pc1, pc2)).to.equal('Gxx')
    })

    it('properly spells sharp pitch class', () => {
      const pc1 = new PitchClass('a#'),
            pc2 = new PitchClass('g')
      expect(ModelHelper.enharmonicPitchClass(pc1, pc2)).to.equal('Gx#')
    })

    it('properly spells sharp pitch class', () => {
      const pc1 = new PitchClass('e'),
            pc2 = new PitchClass('g')
      expect(ModelHelper.enharmonicPitchClass(pc1, pc2)).to.equal('Gbbb')
    })

    it('properly spells sharp pitch class', () => {
      const pc1 = new PitchClass('ab'),
            pc2 = new PitchClass('g')
      expect(ModelHelper.enharmonicPitchClass(pc1, pc2)).to.equal('G#')
    })
  })

  describe('#transformPitchClass', () => {
    it('just a letter', () => {
      expect(ModelHelper.transformPitchClass(new PitchClass('C'))).to.equal('C')
    })

    describe('with one sharp', () => {
      it('C# to C#', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('C#'))).to.equal('C#')
      })

      it('E# to F', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('E#'))).to.equal('F')
      })

      it('B# to C', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('B#'))).to.equal('C')
      })
    })

    describe('multiple sharps', () => {
      it('Cx to D', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Cx'))).to.equal('D')
      })

      it('Bx to C#', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('bx'))).to.equal('C#')
      })

      it('Fxx to A', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('fxx'))).to.equal('A')
      })

      it('gxxx# to D', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('gxxx#'))).to.equal('D')
      })

      it('Dxxxxxx to D', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('dxxxxxx'))).to.equal('D')
      })
    })

    describe('flats', () => {
      it('Cb to B', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Cb'))).to.equal('B')
      })

      it('Cbbb to A', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Cbbb'))).to.equal('A')
      })

      it('Gb to Gb', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Gb'))).to.equal('Gb')
      })

      it('Gbb to F', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Gbb'))).to.equal('F')
      })

      it('Ebbbb to C', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Ebbbb'))).to.equal('C')
      })

      it('Ebbbbb to B', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Ebbbbb'))).to.equal('B')
      })

      it('Fbbb to D', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Fbbb'))).to.equal('D')
      })

      it('Bbbbbbbbbbbbb to B', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Bbbbbbbbbbbbb'))).to.equal('B')
      })

      it('Dbbbb to Bb', () => {
        expect(ModelHelper.transformPitchClass(new PitchClass('Dbbbb'))).to.equal('Bb')
      })
    })
  })
})
