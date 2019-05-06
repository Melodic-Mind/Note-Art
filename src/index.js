import {Application}              from './Application'
import {AudioManager}             from './utilities/AudioManager'
import Tone                       from 'tone'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    Tone.Players.prototype.set = new Tone.Players().add
}

const app = new Application()
app.set('audio-manager', () => {
    return AudioManager
})

app.set('path', () => {
    return 'https://note-art-server.herokuapp.com/audio/'
})

app.set('ready', () => {
    return false
})

Tone.Buffer.on('load', () => {
    app.set('ready', () => {
        return true
    })
})

export {app}
export {Chord}                    from './models/Chord'
export {Drumset}                  from './instruments/Drumset'
export {Driver}                   from './utilities/Driver'
export {Guitar}                   from './instruments/Guitar'
export {Instrument}               from './instruments/Instrument'
export {Measure}                  from './notation/Measure'
export {MusicTheoryStructures}    from './resources/MusicTheoryStructures'
export {Note}                     from './models/Note'
export {NoteString}               from './instruments/NoteString'
export {Piano}                    from './instruments/Piano'
export {Piece}                    from './notation/Piece'
export {PitchClass}               from './models/PitchClass'
export {Scale}                    from './models/Scale'
export *                          from './addons/GlobalFunctions'
export *                          from './utilities/MusicalAddons'
