import Tone                                    from 'tone'
import {MusicTheoryStructures as mts, Drumset} from '../'

/**
 * @classdesc Represents a driver that can play a piece.
 * @param {Piece} piece A piece containing voices.
 * @param {Array} Instruments An array of instrument instances which will be used to play the voices.
 */
export class Driver {
    constructor(piece, instruments = []) {
        this.piece       = piece
        this.instruments = instruments
        this.playing     = {voice: null, measure: null, noteSet: null}
        this.metronome   = {active: false, sound: 'clap', id: null}
    }

    /**
     * Adds an instrument to the piece.
     * @param instrument
     */
    addInstrument(instrument) {
        this.instruments.push(instrument)
    }

    startMetronome() {
        this.metronome.active   = true
        this.metronome.id = this.transport.scheduleRepeat(time => {
            this.drumSet.play(this.metronome.sound)
        }, '4n', '0')
    }

    stopMetronome() {
        this.metronome.active = false
        this.transport.clear(this.metronome.id)
    }

    toggleMetronome() {
        if (this.metronome.active) {
            this.stopMetronome()
        } else {
            this.startMetronome()
        }
    }

    // Initializes the Tone transport
    init() {
        this.transport               = Tone.Transport
        this.bpm                     = this.piece.bpm
        this.transport.timeSignature = this.piece.timeSignature
        this.transport.loop          = true
        this.drumSet                 = new Drumset()
        return this
    }

    set bpm(value) {
        if (this.piece.timeSignature[1] === 8) {
            this.transport.bpm.value = value / 2
        } else {
            this.transport.bpm.value = value
        }
    }

    get bpm() {
        if (this.piece.timeSignature[1] === 8) {
            return this.transport.bpm.value * 2
        }
        return this.transport.bpm.value
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
     * Schedules all the voices of the piece to the transport.
     */
    scheduleVoices() {
        this.transport.loopEnd = this.piece.voices[0].length + 'm'
        for (let i = 0; i < this.piece.voices.length; ++i) {
            this.scheduleMeasures(i)
        }
    }

    /**
     * Schedules all the measures of a voice from the piece to the transport.
     * @param {number} voiceIndex Index of the voice in the piece to schedule.
     */
    scheduleMeasures(voiceIndex) {
        this.piece.getVoice(voiceIndex).forEach((measure, measureIndex) => {
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
        this.piece.voices[voiceIndex][measureIndex].data.forEach((data, dataIndex) => {
            data.notes.forEach((note) => {
                if (note !== 'R') {
                    this.transport.schedule(time => {
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
     * @param {number} [startTime=0] Time to start the piece.
     */
    toggle(startTime = 0) {
        if (this.transport.state === 'stopped') {
            if(this.metronome.active){
                this.startMetronome()
            }
            this.transport.start('+0.1', startTime)
        } else {
            this.transport.stop()
        }
    }

    /**
     * Clear the transport from everything that was scheduled.
     */
    clear(){
        this.transport.cancel()
    }
}
