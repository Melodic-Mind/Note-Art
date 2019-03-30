---
title: Note
---

# Note

<a name="Note"></a>

## Note
Represents an abstract musical note.

**Kind**: global class  

* [Note](#Note)
    * [new exports.Note(attributes)](#new_Note_new)
    * [.duration](#Note+duration) : <code>String</code>
    * [.interval(interval)](#Note+interval)
    * [.setDuration(duration)](#Note+setDuration) ⇒ [<code>Note</code>](#Note)
    * [.setOctave(octave)](#Note+setOctave) ⇒ [<code>Note</code>](#Note)
    * [.transpose(interval)](#Note+transpose)
    * [.toString()](#Note+toString) ⇒ <code>string</code>

<a name="new_Note_new"></a>

### new exports.Note(attributes)

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>Object</code> | Object that contains some or all of the following keys: |
| attributes.pitchClass | <code>String</code> | one of the pitch classes('c', 'd', etc...) |
| attributes.octave | <code>number</code> | note octave |
| attributes.duration | <code>String</code> | note duration |

**Example**  
```js
const n = new Note({note: 'c', octave: 3, duration: '4n', instrument: 'Piano'})
```
<a name="Note+duration"></a>

### note.duration : <code>String</code>
Get the duration of a note

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
<a name="Note+setDuration"></a>

### note.setDuration(duration) ⇒ [<code>Note</code>](#Note)
Returns a new Note with the new duration.

**Kind**: instance method of [<code>Note</code>](#Note)  

| Param |
| --- |
| duration | 

<a name="Note+setOctave"></a>

### note.setOctave(octave) ⇒ [<code>Note</code>](#Note)
Returns a new Note with the new octave.

**Kind**: instance method of [<code>Note</code>](#Note)  

| Param | Type |
| --- | --- |
| octave | <code>Number</code> | 

<a name="Note+transpose"></a>

### note.transpose(interval)
Alias for interval()

**Kind**: instance method of [<code>Note</code>](#Note)  

| Param | Type |
| --- | --- |
| interval | <code>Number</code> | 

<a name="Note+toString"></a>

### note.toString() ⇒ <code>string</code>
Returns a string of the note.

**Kind**: instance method of [<code>Note</code>](#Note)  
