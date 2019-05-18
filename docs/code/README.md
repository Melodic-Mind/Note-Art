### Welcome to the Note-Art API!

#### Disclaimer
I still work on this library intensively,and even though it can already be used for tons of use-cases, there's much more to do.
<br>
If anything is unclear or you have any questions dont hesitate to ask.
<br>If you want to help check out the help & contribute section in the repo. 

## Features
1. Create Notes, Chords, Scales and more, and extract information from them.
2. Create full musical scores with multiple instruments.
3. Play music right away using built in Instruments (or easily create your own).

## Getting Started
One of the things that make note-art so awesome & easy to use is the way 
it was designed, music models, instruments and the notation system 
are not tightly coupled and do not rely on each other to work.<br>
That means you can easily create instruments and music scores and play them
without ever needing to understand how the music models work, or
you can even create your own way of interacting with the notation API 
which is super intuitive and simple.
<br>
<br>

To Start create a new node project(or go to an existing one).
<br>
install note-art -
``` bash
npm install note-art
```

### Usage

##### Music Models
The music models are pure music theory concepts that are translated to code.
* patterns are in semi-tones.
```
import {Note, Chord, Scale} from 'note-art'

// Note

const A = new Note('a', 4)

console.log(A)      // A4

console.log(A.frequency) // outputs 440

const fourth = A.interval(5) // calculate 5 semitones up - fourth is the note E with octave 5

console.log(fourth) // E4

//Chord

const A_M = new Chord({root: A, pattern: [4, 7]})

console.log(A_M.pitchClasses) // A4, C5, E5

//Scale

const C_Major = new Scale({tonic: new Note('c', 3), pattern: [0, 2, 4, 5, 7, 9, 11]})

console.log(A_Major.notesString) // C3, D3, E3, F3, G3, A3, B3
```
<br>

##### Instruments
The instruments are literal instruments that have a range of notes they can play.
```
import {Piano} from 'note-art'

const piano = new Piano() // defaults to A0, 87 to create 88 keys.
piano.play('c3') // C3 note is played!
```
<br>

##### Notation
The notation api is more complex so check out the api, or the demo source code to see an example of using it.

<br>

##### Important!!

*When playing audio, make sure to resume the audio context on user interaction, and also wait for all the buffers to load:*
```
import {lib} from 'note-art'

lib.get('audio-manager').resumeContext() // Resume context
lib.get('ready')    // True when all buffers have loaded
```

<br>

Set the path to your desired location which can be local or on a remote server.
You are welcome to use my server, hosted on heroku and has piano, guitar and drum sounds.
```
lib.set('path', () => {
    return 'https://note-art-server.herokuapp.com//audio/' // the path to my server
})
```
