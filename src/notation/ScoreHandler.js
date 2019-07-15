import {Measure, Score} from '../'

/**
 * Static class that can convert scores to objects and strings and back.
 */
export class ScoreHandler {
    /**
     * Convert a measure to object literal.
     * @param {Measure} measure
     * @return {{duration: string, data: {}, maxDuration: (number)}}
     */
    static measureToObject(measure) {
        const notes = measure.data.map(notesMember => this.notesToObject(notesMember))

        return {
            maxDuration: measure.maxDuration,
            duration:    measure.duration,
            data:        notes,
        }
    }

    /**
     * Convert a measure's notes member to object literal.
     * @param notesMember
     * @return {{duration: *, notes: any[]}}
     */
    static notesToObject(notesMember) {
        const notes = {
            notes:    Array.from(notesMember.notes),
            duration: notesMember.duration,
        }

        if (notesMember.name) {
            notes.name = notesMember.name
        }

        return notes
    }

    /**
     * Convert object literal representing a measure to an instance of Measure.
     * @param {object} measureObject
     * @return {Measure}
     */
    static objectToMeasure(measureObject) {
        const measure    = new Measure(measureObject.maxDuration)
        measure.duration = measureObject.duration
        measureObject.data.forEach((notesMember, position) => {
            if (notesMember.name) {
                measure.addChord({...notesMember}, position)
            } else {
                measure.addNotes({...notesMember}, position)
            }
        })

        return measure
    }

    /**
     * Convert a measure to object literal.
     * @param {Score} score
     * @return {{duration: string, voices: array, timeSignature: array, bpm: number}}
     */
    static scoreToObject(score) {
        const voices = score.voices.map(voice =>
            voice.map(measure => this.measureToObject(measure)),
        )

        return {
            timeSignature: score.timeSignature,
            bpm:           score.bpm,
            duration:      score.duration,
            voices,
        }
    }

    /**
     * Convert object literal representing a Score to an instance of Score.
     * @param {object} scoreObject
     * @return {Score}
     */
    static objectToScore(scoreObject) {
        const score    = new Score({timeSignature: scoreObject.timeSignature, bpm: scoreObject.bpm})
        score.duration = scoreObject.duration
        scoreObject.voices.forEach((voice, voiceIndex) => {
            voice.forEach((measureObject, measureIndex) => {
                if (measureObject.data[0].notes.length) {
                    score.addMeasure(measureIndex, voiceIndex, this.objectToMeasure(measureObject))
                }
            })
        })

        return score
    }
}
