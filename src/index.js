import {Application}            from './Application'
import {AudioManager}           from './models/AudioManager'
import Tone                     from 'tone'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    Tone.Players.prototype.set = new Tone.Players().add
}

const app = new Application()
app.set('audio-manager', () => {
    return AudioManager
})

export {app}
export {Note}                   from './models/Note'
export {AudioManager}           from './models/AudioManager'
export {NoteString}             from './instruments/NoteString'
export *                        from './addons/GlobalFunctions'
export *                        from './utilities/MusicalAddons'
export {Piano}                  from './instruments/Piano'
export {Chord}                  from './models/Chord'
export {Measure}                from './notation/Measure'
export {Piece}                  from './notation/Piece'
export {MusicTheoryStructures}  from './resources/MusicTheoryStructures'
export {Scale}                  from './models/Scale'
export {PitchClass}             from './models/PitchClass'
// export {Pitch}                 from './models/Pitch'
// export {PlayableNote}          from './models/PlayableNote'
// export {Drums}                  from './instruments/Drums'
export {Paginator}              from './addons/Paginator'
export {Instrument}             from './instruments/Instrument'
export {Driver}             from './models/Driver'
