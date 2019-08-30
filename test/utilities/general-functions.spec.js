import {firstToUpper, twoDigitFormat, PitchClass, validateInstance, switchMembers, reArrangeArray} from '../../src'
import {InvalidInput}                                                                              from '../../src/Exceptions'

describe('general-functions', () => {
  it('#firstToUpper', () => {
    const stub = 'Major'
    expect(firstToUpper('major')).to.eql(stub)
  })

  it('#twoDigitFormat', () => {
    expect(twoDigitFormat(1.213)).to.eql(1.21)
  })

  describe('#switchMember', () => {
    it('should return a new array with the members at the indexes switched', () => {
      expect(switchMembers([1, 2], 0, 1)).to.eql([2, 1])
    })
  })

  describe('#reArrangeArray', () => {
    it('should re-arrange an array', () => {
      expect(reArrangeArray([1, 2, 3, 4], 1)).to.eql([2, 3, 4, 1])
      expect(reArrangeArray([1, 2, 3, 4, 5, 6], 3)).to.eql([4, 5, 6, 1, 2, 3])
    })
  })
})
