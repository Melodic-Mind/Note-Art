import {PlayableNote, MusicTheoryStructures as mts} from '..'
import Tone                                         from 'tone'

/**
 * @classdesc A singleton class which handles all file requests,
 * uses <a href="https://tonejs.github.io/">ToneJS</a> as the audio library.
 * @class
 */
export class AudioManager {
    /**
     * Should never be called
     */
    constructor() {
        // Now we can mockj it
        this.players = this.generatePlayers()
    }

    generatePlayers(){
        return new Tone.Players()
    }

    static resumeContext(){
        Tone.context.resume()
    }

    /**
     * Trnasforms notes of type '#' to 'b' in order to access the file's name.
     * @param pitchClass
     * @param classSet
     * @returns {String}
     */
    static normalizeSet(pitchClass, classSet) {
        if (classSet === '#') {
            const index = mts.sharpClassNotes.indexOf(pitchClass)
            pitchClass  = mts.flatClassNotes[index]
        }
        const index = mts.flatClassNotes.indexOf(pitchClass)
        return mts.flatClassNotes[index]
    }

    /**
     * Calculates a specific note's key.
     * @param {PlayableNote} note
     */
    static getKey({pitchClass, octave, instrument, classSet}) {
        const set = AudioManager.normalizeSet(pitchClass, classSet)
        return `${instrument.slice(0, 2)}${set}${octave}`
    }

    /**
     * Add a note to the map.
     * @param {PlayableNote} pn
     */
    setNote(pn) {
        const key = AudioManager.getKey(pn)
        if (!this.players.has(key)) {
            const server     = 'https://sean-test-server.herokuapp.com/'
            const set        = AudioManager.normalizeSet(pn.pitchClass, pn.classSet)
            const file       = `/FF_${set}${pn.octave}`
            const fileType   = 'mp3'
            const instrument = pn.instrument

            const url = `${server}${instrument}${file}.${fileType}`
            this.players.add(key, url).toMaster()
        }
    }

    /**
     * Get a note's Player.
     * @param {PlayableNote} playableNote
     * @returns {Tone.Player}
     */
    getPlayer(playableNote) {
        return this.players.get(AudioManager.getKey(playableNote))
    }

    /**
     * Create a player for some sound.
     * @param fliepath
     * @param key
     */
    setSound(fliepath, key) {
        if (!this.players.has(key)) {
            this.players.add(key, fliepath).toMaster()
        }
    }

    /**
     * Play sound by player key.
     * @param {String} key Player key.
     */
    playSound(key) {
        this.players.get(key).start()
    }
}
