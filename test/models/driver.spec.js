import {Driver, Piano, Piece} from '../../src'
import Tone                   from 'tone'

let driver, piece, transportStub
beforeEach(() => {
    piece         = new Piece()
    driver        = new Driver(piece, [new Piano()])
    // transportStub = sinon.stub(Tone.Transport)
})

afterEach(() => {
    // transportStub.restore()
})

describe('Driver', () => {
    describe('new driver', () => {
        it('has these attributes', () => {
            expect(Object.keys(driver)).to.eql(['piece', 'instruments'])
        })
    })

    describe('#play', () => {
        it('should use Tone.transport to schedule and play', () => {

        })
    })
})
