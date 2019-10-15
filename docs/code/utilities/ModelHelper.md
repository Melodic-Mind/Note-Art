---
title: ModelHelper
---

# ModelHelper

## Functions

<dl>
<dt><a href="#pitchClassesToNotes">pitchClassesToNotes({pitchClasses}, octave)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of notes with a specific octave.</p>
</dd>
<dt><a href="#pitchClassesToPianoChordNotes">pitchClassesToPianoChordNotes({pitchClasses}, octave, inversion)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of notes that represent a chord played on a piano in a certain octave.</p>
</dd>
<dt><a href="#enharmonicPitchClass">enharmonicPitchClass(pc1, pc2)</a> ⇒ <code>string</code></dt>
<dd><p>Transforms a pitch class to it&#39;s enharmonic equivalent of another pitch class.</p>
</dd>
<dt><a href="#transformPitchClass">transformPitchClass(pc)</a></dt>
<dd><p>Transform a pitch class to it&#39;s basic form.</p>
</dd>
</dl>

<a name="pitchClassesToNotes"></a>

## pitchClassesToNotes({pitchClasses}, octave) ⇒ <code>Array</code>
Returns an array of notes with a specific octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| {pitchClasses} | <code>Array</code> | Array of pitch classes. |
| octave | <code>number</code> | Octave to assign to notes.. |

<a name="pitchClassesToPianoChordNotes"></a>

## pitchClassesToPianoChordNotes({pitchClasses}, octave, inversion) ⇒ <code>Array</code>
Returns an array of notes that represent a chord played on a piano in a certain octave.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| {pitchClasses} | <code>Array</code> | Array of pitch classes. |
| octave | <code>number</code> | Octave for the chord root. |
| inversion | <code>number</code> | Whhether to invert the chord. 0 - root position, 1 - 1st inversion, 2 - 2nd inversion,     etc... |

<a name="enharmonicPitchClass"></a>

## enharmonicPitchClass(pc1, pc2) ⇒ <code>string</code>
Transforms a pitch class to it's enharmonic equivalent of another pitch class.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pc1 | <code>PitchClass</code> | pitch class to transform to. |
| pc2 | <code>PitchClass</code> | pitch class to transform. Should have no accidentals. |

<a name="transformPitchClass"></a>

## transformPitchClass(pc)
Transform a pitch class to it's basic form.

**Kind**: global function  

| Param | Type |
| --- | --- |
| pc | <code>PitchClass</code> | 

