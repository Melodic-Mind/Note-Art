---
title: MusicFunctions
---

# MusicFunctions

## Functions

<dl>
<dt><a href="#isRawNote">isRawNote(str)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a string represents a raw musical note.</p>
</dd>
<dt><a href="#pitchClassesToNotes">pitchClassesToNotes(pitchClasses, octave)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of notes with a specific octave.</p>
</dd>
<dt><a href="#pitchClassesToPianoChordNotes">pitchClassesToPianoChordNotes(pitchClasses, octave, inversion)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of notes that represent a chord played on a piano in a certain octave.</p>
</dd>
<dt><a href="#intervalsToNotes">intervalsToNotes(baseNote, intervals)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Returns an array of notes from a base note and array of intervals.</p>
</dd>
</dl>

<a name="isRawNote"></a>

## isRawNote(str) ⇒ <code>boolean</code>
Checks if a string represents a raw musical note.

**Kind**: global function  

| Param |
| --- |
| str | 

<a name="pitchClassesToNotes"></a>

## pitchClassesToNotes(pitchClasses, octave) ⇒ <code>Array</code>
Returns an array of notes with a specific octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitchClasses | <code>Array</code> | Array of pitch classes. |
| octave | <code>number</code> | Octave to assign to notes.. |

<a name="pitchClassesToPianoChordNotes"></a>

## pitchClassesToPianoChordNotes(pitchClasses, octave, inversion) ⇒ <code>Array</code>
Returns an array of notes that represent a chord played on a piano in a certain octave.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitchClasses | <code>Array</code> |  |  |
| octave | <code>number</code> |  | Octave for the chord root. |
| inversion | <code>number</code> | <code>0</code> | Whether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,     etc... |

<a name="intervalsToNotes"></a>

## intervalsToNotes(baseNote, intervals) ⇒ <code>Array.&lt;String&gt;</code>
Returns an array of notes from a base note and array of intervals.

**Kind**: global function  

| Param | Type |
| --- | --- |
| baseNote | <code>String</code> | 
| intervals | <code>Array.&lt;Number&gt;</code> | 

