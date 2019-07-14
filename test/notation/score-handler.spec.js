import {Measure, Score, ScoreHandler} from '../../src/'

describe('Score Handler', () => {
    let score
    let measure
    before(() => {
        score   = new Score()
        measure = new Measure()

        measure.addNotes({notes: ['c3', 'c4'], duration: '4n'}, 0)
        measure.addNotes({notes: ['d3', 'd4'], duration: '4n'}, 1)
        measure.addNotes({notes: ['c3', 'c4'], duration: '4n'}, 2)
        measure.addNotes({notes: ['d3', 'd4'], duration: '4n'}, 3)

        score.addMeasure(0, 0, measure)
    })
    describe('#measureToObject', () => {
        it('turns a measure with notes into object literal', () => {
            const stub = {
                maxDuration: 64,
                duration:    '4n',
                data:        [
                    {
                        notes:    ['C3', 'C4'],
                        duration: '4n',
                    },
                    {
                        notes:    ['D3', 'D4'],
                        duration: '4n',
                    },
                    {
                        notes:    ['C3', 'C4'],
                        duration: '4n',
                    },
                    {
                        notes:    ['D3', 'D4'],
                        duration: '4n',
                    },
                ],
            }

            expect(ScoreHandler.measureToObject(measure)).to.eql(stub)
        })

        it('turns a measure with chords into object literal', () => {
            const chordMeasure = new Measure()
            chordMeasure.addChord({name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4N'}, 0)
            const stub = {
                maxDuration: 64,
                duration:    '4n',
                data:        [
                    {notes: ['C3', 'E3', 'G3'], duration: '4n', caption: 'C M'},
                    {notes: [], duration: '4n'},
                ],
            }

            expect(ScoreHandler.measureToObject(chordMeasure)).to.eql(stub)
        })
    })

    describe('#objectToMeasure', () => {
        it('creates a new measure from object with notes', () => {
            const obj = ScoreHandler.measureToObject(measure)
            expect(ScoreHandler.objectToMeasure(obj)).to.eql(measure)
        })

        it.only('creates a new measure from object with chords', () => {
            const chordMeasure = new Measure()
            chordMeasure.addChord({name: 'C M', notes: ['C3', 'E3', 'G3'], duration: '4N'}, 0)
            const obj = ScoreHandler.measureToObject(measure)
            expect(ScoreHandler.objectToMeasure(obj)).to.eql(measure)
        })
    })

    describe('#stringifyScore', () => {
        it('creates a object from a score', async () => {
            const scoreString = await JSON.stringify(ScoreHandler.scoreToObject(score))
            expect(ScoreHandler.objectToScore(await JSON.parse(scoreString))).to.eql(score)
        })
    })
})
