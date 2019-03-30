---
title: PlayableNote
---

# PlayableNote

<a name="PlayableNote"></a>

## PlayableNote ⇐ <code>Note</code>
Represents a note that can be played by an instrument.

**Kind**: global class  
**Extends**: <code>Note</code>  

* [PlayableNote](#PlayableNote) ⇐ <code>Note</code>
    * [new exports.PlayableNote(pitchClass, octave, duration, instrument)](#new_PlayableNote_new)
    * [.instrument](#PlayableNote+instrument) : <code>String</code>
    * [.interval(interval)](#PlayableNote+interval)
    * [.transpose(interval)](#PlayableNote+transpose)
    * [.play()](#PlayableNote+play)
    * [.setDuration(duration)](#PlayableNote+setDuration)
    * [.setOctave(octave)](#PlayableNote+setOctave)

<a name="new_PlayableNote_new"></a>

### new exports.PlayableNote(pitchClass, octave, duration, instrument)
Creates a new PlayableNote instance.


| Param |
| --- |
| pitchClass | 
| octave | 
| duration | 
| instrument | 

<a name="PlayableNote+instrument"></a>

### playableNote.instrument : <code>String</code>
Get the instrument that plays the note

**Kind**: instance property of [<code>PlayableNote</code>](#PlayableNote)  
<a name="PlayableNote+interval"></a>

### playableNote.interval(interval)
Gets interval size (Number) and returns a new instance of a note
which is calculated by the musical interval formula.

**Kind**: instance method of [<code>PlayableNote</code>](#PlayableNote)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>Number</code> | Musical Interval |

**Example**  
```js
let c = new Note({note:'c', octave:3}) //create a C3 note.
let interval = c.interval(4) //calling the function with the number 4(which is a major third).
console.log(interval.toString()) //should output 'E3'.
```
<a name="PlayableNote+transpose"></a>

### playableNote.transpose(interval)
Alias for interval()

**Kind**: instance method of [<code>PlayableNote</code>](#PlayableNote)  

| Param | Type |
| --- | --- |
| interval | <code>Number</code> | 

<a name="PlayableNote+play"></a>

### playableNote.play()
Play the note.

**Kind**: instance method of [<code>PlayableNote</code>](#PlayableNote)  
<a name="PlayableNote+setDuration"></a>

### playableNote.setDuration(duration)
Returns a new PlayableNote instance with the new duration.

**Kind**: instance method of [<code>PlayableNote</code>](#PlayableNote)  

| Param |
| --- |
| duration | 

<a name="PlayableNote+setOctave"></a>

### playableNote.setOctave(octave)
Returns a new PlayableNote instance with the new octave.

**Kind**: instance method of [<code>PlayableNote</code>](#PlayableNote)  

| Param |
| --- |
| octave | 

