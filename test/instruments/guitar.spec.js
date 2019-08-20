import {Guitar}       from '../../src/instruments/Guitar'
import {InvalidInput} from '../../src/Exceptions'

describe('Guitar', () => {
    let guitar
    beforeEach(() => {
        guitar = new Guitar()
    })
    describe('Creating a guitar', () => {
        it('should have these members', () => {
            expect(Object.keys(guitar)).to.eql(['strings'])
        })
    })

    describe('#play', () => {
        it('should play a note when it is valid', () => {
            const stub = sinon.stub(guitar.strings[0], 'play')
            guitar.play('e4', '4n')
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should throw an error when the note is not valid', () => {
            expect(() => {guitar.play('NOT A NOTE')}).to.throw(InvalidInput)
        })

        it('should return false when the note doesn\'nt exist', () => {
            expect(guitar.play('e1')).to.be.false
        })
    })

    describe('#playString', () => {
        it('should play a note on a string', () => {
            const stub = sinon.stub(guitar.strings[0], 'play')
            guitar.playString(0, 'E4', '4N')
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should do nothing when the note doesn\'t exist in the string', () => {
            const stub = sinon.stub(guitar.strings[0], 'getPlayer').returns({
                start: () => {},
                stop:  () => {},
            })
            guitar.playString(0, 'C2', '4N')
            expect(stub).to.not.have.been.called
            stub.restore()
        })
    })

    describe('#playMultiple', () => {
        it('should play all notes the fitting strings', () => {
            const s1 = sinon.stub(guitar.strings[0], 'play')
            const s2 = sinon.stub(guitar.strings[1], 'play')
            guitar.playMultiple({0: 'e4', 1: 'b3'}, '4N')
            expect(s1).to.have.been.calledOnce
            expect(s2).to.have.been.calledOnce
            s1.restore()
            s2.restore()
        })
    })

    describe('#playNotes', () => {
        it('should play each note when receiving an array of notes', () => {
            const stub = sinon.stub(guitar, 'play')
            guitar.playNotes(['e3', 'f3'], '4n')
            expect(stub).to.have.been.calledTwice
            stub.restore()
        })

        it('should throw an error when notes is not an array of notes', () => {
            expect(() => {guitar.playNotes('NOT ARRAY OF NOTES', '4n')}).to.throw(InvalidInput)
        })
    })

    describe('#strum', () => {
        it('should play each string on the given fret', () => {
            const stringStubs = []
            for (const s of guitar.strings)
                stringStubs.push(sinon.stub(s, 'play'))
            guitar.strum(Array.from('000000'))
            stringStubs.forEach((stub) => {
                expect(stub).to.have.been.calledOnce
            })
            for (const s of stringStubs)
                s.restore()
        })

        it('should not play notes when they have x in the pattern', () => {
            const stringStubs = []
            for (const s of guitar.strings)
                stringStubs.push(sinon.stub(s, 'play'))
            guitar.strum(Array.from('xxxxxx'))
            stringStubs.forEach((stub) => {
                expect(stub).to.not.have.been.called
            })
            for (const s of stringStubs)
                s.restore()
        })
    })

    describe('#playMelodically', () => {
        it('should play all the notes called', () => {
            const stub = sinon.stub(guitar, 'play')
            const clock = sinon.useFakeTimers();
            guitar.playMelodically(['c3', 'e3', 'g3'])
            clock.tick( 1000 );
            expect(stub).to.have.been.calledThrice
            clock.restore();
            stub.restore()
        })

        it('should resolve itself to the first note one octave higher when called with true', () => {
            const stub = sinon.stub(guitar, 'play')
            const clock = sinon.useFakeTimers();
            guitar.playMelodically(['c3', 'e3'], 100, true)
            clock.tick( 1000 );
            expect(stub).to.have.been.calledThrice
            clock.restore();
            stub.restore()
        })
    })

    it('#toString', () => {
        expect(guitar.toString()).to.equal('Guitar')
    })
})
