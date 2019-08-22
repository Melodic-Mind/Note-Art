import {Piano} from '../../src'


describe('Piano', () => {
    let piano
    beforeEach(() => {
        piano = new Piano()
    })

    it('has the path set to piano', () => {
        expect(Piano.instrumentPath).to.equal('piano')
    })

    it('#toString', () => {
        expect(piano.toString()).to.equal('Piano')
    })
})
