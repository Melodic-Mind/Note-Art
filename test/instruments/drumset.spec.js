import {Drumset} from '../../src/'
import {lib}     from '../../src/'

describe('Drums', () => {
  let drumset
  beforeEach(() => {
    drumset = new Drumset()
  })
  describe('Creating a drumset', () => {
    it('should init and have sounds in the players array', () => {
      expect(drumset.players.size).to.equal(0)
    })
  })

  describe('#loadFile', () => {
    it('should load a file', () => {
      const stub = sinon.stub(drumset, 'setPlayer')
      expect(drumset.loadFile('clap')).to.be.true
      stub.restore()
    })

    it('should return false when a file is already loaded', () => {
      drumset.loadedFiles = ['clap']
      expect(drumset.loadFile('clap')).to.be.false
    })
  })

  describe('#getPlayer', () => {
    it('returns the audio path of the file', () => {
      const stub = sinon.stub(drumset, 'setPlayer')
      drumset.loadFile('clap')
      expect(drumset.getPlayer('clap')).to.equal(`${lib.get('path')}drums/clap.mp3`)
      stub.restore()
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

  it('#toString', () => {
    expect(drumset.toString()).to.equal('drumset')
  })
})
