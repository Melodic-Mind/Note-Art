import {MusicTheoryStructures as mts, firstToUpper} from '..'
import {PitchClassRule}                             from '../validation/PitchClassRule'

/**
 * @classdesc Represents a pitch class.
 */
export class PitchClass {
    /**
     * Creates a new pitch class instance.
     * @param pitchClass
     */
    constructor(pitchClass) {
        const attributes = {}
        PitchClassRule.exists(pitchClass)
        attributes.pitchClass = firstToUpper(pitchClass)
        attributes.classSet   = mts.circleOfFourths.includes(attributes.pitchClass) ? 'b' : '#'
        attributes.classIndex = mts.getPitchClassSet(attributes.classSet).indexOf(attributes.pitchClass)

        this.attributes = attributes
    }

    /**
     * Returns the pitch class.
     * @type {String}
     */
    get pitchClass() { return this.attributes.pitchClass }

    /**
     * Get the set of the pitch class - sharp or flat.
     * @type {String}
     */
    get classSet() { return this.attributes.classSet }

    set classSet(set){
        this.attributes.classSet = set
    }

    /**
     * Get the index of the pitch class out of the 12 classes (C, Db, etc...).
     * @type {Number}
     */
    get classIndex() { return this.attributes.classIndex }

    /**
     * Returns string of the pitch class.
     * @returns {String}
     */
    toString() { return this.pitchClass}
}
