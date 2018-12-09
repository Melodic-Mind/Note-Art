> Musical Project By Sean Dvir - *A Work in progress*
# Note-Art JS
* Music is a highly versatile art that originates in nature, and has been taken up by mankind as a way of expression and also as an art.
Now, it's going to be taken up by machines as well.

* This project aims to create a library that implements all of music theory(in all it's forms) in code,
can be used to play sounds of most musical instruments.
It will then be used to create multiple tools for people to practice, learn, enjoy and compose.
it will also be used to attempt development of different projects combining music and AI.

> “Everything is determined … by forces over which we have no
> control. It is determined for the insects as well as for the star.
> Human beings, vegetables, or cosmic dust – we all dance to a
> mysterious tune, intoned in the distance by an invisible piper.”
> – Albert Einstein

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)

## Installation

``` bash
npm install note-art
```

## Usage
##### Creating and playing a note
```
const A = new Note({note: 'a', octave: 4})
A.play() //note is played
```
##### Getting a note's frequency
```
console.log(A.frequency) // outputs 440
```
##### Getting a note's interval by semi-tones(5 semi -tones are a perfect fourth interval)
```
const fourth = A.interval(5) // fourth is the note E with octave 5
```
##### Print note
```
console.log(A.toString()) // outputs: A4
```

Notes also have a duration and instrument properties which default to 'q' and 'Piano'.

See the docs for more
----------------------------------------------------------------------
