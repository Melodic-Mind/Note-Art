import {PitchClass}   from '../../src'
import {InvalidInput} from '../../src/Exceptions'

describe('PitchClass', () => {
  describe('static methods', () => {
    it('#isFlat', () => {
      expect(PitchClass.isFlat('Db')).to.be.true
      expect(PitchClass.isFlat('C')).to.be.false
      expect(PitchClass.isFlat('C#')).to.be.false
    })

    it('#isSharp', () => {
      expect(PitchClass.isSharp('Db')).to.be.false
      expect(PitchClass.isSharp('C')).to.be.false
      expect(PitchClass.isSharp('C#')).to.be.true
    })

    describe('#flatToSharp', () => {
      it('should return pitch class normalized to sharp when its flat', () => {
        expect(PitchClass.flatToSharp('Db')).to.equal('C#')
      })

      it('shouldn\'t do anything when pitch class is not flat', () => {
        expect(PitchClass.flatToSharp('D')).to.equal('D')
        expect(PitchClass.flatToSharp('C#')).to.equal('C#')
      })
    })

    describe('#sharpToFlat', () => {
      it('should return pitch class normalized to flat when its sharp', () => {
        expect(PitchClass.sharpToFlat('C#')).to.equal('Db')
      })

      it('shouldn\'t do anything when pitch class is not sharp', () => {
        expect(PitchClass.sharpToFlat('D')).to.equal('D')
        expect(PitchClass.sharpToFlat('Db')).to.equal('Db')
      })
    })

    describe('isPitchClass', () => {
      it('returns true when object is an instance of pitch class', () => {
        expect(PitchClass.isPitchClass(new PitchClass('C'))).to.be.true
      })

      it('returns false when object is not an instance of pitch class', () => {
        expect(PitchClass.isPitchClass({note: 'C'})).to.be.false
      })
    })
  })

  it('should have these attributes', () => {
    const pc = new PitchClass('C')
    expect(pc.pitchClass).to.eql('C')
    expect(pc.classSet).to.eql('b')
    expect(pc.classIndex).to.eql(0)
  })

  it('Throws exception when called with invalid pitchClass', () => {
    expect(() => new PitchClass('omg')).to.throw(InvalidInput)
  })

  describe('#set classSet', () => {
    it('should change only the classSet when the note doesn\'nt have a sharp or a flat', () => {
      const pitchClass    = new PitchClass('A')
      pitchClass.classSet = '#'
      expect(pitchClass.classSet).to.equal('#')
    })

    it('should normalize a flat note to sharp', () => {
      const pitchClass    = new PitchClass('Ab')
      pitchClass.classSet = '#'
      expect(pitchClass.classSet).to.equal('#')
      expect(pitchClass.pitchClass).to.equal('G#')
    })

    it('should do nothing when set is not valid', () => {
      const pitchClass    = new PitchClass('Ab')
      const stub          = new PitchClass('Ab')
      pitchClass.classSet = 'Jon'
      expect(pitchClass).to.eql(stub)
    })
  })

  it('#toString', () => {
    expect(new PitchClass('C').toString()).to.eql('C')
  })
})
