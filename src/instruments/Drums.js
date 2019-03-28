import {app} from '../../src/'

// const audioManager = AudioManager.getAudioManager()

export class Drums {
    constructor() {
        this.key = 'ms1'
        app.get('audio-manager').setSound('https://sean-test-server.herokuapp.com/Metronome/1.wav', this.key)
    }

    play() {
        app.get('audio-manager').playSound(this.key)
    }
}


