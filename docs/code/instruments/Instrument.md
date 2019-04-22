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
        * *[.generatePath(fileName)](#Instrument+generatePath)*
        * *[.setPlayer(key, note)](#Instrument+setPlayer)*
        * *[.getPlayer(note)](#Instrument+getPlayer) ⇒ <code>Tone.Player</code>*
        * *[.note(note)](#Instrument+note) ⇒ <code>Note</code>*
        * *[.hasNote(note)](#Instrument+hasNote) ⇒ <code>boolean</code>*
        * *[.play(note, [duration])](#Instrument+play)*
        * *[.syncAndPlay(note, duration)](#Instrument+syncAndPlay)*
    * _static_
        * *[.server](#Instrument.server) ⇒ <code>string</code>*
        * *[.getKey(note)](#Instrument.getKey)*
        * *[.normalizeNoteStr(noteStr)](#Instrument.normalizeNoteStr) ⇒ <code>String</code>*

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

### *instrument.generatePath(fileName)*
Generates player for some audio.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

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

<a name="Instrument+syncAndPlay"></a>

### *instrument.syncAndPlay(note, duration)*
Syncs a note to the transport with a duration.

**Kind**: instance method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>string</code> | 
| duration | <code>string</code> | 

<a name="Instrument.server"></a>

### *Instrument.server ⇒ <code>string</code>*
The server to load the audio files for the instrument from,
can be overridden.

**Kind**: static property of [<code>Instrument</code>](#Instrument)  
<a name="Instrument.getKey"></a>

### *Instrument.getKey(note)*
Calculates a specific note's key.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param | Type |
| --- | --- |
| note | <code>Note</code> | 

<a name="Instrument.normalizeNoteStr"></a>

### *Instrument.normalizeNoteStr(noteStr) ⇒ <code>String</code>*
Turns a string representing a note to upper case.

**Kind**: static method of [<code>Instrument</code>](#Instrument)  

| Param |
| --- |
| noteStr | 

