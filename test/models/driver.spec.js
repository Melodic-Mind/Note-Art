import {Driver, Piano, Score} from '../../src'

let driver, score, transportStub
beforeEach(() => {
    score  = new Score()
    driver = new Driver(score, [new Piano()])
    // transportStub = sinon.stub(Tone.Transport)
})

afterEach(() => {
    // transportStub.restore()
})

describe('Driver', () => {
    describe('new driver', () => {
        it('has these attributes', () => {
            // expect(Object.keys(driver)).to.eql(['score', 'instruments'])
        })
    })

    describe('#play', () => {
        it('should use Tone.transport to schedule and play', () => {

        })
    })
})
