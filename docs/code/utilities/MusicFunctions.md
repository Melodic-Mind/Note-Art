---
title: MusicFunctions
---

# MusicFunctions

## Functions

<dl>
<dt><a href="#calculateInterval">calculateInterval(pitchClass1, pitchClass2)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the pure interval between 2 pitch classes.</p>
</dd>
<dt><a href="#noteToObject">noteToObject(pitch)</a> ⇒ <code>Object</code></dt>
<dd><p>Turns a note into an object with pitch class and octave.</p>
</dd>
<dt><a href="#isRest">isRest(note)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if a note is a rest, else false.</p>
</dd>
<dt><a href="#transposeRawNote">transposeRawNote(note, interval)</a> ⇒ <code>string</code> | <code>*</code></dt>
<dd><p>Transpose a raw note by interval.</p>
</dd>
<dt><a href="#notesInRange">notesInRange(baseNote, range)</a></dt>
<dd><p>Returns an object where the keys are raw notes and their value is an instance of that note.</p>
</dd>
</dl>

<a name="calculateInterval"></a>

## calculateInterval(pitchClass1, pitchClass2) ⇒ <code>Number</code>
Calculate the pure interval between 2 pitch classes.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitchClass1 | <code>PitchClass</code> | first note |
| pitchClass2 | <code>PitchClass</code> | second note |

<a name="noteToObject"></a>

## noteToObject(pitch) ⇒ <code>Object</code>
Turns a note into an object with pitch class and octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitch | <code>string</code> | Pitch as a string, e.g Ab3 |

<a name="isRest"></a>

## isRest(note) ⇒ <code>boolean</code>
Returns true if a note is a rest, else false.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | Raw note. |

<a name="transposeRawNote"></a>

## transposeRawNote(note, interval) ⇒ <code>string</code> \| <code>\*</code>
Transpose a raw note by interval.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | Raw note. |
| interval | <code>number</code> | Interval to transpose by. |

<a name="notesInRange"></a>

## notesInRange(baseNote, range)
Returns an object where the keys are raw notes and their value is an instance of that note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| baseNote | <code>string</code> | 
| range | <code>number</code> | 

