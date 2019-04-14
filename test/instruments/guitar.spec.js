import {Guitar} from '../../src/instruments/Guitar'

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

    describe('#play', () => {
        it('should play all notes the fitting strings', () => {
            const s1 = sinon.stub(guitar.strings[0], 'play')
            const s2 = sinon.stub(guitar.strings[1], 'play')
            guitar.play({0: 'e4', 1: 'b3'}, '4N')
            expect(s1).to.have.been.calledOnce
            expect(s2).to.have.been.calledOnce
            s1.restore()
            s2.restore()
        })
    })

    describe('#strum', () => {
        it('should play each string on the given fret', () => {
            const stringStubs = []
            for (const s of guitar.strings)
                stringStubs.push(sinon.stub(s, 'play'))
            guitar.strum('000000')
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
            guitar.strum('xxxxxx')
            stringStubs.forEach((stub) => {
                expect(stub).to.not.have.been.called
            })
            for (const s of stringStubs)
                s.restore()
        })
    })
})
