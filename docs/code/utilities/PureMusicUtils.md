---
title: PureMusicUtils
---

# PureMusicUtils

## Functions

<dl>
<dt><a href="#getNotesInterval">getNotesInterval(note1, note2)</a></dt>
<dd><p>Returns the interval from one note to another.</p>
</dd>
<dt><a href="#extractOctave">extractOctave(note)</a> ⇒ <code>*</code></dt>
<dd><p>Returns the octave from a raw note.</p>
</dd>
<dt><a href="#extractPitchClass">extractPitchClass(note)</a> ⇒ <code>*</code></dt>
<dd><p>Returns the pitch class from a raw note.</p>
</dd>
<dt><a href="#normalizePitchClass">normalizePitchClass(pc)</a></dt>
<dd><p>Transform a pitch class to it&#39;s basic form.</p>
</dd>
<dt><a href="#noteToObject">noteToObject(note)</a> ⇒ <code>Object</code></dt>
<dd><p>Turns a note into an object with pitch class and octave.</p>
</dd>
<dt><a href="#isRest">isRest(str)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if a note is a rest, else false.</p>
</dd>
<dt><a href="#notesInRange">notesInRange(baseNote, range)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an object where the keys are raw notes and their value is an object with note &amp; octave props.</p>
</dd>
<dt><a href="#getPitchClassIndex">getPitchClassIndex(pc)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the index of a pitch class out of a pitch class.</p>
</dd>
<dt><a href="#getPitchClassesInterval">getPitchClassesInterval(pitchClass1, pitchClass2)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the pure interval between 2 pitch classes.</p>
</dd>
<dt><a href="#enharmonicPitchClass">enharmonicPitchClass(from, to)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#toFlat">toFlat(str)</a> ⇒ <code>String</code></dt>
<dd><p>Turns any sharp pitch class to flat.</p>
</dd>
<dt><a href="#toSemitones">toSemitones(interval)</a> ⇒ <code>number</code></dt>
<dd><p>Normalize any interval representation to a semitone of Number type.</p>
</dd>
<dt><a href="#maxInterval">maxInterval(intervals)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the max interval from an array of intervals.</p>
</dd>
<dt><a href="#highestNote">highestNote(note1, note2)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the highest note between 2 notes.</p>
</dd>
<dt><a href="#lowestNote">lowestNote(note1, note2)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the lowest note between 2 notes.</p>
</dd>
<dt><a href="#lowestPitch">lowestPitch(pc1, pc2)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the lowest pitch between 2 pitch classes.</p>
</dd>
<dt><a href="#lowestNoteFromArray">lowestNoteFromArray(notes)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the lowest note from an array of notes.</p>
</dd>
<dt><a href="#highestNoteFromArray">highestNoteFromArray(notes)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the highest note from an array of notes.</p>
</dd>
</dl>

<a name="getNotesInterval"></a>

## getNotesInterval(note1, note2)
Returns the interval from one note to another.

**Kind**: global function  

| Param |
| --- |
| note1 | 
| note2 | 

<a name="extractOctave"></a>

## extractOctave(note) ⇒ <code>\*</code>
Returns the octave from a raw note.

**Kind**: global function  

| Param |
| --- |
| note | 

<a name="extractPitchClass"></a>

## extractPitchClass(note) ⇒ <code>\*</code>
Returns the pitch class from a raw note.

**Kind**: global function  

| Param |
| --- |
| note | 

<a name="normalizePitchClass"></a>

## normalizePitchClass(pc)
Transform a pitch class to it's basic form.

**Kind**: global function  

| Param | Type |
| --- | --- |
| pc | <code>String</code> | 

<a name="noteToObject"></a>

## noteToObject(note) ⇒ <code>Object</code>
Turns a note into an object with pitch class and octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | Pitch as a string, e.g Ab3 |

<a name="isRest"></a>

## isRest(str) ⇒ <code>boolean</code>
Returns true if a note is a rest, else false.

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="notesInRange"></a>

## notesInRange(baseNote, range) ⇒ <code>Array</code>
Returns an object where the keys are raw notes and their value is an object with note & octave props.

**Kind**: global function  

| Param | Type |
| --- | --- |
| baseNote | <code>string</code> | 
| range | <code>number</code> | 

<a name="getPitchClassIndex"></a>

## getPitchClassIndex(pc) ⇒ <code>number</code>
Returns the index of a pitch class out of a pitch class.

**Kind**: global function  

| Param |
| --- |
| pc | 

<a name="getPitchClassesInterval"></a>

## getPitchClassesInterval(pitchClass1, pitchClass2) ⇒ <code>Number</code>
Calculate the pure interval between 2 pitch classes.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitchClass1 | <code>String</code> | first note |
| pitchClass2 | <code>String</code> | second note |

<a name="enharmonicPitchClass"></a>

## enharmonicPitchClass(from, to) ⇒ <code>string</code>
**Kind**: global function  

| Param |
| --- |
| from | 
| to | 

<a name="toFlat"></a>

## toFlat(str) ⇒ <code>String</code>
Turns any sharp pitch class to flat.

**Kind**: global function  

| Param |
| --- |
| str | 

<a name="toSemitones"></a>

## toSemitones(interval) ⇒ <code>number</code>
Normalize any interval representation to a semitone of Number type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| interval | <code>Number</code> \| <code>String</code> | 

<a name="maxInterval"></a>

## maxInterval(intervals) ⇒ <code>number</code>
Returns the max interval from an array of intervals.

**Kind**: global function  

| Param | Type |
| --- | --- |
| intervals | <code>Array</code> | 

<a name="highestNote"></a>

## highestNote(note1, note2) ⇒ <code>String</code>
Returns the highest note between 2 notes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| note1 | <code>String</code> | 
| note2 | <code>String</code> | 

<a name="lowestNote"></a>

## lowestNote(note1, note2) ⇒ <code>String</code>
Returns the lowest note between 2 notes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| note1 | <code>String</code> | 
| note2 | <code>String</code> | 

<a name="lowestPitch"></a>

## lowestPitch(pc1, pc2) ⇒ <code>String</code>
Returns the lowest pitch between 2 pitch classes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| pc1 | <code>String</code> | 
| pc2 | <code>String</code> | 

<a name="lowestNoteFromArray"></a>

## lowestNoteFromArray(notes) ⇒ <code>String</code>
Returns the lowest note from an array of notes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| notes | <code>Array</code> | 

<a name="highestNoteFromArray"></a>

## highestNoteFromArray(notes) ⇒ <code>String</code>
Returns the highest note from an array of notes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| notes | <code>Array</code> | 

