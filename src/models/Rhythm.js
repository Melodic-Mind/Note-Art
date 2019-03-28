// import {getMinDuration}               from '../'
// import {Drums}                        from '../instruments/Drums'
// import Tone                           from 'tone'
// import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
//
// const drums = new Drums()
//
// export class Rhythm {
//     constructor(bpm, timeSignature) {
//         const atts = {}
//
//         atts.transport           = Tone.Transport
//         atts.transport.bpm.value = bpm
//         atts.metronome           = false
//
//         this.atts = atts
//     }
//
//     get timeSignature() {
//         return this.atts.timeSignature
//     }
//
//     set timeSignature(ts) {
//         this.atts.timeSignature = ts
//     }
//
//     get transport() {
//         return this.atts.transport
//     }
//
//     get metronome() {
//         return this.atts.metronome
//     }
//
//     set metronome(val) {
//         this.atts.metronome = val
//     }
//
//     get loop() {
//         return this.transport.loop
//     }
//
//     set loop(val) {
//         this.transport.loop = val
//
//         if (val) {
//             this.transport.loopEnd
//         }
//     }
//
//     get noteSetIndex() {
//         return this.atts.noteSetIndex
//     }
//
//     set noteSetIndex(index) {
//         this.atts.noteSetIndex = index
//     }
//
//     get beat() {
//         return this.atts.beat
//     }
//
//     set beat(val) {
//         this.atts.beat = val
//     }
//
//     get bpm() {
//         return this.atts.bpm
//     }
//
//     set bpm(bpm) {
//         this.atts.bpm = bpm
//     }
//
//     play(startTime) {
//         if (noteSetGroup.length) {
//             play(startTime)
//         }
//     }
//
//     setup(sets) {
//         noteSetGroup = sets
//         playQueue    = []
//     }
//
//     addMeasures(measures) {
//         measures.forEach((measure, measureIndex) => {
//             let setTime = 0
//             measure.noteSets.forEach((set, setIndex) => {
//                 set.forEach(note =>
//                     this.transport.schedule(time => {
//                         note.play()
//                     }, `${measureIndex}:0:${setTime}`),
//                 )
//                 setTime += getMinDuration(set)
//             })
//         })
//     }
//
//     isPlaying() {
//         return this.transport.state
//     }
//
//     toggle() {
//         this.transport.toggle()
//         if (!this.transport.state) {
//             this.transport.dispose()
//         }
//     }
// }
