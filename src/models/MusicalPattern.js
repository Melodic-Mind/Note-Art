import {PitchClassRule} from '../validation/PitchClassRule'
import {PatternRule}    from '../validation/PatternRule'
import {buildString}    from '../utilities/Utilities'

/**
 * @classdesc Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.
 * @param {PitchClass} pitchClass
 * @param {Array} pattern
 * @param {Object} [info={}]
 */
export class MusicalPattern {
    constructor(pitchClass, pattern, info = {}) {
        PitchClassRule.isPitchClass(pitchClass)
        PatternRule.isPattern(pattern)
        this.attributes = {}
        this.setPitchClasses(pitchClass, pattern)
        this.attributes.info = {...info, pattern}
    }


    setPitchClasses(pitchClass, pattern) {
        const notes = [pitchClass]
        pattern.forEach(interval => notes.push(pitchClass.interval(interval)))

        this.attributes.pitchClasses = notes
    }

    get pitchClasses() {
        return this.attributes.pitchClasses
    }

    get root() {
        return this.pitchClasses[0]
    }

    get info() {
        return this.attributes.info
    }

    get pattern() {
        return this.info.pattern
    }

    get raw() {
        return this.pitchClasses.map(pitchClass => pitchClass.raw)
    }

    /**
     * Returns a string of the musical pattern's pitch classes.
     * @returns {String}
     */
    toString() {
        return buildString(this.pitchClasses)
    }

    /**
     * Generates a new chord with the interval applied
     * @param {Number} interval the interval to apply
     * @returns {MusicalPattern}
     */
    transpose(interval) {
        const root = this.root.interval(interval)
        return new MusicalPattern(root, this.pattern, this.info)
    }
}
