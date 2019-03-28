import {PitchClass} from '../../src/models/PitchClass'
import {InvalidInput} from '../../src/Exceptions'

describe('PitchClass', () => {
    it('#properties', () => {
        const pc = new PitchClass('C')
        expect(pc.pitchClass).to.eql('C')
        expect(pc.classSet).to.eql('b')
        expect(pc.classIndex).to.eql(0)
    })

    it('Throws exception when called with invalid pitchClass', () => {
        expect(() => new PitchClass('omg')).to.throw(InvalidInput)
    })

    it('#toString', () => {
        expect(new PitchClass('C').toString()).to.eql('C')
    })
})
