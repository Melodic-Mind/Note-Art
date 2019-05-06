import {AudioManager} from '../../src/utilities/AudioManager'
import Tone           from 'tone'

describe('Audio Manager', () => {
    it('#getAudioMap', () => {
        const stub = sinon.stub(Tone, 'Players')
        AudioManager.getAudioMap()
        expect(stub).to.have.been.calledOnce
        stub.restore()
    })

    it('#resumeContext', () => {
        expect(() => {AudioManager.resumeContext()}).to.throw(TypeError)
    })

    it('#toMaster', () => {
        expect(() => {AudioManager.toMaster()}).to.throw(TypeError)
    })
})
