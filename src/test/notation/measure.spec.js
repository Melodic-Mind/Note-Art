import Measure          from '../../notation/Measure'
import { InvalidInput } from '../../Exceptions'


describe('Measure', () => {
  describe('creating a new measure', () => {
    it('has these properties', () => {
      expect(measure.attributes).to.have.keys(['data', 'maxDuration', 'duration'])
    })
  })

  let measure
  beforeEach(() => {
    measure = new Measure()
  })

  describe('#durationLeft', () => {
    it('returns full length when measure is empty', () => {
      expect(measure.durationLeft()).to.equal(64)
    })

    it('when the measure has one note', () => {
      measure.addNote({ note: 'E4', duration: '4n' }, 0)
      expect(measure.durationLeft(1)).to.equal(48)
    })

    it('when measure has more than 2 notes in different positions', () => {
      const note = 'E4', duration = '4n'
      const data = { note, duration }
      measure.addNote(data, 0)
      measure.addNote({ ...data, duration: '8n' }, 1)
      expect(measure.durationLeft()).to.equal(40)
    })

    it('when the measure is full', () => {
      const note = 'E4', duration = '4n'
      const data = { note, duration }
      measure.addNote(data, 0)
      measure.addNote(data, 1)
      measure.addNote(data, 2)
      measure.addNote(data, 3)
      expect(measure.durationLeft()).to.equal(0)
    })
  })

  describe('#addNote', () => {
    it('adds notes to the measure', () => {
      expect(measure.addNote({ note: 'C3', duration: '4n' }, 0)).to.be.true
      expect(measure.data[0]['notes'].has('C3')).to.be.true
    })

    it('should just add the string when its not a raw note', () => {
      expect(measure.addNote({ note: 'NOT A NOTE', duration: '4n' }, 0)).to.be.true
      expect(measure.data[0]['notes'].has('NOT A NOTE')).to.be.true
    })

    it('doesnt add a note to invalid position', () => {
      const spy = sinon.spy(measure, 'initNext')
      measure.addNote({ note: 'C3', duration: '4n' }, 2)
      expect(spy).to.not.have.been.called
      spy.restore()
    })

    it('doesnt add notes when the measure is full', () => {
      const qNotes = { note: 'E4', duration: '4n' }
      const eNotes = { note: 'E4', duration: '8n' }
      measure.addNote(qNotes, 0)
      measure.addNote(qNotes, 1)
      measure.addNote(qNotes, 2)
      measure.addNote(eNotes, 3)
      measure.addNote(qNotes, 4)
      measure.addNote(qNotes, 5)
      measure.addNote(qNotes, 6)
      measure.addNote(eNotes, 5)
      expect(measure.data.length).to.be.equal(5)
    })
  })

  describe('#addNotes', () => {
    it('adds notes to a measure', () => {
      const stub = ['c3', 'e3', 'g3']
      expect(measure.addNotes({ notes: stub, duration: '4n' }, 0)).to.be.true
      expect(measure.data[0].notes.size).to.equal(3)
    })
  })

  describe('#deleteNote', () => {
    it('should remove a note that exists in the measure', () => {
      measure.addNote({ note: 'c3', duration: '4n' }, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      expect(measure.deleteNote('c3', 0)).to.be.true
      expect(measure.data[0].notes.has('C3')).to.be.false
    })

    it('should return false for a note that does not exist in the measure', () => {
      expect(measure.deleteNote('c3', 0)).to.be.false
    })
  })

  describe('#deleteNotes', () => {
    it('should remove notes that exist in the measure', () => {
      measure.addNotes({ notes: ['c3', 'e3'], duration: '4n' }, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      expect(measure.data[0].notes.has('E3')).to.be.true
      expect(measure.deleteNotes(['C3', 'E3'], 0)).to.be.true
      expect(measure.data[0].notes.has('C3')).to.be.false
      expect(measure.data[0].notes.has('E3')).to.be.false
    })

    it('should throw an error when notes is not an array ', () => {
      expect(() => {measure.deleteNotes('BAD INPUT', 0)}).to.throw(InvalidInput)
    })

    it('should return false when the notes do not exist', () => {
      measure.addNotes({ notes: ['c3', 'e3'], duration: '4n' }, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      expect(measure.data[0].notes.has('E3')).to.be.true
      expect(measure.deleteNotes(['C3', 'F3'], 0)).to.be.false
    })
  })

  describe('#addChord', () => {
    it('should add all the notes in the chord to the note set and add the chord name to the name of the member', () => {
      expect(measure.addChord({ notes: ['c3', 'e3', 'g3'], name: 'C M', duration: '4n' }, 0)).to.be.true
      expect(measure.data[0].name).to.equal('C M')
    })

    it('chord name not set when not sent', () => {
      expect(measure.addChord({ notes: ['c3', 'e3', 'g3'], duration: '4n' }, 0)).to.be.true
      expect(measure.data[0].name).to.equal(undefined)
    })

    it('should return false when the measure if too full', () => {
      expect(measure.addChord({ notes: ['c3', 'e3', 'g3'], name: 'C M', duration: '1n' }, 0)).to.be.true
      expect(measure.addChord({ notes: ['c3', 'e3', 'g3'], name: 'C M', duration: '1n' }, 1)).to.be.false
    })
  })

  describe('#deleteMember', () => {
    it('should delete a whole member from the measure\'s data', () => {
      measure.addNote({ note: 'c3', duration: '4n' }, 0)
      expect(measure.deleteMember(0)).to.be.true
      expect(measure.data[0].notes.size).to.equal(0)
    })

    it('should init a new member when the previous member is not empty', () => {
      const spy  = sinon.spy(measure, 'initNext')
      const data = { note: 'c3', duration: '4n' }
      measure.addNote(data, 0)
      measure.addNote(data, 1)
      measure.addNote(data, 2)
      measure.addNote(data, 3)
      expect(measure.deleteMember(3)).to.be.true
      expect(measure.data[3].notes.size).to.equal(0)
      expect(spy).to.have.callCount(5)
      spy.restore()
    })

    it('should return false when the position does not exist in the measure', () => {
      expect(measure.deleteMember(5)).to.be.false
    })
  })

  describe('#isFull', () => {
    it('should return true when the measure has space for a new member with duration', () => {
      expect(measure.isFull('4n')).to.be.false
    })

    it('should return false when the measure does not have space for a new member', () => {
      const data = { note: 'c3', duration: '4n' }
      measure.addNote(data, 0)
      measure.addNote(data, 1)
      measure.addNote(data, 2)
      measure.addNote(data, 3)
      expect(measure.isFull('4n')).to.be.true
    })
  })

  describe('#transpose', () => {
    it('should return a new transposed measure when the interval is valid', () => {
      measure.addNotes({ notes: ['c3', 'g3'], duration: '4n' }, 0)
      measure.addNotes({ notes: ['d3', 'a3'], duration: '4n' }, 1)
      measure.addNotes({ notes: ['r'], duration: '8n' }, 2)
      measure.addNotes({ notes: ['e4'], duration: '8n' }, 3)
      measure.addNotes({ notes: ['f#3', 'c#4'], duration: '4n' }, 4)
      const stub = [['G3', 'D4'], ['A3', 'E4'], ['R'], ['B4'], ['C#4', 'G#4']]
      measure.transpose(7).data.forEach((data, index) => {
        stub[index].forEach((note) => {
          expect(data.notes.has(note)).to.be.true
        })
      })
    })
  })

  describe('#clone', () => {
    it('should return a new measure with the same duration and notes', () => {
      measure.addNotes({ notes: ['c3', 'g3'], duration: '4n' }, 0)
      expect(measure.clone()).to.eql(measure)
      expect(measure.clone()).to.not.equal(measure)
    })

    it('should return a new measure with the same name for notes', () => {
      measure.addChord({ notes: ['c3', 'e3', 'g3'], name: 'C M', duration: '4n' }, 0)
      expect(measure.clone()).to.eql(measure)
      expect(measure.clone()).to.not.equal(measure)
    })
  })

  describe('#clear', () => {
    it('should clear all the data in the measure', () => {
      measure.addNote({ note: 'c3', duration: '4n' }, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      measure.clear()
      expect(measure.data[0].notes.has('C3')).to.be.false
    })
  })

  describe('#length', () => {
    it('should return the length as the number of sixteenth notes in a measure', () => {
      expect(measure.length).to.eql(4)
      measure.addNote({ note: 'c3', duration: '4n' }, 0)
      expect(measure.length).to.eql(8)
    })
  })
})
