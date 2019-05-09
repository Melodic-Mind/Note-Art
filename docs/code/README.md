### Welcome to the Note-Art API!

#### Disclaimer
I still work on this library intensively,and even though it can already be used for tons of use-cases, there's much more to do.
<br>
If anything is unclear or you have any questions dont hesitate to ask.
<br>If you want to help check out the help & contribute section in the repo. 

## Features
1. Create Notes, Chords, Scales and more, and extract information from them.
2. Create full musical pieces with multiple instruments.
3. Play music right away using built in Instruments (or easily create your own).

## Getting Started
To Start create a new node project(or go to an existing one).
<br>install note-art -
``` bash
npm install note-art
```

### Usage
```
import {Note, Chord, Scale} from 'note-art'

// Note

const A = new Note(note: 'a', octave: 4)

console.log(A)      // A4

console.log(A.frequency) // outputs 440

const fourth = A.interval(5) // fourth is the note E with octave 5

console.log(fourth) // E4

//Chord

const A_M = new Chord({root: A, name: 'Major'})

console.log(A_M.pitchClasses) // A4, C5, E5

//Scale

const C_Major = new Scale({tonic: new Note('c', 3), name: 'Major'})

console.log(A_Major.notesString) // C3, D3, E3, F3, G3, A3, B3
```

*When playing audio, make sure to resume the audio context on user interaction, and also wait for all the buffers to load:*
```
import {app} from 'note-art'

app.get('audio-manager').resumeContext() // Resume context
app.get('ready')    // True when all buffers have loaded
```

Set the path to your desired location which can be local or on a remote server.
You are welcome to use my server, hosten on heroku and has piano, guitar and drum sounds.
```
app.set('path', () => {
    return 'https://note-art-server.herokuapp.com//audio/' // the path to my server
})
```
