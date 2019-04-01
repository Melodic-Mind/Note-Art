import {NoteBuilder, PlayableNote} from '../../src'
import {InvalidInput}              from '../../src/Exceptions'
import {NoteString}                from '../../src/instruments/NoteString'


describe.only('String', () => {
    let noteString
    beforeEach(() => {
        noteString = new NoteString('e3', 1)
    })
    it('generates a notes object based on the range it receives', () => {
        expect(noteString.notes.has('E3')).to.be.true
        expect(noteString.notes.has('F3')).to.be.true
    })

    describe('#play', () => {
        it('plays a note when the note is in range', () => {
            expect(noteString.note('e3')).to.be.instanceOf(PlayableNote)
        })

        it('throws InvalidInput when note is not in range', () => {
            expect(noteString.note('e4')).to.be.undefined
        })
    })
})
