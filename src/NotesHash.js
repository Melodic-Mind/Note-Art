import { Note, notes } from '.'
import { Howl } from 'howler'

let self = null

/**
 * @class
 */
export class NotesHash {
    /**
     * @classdesc A singleton class which handles all file requests
     * Should never be called
     */
    constructor() {
        this.sounds = new Map()
    }

    /**
     * singleton implementation
     */
    static getNotesHash() {
        self = self || new NotesHash()
        return self
    }

    /**
     * Calculates a specific note's key
     * @param {Note} note 
     */
    getKey({ note, octave, instrument, family }) { return `${instrument}${this.fileNoteName({note, family})}${octave}` }

    /**
     * trnasforms notes of type '#' to 'b' in order to access the mp3 file's name
     * @param {Note} note 
     */
    fileNoteName({ note, family }) { return notes["b"][notes[family].indexOf(note)] }

    /**
     * add a specific note sound to be played in the future.
     * @param {Note} note 
     */
    set(note) {
        const key = this.getKey(note)
        if (!this.sounds.has(key)) {
            const filePath = `https://note-art.azurewebsites.net/${note.instrument}/FF_${this.fileNoteName(note)}${note.octave}.mp3`
            this.sounds.set(key, new Howl({ src: [filePath] }))
        }
    }

    /**
     * retrieve a note sound from the note sound hash table.
     * @param {Note} note Note Instance.
     */
    get(note) {
        return this.sounds.get(this.getKey(note))
    }
}