# Note-Art JS :musical_note:
##### #A Work in Progress

### About :notes:

* I work on this library all by myself([About Me](https://musitelligence.com/#/about-me)).

* This project aims to create a library that implements all of music theory(in all it's forms) in code,
  and can also be used to play sounds of most musical instruments.
* This libraries main purpose is to aid me in creating the ultimate platform for musicians - [Musitelligence](https://musitelligence.com/#/), which is already online and has some nice tools availble.
* You can use this library to create tools for music, make research on music theory or just create some fun music with programming. 
* Currently the only availble instrument is piano, the audio files are being loaded from a server i run on heroku.

### :pray: _Support & Contribute_ :pray:
* Email me at [seandvir12@gmail.com](seandvir12@gmail.com) with your ideas and recommendations.
* Support me on [patreon](https://www.patreon.com/Seanitzel).
* Download my app - [Scale Heaven](https://play.google.com/store/apps/details?id=com.scales.scaleheaven) on google play(and press the banner once in a while ;))
* Make a [pull request :avocado:](https://github.com/Seanitzel/Note-Art).

#### Some usage examples:
```
// PlayableNote

const A = new PlayableNote({note: 'a', octave: 4})

A.play() //note is played

console.log(A.frequency) // outputs 440

const fourth = A.interval(5) // fourth is the note E with octave 5

console.log(A.toString()) // outputs: A4

//Chord

const A_M = new Chord({note: A, name: 'Major'})

A_M.play() // Chord is played

//Scale

const A_Major = new Scale({tonic: A, name: 'Major'})
console.log(A_Major.pitchClasses()) // outputs the notes in the scale

//Playable-Notes also have a duration and instrument properties which default to '4n' and 'Piano'.

//There are also Un-playable models such as PitchClass, Pitch, Note which 
//cant be played and might be used for general music theory research.
```

