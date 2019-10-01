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
      const ins = new Instrument()
      expect(() => { ins.generatePath('some instrument', 'C3')}).to.throw(Error)
    })
  })

  describe('#setPlayer', () => {
    let ins
    beforeEach(() => {
      ins = new Instrument()
    })

    it('should throw an error when generatePath is not over ridden', () => {
      expect(() => {ins.init()}).to.throw(Error)
    })
  })

  describe('#instrumentPath', () => {
    it('should throw an error when not implemented', () => {
      expect(() => {Instrument.instrumentPath}).to.throw(Error)
    })
  })

  describe('#name', () => {
    it('should throw an error when called from Instrument class', () => {
      expect(() => {Instrument.name}).to.throw(Error)
    })
  })

  describe('#loadFile', () => {
    let ins
    beforeEach(() => {
      ins = new Instrument().init('C3', 2)
    })

    it('should return false when a file is already loaded', () => {
      ins.loadedFiles = ['C3']
      expect(ins.loadFile('c3')).to.be.false
    })

    it('should throw an error when a note does not exist in the instrument', () => {
      expect(() => ins.loadFile('e5')).to.throw(Error)
    })

    it('should load a file when it exists in the instrument and is not loaded', () => {
      const setPlayerStub    = sinon.stub(ins, 'setPlayer')
      const generatePathStub = sinon.stub(ins, 'generatePath')
      expect(ins.loadFile('c3')).to.be.true
      setPlayerStub.restore()
      generatePathStub.restore()
    })
  })

  describe('#getPlayer', () => {
    it('should return undefined when called from base class', () => {
      const ins     = new Instrument()
      const stub    = sinon.stub(ins.players, 'get')
      const get_key = sinon.stub(Instrument, 'getKey')
      ins.getPlayer('C3')
      expect(stub).to.have.been.calledOnce
      stub.restore()
      get_key.restore()
    })
  })

  describe('#note', () => {
    it('should return undefined when note doesnt exist', () => {
      const ins = new Instrument()
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
      ins             = new Instrument().init('c3', 10)
      ins.loadedFiles = ['E3', 'F3']
    })

    it('should play a note when it exists', () => {
      const hasNote   = sinon.stub(ins, 'hasNote').returns(true)
      const getPlayer = sinon.stub(ins.players, 'get').returns({
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

    it('should throw error when attempting to play a file that was not loaded', () => {
      expect(() => ins.play('d3')).to.throw(Error)
    })
  })

  describe('#toString', () => {
    it('should return null for abstract instrument', () => {
      expect(new Instrument().toString()).to.equal('')
    })
  })
})
