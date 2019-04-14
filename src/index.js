import {Application}              from './Application'
import {AudioManager}             from './models/AudioManager'
import Tone                       from 'tone'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    Tone.Players.prototype.set = new Tone.Players().add
}

const app = new Application()
app.set('audio-manager', () => {
    return AudioManager
})

export {app}
export {PitchClass}               from './models/PitchClass'
export {Note}                     from './models/Note'
export {Chord}                    from './models/Chord'
export {Scale}                    from './models/Scale'
export {AudioManager}             from './models/AudioManager'
export *                          from './addons/GlobalFunctions'
export *                          from './utilities/MusicalAddons'
export {MusicTheoryStructures}    from './resources/MusicTheoryStructures'
export {Instrument}               from './instruments/Instrument'
export {Piano}                    from './instruments/Piano'
export {NoteString}               from './instruments/NoteString'
export {Drumset}                  from './instruments/Drumset'
export {Guitar}                   from './instruments/Guitar'
export {Measure}                  from './notation/Measure'
export {Piece}                    from './notation/Piece'
export {Paginator}                from './addons/Paginator'
export {Driver}                   from './models/Driver'
