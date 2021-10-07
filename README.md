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
* Easily integrate with other music libraries to play music in the browser - You can use libraries like ToneJS to easily
  play scales, chords and even scores you create with Note-Art.
* Use this library to create tools for musicians, research music theory, just create some fun music with programming and
  much more!

## Features

1. Use music theory in code.
* You can use awesome libraries like ToneJS to play audio and schedule music in the browser.

## Getting Started

Installation:

``` bash
npm install note-art
```

### Usage

Note-art is fully written in TS and offers functions that can achieve any music theory related task you desire.

#### Theory Functions

* patterns are in semi-tones.

##### Transpose any pitch class, note or group of notes easily

```js
import { transpose } from 'note-art'

// PitchClass

transpose('A', 5)  // 'D'

// Note

transpose('A3', 5)  // 'D4'

// Group of notes(can represent a chord, scale or anything else)

const notes = ['C3', 'E3', 'G3']

notes.map(note => transpose(note, 7)) // ['G3', 'B3', 'D4'] 
```

##### Other functions

```js
import { noteFromFrequency, intervalsToNotes, invertChord };

noteFromFrequency(440) // A4

const majorChordPattern = [0, 4, 7];
const cMajorChord = intervalsToNotes('C3', majorChordPattern) // ['C3', 'E3', 'G3']

const cMajorFirstInversion = invertChord(cMajorChord, 1); // ['E3', 'G3', 'C4']
```

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
    - [Music Guru](https://play.google.com/store/apps/details?id=com.scales.scaleheaven) - **which can generate and
      play any scale in the history of mankind** on google play.

## Todo:

* Create music theory functions - pitch class, note, chord, etc... :heavy_check_mark:

* Re-implement Music notation.

## Contact

Sean Dvir - [seandvir12@gmail.com](seandvir12@gmail.com) - [@seanitzel](https://twitter.com/seanitzel) <br>

Your welcome to mail me your ideas and recommendations!<br>

## License

Note-Art uses the MIT license, check out the license tab for more information.
