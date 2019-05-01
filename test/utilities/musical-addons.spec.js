import {Note, validateRawNote, notesDistance, Piano, notesInRange, noteToObject} from '../../src'
import {InvalidInput}                                                                                from '../../src/Exceptions'

const piano = new Piano()

describe('Music addon functions', () => {
    it('#notesDistance', () => {
        const n1 = new Note( 'c', 5),
              n2 = new Note('g',  5)
        expect(notesDistance(n1, n2)).to.eql(7)
    })

    describe('#extractFromPitch', () => {
        it('returns an object with pitch class and octave', () => {
            expect(noteToObject('e3')).to.eql({pitchClass: 'E', octave: 3})
            expect(noteToObject('bb4')).to.eql({pitchClass: 'Bb', octave: 4})
        })
    })

    describe('#notesInRange', () => {
        it('returns an array of notes formatted as strings', () => {
            expect(Object.keys(notesInRange('a3', 3))).to.eql(['A3', 'Bb3', 'B3', 'C4'])
        })
        it('throws an error when an argument is invalid', () => {
            expect(() => {return notesInRange(2, 3)}).to.throw(InvalidInput)
            expect(() => {return notesInRange(2, 'qwe')}).to.throw(InvalidInput)
        })
    })

    describe('#validateRawNote', () => {
        it('should return true when a note is valid', () => {
            expect(validateRawNote('c3')).to.be.true
            expect(validateRawNote('c#3')).to.be.true
            expect(validateRawNote('db3')).to.be.true
            expect(validateRawNote('r')).to.be.true
            expect(validateRawNote('R')).to.be.true
        })

        it('should throw an error when a note is not valid', () => {
            expect(() => {validateRawNote('c')}).to.throw(InvalidInput)
            expect(() => {validateRawNote(new Note('c3'))}).to.throw(InvalidInput)
            expect(() => {validateRawNote(123)}).to.throw(InvalidInput)
        })
    })
})
