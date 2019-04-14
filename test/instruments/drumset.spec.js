import {Drumset} from '../../src/'

describe('Drums', () => {
    let drumset
    beforeEach(() => {
        drumset = new Drumset()
    })
    describe('Creating a drumset', () => {
        it('should init and have sounds in the paths array', () => {
            expect(drumset.paths.size).to.be.greaterThan(0)
        })
    })

    describe('#getPlayer', () => {
        it('returns the audio path of the file', () => {
            expect(drumset.getPlayer('clap')).to.equal('http://localhost:8000/Drums/clap.mp3')
        })
    })
    describe('#play', () => {
        it('should play a note when it exists', () => {
            const stub = sinon.stub(drumset, 'getPlayer').returns({
                start: () => {},
                stop:  () => {},
            })
            drumset.play('clap')
            expect(stub).to.have.been.calledWithExactly('clap')
            stub.restore()
        })

        it('should do nothing when the audio doesnt exist', () => {
            const spy = sinon.spy(drumset, 'getPlayer')
            drumset.play('NULL')
            expect(spy).to.not.have.been.called
            spy.restore()
        })
    })

    describe('#syncAndPlay', () => {
        it('syncs and plays when file exists', () => {
            const stub    = sinon.stub(drumset, 'getPlayer').returns({
                sync: () => { return {start: () => { return {stop: () => {}} }} },
            })
            drumset.syncAndPlay('clap')
            expect(stub).to.have.been.calledWithExactly('clap')
            stub.restore()
        })

        it('should do nothing when the audio doesnt exist', () => {
            const spy = sinon.spy(drumset, 'getPlayer')
            drumset.syncAndPlay('NULL')
            expect(spy).to.not.have.been.called
            spy.restore()
        })
    })
})
