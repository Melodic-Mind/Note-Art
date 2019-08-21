import {lib}                               from './Lib'

lib.get('tone').Buffer.on('load', () => {
    lib.set('ready', () => {
        return true
    })
})

export {lib}
export {Chord}                             from './models/Chord'
export {Cord}                              from './instruments/Cord'
export {Drumset}                           from './instruments/Drumset'
export {Driver}                            from './models/Driver'
export {Guitar}                            from './instruments/Guitar'
export {GuitarChordPattern}                from './models/GuitarChordPattern'
export {Instrument}                        from './instruments/Instrument'
export {Measure}                           from './notation/Measure'
export {MusicTheoryStructures}             from './resources/MusicTheoryStructures'
export {Note}                              from './models/Note'
export {Piano}                             from './instruments/Piano'
export {Score}                             from './notation/Score'
export {PitchClass}                        from './models/PitchClass'
export {Scale}                             from './models/Scale'
export {ScoreHandler}                      from './notation/ScoreHandler'
export *                                   from './utilities/GeneralFunctions'
export *                                   from './utilities/MusicFunctions'
export *                                   from './validation/Validators'
