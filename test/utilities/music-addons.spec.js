import {Note, getMinDuration, notesDistance, playMelodically, Piano, notesInRange, pitchToObject} from '../../src'
import {InvalidInput}                                                                                from '../../src/Exceptions'

const piano = new Piano()

describe('Music addon functions', () => {
    it('#getMinDuration', () => {
        const noteArray = [
            new Note({pitchClass: 'c', octave: 3, duration: '4n'}),
            new Note({pitchClass: 'c', octave: 3, duration: '8n'}),
        ]
        expect(getMinDuration(noteArray)).to.eql(2)
    })

    it('#notesDistance', () => {
        const n1 = new Note({'pitchClass': 'c', octave: 5, duration: '2n'}),
              n2 = new Note({'pitchClass': 'g', octave: 5, duration: '2n'})
        expect(notesDistance(n1, n2)).to.eql(7)
    })

    it('#playMelodically', () => {
        expect(playMelodically([piano.note('c34n'), piano.note('e34n')], 300)).to.be.true
    })

    describe('#extractFromPitch', () => {
        it('returns an object with pitch class and octave', () => {
            expect(pitchToObject('e3')).to.eql({pitchClass: 'E', octave: 3})
            expect(pitchToObject('bb4')).to.eql({pitchClass: 'Bb', octave: 4})
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
})
