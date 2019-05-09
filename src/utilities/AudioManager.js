import Tone  from 'tone'

/**
 * @classdesc A static class which interacts with the Web Audio API
 * using <a href="https://tonejs.github.io/">ToneJS</a>.<br>
 * <b>Should only be called through the 'app' model</b>.<br>
 * and the only reasons to call it are when creating a new instrument
 * or using it to resume the audio context.<br><br>
 * <b>Calling the Audio Manager using the app</b>
 * ```
 * import {app} from 'note-art'
 * app.get('audio-manager').resumeContext()
 * ```
 */
export class AudioManager {
    /**
     * @returns {Tone.Players}
     */
    static getAudioMap() {
        return new Tone.Players()
    }

    /**
     * Resumes audio context.
     */
    static resumeContext() {
        Tone.context.resume()
    }

    /**
     * Connects audio node to master.
     * @param context File context instance.
     */
    static toMaster(context) {
        context.toMaster()
    }
}
