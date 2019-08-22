import {ScorePlayer, Piano, Score} from '../../src'

let player, score
beforeEach(() => {
    score = new Score()
    player = new ScorePlayer(score, [new Piano()])
})

describe('Driver', () => {
    describe('new player', () => {
        it('has these attributes', () => {

        })
    })

    describe('#play', () => {
        it('should use Tone.transport to schedule and play', () => {

        })
    })
})
