import { Chord, enharmonicPitchClass, normalizePitchClass, Note, PitchClass } from '../../'
import { InvalidInput }                                                       from '../../Exceptions'
import { ModelHelper }             from '../../utilities'

describe('#PureMusicUtils', () => {
  describe('#enharmonicPitchClass', () => {
    it('returns a pitch class properly spelled through 4 semitones', () => {
      expect(enharmonicPitchClass('B', 'G')).to.equal('Gxx')
    })

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('A#', 'G')).to.equal('Gx#')
    })

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('E','G')).to.equal('Gbbb')
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
})
