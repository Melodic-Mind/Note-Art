import {PitchClassRule} from '../../src'
import {InvalidInput}   from '../../src/Exceptions'

describe('Pitch Class Rule', () => {
    it('should return true when valid', () => {
        expect(PitchClassRule.exists('C')).to.be.true
        expect(PitchClassRule.exists('c')).to.be.true
    })

    it('should throw an error when a pitch class is not valid', () => {
        expect(() => {return PitchClassRule.exists('q')}).to.throw(InvalidInput)
    })
})
