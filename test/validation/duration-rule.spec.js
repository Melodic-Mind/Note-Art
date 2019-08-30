import {DurationRule} from '../../src'

describe('Duration Rule', () => {
  describe('#validate', () => {
    it('returns true when a duration is valid', () => {
      expect(DurationRule.validate('4n')).to.be.true
    })
    it('returns false when a duration is invalid', () => {
      expect(DurationRule.validate(23)).to.be.false
    })
  })
})
