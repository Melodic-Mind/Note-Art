import {Note}         from '../../src'
import {InvalidInput} from '../../src/Exceptions'

const c = new Note({
    pitchClass: 'c',
    octave:     3,
    duration:   '4n',
})

describe('Note', () => {
    describe('#constructor', () => {
        it('throws an error when a pitch-class is invalid', () => {
            expect(() => new Note({pitchClass: 12, octave: 3, duration: '4n'})).to.throw(InvalidInput)
        })

        it('throws an error when a duration is invalid', () => {
            expect(() => new Note({pitchClass: 'd', octave: 2.5, duration: '4n'})).to.throw(InvalidInput)
        })

        it('throws an error when a duration is invalid', () => {
            expect(() => new Note({pitchClass: 'c', octave: 3, duration: '12'})).to.throw(InvalidInput)
        })

        it('a note has the following attributes', () => {
            expect(c.pitchClass).to.eql('C')
            expect(c.octave).to.eql(3)
            expect(c.duration).to.eql('4n')
            expect(c.classSet).to.eql('b')
            expect(c.classIndex).to.eql(0)
        })
    })

    describe('#interval:', () => {
        it('Checks the note Db', function () {
            const db      = new Note({
                pitchClass: 'db',
                octave:     5,
                duration:   '4n',
            })
            const db_stub = {
                '-13': new Note({pitchClass: 'c', octave: 4, duration: '4n'}),
                '-12': new Note({pitchClass: 'db', octave: 4, duration: '4n'}),
                '-11': new Note({pitchClass: 'd', octave: 4, duration: '4n'}),
                '-1':  new Note({pitchClass: 'c', octave: 5, duration: '4n'}),
                '0':   new Note({pitchClass: 'db', octave: 5, duration: '4n'}),
                '1':   new Note({pitchClass: 'd', octave: 5, duration: '4n'}),
                '11':  new Note({pitchClass: 'c', octave: 6, duration: '4n'}),
                '12':  new Note({pitchClass: 'db', octave: 6, duration: '4n'}),
                '13':  new Note({pitchClass: 'd', octave: 6, duration: '4n'}),
            }
            testNoteIntervals(db, db_stub)
        })

        it('Checks the note cs', function () {
            const cs      = new Note({
                pitchClass: 'c#'
                , octave:   3, duration: '4n',
            })
            const cs_stub = {
                '-13': new Note({pitchClass: 'c', octave: 2, duration: '4n'}),
                '-12': new Note({pitchClass: 'c#', octave: 2, duration: '4n'}),
                '-11': new Note({pitchClass: 'd', octave: 2, duration: '4n'}),
                '-1':  new Note({pitchClass: 'c', octave: 3, duration: '4n'}),
                '0':   new Note({pitchClass: 'c#', octave: 3, duration: '4n'}),
                '1':   new Note({pitchClass: 'd', octave: 3, duration: '4n'}),
                '11':  new Note({pitchClass: 'c', octave: 4, duration: '4n'}),
                '12':  new Note({pitchClass: 'c#', octave: 4, duration: '4n'}),
                '13':  new Note({pitchClass: 'd', octave: 4, duration: '4n'}),
            }
            testNoteIntervals(cs, cs_stub)
        })
    })

    describe('#setDuration', () => {
        it('returns a new Note when the duration is valid', () => {
            expect(c.setDuration('8n').duration).to.be.equal('8n')
        })

        it('throws an error when the duration is invalid', () => {
            expect(() => {return c.setDuration('NULL')}).to.throw(InvalidInput)
        })
    })

    describe('#setOctave', () => {
        it('returns a new Note when the octave is valid', () => {
            expect(c.setOctave(20).octave).to.be.equal(20)
        })

        it('throws an error when the duration is invalid', () => {
            expect(() => {return c.setOctave('NULL')}).to.throw(InvalidInput)
        })
    })

    it('#toString ', () => {
        expect(c.toString()).to.eql('C3')
    })
})

function assertInterval(obj, interval, note) {
    expect(obj.interval(Number(interval))).to.eql(note)
}

function testNoteIntervals(note_tested, stub) {
    Object.entries(stub).forEach(([interval, note]) => {
        assertInterval(note_tested, interval, note)
    })
}
