import { firstToUpper, twoDigitFormat, PitchClass, isInstanceOf } from '../../src'
import { InvalidInput }                      from '../../src/Exceptions'

describe('Addons', () => {
    it('#firstToUpper', () => {
        const stub = 'Major'
        expect(firstToUpper('major')).to.eql(stub)
    })

    it('#twoDigitFormat', () => {
        expect(twoDigitFormat(1.213)).to.eql(1.21)
    })

    describe('#isInstanceOf', () => {
        it('should Return true when obj is instance of class', () => {
            expect(isInstanceOf(new PitchClass('c'), PitchClass)).to.be.true
        })

        it('should Return false when obj is not instance of class', () => {
            expect(() => isInstanceOf('b', PitchClass)).to.throw(InvalidInput)
        })
    })
})
