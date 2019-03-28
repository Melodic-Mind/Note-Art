import {Note, Chord, PlayableNote}                      from '../../src'
import {DataNotFound, InvalidInput, MissingInformation} from '../../src/Exceptions'

const c         = new Note({pitchClass: 'c', octave: 3, duration: '4n'})
const playableC = new PlayableNote({pitchClass: 'c', octave: 3, duration: '4n', instrument: 'Piano'})

describe('Chord', () => {
    describe('#constructor', () => {
        it('Throws exception when a chord name sent to constructor is not valid', () => {
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
    })

    it('#properties', () => {
        const c_Maj = new Chord({root: c, name: 'M'})
        const stub  = [
            new Note({pitchClass: 'C', octave: 3, duration: '4n'}),
            new Note({pitchClass: 'e', octave: 3, duration: '4n'}),
            new Note({pitchClass: 'g', octave: 3, duration: '4n'}),
        ]
        expect(c_Maj.notes).to.eql(stub)
        expect(c_Maj.fullName).to.equal('Major')
        expect(c_Maj.name).to.eql('M')
        expect(c_Maj.pitchIntervals).to.eql([4, 7])
        expect(c_Maj.octave).to.equal(stub[0].octave)
        expect(c_Maj.duration).to.equal(stub[0].duration)
        expect(c_Maj.pitchClasses).to.equal('C3, E3, G3, ')
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
                new Note({pitchClass: 'd', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'f#', octave: 3, duration: '4n'}),
                new Note({pitchClass: 'a', octave: 3, duration: '4n'}),
            ]
            expect(new Chord({root: c, name: 'M'}).transpose(2).notes).to.eql(stub)
        })

        it('returns undefined with invalid interval', () => {
            expect(new Chord({root: c, name: 'M'}).transpose('omg')).to.be.undefined
        })
    })

    describe('#play', () => {
        it('returns false when note is not playable', () => {
            expect(new Chord({root: c, name: 'M'}).play()).to.be.false
        })
        it('returns true when a note is playable', () => {
            expect(new Chord({root: playableC, name: 'M'}).play()).to.be.true
        })
    })

    it('#playMelody', () => {
        expect(new Chord({root: c, name: 'M'}).playMelody()).to.be.undefined
    })

    describe('#setDuration', () => {
        describe('when chord notes are instances of \'Note\'', () => {
            it('throws an error when duration is invalid', () => {
                expect(() => {return new Chord({root: c, name: 'M'}).setDuration(12)}).to.throw(InvalidInput)
            })

            it('returns a new chord when duration is valid', () => {
                const newchord = new Chord({root: c, name: 'M'}).setDuration('8n')
                expect(newchord.notes[0].duration).to.be.equal('8n')
            })
        })

        describe('when chord notes are instances of \'PlayableNote\'', () => {
            const cm = new Chord({root: playableC, name: 'm'})
            it('returns a new chord when duration is valid', () => {
                const newDur = cm.setDuration('8n')
                expect(newDur).to.not.equal(cm)
                newDur.notes.forEach(note => expect(note.duration).to.eql('8n'))
            })

            it('returns a new instance of the same chord when the duration is not valid', () => {
                expect(cm.setDuration('NOT_A_DURATION')).to.be.eql(cm)
            })
        })
    })
    describe('#setOctave', () => {
        describe('when chord notes are instances of \'Note\'', () => {
            it('throws an error when octave is invalid', () => {
                expect(() => {return new Chord({root: c, name: 'M'}).setOctave('INVALID')}).to.throw(InvalidInput)
            })

            it('returns a new chord when octave is valid', () => {
                const newchord = new Chord({root: c, name: 'M'}).setOctave(6)
                expect(newchord.notes[0].octave).to.be.equal(6)
            })
        })

        describe('when chord notes are instances of \'PlayableNote\'', () => {
            const cm = new Chord({root: playableC, name: 'm'})
            it('returns a new chord when octave is valid', () => {
                const newDur = cm.setOctave(5)
                expect(newDur).to.not.equal(cm)
                newDur.notes.forEach(note => expect(note.octave).to.eql(5))
            })

            it('returns a new instance of the same chord when the octave is not valid', () => {
                expect(cm.setOctave('NOT_A_OCTAVE')).to.be.eql(cm)
            })
        })
    })
})
