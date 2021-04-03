import { Measure, Score, ScoreHandler } from '../../src'

describe('Score Handler', () => {
  let score, measure, chordMeasure
  beforeEach(() => {
    score   = new Score({ bpm: 80, timeSignature: [2, 4], name: 'my score', voiceNames: ['v1'] })
    measure = new Measure()

    measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 0)
    measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 1)
    measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 2)
    measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 3)

    chordMeasure = new Measure()
    chordMeasure.addChord({ name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4n' }, 0)

    score.addMeasure('v1', measure, 0)
    score.addMeasure('v1', chordMeasure, 0)
  })

  describe('#measureToObject', () => {
    it('turns a measure with notes into object literal', () => {
      const stub = {
        maxDuration: 64,
        data:        [
          {
            notes:    ['C3', 'C4'],
            duration: '4n'
          },
          {
            notes:    ['D3', 'D4'],
            duration: '4n'
          },
          {
            notes:    ['C3', 'C4'],
            duration: '4n'
          },
          {
            notes:    ['D3', 'D4'],
            duration: '4n'
          }
        ]
      }

      expect(ScoreHandler.measureToObject(measure)).to.eql(stub)
    })

    it('turns a measure with chords into object literal', () => {
      const stub = {
        maxDuration: 64,
        data:        [
          { notes: ['C3', 'E3', 'G3'], duration: '4n', name: 'C M' },
          { notes: [], duration: '4n' }
        ]
      }

      expect(ScoreHandler.measureToObject(chordMeasure)).to.eql(stub)
    })
  })

  describe('#objectToMeasure', () => {
    it('creates a new measure from object with notes', () => {
      const obj = ScoreHandler.measureToObject(measure)
      expect(ScoreHandler.objectToMeasure(obj)).to.eql(measure)
    })

    it('creates a new measure from object with chords', () => {
      const chordMeasure = new Measure()
      chordMeasure.addChord({ name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4n' }, 0)
      const obj = ScoreHandler.measureToObject(chordMeasure)
      expect(ScoreHandler.objectToMeasure(obj)).to.eql(chordMeasure)
    })
  })

  describe('#objectFromScore', () => {
    it('creates a object from a score', () => {
      const scoreString  = ScoreHandler.scoreToObject(score)
      const sameOldScore = ScoreHandler.objectToScore(scoreString)
      expect(sameOldScore).to.eql(score)
      expect(sameOldScore.name).to.equal('my score')
    })
  })

  describe('#objectToScore', () => {
    it('turns an object with more than one voice to a score', () => {
      score.addVoice()
      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 0)
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 1)
      measure.addNotes({ notes: ['c3', 'c4'], duration: '4n' }, 2)
      measure.addNotes({ notes: ['d3', 'd4'], duration: '4n' }, 3)

      chordMeasure = new Measure()
      chordMeasure.addChord({ name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4n' }, 0)

      score.addMeasure('v1', { index: 1, measure })
      score.addMeasure('v1', { index: 1, measure: chordMeasure })
      const scoreString  = ScoreHandler.scoreToObject(score)
      const sameOldScore = ScoreHandler.objectToScore(scoreString)
      expect(sameOldScore).to.eql(score)
      expect(sameOldScore.name).to.equal('my score')
    })
  })

  describe('#cloneScore', () => {
    it('clones a score', () => {
      const clone = ScoreHandler.cloneScore(score)
      expect(clone).to.eql(score)
    })
  })
})
