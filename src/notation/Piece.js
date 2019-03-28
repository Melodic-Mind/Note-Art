import {Measure, twoDigitFormat, getMinDuration, Drums} from '../'
import Tone                                             from 'tone'

export class Piece {
    constructor(bpm = 120, timeSignature = [4, 4]) {
        const attributes                   = {}
        attributes.transport               = Tone.Transport
        attributes.transport.bpm.value     = bpm
        attributes.transport.loop          = true
        attributes.transport.timeSignature = timeSignature
        attributes.current                 = null
        attributes.measures                = []
        attributes.noteSets                = []
        attributes.duration                = 0

        this.metronome    = new Drums()
        this.isMetronome  = false
        this.beat         = 0
        this.noteSetIndex = -1
        this.measureIndex = 0

        this.attributes = attributes
    }

    /**
     * get the duration
     */
    get duration() {
        return twoDigitFormat(this.attributes.duration)
    }

    get transport() {
        return this.attributes.transport
    }

    set duration(d) {
        this.attributes.duration = d
    }

    get bpm() {
        return this.transport.bpm.value
    }

    set bpm(bpm) {
        this.transport.bpm.value = bpm
    }

    get timeSignature() {
        return this.transport.timeSignature
    }

    set timeSignature(timeSignature) {
        this.transport.timeSignature = timeSignature
    }

    get measures() {
        return this.attributes.measures
    }

    set measures(measures) {
        this.attributes.measures = measures
    }

    get noteSets() {
        return this.attributes.noteSets
    }

    set noteSets(setsArr) {
        this.attributes.noteSets = setsArr
    }

    get current() {
        return this.attributes.current
    }

    set current(curr) {
        this.attributes.current = curr
    }

    getBeat() {
        return this.beat
    }

    getNoteSetIndex() {
        return this.noteSetIndex
    }

    getMeasureIndex() {
        return this.measureIndex
    }

    pushMeasure(measure) {
        if (measure instanceof Measure) {
            this.measures.push(measure)
            this.duration += measure.duration
            measure.noteSets.forEach(set => this.noteSets.push(set))
        }
    }

    pushMeasures(measures) {
        measures.forEach(measure => this.pushMeasure(measure))
    }

    insertMeasure(measure, index) {
        if (measure instanceof Measure) {
            this.measures.splice(index, 0, measure)
            measure.noteSets.forEach((set, i) => {
                this.noteSets.splice(index + i, 0, set)
            })
        }
    }

    noteSetsUpToMeasure(measureIndex) {
        let length = 0
        for (let i = 0; i < measureIndex; i++)
            length += this.measures[i].noteSets.length
        return length
    }

    insertNoteSet(noteSet, noteSetIndex, measureIndex = this.measures.length) {
        if (this.measures.length >= measureIndex) {
            if (this.measures.length === measureIndex) {
                return this.pushNoteSet(noteSet)
            }
        }
        this.measures[measureIndex].insertSet(noteSet, noteSetIndex)
        this.noteSets.splice(
            noteSetIndex + this.noteSetsUpToMeasure(measureIndex),
            0,
            noteSet,
        )
    }

    deleteMeasure(i) {
        if (this.measures[i]) {
            this.duration -= this.measures[i].duration
            this.noteSets.splice(
                this.noteSetsUpToMeasure(i),
                this.measures[i].noteSets.length,
            )
            this.measures.splice(i, 1)
        }
    }

    pop() {
        this.measures.pop()
    }

    changeSet(set, setIndex, measureIndex) {
        this.measures[measureIndex].changeSet(set, setIndex)
    }

    mutateSet(set, setIndex, measureIndex) {
        this.measures[measureIndex].mutateSet(set, setIndex)
    }

    changeNote(note, noteIndex, setIndex, measureIndex) {
        this.measures[measureIndex].changeNote(note, noteIndex, setIndex)
    }

    pushNoteSet(noteSet) {
        const len = this.measures.length - 1
        if (!(len + 1) || this.measures[len].isFull()) {
            const measure = new Measure(16)
            measure.insertSet(noteSet)
            this.pushMeasure(measure)
        } else {
            this.measures[len].insertSet(noteSet)
            this.noteSets.push(noteSet)
        }
    }

    cloneMeasure(measureIndex) {
        const clone = this.measures[measureIndex].clone()
        this.measures.splice(measureIndex, 0, clone)
    }

    deleteNoteSet(noteSetIndex, measureIndex) {
        if (this.measures[measureIndex]) {
            this.noteSets.splice(
                noteSetIndex + this.noteSetsUpToMeasure(measureIndex),
                1,
            )
            this.measures[measureIndex].deleteNoteSet(noteSetIndex)
        }
    }

    deleteNote(noteIndex, noteSetIndex, measureIndex) {
        if (this.measures[measureIndex]) {
            if (this.measures[measureIndex]) {
                this.noteSets[
                noteSetIndex + this.noteSetsUpToMeasure(measureIndex)
                    ].splice(noteIndex, 1)
                this.measures[measureIndex].deleteNote(noteIndex, noteSetIndex)
            }
        }
    }

    isPlaying() {
        return this.transport.state
    }

    toString() {
        let string = 'Piece: { '
        this.measures.forEach(m => (string += m.toString() + ', '))
        string += '} '
        return string
    }

    transpose(interval) {
        this.measures = this.measures.map(m => m.transpose(interval))
    }

    play(startTime = 0) {
        if (this.transport.state === 'stopped') {
            this.transport.loopEnd = this.measures.length + 'm'
            this.beat              = 0
            this.measures.forEach((measure, measureIndex) => {
                let setTime = 0
                measure.noteSets.forEach((set, setIndex) => {
                    set.forEach(note =>
                        this.transport.schedule(time => {
                            note.play()
                            this.noteSetIndex = setIndex
                            this.measureIndex = measureIndex
                        }, `${measureIndex}:0:${setTime}`),
                    )
                    setTime += getMinDuration(set)
                })
            })
            this.transport.scheduleRepeat(time => {
                if (
                    this.transport.position[0] > this.measures.length - 1 &&
                    !this.transport.loop
                ) {
                    this.transport.stop()
                    this.transport.cancel()
                }
                this.beat += 1
                if (this.isMetronome) {
                    this.metronome.play()
                }
                if (this.beat > 4) {
                    this.beat = 1
                }
            }, '4n')
            this.transport.start()
        } else {
            this.transport.stop()
            this.transport.cancel()
            this.noteSetIndex = -1
        }
    }
}
