import {expect}       from 'chai'
import {PlayableNote} from '../../src'

const c = new PlayableNote({
    pitchClass: 'c',
    octave:     3,
    duration:   '4n',
    instrument: 'Piano',
})

describe('PlayableNote', () => {
    it('has the following properties', () => {
        expect(c.pitchClass).to.eql('C')
        expect(c.octave).to.eql(3)
        expect(c.duration).to.eql('4n')
        expect(c.classSet).to.eql('b')
        expect(c.classIndex).to.eql(0)
        expect(c.instrument).to.eql('Piano')
    })

    describe('#interval', () => {
        it('transposes a note with a valid interval', () => {
            const stub = new PlayableNote({
                pitchClass: 'f',
                octave:     3,
                duration:   '4n',
                instrument: 'Piano',
            })
            expect(c.interval(5)).to.eql(stub)
        })
        it('returns undefined when interval is not valid', () => {
            expect(c.interval('a')).to.be.undefined
        })
    })

    describe('#transpose', () => {
        it('transposes a note with a valid interval', () => {
            const stub = new PlayableNote({
                pitchClass: 'f',
                octave:     3,
                duration:   '4n',
                instrument: 'Piano',
            })
            expect(c.transpose(5)).to.eql(stub)
        })
        it('returns undefined when interval is not valid', () => {
            expect(c.transpose('a')).to.be.undefined
        })
    })

    describe('#setDuration', () => {
        it('returns a new PlayableNote with the new duration', () => {
            const cnew = c.setDuration('8n')
            expect(cnew.duration).to.equal('8n')
            expect(cnew).to.not.equal(c)
        })
        it('returns a new instance of the same note when the duration is not valid', () => {
            const same = c.setDuration(200)
            expect(same).to.eql(c)
        })
    })

    describe('#setOctave', () => {
        it('returns a new PlayableNote with the new octave', () => {
            const c2 = c.setOctave(2)
            expect(c2.octave).to.equal(2)
            expect(c2).to.not.equal(c)
        })
        it('returns a new instance of the same note when the octave is not valid', () => {
            const same = c.setOctave(200)
            expect(same).to.eql(c)
        })
    })
})
