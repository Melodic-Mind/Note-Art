import {InvalidInput} from '../Exceptions'

const zeroNotes = ['B', 'Bb', 'A#', 'A']

/**
 * @classdesc Rules for validating octave for piano
 * @class
 */
export class PianoOctaveRule {
    constructor(value, pitchClass = null) {
        this.value      = value
        this.pitchClass = pitchClass
    }

    playable() {
        return this.value > 0 && this.value < 8
    }

    playableWithNote() {
        return this.isLowest() || this.isHighest()
    }

    isHighest() {
        return this.value === 8 && this.pitchClass === 'C'
    }

    isLowest() {
        return this.value === 0 && zeroNotes.includes(this.pitchClass)
    }

    notInteger() {
        return this.value !== parseInt(this.value)
    }

    static validateAudible(value, pitchClass) {
        const validator = new this(value, pitchClass)
        return validator.playable() || validator.playableWithNote()
    }

    static validatePossible(value) {
        const validator = new this(value)
        if (validator.notInteger()) {
            throw new InvalidInput(`${value} is not a valid octave`)
        }
        return true
    }
}
