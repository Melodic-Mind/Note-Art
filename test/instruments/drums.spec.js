import {Drums} from '../../src/'

describe('Drums', () => {
    it('can play', () => {
        const drum = new Drums()
        expect(drum.play()).to.be.undefined
    })
})
