import {Measure}      from '../../src/notation/Measure'
import {Score}        from '../../src/notation/Score'
import {ScoreHandler} from '../../src/notation/ScoreHandler'

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
        it('turns a measure into object literal', () => {
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
    })

    describe('#objectToMeasure', () => {
        it('creates a new measure from object', () => {
            const obj = ScoreHandler.measureToObject(measure)
            expect(ScoreHandler.objectToMeasure(obj)).to.eql(measure)
        })
    })

    describe('#stringifyScore', () => {
        it('creates a object from a score', async () => {
            const scoreString = await ScoreHandler.stringifyScore(score)
            expect(await ScoreHandler.parseScore(scoreString)).to.eql(score)
        })
    })
})
