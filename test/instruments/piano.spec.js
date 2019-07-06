import {Piano}  from '../../src'


describe('Piano', () => {
    let piano
    beforeEach(() => {
        piano = new Piano()
    })

    describe('#InstrumentPath', () => {
        expect(Piano.instrumentPath).to.equal('piano')
    })
})
