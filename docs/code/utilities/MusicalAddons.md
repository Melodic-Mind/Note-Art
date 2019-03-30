---
title: MusicalAddons
---

# MusicalAddons

## Functions

<dl>
<dt><a href="#getMinDuration">getMinDuration(notes)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the duration value of the note with the shortest duration out of an array of notes.</p>
</dd>
<dt><a href="#notesDistance">notesDistance(n1, n2)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the pure interval(not considering octave) between 2 notes(in semitones).</p>
</dd>
<dt><a href="#playMelodically">playMelodically(notes, timeInterval, [resolve])</a></dt>
<dd><p>Play a group of notes melodically.
if resolve is true the melody will resolve to the tonic in higher octave.</p>
</dd>
</dl>

<a name="getMinDuration"></a>

## getMinDuration(notes) ⇒ <code>Number</code>
Returns the duration value of the note with the shortest duration out of an array of notes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| notes | <code>Array</code> | 

<a name="notesDistance"></a>

## notesDistance(n1, n2) ⇒ <code>Number</code>
Calculate the pure interval(not considering octave) between 2 notes(in semitones).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| n1 | <code>Pitch</code> | first note |
| n2 | <code>Pitch</code> | second note |

<a name="playMelodically"></a>

## playMelodically(notes, timeInterval, [resolve])
Play a group of notes melodically.
if resolve is true the melody will resolve to the tonic in higher octave.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | array of playable notes |
| timeInterval | <code>Number</code> |  |  |
| [resolve] | <code>boolean</code> | <code>false</code> | whether to resolve to tonic |

