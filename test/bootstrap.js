import {app, AudioManager} from '../src/'
import {expect}            from 'chai'
import sinon               from 'sinon'

class AudioManagerMock extends AudioManager {
    generatePlayers() {
        return new Map()
    }

    setNote(pn) {
        const key = AudioManager.getKey(pn)
        if (!this.players.has(key)) {
            this.players.set(key, pn)
        }
    }

    setSound(fliepath, key) {
        if (!this.players.has(key)) {
            this.players.set(key, fliepath)
        }
    }

    playSound(key) {
        return this.players.has(key)
    }
}

app.set('audio-manager', () => {
    return new AudioManagerMock()
})
global.expect = expect
global.sinon  = sinon
global.dd     = require('dumper.js').dd
global.dump   = require('dumper.js').dump

