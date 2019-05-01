import {Instrument, Note} from '../../src'
import {InvalidInput}     from '../../src/Exceptions'

describe('Instrument', () => {
    describe('#normalizeSet', () => {
        it('should normalize a note to flat when it has a #', () => {
            expect(Instrument.normalizeSet('C#', '#')).to.eql('Db')
        })

        it('should do nothing when the note is in flat', () => {
            expect(Instrument.normalizeSet('Db', 'b')).to.eql('Db')
        })
    })
    describe('#getKey', () => {
        it('should return the raw representation of a note when its not sharp', () => {
            expect(Instrument.getKey({pitchClass: 'C', octave: 3, classSet: '#'})).to.equal('C3')
            expect(Instrument.getKey({pitchClass: 'Db', octave: 3, classSet: 'b'})).to.equal('Db3')
            expect(Instrument.getKey({pitchClass: 'C', octave: 3, classSet: 'b'})).to.equal('C3')
        })

        it('should first normalize a note its sharp and then return its raw representation', () => {
            expect(Instrument.getKey({pitchClass: 'C#', octave: 3, classSet: '#'})).to.equal('Db3')
            expect(Instrument.getKey({pitchClass: 'F#', octave: 3, classSet: '#'})).to.equal('Gb3')
        })
    })

    it('#normalizeNoteStr', () => {
        expect(Instrument.normalizeNoteStr('c4')).to.equal('C4')
    })

    describe('#notePipeline', () => {
        it('should return formatted note when its valid', () => {
            expect(Instrument.notePipeline('c3')).to.equal('C3')
        })

        it('should return a sharp note as flat', () => {
            expect(Instrument.notePipeline('c#5')).to.equal('Db5')
        })
    })

    describe('#generatePath', () => {
        it('should throw an error when called from an instrument instance', () => {
            const ins = new Instrument('C3', 3)
            expect(() => { ins.generatePath('some instrument', 'C3')}).to.throw(Error)
        })
    })

    describe('#setPlayer', () => {
        let ins
        beforeEach(() => {
            ins = new Instrument('e3', 2)
        })

        it('should throw an error when generatePath is not over ridden', () => {
            expect(() => {ins.init()}).to.throw(Error)
        })

        it('should set a path for each note exactly once', () => {
            const stub = sinon.stub(ins, 'setPlayer').returns(true)
            ins.init('e3', 2)
            expect(stub).to.have.been.calledThrice
        })

        it('should set players to notes', () => {
            const stub = sinon.stub(ins, 'generatePath').returns(Math.random())
            const spy  = sinon.spy(ins, 'setPlayer')
            ins.init('e3', 2)
            expect(spy).to.have.been.calledThrice
            stub.restore()
            spy.restore()
        })
    })

    describe('#getPlayer', () => {
        it('should return undefined when called from base class', () => {
            const ins     = new Instrument('E3', 2)
            const stub    = sinon.stub(ins.players, 'get')
            const get_key = sinon.stub(Instrument, 'getKey')
            ins.getPlayer({pitchClass: 'C', octave: 3, classSet: '#'})
            expect(stub).to.have.been.calledOnce
            expect(get_key).to.have.been.calledOnce
            stub.restore()
            get_key.restore()
        })
    })

    describe('#note', () => {
        it('should return undefined when note doesnt exist', () => {
            const ins = new Instrument('E3', 2)
            expect(ins.note('e3')).to.be.undefined
        })

        it('returns a Note when it exists', () => {
            const ins  = new Instrument()
            const stub = sinon.stub(ins, 'generatePath').returns(Math.random())
            ins.init('E3', 2)
            expect(ins.note('E3')).to.be.instanceOf(Note)
            stub.restore()
        })
    })

    describe('#hasNote', () => {
        let ins, stub
        beforeEach(() => {
            ins  = new Instrument()
            stub = sinon.stub(ins, 'generatePath').returns(Math.random())
            ins.init('E3', 2)
        })

        afterEach(() => [
            stub.restore(),
        ])

        it('should return true when a note exists', () => {
            expect(ins.hasNote('E3')).to.be.true
        })

        it('should return false when an instrument doesnt have a note', () => {
            expect(ins.hasNote('f5')).to.be.false
        })
    })

    describe('#play', () => {
        let ins
        beforeEach(() => {
            ins = new Instrument('E3', 2)
        })

        it('plays a note when it exists', () => {
            const hasNote   = sinon.stub(ins, 'hasNote').returns(true)
            const getPlayer = sinon.stub(ins, 'getPlayer').returns({
                start: () => {
                    return {
                        stop: () => {return true},
                    }
                },
            })
            ins.play('E3')
            expect(getPlayer).to.have.been.calledOnce
            ins.play('F3', '4n')
            expect(getPlayer).to.have.been.calledTwice
            hasNote.restore()
            getPlayer.restore()
        })

        it('doesnt play a note when its not in the instrument', () => {
            const stub = sinon.stub(ins, 'generatePath').returns(Math.random())
            ins.init('E3', 2)
            const spy = sinon.spy(ins, 'getPlayer')
            ins.play('f5')
            expect(spy).to.not.have.been.called
            stub.restore()
            spy.restore()
        })
    })

    describe('#syncAndPlay', () => {
        let ins
        beforeEach(() => {
            ins = new Instrument('E3', 2)
        })

        it('should get the player', () => {
            const hasNote = sinon.stub(ins, 'hasNote').returns(true)
            const stub    = sinon.stub(ins, 'getPlayer').returns({
                sync: () => { return {start: () => { return {stop: () => {}} }} },
            })
            ins.syncAndPlay('f3')
            expect(stub).to.have.been.calledWithExactly('F3')
            hasNote.restore()
            stub.restore()
        })

        it('should do nothing when the note doesn\'nt exist', () => {
            const stub = sinon.stub(ins, 'getPlayer').returns({
                sync: () => { return {start: () => { return {stop: () => {}} }} },
            })
            ins.syncAndPlay('g4')
            expect(stub).to.not.have.been.called
            stub.restore()
        })
    })
})
