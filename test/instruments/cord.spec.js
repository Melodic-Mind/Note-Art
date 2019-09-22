import {Note, Cord} from '../../src'

describe('Cord', () => {
  let cord
  beforeEach(() => {
    cord = new Cord('e3', 1, 1)
  })

  it('generates a notes object based on the range it receives', () => {
    expect(cord.notes.has('E3')).to.be.true
    expect(cord.notes.has('F3')).to.be.true
  })

  describe('#play', () => {
    it('plays a note when the note is in range', () => {
      expect(cord.note('e3')).to.be.instanceOf(Note)
    })

    it('throws InvalidInput when note is not in range', () => {
      expect(cord.note('e4')).to.be.undefined
    })
  })

  describe('#fret', () => {
    let cord
    beforeEach(() => {
      cord = new Cord('e3', 12)
    })

    it('should return the note at the given fret', () => {
      expect(cord.fret(0)).to.equal('E3')
      expect(cord.fret('7')).to.equal('B3')
    })

    it('should return undefined when that fret does not exist for the string', () => {
      expect(cord.fret(20)).to.be.undefined
    })
  })

  it('generates correct path for cord', () => {
    expect(cord.generatePath(Note.builder('C3'))).to.equal('https://note-art-server.herokuapp.com/audio/guitar/1/C3.mp3')
  })

  it('#toString', () => {
    expect(cord.toString()).to.equal('cord')
  })
})
