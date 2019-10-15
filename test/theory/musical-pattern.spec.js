import {PitchClass, MusicalPattern} from '../../src'
import {InvalidInput}               from '../../src/Exceptions'

describe('Musical Pattern', () => {
  describe('#constructor', () => {
    it('should throw an error when root is not a valid pitch class', () => {
      expect(() => {new MusicalPattern(2, [1, 2, 3])}).to.throw(InvalidInput)
      expect(() => {new MusicalPattern('l', [1, 2, 3])}).to.throw(InvalidInput)
    })

    it('should throw an error when pattern is not a valid array with intervals as numbers', () => {
      expect(() => {new MusicalPattern('c', 'NOT VALID')}).to.throw(InvalidInput)
      expect(() => {new MusicalPattern('c', [1, 2, 3, 'E'])}).to.throw(InvalidInput)
    })

    it('creates a new musical pattern with the intervals', () => {
      const mp   = new MusicalPattern(new PitchClass('C'), [1, 2])
      const stub = [
        new PitchClass('C'),
        new PitchClass('Db'),
        new PitchClass('D'),
      ]

      expect(mp.pitchClasses).to.eql(stub)
      expect(mp.info).to.eql({pattern: [1, 2]})
      expect(mp.raw).to.eql(['C', 'Db', 'D'])
    })

    it('creates a new musical pattern with info', () => {
      const mp = new MusicalPattern(new PitchClass('C'), [4, 7], {name: 'Major'})
      expect(mp.info).to.eql({name: 'Major', pattern: [4, 7]})
      expect(mp.pattern).to.eql([4, 7])
    })
  })

  describe('#interval', () => {
    it('transposes a musical pattern correctly', () => {
      const mp   = new MusicalPattern(new PitchClass('C'), [1, 2])
      const stub = [
        new PitchClass('D'),
        new PitchClass('Eb'),
        new PitchClass('E'),
      ]
      expect(mp.transpose(2).pitchClasses).to.eql(stub)
    })

    it('throws error when interval is not valid', () => {
      const mp = new MusicalPattern(new PitchClass('C'), [1, 2])
      expect(() => mp.transpose('3').pitchClasses).to.throw(InvalidInput)
    })
  })

  describe('#toString', () => {
    it('should return a string of the pitch classes of the pattern', () => {
      expect(new MusicalPattern(new PitchClass('c'), [1, 2]).toString()).to.eql('C, Db, D')
    })
  })
})
