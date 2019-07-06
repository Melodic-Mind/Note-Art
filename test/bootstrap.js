import 'amd-loader'
import {AudioManager} from '../src/utilities/AudioManager'
import {lib}          from '../src'
import sinon          from 'sinon'
import sinonChai      from 'sinon-chai'
import chai           from 'chai'

chai.use(sinonChai)

class AudioManagerMock extends AudioManager {
    static getAudioMap() {
        return new Map()
    }

    /**
     * Add a note to the map.
     * @param {Note} note
     */
    static toMaster() {
        return true
    }
}


lib.set('audio-manager', () => {
    return AudioManagerMock
})

global.expect = chai.expect
global.sinon  = sinon
global.dd     = require('dumper.js').dd
global.dump   = require('dumper.js').dump

