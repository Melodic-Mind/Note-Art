import {Application}           from './Application'
import {AudioManager}          from './utilities/AudioManager'

const app = new Application()
app.set('audio-manager', () => {
    return new AudioManager()
})

app.set('instruments', () => {
    return ['Piano']
})

export {app}
export {Note}                  from './models/Note'
export {AudioManager}          from './utilities/AudioManager'
export *                       from './utilities/Addons'
export *                       from './utilities/MusicalAddons'
export {Piano}                 from './instruments/Piano'
export {Chord}                 from './models/Chord'
export {Scale}                 from './models/Scale'
export {Measure}               from './notation/Measure'
export {NoteBuilder}           from './builders/NoteBuillder'
export {MusicTheoryStructures} from './resources/MusicTheoryStructures'
export {PitchClass}            from './models/PitchClass'
export {Pitch}                 from './models/Pitch'
export {PlayableNote}          from './models/PlayableNote'
export {Piece}                 from './notation/Piece'
export {Drums}                 from './instruments/Drums'
export {Paginator}             from './utilities/Paginator'
