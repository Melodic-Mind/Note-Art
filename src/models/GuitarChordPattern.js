import {PatternRule} from '../validation/PatternRule'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {calculateInterval, PitchClass} from '../'
import {InvalidInput} from '../Exceptions'

//system for creating chords out of patterns for every instrument.
//The ctor will be initialized with a pattern that fits some specific chord and can then be transposed to any other
// note or go higher or lower. this class getChords method returns an array of all the chords that can be built out of
// the pattern with the pitch class as root.
export class GuitarChordPattern {
    constructor(pattern, pitchClass, name) {
        PatternRule.isArray(pattern)
        this.attributes = {pattern, pitchClass, name}
    }

    get pattern() {
        return this.attributes.pattern
    }

    get pitchClass() {
        return this.attributes.pitchClass
    }

    get name() {
        return this.attributes.name
    }

    getChord(root) {
        if (!(root instanceof PitchClass)) {
            throw new InvalidInput(`expected ${root} to be an instance of PitchClass`)
        }

        const interval = calculateInterval(this.pitchClass, root)
        let res = ''
        this.pattern.forEach(pos => res += pos === 'x' ? 'x' : (pos + interval).toString())
        return {chord: res, name: `${root} ${this.name}`}
    }
}
