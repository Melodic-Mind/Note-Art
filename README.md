# Note-Art JS :guitar:

:fire:
[![Downloads](https://img.shields.io/npm/dt/note-art.svg?style=flat-square)]()
&nbsp; [![Build Status](https://semaphoreci.com/api/v1/seanitzel/note-art/branches/master/shields_badge.svg)](https://semaphoreci.com/seanitzel/note-art)
&nbsp; [![Maintainability](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/maintainability)](https://codeclimate.com/github/Seanitzel/Note-Art/maintainability)
&nbsp; [![Test Coverage](https://api.codeclimate.com/v1/badges/0206283c6843673ea6d6/test_coverage)](https://codeclimate.com/github/Seanitzel/Note-Art/test_coverage)
&nbsp; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
:fire:

##### [Demo (outdated) :musical_note:](https://note-art-demo.netlify.com/) | [API :blue_book:](https://note-art-docs.netlify.com/)

<br>

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
* [License](#license)

## About

* Create Notes, Chords, Scales and more easily.
* Designed to be simple and intuitive.
* Create scores using music composition logic Note-Art has a music notation api that works like writing music sheets.
* Easily integrate with other music libraries to play music in the browser You can use libraries like ToneJS to easily
  play scales, chords and even scores you create with Note-Art.
* Use this library to create tools for musicians, research music theory, just create some fun music with programming and
  much more!

## Features

1. Create Notes, Chords, Scales and more, manipulate and extract information from them.
2. Create full musical scores with multiple instruments.(Only theoretically)

* You can use awesome libraries like ToneJS to play audio and schedule music in the browser.

## Getting Started

One of the things that make note-art so awesome & easy to use is the way it was designed, musical models, and the
notation system are not tightly coupled and do not rely on each other to work.<br>
That means you can easily create music scores without ever needing to understand how the musical models work, or you can
even create your own way of interacting with the notation API which is super intuitive and simple.
<br>
<br>

Installation:

``` bash
npm install note-art
```

### Usage

#### Music Models

The music models are pure music theory concepts that are translated to code.

* patterns are in semi-tones.

```
import {PitchClass, Note, Chord, Scale} from 'note-art'

// PitchClass

const a = new PitchClass('a')

console.log(a.interval(5))  // Returns a new pitch class instance with 'D' as the pitch.

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

#### Notation

The notation api is more complex so check out the api, or the demo source code to see an example of using it.

<br>

Check out the [API](https://note-art-docs.netlify.com/) for more.

## Contribute and Support :pray:

* Make a [pull request :avocado:](https://github.com/Seanitzel/Note-Art).
    * Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
      contributions you make are **greatly appreciated**.

          1. Fork the Project
          2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
          3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
          4. Push to the Branch (`git push origin feature/AmazingFeature`)
          5. Open a Pull Request

* Support me on [patreon](https://www.patreon.com/Seanitzel).
* Download my app on the google play store
    - [Scale Heaven](https://play.google.com/store/apps/details?id=com.scales.scaleheaven) - **which can generate and
      play any scale in the history of mankind** on google play (and press the banner once in a while ;)).

## Todo:

* Create base music models - pitch class, note, chord, etc... :heavy_check_mark:

* Implement Music notation. :heavy_check_mark:

## Contact

Sean Dvir - [seandvir12@gmail.com](seandvir12@gmail.com) - [@seanitzel](https://twitter.com/seanitzel) <br>

Your welcome to mail me your ideas and recommendations!<br>

## License

Note-Art uses the MIT license, check out the license tab for more information.
