import {Chord, Measure} from '../../src'

import {InvalidInput} from '../../src/Exceptions'


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

  describe('#duration', () => {
    it('defaults to 4n', () => {
      expect(measure.duration).to.equal('4n')
    })

    it('can be changed', () => {
      expect(measure.duration).to.equal('4n')
      measure.duration = '8n'
      expect(measure.duration).to.equal('8n')
    })
  })

  describe('#durationLeft', () => {
    it('returns full length when measure is empty', () => {
      expect(measure.durationLeft()).to.equal(64)
    })

    it('when the measure has one note', () => {
      measure.addNote({note: 'E4'}, 0)
      expect(measure.durationLeft(1)).to.equal(48)
    })

    it('when measure has more than 2 notes in different positions', () => {
      measure.addNote({note: 'E4'}, 0)
      measure.duration = '8n'
      measure.addNote({note: 'E4'}, 1)
      expect(measure.durationLeft()).to.equal(40)
    })

    it('when the measure is full', () => {
      measure.addNote({note: 'E4'}, 0)
      measure.addNote({note: 'E4'}, 1)
      measure.addNote({note: 'E4'}, 2)
      measure.addNote({note: 'E4'}, 3)
      expect(measure.durationLeft()).to.equal(0)
    })
  })

  describe('#addNote', () => {
    it('adds notes to the measure', () => {
      expect(measure.addNote({note: 'C3'}, 0)).to.be.true
      expect(measure.data[0]['notes'].has('C3')).to.be.true
    })

    it('should just add the string when its not a raw note', () => {
      expect(measure.addNote({note: 'NOT A NOTE'}, 0)).to.be.true
      expect(measure.data[0]['notes'].has('NOT A NOTE')).to.be.true

    })

    it('doesnt add a note to invalid position', () => {
      const spy = sinon.spy(measure, 'initNext')
      measure.addNote({note: 'C3'}, 2)
      expect(spy).to.not.have.been.called
      spy.restore()
    })

    it('doesnt add notes when the measure is full', () => {
      measure.addNote({note: 'E4'}, 0)
      measure.addNote({note: 'E4'}, 1)
      measure.addNote({note: 'E4'}, 2)
      measure.duration = '8n'
      measure.addNote({note: 'E4'}, 3)
      measure.duration = '4n'
      measure.addNote({note: 'E4'}, 4)
      measure.addNote({note: 'E4'}, 5)
      measure.addNote({note: 'E4'}, 6)
      measure.duration = '8n'
      measure.addNote({note: 'E4'}, 5)
      expect(measure.data.length).to.be.equal(5)
    })
  })

  describe('#addNotes', () => {
    it('adds notes to a measure', () => {
      const stub = ['c3', 'e3', 'g3']
      expect(measure.addNotes({notes: stub}, 0)).to.be.true
      expect(measure.data[0].notes.size).to.equal(3)
    })
  })

  describe('#deleteNote', () => {
    it('should remove a note that exists in the measure', () => {
      measure.addNote({note: 'c3'}, 0)
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
      measure.addNotes({notes: ['c3', 'e3']}, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      expect(measure.data[0].notes.has('E3')).to.be.true
      expect(measure.deleteNotes(['C3', 'E3'], 0)).to.be.true
      expect(measure.data[0].notes.has('C3')).to.be.false
      expect(measure.data[0].notes.has('E3')).to.be.false
    })

    it('should throw an error when notes is not an array ', () => {
      expect(() => {measure.deleteNotes('BAD INPUT', 0)}).to.throw(InvalidInput)
    })

    it('should return false when of the notes does not exist', () => {
      measure.addNotes({notes: ['c3', 'e3']}, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      expect(measure.data[0].notes.has('E3')).to.be.true
      expect(measure.deleteNotes(['C3', 'F3'], 0)).to.be.false
    })
  })

  describe('#addChord', () => {
    it('should add all the notes in the chord to the note set and add the chord name to the name of the member', () => {
      expect(measure.addChord({notes: ['c3', 'e3', 'g3'], name: 'C M', duration: '4n'}, 0)).to.be.true
      expect(measure.data[0].name).to.equal('C M')
    })

    it('should return false when the measure is full or the name is not sent', () => {
      expect(measure.addChord({notes: ['c3', 'e3'], duration: '8n'}, 0)).to.be.false
    })
  })

  describe('#deleteMember', () => {
    it('should delete a whole member from the measure\'s data', () => {
      measure.addNote({note: 'c3'}, 0)
      expect(measure.deleteMember(0)).to.be.true
      expect(measure.data[0].notes.size).to.equal(0)
    })

    it('should init a new member when the previous member is not empty', () => {
      const spy = sinon.spy(measure, 'initNext')
      measure.addNote({note: 'c3'}, 0)
      measure.addNote({note: 'c3'}, 1)
      measure.addNote({note: 'c3'}, 2)
      measure.addNote({note: 'c3'}, 3)
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
      measure.addNote({note: 'E4'}, 0)
      measure.addNote({note: 'E4'}, 1)
      measure.addNote({note: 'E4'}, 2)
      measure.addNote({note: 'E4'}, 3)
      expect(measure.isFull('4n')).to.be.true
    })
  })

  describe('#transpose', () => {
    it('should return a new transposed measure when the interval is valid', () => {
      measure.addNotes({notes: ['c3', 'g3']}, 0)
      measure.addNotes({notes: ['d3', 'a3']}, 1)
      measure.addNotes({notes: ['r'], duration: '8n'}, 2)
      measure.addNotes({notes: ['e4'], duration: '8n'}, 3)
      measure.addNotes({notes: ['f#3', 'c#4'], duration: '4n'}, 4)
      const stub = [['G3', 'D4'], ['A3', 'E4'], ['R'], ['B4'], ['C#4', 'G#4']]
      measure.transpose(7).data.forEach((data, index) => {
        stub[index].forEach((note) => {
          expect(data.notes.has(note)).to.be.true
        })
      })
    })

    it('should throw an error when interval is not an integer', () => {
      measure.addNotes({notes: ['c3', 'g3']}, 0)
      expect(() => {measure.transpose('NOT INTERVAL')}).to.throw(InvalidInput)
    })
  })

  describe('#clone', () => {
    it('should return a new measure with the same duration and notes', () => {
      measure.addNotes({notes: ['c3', 'g3']}, 0)
      expect(measure.clone()).to.eql(measure)
      expect(measure.clone()).to.not.equal(measure)
    })
  })

  describe('#clear', () => {
    it('should clear all the data in the measure', () => {
      measure.addNote({note: 'c3'}, 0)
      expect(measure.data[0].notes.has('C3')).to.be.true
      measure.clear()
      expect(measure.data[0].notes.has('C3')).to.be.false
    })
  })
})
