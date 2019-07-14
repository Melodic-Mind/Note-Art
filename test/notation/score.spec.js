import {Measure, Score} from '../../src/'

describe('Score', () => {
    let score
    beforeEach(() => {
        score = new Score()
    })

    describe('#reduceTimeSignature', () => {
        it('should return the numerator when in quarter notes', () => {
            expect(Score.reduceTimeSignature([6, 4])).to.equal(6)
        })

        it('should return the correct value when in eigth notes', () => {
            expect(Score.reduceTimeSignature([6, 8])).to.equal(3)
        })

        it('should return 4 when the timeSignature is not valid', () => {
            expect(Score.reduceTimeSignature('INVALID')).to.equal(4)
            expect(Score.reduceTimeSignature([3, 3])).to.equal(4)
        })
    })

    describe('creating a new score', () => {
        it('should have a time signature property that defaults to 4:4', () => {
            expect(score.timeSignature).to.be.eql([4, 4])
            expect(new Score({timeSignature: [3, 4]}).timeSignature).to.eql([3, 4])
        })

        it('should have a BPM property that defaults to 120', () => {
            expect(score.bpm).to.be.equal(120)
            expect(new Score({bpm: 100}).bpm).to.equal(100)
        })

        it('has the option to set the bpm and timeSignature', () => {
            score.bpm           = 100
            score.timeSignature = [3, 4]
            expect(score.bpm).to.equal(100)
            expect(score.timeSignature).to.eql([3, 4])
        })

        it('should initialize with one empty measure', () => {
            expect(new Score().voices[0].length).to.equal(1)
        })
    })

    describe('#setMeasureDuration', () => {
        it('should set the duration property of a measure when it exists', () => {
            score.duration = '8n'
            score.setMeasureDuration(0)
            expect(score.getMeasure(0).duration).to.equal('8n')
        })

        it('should do nothing when the measure does not exist', () => {
            score.duration = '8n'
            expect(() => score.setMeasureDuration(5)).to.not.throw(Error)
        })
    })

    describe('#getVoice', () => {
        it('should return an array of measures as a voice', () => {
            expect(Array.isArray(score.getVoice())).to.be.true
        })

        it('should return false when a voice doesnt exist', () => {
            expect(score.getVoice(3)).to.be.false
        })
    })

    describe('#addVoice', () => {
        it('should add a new array of measures to voices', () => {
            expect(score.voices.length).to.equal(1)
            score.addVoice()
            expect(score.voices.length).to.equal(2)
        })
    })

    describe('#deleteVoice', () => {
        it('should delete a voice if its not the last one', () => {
            expect(score.deleteVoice(0)).to.be.false
            expect(score.voices.length).to.equal(1)
            score.addVoice()
            expect(score.voices.length).to.equal(2)
            score.deleteVoice(0)
            expect(score.voices.length).to.equal(1)
        })
    })

    describe('#addMeasure', () => {
        it('should add a measure at the end of the score when no position arg is sent', () => {
            const measure = score.getMeasure(0)
            score.addMeasure()
            expect(score.getMeasure(1)).to.not.equal(measure)
        })

        it('should add a measure at the right position when a position arg is sent', () => {
            const measure = score.getMeasure(0)
            score.addMeasure(0)
            expect(score.getMeasure(1)).to.equal(measure)
        })

        it('should insert an existing measure when one is sent', () => {
            const measure = new Measure()
            score.addMeasure(0, 0, measure)
            expect(score.getMeasure(0, 0)).to.equal(measure)
        })
    })

    describe('#deleteMeasure', () => {
        it('should remove the measure at the position', () => {
            score.addMeasure()
            score.addMeasure()
            const measures       = score.getVoice(0).slice(0, 2)
            const deletedMeasure = score.getVoice(0)[2]
            expect(score.deleteMeasure(2)[0]).to.equal(deletedMeasure)
            expect(measures).to.eql(score.getVoice())
        })

        it('should return false when the measure is not found', () => {
            expect(score.deleteMeasure(5)).to.be.false
        })
    })

    describe('#cloneMeasure', () => {
        it('should clone the measure at the position and make its index position + 1', () => {
            const stub = sinon.stub(score.getMeasure(0), 'clone')
            score.cloneMeasure(0)
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should return false when the measure number doesnt exist', () => {
            expect(score.cloneMeasure(5)).to.be.false
        })
    })

    describe('#addNote', () => {
        it('should add notes to the measure when it exists', () => {
            const spy = sinon.spy(score.getMeasure(0), 'addNote')
            expect(score.addNote({note: 'C3'}, 0, 0)).to.be.true
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when it doesnt add the note to the measure', () => {
            expect(score.addNote({note: 'c3'}, 2, 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(score.addNote({note: 'c3'}, 0, 4)).to.be.false
        })
    })

    describe('#addNotes', () => {
        it('should throw an error when it doesn\'t get a note array props', () => {
            const spy = sinon.spy(score.getMeasure(0), 'addNotes')
            score.addNotes({notes: ['C3', 'E3']}, 0, 0)
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when it doesnt add the note to the measure', () => {
            expect(score.addNotes({notes: ['c3']}, 2, 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(score.addNotes({notes: ['c3']}, 0, 4)).to.be.false
        })
    })

    describe('#deleteNote', () => {
        it('deletes the note at the position from the measure', () => {
            score.addMeasure()
            const stub = sinon.stub(score.getMeasure(1), 'deleteNote').returns(true)
            expect(score.addNote({note: 'C3'}, 0, 1)).to.be.true
            expect(score.deleteNote('C3', 0, 1)).to.be.true
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('returns false when the note cant be deleted', () => {
            expect(score.deleteNote('c3', 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(score.deleteNotes(['c3'], 0, 4)).to.be.false
        })
    })

    describe('#deleteNotes', () => {
        it('should delete notes from a measure that exists in the score', () => {
            const spy = sinon.spy(score.getMeasure(0), 'deleteNotes')
            expect(score.addNotes({notes: ['c3', 'g3']}, 0, 0)).to.be.true
            expect(score.deleteNotes(['c3', 'g3'], 0, 0)).to.be.true
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when notes are not deleted', () => {
            expect(score.deleteNotes(['C3', 'G3'], 0, 0)).to.be.false
        })
    })

    describe('#addChord', () => {
        it('should call the addChord funtion on the specified measure', () => {
            score.addMeasure(0)
            const stub = sinon.stub(score.getMeasure(0), 'addChord').returns(true)
            expect(score.addChord({}, 0, 0)).to.be.true
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should return false when the chord is not added', () => {
            score.addMeasure(0)
            const stub = sinon.stub(score.getMeasure(0), 'addChord').returns(false)
            expect(score.addChord({}, 0, 0)).to.be.false
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })
    })

    describe('#deleteMember', () => {
        it('should call the deleteMember funtion on the specified measure', () => {
            score.addMeasure(0)
            const stub = sinon.stub(score.getMeasure(0), 'deleteMember').returns(true)
            expect(score.deleteMember(0, 0)).to.be.true
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should return false when the chord is not added inside the measure process', () => {
            score.addMeasure(0)
            const stub = sinon.stub(score.getMeasure(0), 'deleteMember').returns(false)
            expect(score.deleteMember(0, 0)).to.be.false
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should return false when the measure does not exist', () => {
            expect(score.deleteMember(0, 4)).to.be.false
        })
    })

    describe('#clear', () => {
        it('should clear a measure from all data', () => {
            expect(score.addNote({note: 'C3'}, 0, 0)).to.be.true
            expect(score.clearMeasure(0)).to.be.true
            expect(score.getMeasure(0).data[0].notes.size).to.equal(0)
        })

        it('should return false when the measure doesnt exist', () => {
            expect(score.clearMeasure(3)).to.be.false
        })
    })

    describe('#transpose', () => {
        it('should transpose all measures', () => {
            score.addMeasure()
            const spy1 = sinon.spy(score.getMeasure(0), 'transpose')
            const spy2 = sinon.spy(score.getMeasure(1), 'transpose')
            score.transpose(5, 0)
            expect(spy1).to.have.been.calledOnce
            expect(spy2).to.have.been.calledOnce
            spy1.restore()
            spy2.restore()
        })
    })
})
