import Transport                      from 'Tone/core/Transport'
import {Drumset}                      from '../instruments'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'

/**
 * @class Transport
 * @classdesc Represents a driver that can play a score.
 * Best practice is to create one driver that will be used to play everything inside the app/website.
 */
export default class ScorePlayer {
    constructor() {
        this.playing   = {voice: null, measure: null, noteSet: null}
        this.metronome = {active: false, sound: 'clap', id: null}
    }

    /**
     * Set the score the driver will play.
     * @param {Score} score A score containing voices.
     * @param {boolean} [updateTransport=true] Whether to update the transport's time signature and bpm values based on
     *     the score.
     * @return {this}
     */
    setScore(score = null, updateTransport = true) {
        if (score && updateTransport) {
            this.bpm                     = score.bpm
            this.transport.timeSignature = score.timeSignature
        }
        this.score = score
        this.clear()
        return this
    }

    /**
     * Set the instruments the driver will play with.
     * @param {Array} Instruments An array of instrument instances which will be used to play the voices.
     * @return {this}
     */
    setInstruments(instruments) {
        this.instruments = instruments
        return this
    }

    /**
     * Adds an instrument to the score.
     * @param instrument
     */
    addInstrument(instrument) {
        this.instruments.push(instrument)
        return this
    }

    startMetronome() {
        this.metronome.active = true
        this.metronome.id     = this.transport.scheduleRepeat(time => {
            this.drumSet.play(this.metronome.sound)
        }, '4n', '0')

        return this
    }

    stopMetronome() {
        this.metronome.active = false
        this.transport.clear(this.metronome.id)

        return this
    }

    toggleMetronome() {
        if (this.metronome.active) {
            return this.stopMetronome()
        } else {
            return this.startMetronome()
        }
    }

    // Initializes the Tone transport
    init() {
        this.transport               = Transport
        this.bpm                     = 120
        this.transport.timeSignature = 4
        this.transport.loop          = true
        this.drumSet                 = new Drumset()
        return this
    }

    set bpm(value) {
        this.transport.bpm.value = value
        if (this.score) {
            this.score.bpm = value
        }
    }

    get bpm() {
        return this.transport.bpm.value
    }

    set timeSignature(timeSignature) {
        this.score.setTimeSignature(timeSignature)
        this.setScore(this.score)
    }

    set loopStart(time) {
        this.transport.loopStart = time
    }

    /**
     * Returns the current state of the transport.
     * @return {Tone.State}
     */
    get state() {
        return this.transport.state
    }

    /**
     * Schedules all the voices of the score to the transport.
     */
    scheduleVoices() {
        this.transport.loopEnd = this.score.voices[0].length + 'm'
        for (let i = 0; i < this.score.voices.length; ++i) {
            this.scheduleMeasures(i)
        }

        return this
    }

    /**
     * Schedules all the measures of a voice from the score to the transport.
     * @param {number} voiceIndex Index of the voice in the score to schedule.
     */
    scheduleMeasures(voiceIndex) {
        this.score.getVoice(voiceIndex).forEach((measure, measureIndex) => {
            this.scheduleNotes(measureIndex, voiceIndex)
        })
    }

    /**
     * @return {Ticks}
     */
    get position() {
        return this.transport.position
    }

    /**
     * Schedules the notes of a measure to the transport.
     * @param {number} measureIndex
     * @param {number} voiceIndex
     */
    scheduleNotes(measureIndex, voiceIndex) {
        let setTime = 0
        this.score.voices[voiceIndex][measureIndex].data.forEach((data, dataIndex) => {
            data.notes.forEach((note) => {
                if (note !== 'R') {
                    this.transport.schedule(() => {
                        this.playing.voice   = voiceIndex
                        this.playing.measure = measureIndex
                        this.playing.noteSet = dataIndex
                        this.instruments[voiceIndex].play(note, '2n')
                    }, `${measureIndex}:0:${setTime}`)
                }
            })
            setTime += mts.noteDurations()[data.duration] / 4
        })
    }

    /**
     * Toggles the state of the transport.
     * @param {number} [startTime=0] Time to start the score.
     */
    toggle(startTime = 0) {
        if (this.transport.state === 'stopped') {
            this.start()
        } else {
            this.transport.stop()
        }
    }

    start(startTime = 0) {
        if (this.metronome.active) {
            this.startMetronome()
        }
        this.transport.start('+0.1', startTime)
    }

    stop() {
        this.transport.stop()
        return this
    }

    /**
     * Clear the transport from everything that was scheduled.
     */
    clear() {
        this.transport.cancel()
        return this
    }
}
