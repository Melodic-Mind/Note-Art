// import Transport                      from 'tone/Tone/core/Transport'
// import Tone                           from 'tone/Tone/core/Tone'
// import Draw                           from 'tone/Tone/core/Draw'
import Tone                           from 'tone'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'

/**
 * @class ScorePlayer
 * @classdesc Represents a driver that can play a score.
 * Best practice is to create one driver that will be used to play everything inside the app/website.
 */
export default class ScorePlayer {
  constructor(transport) {
    // this.transport = transport
    this.resetPosition()
  }

  /**
   * Initializes the ScorePlayer. Should NOT be called.
   * @private
   * @returns {ScorePlayer}
   */
  init() {
    this.transport               = {}
    this.bpm                     = 120
    this.transport.timeSignature = 4
    this.transport.loop          = true
    this._sustain                = true
    return this
  }

  resetPosition() {
    this.position = {voices: null, beat: null}
  }

  get beat() {
    return this.position.beat
  }

  get currentTime() {
    return this.transport.getSecondsAtTime()
  }

  get sustain() {
    return this._sustain
  }

  set sustain(val) {
    this._sustain = val
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
    this.resetPosition()
    return this
  }

  /**
   * Set the instruments the driver will play with.
   * @param {Array} Instruments An array of instrument instances which will be used to play the voices.
   * @return {this}
   */
  setInstruments(instruments) {
    if (Array.isArray(instruments)) {
      this.instruments = instruments
      return this
    }

    throw new Error(`${instruments} must be an array.`)
  }

  /**
   * Adds an instrument to the score.
   * @param instrument
   */
  addInstrument(instrument) {
    this.instruments.push(instrument)
    return this
  }

  addMetronome(instrument, sound) {
    this.metronome = {instrument, active: false, sound, id: null}
    return this
  }

  /**
   * Schedules the metronome to the transport.
   * @returns {ScorePlayer}
   */
  startMetronome() {
    this.metronome.isActive = true
    this.metronome.id       = this.transport.scheduleRepeat(time => {
      this.metronome.instrument.play(this.metronome.sound, time)
    }, '4n', '0')

    return this
  }

  /**
   * Removes the metronome from the transport.
   * @returns {ScorePlayer}
   */
  stopMetronome() {
    this.metronome.isActive = false
    this.transport.clear(this.metronome.id)

    return this
  }

  /**
   * Toggles the metronome.
   * @returns {ScorePlayer}
   */
  toggleMetronome() {
    if (this.metronome.isActive) {
      return this.stopMetronome()
    } else {
      return this.startMetronome()
    }
  }

  /**
   * Set the bpm value.
   * @param value
   */
  set bpm(value) {
    // this.transport.bpm.value = value
    if (this.score) {
      this.score.bpm = value
    }
  }

  /**
   * Get the current bpm value.
   * @returns {*}
   */
  get bpm() {
    return this.transport.bpm.value
  }

  /**
   * Set the time signature.
   * @param {Array} timeSignature
   */
  set timeSignature(timeSignature) {
    this.score.setTimeSignature(timeSignature)
    this.setScore(this.score)
  }

  /**
   * Set the loop start time.
   * @param time
   */
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
    this.position.voices   = []
    for (let i = 0; i < this.score.voices.length; ++i) {
      this.position.voices.push({measure: null, noteSet: null})
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
   * Schedules the notes of a measure to the transport.
   * @param {number} measureIndex
   * @param {number} voiceIndex
   */
  scheduleNotes(measureIndex, voiceIndex) {
    let setTime = 0
    this.score.voices[voiceIndex][measureIndex].data.forEach((data, dataIndex) => {
      data.notes.forEach((note) => {
        this.transport.schedule((time) => {
          if (note !== 'R') {
            const duration = this.sustain ? '10' : data.duration
            this.instruments[voiceIndex].play(note, duration, time)
          }
          this.metronome.instrument.play(this.metronome.sound, time)
          this.position.voices[voiceIndex].measure = measureIndex
          this.position.voices[voiceIndex].noteSet = dataIndex
        }, `${measureIndex}:0:${setTime}`)
      })
      setTime += mts.noteDurations()[data.duration] / 4
    })
  }

  /**
   * Toggles the state of the transport.
   * @param {number} [startTime=0] Time to start the score.
   */
  toggle(startTime = 0, delay = '0.3') {
    if (this.transport.state === 'stopped') {
      this.start(startTime, delay)
    } else {
      this.stop()
    }
  }

  /**
   * Start playing.
   * @param startTime Time to start the transport from
   * @param {string} delay Time to delay the start of the transport for, gives more time to scheduling.
   */
  start(startTime = 0, delay = '0.3') {
    if (Tone.context.state !== 'running') {
      Tone.context.resume()
    }
    if (this.metronome.isActive) {
      this.startMetronome()
    }
    this.transport.scheduleRepeat(time => {
      this.position.beat++
      if (this.position.beat > 4) {
        this.position.beat = 1
      }
    }, '8n')
    this.transport.start(`+${delay}`, startTime)
  }

  /**
   * Stop playing.
   */
  stop() {
    this.transport.stop()
    this.resetPosition()
    // if (this.instruments) {
    //   this.instruments.forEach(ins => ins.unsync())
    // }
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
