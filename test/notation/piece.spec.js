import {Measure, Piece} from '../../src/'

describe('Piece', () => {
    let piece
    beforeEach(() => {
        piece = new Piece()
    })

    describe('#reduceTimeSignature', () => {
        it('should return the numerator when in quarter notes', () => {
            expect(Piece.reduceTimeSignature([6, 4])).to.equal(6)
        })

        it('should return the correct value when in eigth notes', () => {
            expect(Piece.reduceTimeSignature([6, 8])).to.equal(3)
        })

        it('should return 4 when the timeSignature is not valid', () => {
            expect(Piece.reduceTimeSignature('INVALID')).to.equal(4)
            expect(Piece.reduceTimeSignature([3, 3])).to.equal(4)
        })
    })

    describe('creating a new piece', () => {
        it('should have a time signature property that defaults to 4:4', () => {
            expect(piece.timeSignature).to.be.eql([4, 4])
            expect(new Piece({timeSignature: [3, 4]}).timeSignature).to.eql([3, 4])
        })

        it('should have a BPM property that defaults to 120', () => {
            expect(piece.bpm).to.be.equal(120)
            expect(new Piece({bpm: 100}).bpm).to.equal(100)
        })

        it('has the option to set the bpm and timeSignature', () => {
            piece.bpm           = 100
            piece.timeSignature = [3, 4]
            expect(piece.bpm).to.equal(100)
            expect(piece.timeSignature).to.eql([3, 4])
        })

        it('should initialize with one empty measure', () => {
            expect(new Piece().voices[0].length).to.equal(1)
        })
    })

    describe('#setMeasureDuration', () => {
        it('should set the duration property of a measure when it exists', () => {
            piece.duration = '8n'
            piece.setMeasureDuration(0)
            expect(piece.getMeasure(0).duration).to.equal('8n')
        })

        it('should do nothing when the measure does not exist', () => {
            piece.duration = '8n'
            expect(() => piece.setMeasureDuration(5)).to.not.throw(Error)
        })
    })

    describe('#getVoice', () => {
        it('should return an array of measures as a voice', () => {
            expect(Array.isArray(piece.getVoice())).to.be.true
        })

        it('should return false when a voice doesnt exist', () => {
            expect(piece.getVoice(3)).to.be.false
        })
    })

    describe('#addVoice', () => {
        it('should add a new array of measures to voices', () => {
            expect(piece.voices.length).to.equal(1)
            piece.addVoice()
            expect(piece.voices.length).to.equal(2)
        })
    })

    describe('#deleteVoice', () => {
        it('should delete a voice if its not the last one', () => {
            expect(piece.deleteVoice(0)).to.be.false
            expect(piece.voices.length).to.equal(1)
            piece.addVoice()
            expect(piece.voices.length).to.equal(2)
            piece.deleteVoice(0)
            expect(piece.voices.length).to.equal(1)
        })
    })

    describe('#addMeasure', () => {
        it('should add a measure at the end of the piece when no position arg is sent', () => {
            const measure = piece.getMeasure(0)
            piece.addMeasure()
            expect(piece.getMeasure(1)).to.not.equal(measure)
        })

        it('should add a measure at the right position when a position arg is sent', () => {
            const measure = piece.getMeasure(0)
            piece.addMeasure(0)
            expect(piece.getMeasure(1)).to.equal(measure)
        })

        it('should insert an existing measure when one is sent', () => {
            const measure = new Measure()
            piece.addMeasure(0, 0, measure)
            expect(piece.getMeasure(0, 0)).to.equal(measure)
        })
    })

    describe('#deleteMeasure', () => {
        it('should remove the measure at the position', () => {
            piece.addMeasure()
            piece.addMeasure()
            const measures       = piece.getVoice(0).slice(0, 2)
            const deletedMeasure = piece.getVoice(0)[2]
            expect(piece.deleteMeasure(2)[0]).to.equal(deletedMeasure)
            expect(measures).to.eql(piece.getVoice())
        })

        it('should return false when the measure is not found', () => {
            expect(piece.deleteMeasure(5)).to.be.false
        })
    })

    describe('#cloneMeasure', () => {
        it('should clone the measure at the position and make its index position + 1', () => {
            const stub = sinon.stub(piece.getMeasure(0), 'clone')
            piece.cloneMeasure(0)
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('should return false when the measure number doesnt exist', () => {
            expect(piece.cloneMeasure(5)).to.be.false
        })
    })

    describe('#addNote', () => {
        it('should add notes to the measure when it exists', () => {
            const spy = sinon.spy(piece.getMeasure(0), 'addNote')
            expect(piece.addNote({note: 'C3'}, 0, 0)).to.be.true
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when it doesnt add the note to the measure', () => {
            expect(piece.addNote({note: 'c3'}, 2, 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(piece.addNote({note: 'c3'}, 0, 4)).to.be.false
        })
    })

    describe('#addNotes', () => {
        it('should throw an error when it doesn\'t get a note array props', () => {
            const spy = sinon.spy(piece.getMeasure(0), 'addNotes')
            piece.addNotes({notes: ['C3', 'E3']}, 0, 0)
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when it doesnt add the note to the measure', () => {
            expect(piece.addNotes({notes: ['c3']}, 2, 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(piece.addNotes({notes: ['c3']}, 0, 4)).to.be.false
        })
    })

    describe('#deleteNote', () => {
        it('deletes the note at the position from the measure', () => {
            piece.addMeasure()
            const stub = sinon.stub(piece.getMeasure(1), 'deleteNote').returns(true)
            expect(piece.addNote({note: 'C3'}, 0, 1)).to.be.true
            expect(piece.deleteNote('C3', 0, 1)).to.be.true
            expect(stub).to.have.been.calledOnce
            stub.restore()
        })

        it('returns false when the note cant be deleted', () => {
            expect(piece.deleteNote('c3', 0)).to.be.false
        })

        it('should return false when the measure doesnt exist', () => {
            expect(piece.deleteNotes(['c3'], 0, 4)).to.be.false
        })
    })

    describe('#deleteNotes', () => {
        it('should delete notes from a measure that exists in the piece', () => {
            const spy = sinon.spy(piece.getMeasure(0), 'deleteNotes')
            expect(piece.addNotes({notes: ['c3', 'g3']}, 0, 0)).to.be.true
            expect(piece.deleteNotes(['c3', 'g3'], 0, 0)).to.be.true
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })

        it('should return false when notes are not deleted', () => {
            expect(piece.deleteNotes(['C3', 'G3'], 0, 0)).to.be.false
        })
    })

    describe('#clear', () => {
        it('should clear a measure from all data', () => {
            expect(piece.addNote({note: 'C3'}, 0, 0)).to.be.true
            expect(piece.clearMeasure(0)).to.be.true
            expect(piece.getMeasure(0).data[0].notes.size).to.equal(0)
        })

        it('should return false when the measure doesnt exist', () => {
            expect(piece.clearMeasure(3)).to.be.false
        })
    })

    describe('#transpose', () => {
        it('should transpose all measures', () => {
            piece.addMeasure()
            const spy1 = sinon.spy(piece.getMeasure(0), 'transpose')
            const spy2 = sinon.spy(piece.getMeasure(1), 'transpose')
            piece.transpose(5, 0)
            expect(spy1).to.have.been.calledOnce
            expect(spy2).to.have.been.calledOnce
            spy1.restore()
            spy2.restore()
        })
    })
})
