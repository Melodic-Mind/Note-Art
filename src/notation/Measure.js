import {getMinDuration, MusicTheoryStructures as mts} from '../'

/**
 * Represents a single measure as part of a musical piece in musical notation.
 * @class
 */
export class Measure {
    /**
     * Creates a Measure instance
     * @param {Number} [maxDuration=0] Max duration of the measure(decided by time signature)
     */
    constructor(maxDuration = 0) {
        const attributes       = {}
        attributes.noteSets    = []
        attributes.maxDuration = maxDuration
        attributes.duration    = 0

        this.attributes = attributes
    }

    /**
     *
     */
    get noteSets() {
        return this.attributes.noteSets
    }

    /**
     * get the duration
     */
    get duration() {
        return this.attributes.duration
    }

    /**
     * set the duration
     */
    set duration(duration) {
        this.attributes.duration = duration
    }

    get maxDuration() {
        return this.attributes.maxDuration
    }

    isFull() {
        return this.duration === this.maxDuration && this.maxDuration !== 0
    }

    /**
     * Change notes somewhere inside a measure
     * @param {Array} set The new set.
     * @param {Number} i The index of the set to replace with.
     */
    changeSet(set, i) {
        this.noteSets.splice(i, 1, set)
    }

    mutateSet(set, i) {
        set.forEach(note => this.noteSets[i].push(note))
    }

    changeNote(note, noteIndex, setIndex) {
        this.noteSets[setIndex].splice(noteIndex, 1, note)
    }

    clone() {
        const clone    = new Measure(this.maxDuration)
        const noteSets = this.noteSets.map(set => ([...set]))
        clone.pushSets(noteSets)
        return clone
    }

    get durationLeft() {
        return this.maxDuration - this.duration
    }

    /**
     * Push notes to a measure
     * @param {Array} notes array of notes
     */
    pushSet(set = []) {
        let valid = []
        set.forEach(note => {
            if (
                mts.noteDurations[note.duration] <= this.durationLeft ||
                this.maxDuration === 0
            ) {
                valid.push(note)
            }
        })
        if (valid.length) {
            this.noteSets.push(valid)
        }
        this.duration += getMinDuration(valid)
    }

    /**
     * Add sets to the end of the measure
     * @param {Array} noteSets array of sets
     */
    pushSets(noteSets) {
        noteSets.forEach(set => this.pushSet(set))
    }

    insertSet(set, index = this.noteSets.length, replace = 0) {
        if (this.noteSets.length >= index) {
            let valid = []
            set.forEach(note => {
                console.log(mts.noteDurations[note.duration], this.durationLeft)
                if (replace) {
                    if (
                        mts.noteDurations[note.duration] <= this.durationLeft + getMinDuration(this.noteSets[index]) ||
                        this.maxDuration === 0
                    ) {
                        valid.push(note)
                    }
                } else {
                    if (
                        mts.noteDurations[note.duration] <= this.durationLeft ||
                        this.maxDuration === 0
                    ) {
                        valid.push(note)
                    }
                }
            })
            if (valid.length) {
                this.noteSets.splice(index, replace, valid)
            }
            this.duration += getMinDuration(valid)
        }
    }

    deleteNoteSet(noteSetIndex) {
        this.duration -= getMinDuration(this.noteSets[noteSetIndex])
        this.noteSets.splice(noteSetIndex, 1)
    }

    deleteNote(noteIndex, noteSetIndex) {
        if (this.noteSets[noteSetIndex]) {
            if (this.noteSets[noteSetIndex][noteIndex]) {
                this.noteSets[noteSetIndex].splice(noteIndex, 1)
            }
        }
    }

    transpose(interval) {
        const transposedSets = this.noteSets.map(set =>
            set.map(note => note.interval(parseInt(interval))),
        )

        const transposedMeasure = new Measure(this.maxDuration)
        transposedMeasure.pushSets(transposedSets)

        return transposedMeasure
    }

    toString() {
        let string = 'Measure: {'
        this.noteSets.forEach(set => {
            string += 'Notes: ['
            set.forEach(note => (string += ' ' + note.toString() + ','))
            string += ' ], '
        })
        string += '} '
        return string
    }
}
