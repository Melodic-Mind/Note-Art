import {lib}                   from './Lib'

lib.get('tone').Buffer.on('load', () => {
    lib.set('ready', () => {
        return true
    })
})

export *                       from './utilities'
export *                       from './theory'
export *                       from './instruments'
export *                       from './notation'
export *                       from './validation'
export {MusicTheoryStructures} from './resources/MusicTheoryStructures'
export ScorePlayer             from './ScorePlayer'
export {lib}
