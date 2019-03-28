import {Piano} from '../instruments/Piano'

/*
 The MIT License (MIT)

 Copyright (c) 2014 Chris Wilson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

var MAX_SIZE          = null
var audioContext      = null
var analyser          = null
var theBuffer         = null
var mediaStreamSource = null
let sensitivity       = 0.04
let started           = false
let start_time        = null
let current_note_time = null
let is_new_note       = true

let cached_notes       = []
let cached_frequencies = []

const octave_frequencies = {
    '0': [0, 31],
    '1': [31, 63],
    '2': [63, 127],
    '3': [127, 253],
    '4': [253, 508],
    '5': [508, 1017],
    '6': [1017, 2034],
    '7': [2034, 4068],
    '8': [4068, 8137],
    '9': [8137, 16000],
}

export {
    init,
    pitch_data,
    toggleLiveInput,
    noteFromPitch,
    cached_notes,
    cached_frequencies,
    updatePitch,
    reset,
}
const pitch_data = {
    note:     '-',
    pitch:    '-',
    detune:   '-',
    notes:    [],
    play:     (instrument) => {
        console.log(instrument)
        let note      = 0
        let play_time = audioContext.currentTime
        const timer   = setInterval(() => {
            if (pitch_data.notes[note]) {
                if (pitch_data.notes[note].time <= audioContext.currentTime - play_time) {
                    console.log(pitch_data.notes[note].time)
                    instrument.note((pitch_data.notes[note].notes) + 'q').play()
                    note++
                }
            }
            if (note === pitch_data.notes.length) {
                clearInterval(timer)
            }
        }, 50)
    },
    toString: () => {
        let str = '{ '
        for (const i of pitch_data.notes)
            str += i.notes.toString() + ', '
        str += '}'
        return str
    },
}

function init() {
    console.log('woo')
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    MAX_SIZE     = Math.max(4, Math.floor(audioContext.sampleRate / 5000)) // corresponds to a 5kHz signal
    return false
}

function error() {
    alert('Stream generation failed.')
}

function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia
        navigator.getUserMedia(dictionary, callback, error)
    } catch (e) {
        alert('getUserMedia threw exception :' + e)
    }
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream)

    // Connect it to the destination.
    analyser         = audioContext.createAnalyser()
    analyser.fftSize = 2048
    mediaStreamSource.connect(analyser)
    updatePitch()
}

function toggleLiveInput() {
    init()
    getUserMedia({
        'audio': {
            'mandatory': {
                'googEchoCancellation': 'false',
                'googAutoGainControl':  'false',
                'googNoiseSuppression': 'false',
                'googHighpassFilter':   'false',
            },
            'optional':  [],
        },
    }, gotStream)
}

var rafID  = null
var tracks = null
var buflen = 2048
var buf    = new Float32Array(buflen)

var noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
    return Math.round(noteNum) + 69
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12)
}

function centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2))
}

let new_note = false

function autoCorrelate(buf, sampleRate) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length
    var rms  = 0

    for (var i = 0; i < SIZE; i++) {
        var val = buf[i]
        rms += val * val
    }
    rms = Math.sqrt(rms / SIZE)
    if (rms < sensitivity) { // not enough signal
        updateNotes()
        return -1
    }

    var r1    = 0,
        r2    = SIZE - 1,
        thres = 0.2
    for (var i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) {
            r1 = i
            break
        }
    for (var i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) {
            r2 = SIZE - i
            break
        }

    buf   = buf.slice(r1, r2)
    SIZE  = buf.length
    var c = new Array(SIZE).fill(0)
    for (var i = 0; i < SIZE; i++)
        for (var j = 0; j < SIZE - i; j++)
            c[i] = c[i] + buf[j] * buf[j + i]

    var d = 0
    while (c[d] > c[d + 1])
        d++
    var maxval = -1,
        maxpos = -1
    for (var i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
            maxval = c[i]
            maxpos = i
        }
    }
    var T0 = maxpos

    var x1 = c[T0 - 1],
        x2 = c[T0],
        x3 = c[T0 + 1],
        a  = (x1 + x3 - 2 * x2) / 2,
        b  = (x3 - x1) / 2
    if (a) {
        T0 = T0 - b / (2 * a)
    }

    return sampleRate / T0
}

function updatePitch(time) {
    var cycles = new Array
    if (!analyser) {
        return
    }
    analyser.getFloatTimeDomainData(buf)
    var ac = autoCorrelate(buf, audioContext.sampleRate)
    if (ac != -1) {
        if (started == false) {
            start_time = audioContext.currentTime
        }
        started              = true
        new_note             = true
        pitch_data.frequency = Math.round(ac)
        let note             = noteFromPitch(ac)
        pitch_data.note      = noteStrings[note % 12]
        let detune           = centsOffFromPitch(ac, note)
        pitch_data.detune    = detune
        cached_notes.push(noteStrings[note % 12])
        cached_frequencies.push(pitch_data.frequency)
        if (is_new_note) {
            current_note_time = audioContext.currentTime
            is_new_note       = false
        }
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame
    }
    rafID = window.requestAnimationFrame(updatePitch)
}

function updateNotes() {
    if (new_note) {
        if (cached_notes.length > 5) {
            pitch_data.notes.push({
                notes: frequent(cached_notes) + frequentFrequency(cached_frequencies),
                time:  current_note_time - start_time,
            })

            console.log(current_note_time - start_time)
        }
        is_new_note               = true
        cached_notes.length       = 0
        cached_frequencies.length = 0
        new_note                  = false
    }
}

function reset() {
    started                 = false
    pitch_data.notes.length = 0
}

function frequentFrequency(frequencies) {
    let counts  = {},
        compare = 0,
        mostFrequent,
        octave
    for (var i = 0; i < frequencies.length; i++) {
        octave = getOctave(frequencies[i])

        if (counts[octave] === undefined) {
            counts[octave] = 1
        } else {
            counts[octave]++
        }
        if (counts[octave] > compare) {
            compare      = counts[octave]
            mostFrequent = octave
        }
    }
    return parseInt(mostFrequent)
}

function frequent(array) {
    let counts  = {},
        compare = 0,
        mostFrequent
    for (var i = 0, len = array.length; i < len; i++) {
        var member = array[i]

        if (counts[member] === undefined) {
            counts[member] = 1
        } else {
            counts[member] = counts[member] + 1
        }
        if (counts[member] > compare) {
            compare      = counts[member]
            mostFrequent = array[i]
        }
    }
    return mostFrequent
}

function getOctave(frequency) {
    for (let i in octave_frequencies) {
        let tmp = octave_frequencies[i]
        if (frequency > tmp[0] && frequency <= tmp[1]) {
            return i
        }
    }
    return null
}
