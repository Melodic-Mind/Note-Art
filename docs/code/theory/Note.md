---
title: Note
---

# Note

<a name="Note"></a>

## Note ⇐ <code>PitchClass</code>
Represents an abstract musical note.

**Kind**: global class  
**Extends**: <code>PitchClass</code>  

* [Note](#Note) ⇐ <code>PitchClass</code>
    * [new Note(pitchClass, octave)](#new_Note_new)
    * _instance_
        * [.octave](#Note+octave) : <code>String</code>
        * [.interval(interval)](#Note+interval)
        * [.transpose(interval)](#Note+transpose)
        * [.toString()](#Note+toString) ⇒ <code>string</code>
    * _static_
        * [.builder(note)](#Note.builder) ⇒ [<code>Note</code>](#Note)
        * [.fromFrequency(frequency)](#Note.fromFrequency) ⇒ [<code>Note</code>](#Note)

<a name="new_Note_new"></a>

### new Note(pitchClass, octave)

| Param | Type |
| --- | --- |
| pitchClass | <code>string</code> | 
| octave | <code>number</code> | 

**Example**  
```js
// Creating a note instance
let c = new Note('c', 3)

// Getting it's properties
console.log(c.pitchClass) // C
console.log(c.octave) // 3

// Getting a notes interval
let interval = c.interval(4)
console.log(interval.toString()) //E3
console.log(interval.constructor.name) //should output Note.

// Using the builder
const f = Note.builder('f4')
console.log(f) //F4

// Generating note from frequency
const a = Note.fromFrequency(440)
console.log(a) //A4
```
<a name="Note+octave"></a>

### note.octave : <code>String</code>
Returns the octave of the note.

**Kind**: instance property of [<code>Note</code>](#Note)  
<a name="Note+interval"></a>

### note.interval(interval)
Gets interval size (Number) and returns a new instance of a note
which is calculated by the musical interval formula.

**Kind**: instance method of [<code>Note</code>](#Note)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | Musical Interval |

**Example**  
```js
let c = new Note({note:'c', octave:3}) //create a C3 note.
let interval = c.interval(4) //calling the function with the number 4(which is a major third).
console.log(interval.toStrring()) //should output 'E3'.
console.log(interval.constructor.name) //should output Note.
```
<a name="Note+transpose"></a>

### note.transpose(interval)
Alias for interval()

**Kind**: instance method of [<code>Note</code>](#Note)  

| Param | Type |
| --- | --- |
| interval | <code>Number</code> | 

<a name="Note+toString"></a>

### note.toString() ⇒ <code>string</code>
Returns a string of the pitch class and octave of the Note.

**Kind**: instance method of [<code>Note</code>](#Note)  
<a name="Note.builder"></a>

### Note.builder(note) ⇒ [<code>Note</code>](#Note)
Builds a Note instance from string representing a note.

**Kind**: static method of [<code>Note</code>](#Note)  

| Param |
| --- |
| note | 

<a name="Note.fromFrequency"></a>

### Note.fromFrequency(frequency) ⇒ [<code>Note</code>](#Note)
Generates a new pitch from frequency.

**Kind**: static method of [<code>Note</code>](#Note)  

| Param |
| --- |
| frequency | 

