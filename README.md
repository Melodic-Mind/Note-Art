# Note-Art JS :guitar:
:fire:
[![Downloads](https://img.shields.io/npm/dt/note-art.svg?style=flat-square)]()
&nbsp; [![Build Status](https://semaphoreci.com/api/v1/seanitzel/note-art/branches/master/shields_badge.svg)](https://semaphoreci.com/seanitzel/note-art)
&nbsp; [![Maintainability](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/maintainability)](https://codeclimate.com/github/Seanitzel/Note-Art/maintainability)
&nbsp; [![Test Coverage](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/test_coverage)](https://codeclimate.com/github/Seanitzel/Note-Art/test_coverage)
&nbsp; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
:fire:
##### [Demo :musical_note:](https://note-art-demo.netlify.com/) | [API :blue_book:](https://note-art-docs.netlify.com/)
<br>

**Disclaimer: This library is still under construction and is getting updated on a weekly basis.
<br>Everything you see in the api is working and a 100% tested. <br>
Any questions/ requests/ tips are welcome!**

> Music is a highly versatile art that originates in nature, and has been taken up by mankind as a way of expression and also as an art.
> Now, it's going to be taken up by machines as well.
<br>

## Table of Contents

* [About the Project](#about)
* [Features](#features)
* [Getting Started](#getting-started)
  * [Usage](#usage)
  
* [Contribute and Support](#contribute-and-support)
* [Todo](#todo)
* [Contact](#contact)
* [Credits](#credits)
* [License](#license)


## About

* This project aims to create the ultimate music library, including:
   * Music Theory
   * Music Notation
   * Instruments
   * Scheduling and playing Music(using [Tone JS](https://tonejs.github.io/))
   * Audio Feature Extraction(Not implemented yet)

* Designed to be simple and intuitive.
* Use this library to create tools for musicians, research music theory, just create some fun music with programming and much more! 

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
import {PitchClass, Note, Chord, Scale} from 'note-art'

// PitchClass

const a = new PitchClass('a')

console.log(a.interval(5))  // Returns a new pitch class instance with the pitch class set as 'D'

// Note

const A = new Note('a', 4)

console.log(A)      // A4

console.log(A.frequency) // outputs 440

const fourth = A.interval(5) // calculate 5 semitones up - fourth is the note E with octave 5

console.log(fourth) // E4

//Chord

const A_M = new Chord(a, [4, 7]})

console.log(A_M.pitchClasses) // A, C, E(returns pitch class instances)

//Scale

const C_Major = new Scale(new PitchClass('c'), [0, 2, 4, 5, 7, 9, 11]})

console.log(A_Major.pitchClasses) // C, D, E, F, G, A, B
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

lib.get('tone').context.resume() // Resume context
lib.get('ready')    // True when all buffers have loaded
```

<br>

Set the path to your desired location which can be local or on a remote server.
You are welcome to use my server, hosted on heroku and has piano, guitar and drum sounds.
```
lib.set('path', () => {
    return 'https://note-art-server.herokuapp.com/audio/' // the path to my server
})
```

Check out the [API](https://note-art-docs.netlify.com/) for more.

## Contribute and Support :pray:
* Make a [pull request :avocado:](https://github.com/Seanitzel/Note-Art).
  * Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

        1. Fork the Project
        2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
        3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
        4. Push to the Branch (`git push origin feature/AmazingFeature`)
        5. Open a Pull Request
        
* Support me on [patreon](https://www.patreon.com/Seanitzel).
* Download my app on the google play store - [Scale Heaven](https://play.google.com/store/apps/details?id=com.scales.scaleheaven) - **which can generate and play any scale in the history of mankind** on google play (and press the banner once in a while ;)).

## Todo:
* Create base music models - pitch class, note, chord, etc... :heavy_check_mark: 

* Create instrument models that can play notes.                :heavy_check_mark:
* Implement Music notation. :heavy_check_mark: 
* Create scheduling and automation for playing music scores with an arbitrary instrument. :heavy_check_mark: 
* Add static and dynamic audio feature extraction.
* Add more instruments.
* Make the API more detailed and create documentation.

## Contact
Sean Dvir - [seandvir12@gmail.com](seandvir12@gmail.com) - [@seanitzel](https://twitter.com/seanitzel) <br>

Your welcome to mail me your ideas and recommendations!<br>

## Credits
[Tone JS](https://tonejs.github.io/) - I used this awesome framework which wraps the web audio API for all audio handling and scheduling.

## License
Note-Art uses the MIT license, check out the license tab for more information.
