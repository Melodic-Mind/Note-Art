import { MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import Tone                                         from 'tone'

/**
 * @classdesc A singleton class which handles all file requests,
 * uses <a href="https://tonejs.github.io/">ToneJS</a> as the audio library.
 * @class
 */
export class AudioManager {
    static getAudioMap() {
        return new Tone.Players()
    }

    static resumeContext() {
        Tone.context.resume()
    }

    static toMaster(audioContext) {
        audioContext.toMaster()
    }
}
