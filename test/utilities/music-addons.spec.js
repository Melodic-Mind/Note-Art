import { Note, getMinDuration, notesDistance, playMelodically, Piano } from '../../src'

const piano = new Piano()

describe('Music addon functions', () => {
    it('#getMinDuration', () => {
        const noteArray = [
            new Note({ pitchClass: 'c', octave: 3, duration: '4n' }),
            new Note({ pitchClass: 'c', octave: 3, duration: '8n' })
        ]
        expect(getMinDuration(noteArray)).to.eql(2)
    })

    it('#notesDistance', () => {
        const n1 = new Note({ 'pitchClass': 'c', octave: 5, duration: '2n' }),
            n2 = new Note({ 'pitchClass': 'g', octave: 5, duration: '2n' })
        expect(notesDistance(n1,n2)).to.eql(7)
    })

    it('#playMelodically', () => {
        expect(playMelodically([piano.note('c34n'), piano.note('e34n')], 300)).to.be.true
    })
})
