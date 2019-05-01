import {Note, Chord}                                    from '../../src'
import {DataNotFound, InvalidInput, MissingInformation} from '../../src/Exceptions'

const c = new Note('c', 3)

describe('Chord', () => {
    describe('#constructor', () => {
        it('Throws exception when a chord name is invalid', () => {
            expect(() => new Chord({root: c, name: 'blob'})).to.throw(DataNotFound)
        })

        it('Builds chord with pattern that is not in the chords database', () => {
            expect(() => new Chord({root: c, pattern: [1, 2]})).to.not.throw(DataNotFound)
        })

        it('Builds a chord with a valid chord name', () => {
            expect(new Chord({root: c, name: 'M7'})).to.be.instanceOf(Chord)
        })

        it('Builds a chord with a valid pattern', () => {
            expect(new Chord({root: c, pattern: [4, 7]})).to.be.instanceOf(Chord)
        })

        it('Throws exception when attempting to build chord without root', () => {
            expect(() => new Chord({chord: 'M'})).to.throw(MissingInformation)
        })

        it('Throws exception when attempting to build chord without chord name or pattern', () => {
            expect(() => new Chord({root: c})).to.throw(MissingInformation)
        })

        it('should throw an exception when root is not a Note', () => {
            expect(() => new Chord({root: 'Not a Note', name: 'M'})).to.throw(InvalidInput)
        })
    })

    describe('has properties', () => {
        it('when chord is from chord database', () => {
            const c_Maj = new Chord({root: c, name: 'M'})
            const stub  = [
                new Note('C', 3),
                new Note('e', 3),
                new Note('g', 3),
            ]
            expect(c_Maj.notes).to.eql(stub)
            expect(c_Maj.fullName).to.equal('Major')
            expect(c_Maj.name).to.eql('M')
            expect(c_Maj.pitchIntervals).to.eql([4, 7])
            expect(c_Maj.octave).to.equal(stub[0].octave)
            expect(c_Maj.pitchClasses).to.equal('C3, E3, G3')
        })

        it('when chord is not from chord database', () => {
            const someChord = new Chord({root: c, pattern: [1, 2]})
            const stub  = [
                new Note('C', 3),
                new Note('Db', 3),
                new Note('D', 3),
            ]
            expect(someChord.notes).to.eql(stub)
            expect(someChord.fullName).to.equal('Unknown')
            expect(someChord.name).to.eql('Unknown')
            expect(someChord.pitchIntervals).to.eql([1, 2])
            expect(someChord.octave).to.equal(stub[0].octave)
            expect(someChord.pitchClasses).to.equal('C3, Db3, D3')
        })
    })
    describe('#type', () => {
        it('returns major when the chord is major', () => {
            expect(new Chord({root: c, name: 'M'}).type).to.equal('major')
        })
        it('returns minor when the chord is minor', () => {
            expect(new Chord({root: c, name: 'm'}).type).to.equal('minor')
        })
        it('returns undefined when its neither', () => {
            expect(new Chord({root: c, pattern: [2, 8, 10]}).type).to.be.undefined
        })
    })

    it('#toString', () => {
        expect(new Chord({root: c, name: 'M'}).toString()).to.eql('C M')
    })

    describe('#transpose', () => {
        it('returns a transposed chord with valid interval', () => {
            const stub = [
                new Note('d', 3),
                new Note('f#', 3),
                new Note('a', 3),
            ]
            expect(new Chord({root: c, name: 'M'}).transpose(2).notes).to.eql(stub)
        })

        it('returns undefined with invalid interval', () => {
            const chord = new Chord({root: c, name: 'M'})
            expect(() => {chord.transpose('invalid interval')}).to.throw(InvalidInput)
        })
    })

    describe('#raw', () => {
        it('should return an array of the scales raw notes', () => {
            expect(new Chord({root: c, pattern: [4, 7]}).raw).to.eql(['C3', 'E3', 'G3'])
        })
    })
})
