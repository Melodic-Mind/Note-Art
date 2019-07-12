---
title: Instrument
---

# Instrument

<a name="Instrument"></a>

## *Instrument*
Represents an abstract instrument with notes.

**Kind**: global abstract class  

* *[Instrument](#Instrument)*
    * _instance_
        * *[.init(base, range)](#Instrument+init)*
        * *[.generatePath(fileName)](#Instrument+generatePath) ⇒ <code>String</code>*
        * *[.setPlayer(key, note)](#Instrument+setPlayer)*
        * *[.getPlayer(note)](#Instrument+getPlayer) ⇒ <code>Tone.Player</code>*
        * *[.note(note)](#Instrument+note) ⇒ <code>Note</code>*
        * *[.hasNote(note)](#Instrument+hasNote) ⇒ <code>boolean</code>*
        * *[.play(note, [duration])](#Instrument+play)*
    * _static_
        * *[.name](#Instrument.name) : <code>string</code>*
        * *[.server](#Instrument.server) ⇒ <code>string</code>*
        * *[.instrumentPath](#Instrument.instrumentPath) ⇒ <code>string</code>*
        * *[.getKey(note)](#Instrument.getKey)*
        * *[.formatNote(note)](#Instrument.formatNote) ⇒ <code>String</code>*

<a name="Instrument+init"></a>

### *instrument.init(base, range)*
Should be called from any child class's constructor.
Initializes all the notes and audio players for the instrument.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param |
| --- |
| base | 
| range | 

<a name="Instrument+generatePath"></a>

### *instrument.generatePath(fileName) ⇒ <code>String</code>*
Generates the path to load a note from.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  
**Throws**:

- Error


| Param | Type |
| --- | --- |
| fileName | <code>String</code> | 

<a name="Instrument+setPlayer"></a>

### *instrument.setPlayer(key, note)*
Add a player for a note.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| key |  | 
| note | <code>Note</code> | 

<a name="Instrument+getPlayer"></a>

### *instrument.getPlayer(note) ⇒ <code>Tone.Player</code>*
Get a note's player.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

<a name="Instrument+note"></a>

### *instrument.note(note) ⇒ <code>Note</code>*
Gets a string consisting of:
1. The pitch CLASS
2. The octave

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

**Example**  
```js
const C = someInstrument.note('c3') // C is now a Note object
console.log(C.interval(2))         // D3
```
<a name="Instrument+hasNote"></a>

### *instrument.hasNote(note) ⇒ <code>boolean</code>*
Whether an instrument has a note.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>string</code> | 

<a name="Instrument+play"></a>

### *instrument.play(note, [duration])*
Play sound, optionally for a duration.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type | Default |
| --- | --- | --- |
| note | <code>string</code> |  | 
| [duration] | <code>string</code> | <code>false</code> | 

<a name="Instrument.name"></a>

### *Instrument.name : <code>string</code>*
Returns the instrument's name.

**Kind**: static property of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.server"></a>

### *Instrument.server ⇒ <code>string</code>*
The server to load the audio files for the instrument from,
can be overridden.

**Kind**: static property of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.instrumentPath"></a>

### *Instrument.instrumentPath ⇒ <code>string</code>*
Returns string to be used when loading audio files from a specific path.
Can be easily over-riden for a specific intrument by using the lib to set the instruments name.

**Kind**: static property of [<code>Instrument</code>](#Instrument)  
**Example**  
```js
lib.set('Piano', () => {return 'MyUltimatePiano'}) // Piano will now load audio files from the
    server/MyUltimatePiano
```
<a name="Instrument.getKey"></a>

### *Instrument.getKey(note)*
Calculates a specific note's key.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>Note</code> | 

<a name="Instrument.formatNote"></a>

### *Instrument.formatNote(note) ⇒ <code>String</code>*
Turns a string representing a note to upper case.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param |
| --- |
| note | 

