import { Measure, Score } from '../../lib/index.js';

describe('Score', () => {
  let score;
  beforeEach(() => {
    score = new Score({ voiceNames: ['v1'] });
    score.addMeasure('v1');
  });

  describe('#getMeasureSize', () => {
    it('should return the numerator when in quarter notes', () => {
      expect(Score.getMeasureSize([6, 4])).to.equal(96);
    });

    it('should return the correct value when in eighth notes', () => {
      expect(Score.getMeasureSize([6, 8])).to.equal(48);
      expect(Score.getMeasureSize([3, 8])).to.equal(24);
    });

    it('should return 4 when the timeSignature is not valid', () => {
      expect(() => {Score.getMeasureSize('INVALID');}).to.throw(Error);
    });
  });

  describe('#length', () => {
    it('should return the correct length', () => {
      expect(score.length).to.equal('0:0:4');
    });

    it('should return the length of the longest voice', () => {
      score.addVoice('v2');
      score.addMeasure('v2', 0);
      score.addMeasure('v2', 1);
      expect(score.length).to.equal('1:0:4');
    });

    it('returns 0:0:0 when the score is empty', () => {
      score = new Score();
      expect(score.length).to.equal('0:0:0');
    });
  });

  describe('attributes', () => {
    it('should have a time signature property that defaults to 4:4', () => {
      expect(score.timeSignature).to.be.eql([4, 4]);
      expect(new Score({ timeSignature: [3, 4] }).timeSignature).to.eql([3, 4]);
    });

    it('should have a BPM property that defaults to 100', () => {
      expect(score.bpm).to.be.equal(100);
      expect(new Score({ bpm: 120 }).bpm).to.equal(120);
    });

    it('has the option to set the bpm and timeSignature', () => {
      score.bpm           = 100;
      score.timeSignature = [3, 4];
      expect(score.bpm).to.equal(100);
      expect(score.timeSignature).to.eql([3, 4]);
    });

    it('should initialize with no measures', () => {
      score.addVoice('v2');
      expect(score.getVoice('v2').length).to.equal(0);
    });

    describe('name attribute', () => {
      it('should rename a score', () => {
        expect(score.name).to.equal('my_score');
        score.name = 'my score';
        expect(score.name).to.equal('my score');
      });
    });
  });

  describe('#getVoice', () => {
    it('should return an array of measures as a voice', () => {
      expect(Array.isArray(score.getVoice('v1'))).to.be.true;
    });

    it('should throw error when a voice doesnt exist', () => {
      expect(() => score.getVoice('DOES NOT EXIST')).to.throw(Error);
    });
  });

  describe('#addVoice', () => {
    it('should add a new voice to the score', () => {
      score.addVoice('v2');
      expect(() => score.getVoice('v2')).to.not.throw(Error);
    });
  });

  describe('#deleteVoice', () => {
    it('should delete a voice', () => {
      score.deleteVoice('v1');
      expect(() => score.getVoice('v1')).to.throw(Error);
    });
  });

  describe('#addMeasure', () => {
    it('should add a measure at the end of the score when no position arg is sent', () => {
      const measure = score.getMeasure('v1', 0);
      score.addMeasure('v1');
      expect(score.getMeasure('v1', 1)).to.not.equal(measure);
    });

    it('should add a measure at the right position when a position arg is sent', () => {
      const measure = score.getMeasure('v1', 0);
      score.addMeasure('v1', { measure, index: 0 });
      expect(score.getMeasure('v1', 0)).to.equal(measure);
    });

    it('should insert an existing measure when one is sent', () => {
      const measure = new Measure();
      score.addMeasure('v1', { measure });
      expect(score.getMeasure('v1', 1)).to.equal(measure);
    });
  });

  describe('#deleteMeasure', () => {
    it('should remove the measure at the position', () => {
      score.addMeasure('v1', { index: 1 });
      const measures       = score.getVoice('v1').slice(0, 1);
      const deletedMeasure = score.getVoice('v1')[1];
      expect(score.deleteMeasure('v1', 1)[0]).to.equal(deletedMeasure);
      expect(measures).to.eql(score.getVoice('v1'));
    });

    it('should return false when the measure is not found', () => {
      expect(score.deleteMeasure('v1', 5)).to.be.false;
    });
  });

  describe('#transposeMeasure', () => {
    it('should transpose a measure', () => {
      const spy = sinon.spy(score.getMeasure('v1', 0), 'transpose');
      score.addNote('v1', 0, 0, { note: 'C3', duration: '4n' });
      score.transposeMeasure('v1', 0, 12);
      expect(spy).to.have.been.calledOnce;
      const notes = [...score.getMeasure('v1', 0).data[0].notes];
      expect(notes[0]).to.equal('C4');
      spy.restore();
    });

    it('should return false when the measure does not exist', () => {
      expect(score.transposeMeasure('v1', 2, 12)).to.be.false;
    });
  });

  describe('#cloneMeasure', () => {
    it('should clone the measure at the position and make its index position + 1', () => {
      const stub = sinon.stub(score.getMeasure('v1', 0), 'clone');
      score.cloneMeasure('v1', 0);
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });

    it('should return false when the measure number doesnt exist', () => {
      expect(score.cloneMeasure('v1', 5)).to.be.false;
    });
  });

  describe('#addNote', () => {
    it('should add notes to the measure when it exists', () => {
      const spy = sinon.spy(score.getMeasure('v1', 0), 'addNote');
      expect(score.addNote('v1', 0, 0, { note: 'C3', duration: '4n' })).to.be.true;
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it('should return false when it doesnt add the note to the measure', () => {
      expect(score.addNote('v1', 0, 2, { note: 'c3', duration: '4n' })).to.be.false;
    });

    it('should return false when the measure doesnt exist', () => {
      expect(score.addNote('v1', 4, 0, { note: 'c3', duration: '4n' })).to.be.false;
    });
  });

  describe('#addNotes', () => {
    it('should throw an error when it doesn\'t get a note array props', () => {
      const spy = sinon.spy(score.getMeasure('v1', 0), 'addNotes');
      score.addNotes('v1', 0, 0, { notes: ['C3', 'E3'], duration: '4n' });
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it('should return false when it doesnt add the note to the measure', () => {
      expect(score.addNotes('v1', 0, 2, { notes: ['c3'], duration: '4n' })).to.be.false;
    });

    it('should return false when the measure doesnt exist', () => {
      expect(score.addNotes('v1', 4, 0, { notes: ['c3'], duration: '4n' })).to.be.false;
    });
  });

  describe('#deleteNote', () => {
    it('deletes the note at the position from the measure', () => {
      score.addMeasure('v1');
      const stub = sinon.stub(score.getMeasure('v1', 1), 'deleteNote').returns(true);
      expect(score.addNote('v1', 1, 0, { note: 'C3', duration: '4n' })).to.be.true;
      expect(score.deleteNote('v1', 1, 0, 'C3')).to.be.true;
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });

    it('returns false when the note cant be deleted', () => {
      expect(score.deleteNote('v1', 0, 0, 'c3')).to.be.false;
    });

    it('should return false when the measure doesnt exist', () => {
      expect(score.deleteNotes('v1', 4, 0, ['c3'])).to.be.false;
    });
  });

  describe('#deleteNotes', () => {
    it('should delete notes from a measure that exists in the score', () => {
      score.addMeasure('v1');
      const spy = sinon.spy(score.getMeasure('v1', 0), 'deleteNotes');
      expect(score.addNotes('v1', 0, 0, { notes: ['c3', 'g3'], duration: '4n' })).to.be.true;
      expect(score.deleteNotes('v1', 0, 0, ['c3', 'g3'])).to.be.true;
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it('should return false when notes are not deleted', () => {
      expect(score.deleteNotes('v1', 0, 0, ['C3', 'G3'])).to.be.false;
    });
  });

  describe('#addChord', () => {
    it('should call the addChord funtion on the specified measure', () => {
      score.addMeasure('v1');
      const stub = sinon.stub(score.getMeasure('v1', 0), 'addChord').returns(true);
      expect(score.addChord('v1', 0, 0, {})).to.be.true;
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });

    it('should return false when the chord is not added', () => {
      const stub = sinon.stub(score.getMeasure('v1', 0), 'addChord').returns(false);
      expect(score.addChord('v1', 0, 0, {})).to.be.false;
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });
  });

  describe('#deleteMember', () => {
    it('should call the deleteMember funtion on the specified measure', () => {
      const stub = sinon.stub(score.getMeasure('v1', 0), 'deleteMember').returns(true);
      expect(score.deleteMember('v1', 0, 0)).to.be.true;
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });

    it('should return false when the chord is not added inside the measure process', () => {
      const stub = sinon.stub(score.getMeasure('v1', 0), 'deleteMember').returns(false);
      expect(score.deleteMember('v1', 0, 0)).to.be.false;
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });

    it('should return false when the measure does not exist', () => {
      expect(score.deleteMember('v1', 4, 0)).to.be.false;
    });
  });

  describe('#clearMeasure', () => {
    it('should clear a measure from all data', () => {
      expect(score.addNote('v1', 0, 0, { note: 'C3', duration: '4n' })).to.be.true;
      expect(score.clearMeasure('v1', 0)).to.be.true;
      expect(score.getMeasure('v1', 0).data[0].notes.size).to.equal(0);
    });

    it('should return false when the measure doesnt exist', () => {
      expect(score.clearMeasure('v1', 3)).to.be.false;
    });
  });

  describe('#transpose', () => {
    it('should transpose all measures', () => {
      score.addMeasure('v1');
      const spy1 = sinon.spy(score.getMeasure('v1', 0), 'transpose');
      const spy2 = sinon.spy(score.getMeasure('v1', 1), 'transpose');
      score.transpose('v1', 0);
      expect(spy1).to.have.been.calledOnce;
      expect(spy2).to.have.been.calledOnce;
      spy1.restore();
      spy2.restore();
    });
  });

  describe('#toString', () => {
    it('Properly turns a score to a string', () => {
      const score   = new Score({ bpm: 80, timeSignature: [2, 4], name: 'my score', voiceNames: ['v1'] });
      const measure = new Measure();

      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 0);
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 1);
      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 2);
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 3);

      const chordMeasure = new Measure();
      chordMeasure.addChord({ name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4n' }, 0);

      score.addMeasure('v1', { measure });
      score.addMeasure('v1', { measure: chordMeasure });

      const scoreString = score.toString();

      expect(scoreString).to.equal('my score___2,4___80___v1_d_C3-C4_4n__D3-D4_4n__C3-C4_4n__D3-D4_4n_m_C3-E3-G3_4n_C M');
    });
  });

  describe('#stringToScore', () => {
    it('Properly turns a string to a score', () => {
      const score   = new Score({ bpm: 80, timeSignature: [2, 4], name: 'my score', voiceNames: ['v1'] });
      const measure = new Measure();

      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 0);
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 1);
      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 2);
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 3);

      const chordMeasure = new Measure();
      chordMeasure.addChord({ name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4n' }, 0);

      score.addMeasure('v1', { measure });
      score.addMeasure('v1', { measure: chordMeasure });

      const scoreString = score.toString();

      expect(scoreString).to.equal('my score___2,4___80___v1_d_C3-C4_4n__D3-D4_4n__C3-C4_4n__D3-D4_4n_m_C3-E3-G3_4n_C M');
    });
  });
});
