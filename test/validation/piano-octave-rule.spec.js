import {PianoOctaveRule} from '../../src/validation/PianoOctaveRule'
import {InvalidInput}    from '../../src/Exceptions'

describe('Piano Octave Rule', () => {
    describe('#validateAudible', () => {
        it('should return true when octave is audible', () => {
            expect(PianoOctaveRule.validateAudible(0, 'B')).to.be.true
            expect(PianoOctaveRule.validateAudible(1, 'C')).to.be.true
            expect(PianoOctaveRule.validateAudible(7, 'C')).to.be.true
            expect(PianoOctaveRule.validateAudible(8, 'C')).to.be.true
        })
        it('should return false when octave is inaudible', () => {
            expect(PianoOctaveRule.validateAudible(9, 'C')).to.be.false
            expect(PianoOctaveRule.validateAudible(0, 'C')).to.be.false
        })
    })
    describe('#validatePossible', () => {
        it('should return true when octave is integer', () => {
            expect(PianoOctaveRule.validatePossible(123)).to.be.true
        })
        it('should throw an error when octave is not integer', () => {
            expect(()=>{return PianoOctaveRule.validatePossible('12')}).to.throw(InvalidInput)
            expect(()=>{return PianoOctaveRule.validatePossible(false)}).to.throw(InvalidInput)
            expect(()=>{return PianoOctaveRule.validatePossible(undefined)}).to.throw(InvalidInput)
            expect(()=>{return PianoOctaveRule.validatePossible('Jon')}).to.throw(InvalidInput)
        })
    })
})
