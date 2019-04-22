import {Measure}      from '../../src'

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
            measure.addNote('E4', 0)
            expect(measure.durationLeft()).to.equal(48)
        })

        it('when measure has more than 2 notes in different positions', () => {
            measure.addNote('E4', 0)
            measure.duration = '8n'
            measure.addNote('E4', 1)
            expect(measure.durationLeft()).to.equal(40)
        })

        it('when the measure is full', () => {
            measure.addNote('E4', 0)
            measure.addNote('E4', 1)
            measure.addNote('E4', 2)
            measure.addNote('E4', 3)
            expect(measure.durationLeft()).to.equal(0)
        })
    })

    describe('#addNote', () => {
        it('adds notes to the measure', () => {
            expect(measure.addNote('C3', 0)).to.be.true
            expect(measure.data[0]['notes'].has('C3')).to.be.true
        })

        it('throws an error when note is not valid', () => {
            expect(() => {measure.addNote('NOT A NOTE', 0)}).to.throw(InvalidInput)
        })

        it('doesnt add a note to invalid position', () => {
            const spy = sinon.spy(measure, 'initNext')
            measure.addNote('C3', 2)
            expect(spy).to.not.have.been.called
            spy.restore()
        })

        it('doesnt add notes when the measure is full', () => {
            measure.addNote('E4', 0)
            measure.addNote('E4', 1)
            measure.addNote('E4', 2)
            measure.duration = '8n'
            measure.addNote('E4', 3)
            measure.duration = '4n'
            measure.addNote('E4', 4)
            measure.addNote('E4', 5)
            measure.addNote('E4', 6)
            measure.duration = '8n'
            measure.addNote('E4', 5)
            expect(measure.data.length).to.be.equal(5)
        })
    })

    describe('#addNotes', () => {
        it('adds notes to a measure', () => {
            const stub = ['c3', 'e3', 'g3']
            expect(measure.addNotes(stub, 0)).to.be.true
            expect(measure.data[0].notes.size).to.equal(3)
        })

        it('should throw an error when input is not valid', () => {
            expect(() => {measure.addNotes(['NOT NOTE'], 0)}).to.throw(InvalidInput)
            expect(() => {measure.addNotes('NOT NOTE', 0)}).to.throw(InvalidInput)
        })
    })

    describe('#deleteNote', () => {
        it('should remove a note that exists in the measure', () => {
            measure.addNote('c3', 0)
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
            measure.addNotes(['c3', 'e3'], 0)
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
            measure.addNotes(['c3', 'e3'], 0)
            expect(measure.data[0].notes.has('C3')).to.be.true
            expect(measure.data[0].notes.has('E3')).to.be.true
            expect(measure.deleteNotes(['C3', 'F3'], 0)).to.be.false
        })
    })

    describe('#transpose', () => {
        it('should return a new transposed measure when the interval is valid', () => {
            measure.addNotes(['c3', 'g3'], 0)
            measure.addNotes(['d3', 'a3'], 1)
            measure.addNotes(['e3', 'b3'], 2)
            measure.addNotes(['f#3', 'c#4'], 3)
            const stub = [['G3', 'D4'], ['A3', 'E4'], ['B3', 'F#4'], ['C#4', 'G#4']]
            measure.transpose(7).data.forEach((data, index) => {
                stub[index].forEach((note) => {
                    expect(data.notes.has(note)).to.be.true
                })
            })
        })

        it('should throw an error when interval is not an integer', () => {
            measure.addNotes(['c3', 'g3'], 0)
            expect(() => {measure.transpose('NOT INTERVAL')}).to.throw(InvalidInput)
        })
    })

    describe('#toString', () => {
        it('returns a string representing the measure', () => {
            measure.addNotes(['c3', 'g3'], 0)
            expect(measure.toString()).to.equal('Measure: {Duration: 4n, Data: [ C3, G3, ], }')
        })
    })

    describe('#clone', () => {
        it('should return a new measure with the same duration and notes', () => {
            measure.addNotes(['c3', 'g3'], 0)
            expect(measure.clone()).to.eql(measure)
            expect(measure.clone()).to.not.equal(measure)
        })
    })

    describe('#clear', () => {
        it('should clear all the data in the measure', () => {
            measure.addNote('c3', 0)
            expect(measure.data[0].notes.has('C3')).to.be.true
            measure.clear()
            expect(measure.data[0].notes.has('C3')).to.be.false
        })
    })
})
