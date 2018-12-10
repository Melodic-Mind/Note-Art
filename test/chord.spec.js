import {
    expect
} from 'chai'
import {
    Note,
    Piano, Chord
} from '../src'
import {NotAChordException} from '../src/Exceptions'

const piano = new Piano()
const c = new Note({note: 'c', octave: 3, duration: 'q'})

describe('Chord', () => {
    it('throws exception when a chord type is not valid', () => {
        expect(() => new Chord(c, 'blob')).to.throw(NotAChordException)
    })
    it('Builds a chord with a valid chord type', () => {
        expect(new Chord(c, 'M7')).to.be.instanceOf(Chord)
    })
    describe('Checks chord properties', () => {
        const c_Maj = new Chord(c, 'M')
        it('Checks notes', () => {
            const stub = [piano.note('c3q'), piano.note('e3q'), piano.note('g3q')]
            expect(c_Maj.notes).to.eql(stub)
        })
        it('Checks name', () => [
            expect(c_Maj.name).to.eql('Major')
        ])
        it('Checks notation', () => {
            expect(c_Maj.type).to.eql('M')
        })
        it('#toString', () => {
            expect(c_Maj.toString()).to.eql('C Major')
        })
        it('#newDuration', () => {
            expect(c_Maj.newDuration('e').notes[0]).to.eql(c.changeDuration('e'))
        })
        it('#transpose', () => {
            const stub = [piano.note('d3q'), piano.note('f#3q'), piano.note('a3q')]
            expect(c_Maj.tranpose(2).notes).to.eql(stub)
        })
    })
})