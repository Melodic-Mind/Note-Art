import {Pitch}        from '../../src/models/Pitch'
import {InvalidInput} from '../../src/Exceptions'

describe('PitchClass', () => {
    it('#properties', () => {
        const p = new Pitch('C', 5)
        expect(p.pitchClass).to.eql('C')
        expect(p.classSet).to.eql('b')
        expect(p.classIndex).to.eql(0)
        expect(p.octave).to.eql(5)
    })

    it('Throws exception when called with invalid pitchClass or octave', () => {
        expect(() => new Pitch('a', '4n')).to.throw(InvalidInput)
        expect(() => new Pitch('2n', 2)).to.throw(InvalidInput)
    })

    it('#fromFrequency', () => {
        const stub = new Pitch('a', 4)
        expect(Pitch.fromFrequency(440)).to.eql(stub)
    })

    describe('#interval:', () => {
        it('Checks the note C', function () {
            const c      = new Pitch('c', 3)
            const c_stub = {
                '-13': new Pitch('b', 1),
                '-12': new Pitch('c', 2),
                '-11': new Pitch('db', 2),
                '-1':  new Pitch('b', 2),
                '0':   new Pitch('c', 3),
                '1':   new Pitch('db', 3),
                '11':  new Pitch('b', 3),
                '12':  new Pitch('c', 4),
                '13':  new Pitch('db', 4),
            }
            testNoteIntervals(c, c_stub)
        })

        it('Checks the note b', function () {
            const b      = new Pitch('b', 3)
            const b_stub = {
                '-13': new Pitch('a#', 2),
                '-12': new Pitch('b', 2),
                '-11': new Pitch('c', 3),
                '-1':  new Pitch('a#', 3),
                '0':   new Pitch('b', 3),
                '1':   new Pitch('c', 4),
                '11':  new Pitch('a#', 4),
                '12':  new Pitch('b', 4),
                '13':  new Pitch('c', 5),
            }
            testNoteIntervals(b, b_stub)
        })
    })

    it('#toString', () => {
        expect(new Pitch('f', 5).toString()).to.eql('F5')
    })
})

function assertInterval(obj, interval, pitch) {
    expect(obj.interval(Number(interval))).to.eql(pitch)
}

function testNoteIntervals(pitch_tested, stub) {
    Object.entries(stub).forEach(([interval, pitch]) => {
        assertInterval(pitch_tested, interval, pitch)
    })
}
