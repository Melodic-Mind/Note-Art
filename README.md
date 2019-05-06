# Note-Art JS :guitar:
:fire:
[![Downloads](https://img.shields.io/npm/dt/note-art.svg?style=flat-square)]()
&nbsp; [![Build Status](https://semaphoreci.com/api/v1/seanitzel/note-art/branches/master/shields_badge.svg)](https://semaphoreci.com/seanitzel/note-art)
&nbsp; [![Maintainability](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/maintainability)](https://codeclimate.com/github/Seanitzel/Note-Art/maintainability)
&nbsp; [![Test Coverage](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/test_coverage)](https://codeclimate.com/github/Seanitzel/Note-Art/test_coverage)
&nbsp; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
:fire:
##### [Demo :musical_note:](https://note-art-demo.netlify.com/) | [Docs :blue_book:](https://note-art-docs.netlify.com/)
<br>

**This library is still under construction and is getting updated on a weekly basis.**

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


## About :notes:

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


See the [docs](https://note-art-docs.netlify.com/) for more


## Contribute and Support :pray:
* Make a [pull request :avocado:](https://github.com/Seanitzel/Note-Art).
  * Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

        1. Fork the Project
        2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
        3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
        4. Push to the Branch (`git push origin feature/AmazingFeature`)
        5. Open a Pull Request
        
* Support me on [patreon](https://www.patreon.com/Seanitzel).
* Download my app - [Scale Heaven](https://play.google.com/store/apps/details?id=com.scales.scaleheaven) - **which can generate and play any scale in the history of mankind** on google play (and press the banner once in a while ;)).

## Todo:
* Create base music models - pitch class, note, chord, etc... :heavy_check_mark: 

* Create instrument models that can play notes.                :heavy_check_mark:
* Implement Music notation. :heavy_check_mark: 
* Create scheduling and automation for playing music pieces with an arbitrary instrument. :heavy_check_mark: 
* Add static and dynamic audio feature extraction.
* Add more instruments.

## Contact
Sean Dvir - [seandvir12@gmail.com](seandvir12@gmail.com) - [@seanitzel](https://twitter.com/seanitzel) <br>

Your welcome to mail me your ideas and recommendations!<br>

## Credits
[Tone JS](https://tonejs.github.io/) - I used this awesome framework which wraps the web audio API for all audio handling and scheduling.

## License
Note-Art uses the MIT license, check out the license tab for more information.
