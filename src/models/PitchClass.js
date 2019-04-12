import {firstToUpper}                 from '../addons/GlobalFunctions'
import {PitchClassRule}               from '../validation/PitchClassRule'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {InvalidInput}                 from '../Exceptions'

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
    get pitchClass() {
        return this.attributes.pitchClass
    }

    /**
     * Get the set of the pitch class - sharp or flat.
     * @type {String}
     */
    get classSet() {
        return this.attributes.classSet
    }

    set classSet(set) {
        if (mts.pitchClassSets.includes(set)) {
            if (this.classSet === 'b') {
                this.attributes.pitchClass = PitchClass.flatToSharp(this.pitchClass)
            } else {
                this.attributes.pitchClass = PitchClass.sharpToFlat(this.pitchClass)
            }
            this.attributes.classSet = set
        }
    }

    static isFlat(pitchClass) {
        return pitchClass.includes('b')
    }

    static isSharp(pitchClass) {
        return pitchClass.includes('#')
    }

    static flatToSharp(pitchClass) {
        return this.alterPitchClass(pitchClass, 'isFlat', -1)
    }

    static sharpToFlat(pitchClass) {
        return this.alterPitchClass(pitchClass, 'isSharp', 1)
    }

    /**
     * Helper method for sharpToFlat & flatToSharp,
     * should never be called.
     * @param pitchClass
     * @param operation
     * @param constant
     * @return {string}
     * @private
     */
    static alterPitchClass(pitchClass, operation, constant){
        if (PitchClass[operation](pitchClass)) {
            return mts.pitchClasses[mts.pitchClasses.indexOf(pitchClass) + constant]
        }
        return pitchClass
    }

    /**
     * Get the index of the pitch class out of the 12 classes (C, Db, etc...).
     * @type {Number}
     */
    get classIndex() {
        return this.attributes.classIndex
    }

    interval(interval) {
        if (interval === parseInt(interval)) {
            if (interval >= 0) {
                return new PitchClass(mts.getPitchClassSet(this.classSet)[(this.classIndex + interval) % 12])
            }
            return new PitchClass(mts.getPitchClassSet(this.classSet)[Math.abs((this.classIndex + (12 + (interval % 12))) % 12)])
        }
        throw new InvalidInput(`${interval} is not a valid interval`)
    }

    /**
     * Returns string of the pitch class.
     * @returns {String}
     */
    toString() {
        return this.pitchClass
    }
}
