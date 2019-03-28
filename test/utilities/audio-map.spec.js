import {Piano, AudioManager, app, PlayableNote} from '../../src'

const piano    = new Piano()
const audiomap = app.get('audio-manager')
describe('AudioManager', () => {
    it('#normalizeSet', () => {
        const n = piano.note('g#34n')
        expect(AudioManager.normalizeSet(n.pitchClass, n.classSet)).to.eql('Ab')
    })

    it('#getKey', () => {
        expect(AudioManager.getKey(piano.note('c34n'))).to.eql('PiC3')
    })

    it('#set, #get', () => {
        const c = piano.note('c34n')
        audiomap.setNote(c)
        expect(audiomap.getPlayer(c)).to.be.instanceOf(PlayableNote)
    })
})
