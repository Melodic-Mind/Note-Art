import {PitchClass, validateInstance} from "../../src";
import {InvalidInput}                 from "../../src/Exceptions";


describe('#validateInstance', () => {
    it('should Return true when obj is instance of class', () => {
        expect(validateInstance(new PitchClass('c'), PitchClass)).to.be.true
    })

    it('should Return false when obj is not instance of class', () => {
        expect(() => validateInstance('b', PitchClass)).to.throw(InvalidInput)
    })
})
