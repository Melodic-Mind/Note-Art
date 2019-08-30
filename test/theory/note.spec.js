import {Note}         from '../../src'
import {InvalidInput} from '../../src/Exceptions'

let c
beforeEach(() => {
  c = new Note('c', 3)
})

describe('Note', () => {
  describe('#constructor', () => {
    it('throws an error when a pitch-class is invalid', () => {
      expect(() => new Note(12, 3).to.throw(InvalidInput))
    })
    it('a note has the following attributes', () => {
      expect(c.pitchClass).to.eql('C')
      expect(c.octave).to.eql(3)
      expect(c.classSet).to.eql('b')
      expect(c.classIndex).to.eql(0)
    })
  })

  describe('#builder', () => {
    it('returns a Note instance when note is valid', () => {
      expect(Note.builder('c3')).to.be.instanceOf(Note)
    })

    it('throws exception when note is not valid', () => {
      expect(() => {Note.builder('INVALID')}).to.throw(InvalidInput)
    })
  })

  describe('#interval', () => {
    it('Checks the note Db', function () {
      const db      = new Note('db', 5)
      const db_stub = {
        '-13': new Note('c', 4),
        '-12': new Note('db', 4),
        '-11': new Note('d', 4),
        '-1':  new Note('c', 5),
        '0':   new Note('db', 5),
        '1':   new Note('d', 5),
        '11':  new Note('c', 6),
        '12':  new Note('db', 6),
        '13':  new Note('d', 6),
      }
      testNoteIntervals(db, db_stub)
    })

    it('Checks the note cs', function () {
      const cs      = new Note('c#', 3)
      const cs_stub = {
        '-13': new Note('c', 2),
        '-12': new Note('c#', 2),
        '-11': new Note('d', 2),
        '-1':  new Note('c', 3),
        '0':   new Note('c#', 3),
        '1':   new Note('d', 3),
        '11':  new Note('c', 4),
        '12':  new Note('c#', 4),
        '13':  new Note('d', 4),
      }
      testNoteIntervals(cs, cs_stub)
    })

    it('should throw an error when interval is not valid', () => {
      expect(() => {c.interval('Not Interval')}).to.throw(InvalidInput)
    })
  })
  describe('#transpse', () => {
    it('should alias interval', () => {
      expect(c.transpose(4)).to.eql(c.interval(4))
    })
  })

  it('#fromFrequency', () => {
    const stub = new Note('a', 4)
    expect(Note.fromFrequency(440)).to.eql(stub)
  })

  it('#raw, #toString', () => {
    expect(c.raw).to.eql('C3')
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
