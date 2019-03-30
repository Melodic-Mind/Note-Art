---
title: Pitch
---

# Pitch

<a name="Pitch"></a>

## Pitch ⇐ <code>PitchClass</code>
A pitch class, representing a pitch class and an octave.

**Kind**: global class  
**Extends**: <code>PitchClass</code>  

* [Pitch](#Pitch) ⇐ <code>PitchClass</code>
    * [new exports.Pitch(pitchClass, octave)](#new_Pitch_new)
    * _instance_
        * [.octave](#Pitch+octave) : <code>String</code>
        * [.interval(interval)](#Pitch+interval)
        * [.toString()](#Pitch+toString) ⇒ <code>string</code>
    * _static_
        * [.fromFrequency(frequency)](#Pitch.fromFrequency) ⇒ [<code>Pitch</code>](#Pitch)

<a name="new_Pitch_new"></a>

### new exports.Pitch(pitchClass, octave)
Creates a new Pitch instance.


| Param |
| --- |
| pitchClass | 
| octave | 

<a name="Pitch+octave"></a>

### pitch.octave : <code>String</code>
Returns the octave of the pitch.

**Kind**: instance property of [<code>Pitch</code>](#Pitch)  
<a name="Pitch+interval"></a>

### pitch.interval(interval)
Gets interval size and returns new pitch instance
which is calculated by the musical interval formula.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

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
<a name="Pitch+toString"></a>

### pitch.toString() ⇒ <code>string</code>
Returns a string of the pitch class and octave of the pitch.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  
<a name="Pitch.fromFrequency"></a>

### Pitch.fromFrequency(frequency) ⇒ [<code>Pitch</code>](#Pitch)
Generates a new pitch from frequency.

**Kind**: static method of [<code>Pitch</code>](#Pitch)  

| Param |
| --- |
| frequency | 

