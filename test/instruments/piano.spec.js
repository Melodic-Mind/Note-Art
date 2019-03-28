import { expect } from 'chai'
import { Note, Piano, PlayableNote } from '../../src'

const piano = new Piano()

describe('Piano', () => {
    const stub = new PlayableNote({pitchClass:'c', octave:3, duration:'8n', instrument:'Piano'})
    it('#note', () => {
        expect(piano.note('c38n')).to.eql(stub)
        expect(piano.note('e54n').toString()).to.eql('E5')
    })
    it('returns undefind when note doesnt exist', () => {
        expect(piano.note('nonExistent')).to.be.undefined
    })
})
