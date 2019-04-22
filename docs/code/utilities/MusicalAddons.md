---
title: MusicalAddons
---

# MusicalAddons

## Functions

<dl>
<dt><a href="#notesDistance">notesDistance(n1, n2)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the pure interval(not considering octave) between 2 notes(in semitones).</p>
</dd>
<dt><a href="#noteToObject">noteToObject(pitch)</a> ⇒ <code>Object</code></dt>
<dd><p>Turns a note into an object with pitch class and octave.</p>
</dd>
<dt><a href="#validateRawNote">validateRawNote(note)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validate that a string is a valid representation of a raw note.</p>
</dd>
<dt><a href="#notesInRange">notesInRange(base, range)</a></dt>
<dd><p>Returns an object where the keys are raw notes and their value is an instance of that note.</p>
</dd>
</dl>

<a name="notesDistance"></a>

## notesDistance(n1, n2) ⇒ <code>Number</code>
Calculate the pure interval(not considering octave) between 2 notes(in semitones).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| n1 | <code>Note</code> | first note |
| n2 | <code>Note</code> | second note |

<a name="noteToObject"></a>

## noteToObject(pitch) ⇒ <code>Object</code>
Turns a note into an object with pitch class and octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitch | <code>String</code> | Pitch as a string, e.g Ab3 |

<a name="validateRawNote"></a>

## validateRawNote(note) ⇒ <code>boolean</code>
Validate that a string is a valid representation of a raw note.

**Kind**: global function  

| Param |
| --- |
| note | 

<a name="notesInRange"></a>

## notesInRange(base, range)
Returns an object where the keys are raw notes and their value is an instance of that note.

**Kind**: global function  

| Param |
| --- |
| base | 
| range | 

