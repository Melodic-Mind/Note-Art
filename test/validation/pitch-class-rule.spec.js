import {PitchClassRule} from '../../src/validation/PitchClassRule'
import {InvalidInput}   from '../../src/Exceptions'

describe('Pitch Class Rule', () => {
    it('should return true when valid', () => {
        expect(PitchClassRule.existingClass('C')).to.be.true
        expect(PitchClassRule.existingClass('c')).to.be.true
    })
    it('should throw an error when a pitch class is not valid', () => {
        expect(() => {return PitchClassRule.existingClass('q')}).to.throw(InvalidInput)
    })
})
