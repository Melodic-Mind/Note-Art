import {Note, app}    from '../'
import {NoteBuilder}  from '../builders/NoteBuillder'
import {AudioManager} from '../'

/**
 * @classdesc Represents a note that can be played by an instrument.
 * @extends Note
 */
export class PlayableNote extends Note {
    /**
     * Creates a new PlayableNote instance.
     * @param pitchClass
     * @param octave
     * @param duration
     * @param instrument
     */
    constructor({pitchClass, octave, duration, instrument}) {
        super({pitchClass, octave, duration})
        this.attributes.instrument = instrument
        app.get('audio-manager').setNote(this)
    }

    /**
     * Get the instrument that plays the note
     * @type {String}
     */
    get instrument() { return this.attributes.instrument }

    /**
     * Gets interval size (Number) and returns a new instance of a note
     * which is calculated by the musical interval formula.
     * @example
     * let c = new Note({note:'c', octave:3}) //create a C3 note.
     * let interval = c.interval(4) //calling the function with the number 4(which is a major third).
     * console.log(interval.toString()) //should output 'E3'.
     * @param {Number} interval Musical Interval
     */
    interval(interval) {
        const note = super.interval(interval)
        return note ?
               new PlayableNote({...note.attributes, instrument: this.instrument}) :
               undefined
    }

    /**
     * Alias for interval()
     * @param {Number} interval
     */
    transpose(interval) {
        return this.interval(interval)
    }

    /**
     * Play the note.
     */
    play() {
        const key = AudioManager.getKey(this)
        app.get('audio-manager').playSound(key)
    }

    /**
     * Returns a new PlayableNote instance with the new duration.
     * @param duration
     */
    setDuration(duration) {
        return (new NoteBuilder({...this.attributes, duration})).build(true)
    }

    /**
     * Returns a new PlayableNote instance with the new octave.
     * @param octave
     */
    setOctave(octave) {
        return (new NoteBuilder({
            pitchClass: this.pitchClass,
            octave,
            duration:   this.duration,
            instrument: this.instrument,
        })).build(true)
    }
}
