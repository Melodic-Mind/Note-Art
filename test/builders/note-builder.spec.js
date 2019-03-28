import 'jsdom-global/register'
import {NoteBuilder, PlayableNote, Note} from '../../src'

describe('NoteBuilder', () => {
    describe('#build', () => {
        it('returns a Note instance when called with no arguments', () => {
            expect(new NoteBuilder({pitchClass: 'c'}).build()).to.be.instanceOf(Note)
        })

        it('returns a PlayableNote instance when called with \'true\'', () => {
            expect(new NoteBuilder({pitchClass: 'c', duration: '8n'}).build(true)).to.be.instanceOf(PlayableNote)
            expect(new NoteBuilder({octave: 5, pitchClass: 23, instrument: 'Piano'}).build(true))
                .to.be.instanceOf(PlayableNote)
            // expect(new NoteBuilder({duration: 23}).build(true)).to.be.instanceOf(PlayableNote)
            // expect(new NoteBuilder({instrument: 'Piano'}).build(true)).to.be.instanceOf(PlayableNote)
        })
    })
})
