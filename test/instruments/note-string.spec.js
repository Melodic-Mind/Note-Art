import {Note}         from '../../src'
import {InvalidInput} from '../../src/Exceptions'
import {NoteString}   from '../../src/instruments/NoteString'


describe('NoteString', () => {
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
            expect(noteString.note('e3')).to.be.instanceOf(Note)
        })

        it('throws InvalidInput when note is not in range', () => {
            expect(noteString.note('e4')).to.be.undefined
        })
    })

    describe('#fret', () => {
        let noteString
        beforeEach(() => {
            noteString = new NoteString('e3', 12)
        })

        it('should return the note at the given fret', () => {
            expect(noteString.fret(0)).to.equal('E3')
            expect(noteString.fret('7')).to.equal('B3')
        })

        it('should return undefined when that fret does not exist for the string', () => {
            expect(noteString.fret(20)).to.be.undefined
        })
    })
})
