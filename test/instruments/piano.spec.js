import {expect}       from 'chai'
import {Note, Piano}  from '../../src'
import {InvalidInput} from '../../src/Exceptions'


describe('Piano', () => {
    let piano
    beforeEach(() => {
        piano = new Piano()
    })

    describe('#InstrumentPath', () => {
        expect(Piano.instrumentPath).to.equal('piano')
    })
})
