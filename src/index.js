import {Library}                        from './Library'
import {AudioManager}                   from './utilities/AudioManager'
import Tone                             from 'Tone/core/Tone'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    Tone.Players.prototype.set = new Tone.Players().add
}

const lib = new Library()
lib.set('audio-manager', () => {
    return AudioManager
})

lib.set('tone', () => {
    return Tone
})

lib.set('path', () => {
    return 'https://note-art-server.herokuapp.com/audio/'
})

lib.set('ready', () => {
    return false
})

lib.set('NoteString', () => {
    return 'guitar'
})

lib.set('Piano', () => {
    return 'piano'
})

lib.set('Drumset', () => {
    return 'drums'
})

Tone.Buffer.on('load', () => {
    lib.set('ready', () => {
        return true
    })
})

export {lib}
export {Chord}                          from './models/Chord'
export {Drumset}                        from './instruments/Drumset'
export {Driver}                         from './utilities/Driver'
export {Guitar}                         from './instruments/Guitar'
export {Instrument}                     from './instruments/Instrument'
export {Measure}                        from './notation/Measure'
export {MusicTheoryStructures}          from './resources/MusicTheoryStructures'
export {Note}                           from './models/Note'
export {InstrumentString}               from './instruments/InstrumentString'
export {Piano}                          from './instruments/Piano'
export {Score}                          from './notation/Score'
export {PitchClass}                     from './models/PitchClass'
export {Scale}                          from './models/Scale'
export *                                from './addons/GlobalFunctions'
export *                                from './utilities/MusicalAddons'
