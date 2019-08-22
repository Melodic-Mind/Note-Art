---
title: GuitarChordPattern
---

# GuitarChordPattern

## Classes

<dl>
<dt><a href="#GuitarChordPattern">GuitarChordPattern</a></dt>
<dd><p>This class is used to implement the CAGED chord system in code.
basically, it converts a chord of a specific pattern to any other root of the same chord.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#pattern">pattern</a> ⇒ <code>Array</code></dt>
<dd><p>Returns the chord pattern.</p>
</dd>
<dt><a href="#pitchClass">pitchClass</a> ⇒ <code>PitchClass</code></dt>
<dd><p>Returns the chord&#39;s pitch class.</p>
</dd>
<dt><a href="#name">name</a> ⇒ <code>string</code></dt>
<dd><p>Returns the chord name.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getChord">getChord(root)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a string that represents the strumming pattern for a guitar chord with the new root.</p>
</dd>
</dl>

<a name="GuitarChordPattern"></a>

## GuitarChordPattern
This class is used to implement the CAGED chord system in code.
basically, it converts a chord of a specific pattern to any other root of the same chord.

**Kind**: global class  
<a name="new_GuitarChordPattern_new"></a>

### new GuitarChordPattern(pattern, pitchClass, name)

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>Array</code> | The chords pattern. |
| pitchClass | <code>PitchClass</code> | The chord's root pitch class. |
| name | <code>string</code> | The chords name. |

<a name="pattern"></a>

## pattern ⇒ <code>Array</code>
Returns the chord pattern.

**Kind**: global variable  
<a name="pitchClass"></a>

## pitchClass ⇒ <code>PitchClass</code>
Returns the chord's pitch class.

**Kind**: global variable  
<a name="name"></a>

## name ⇒ <code>string</code>
Returns the chord name.

**Kind**: global variable  
<a name="getChord"></a>

## getChord(root) ⇒ <code>Object</code>
Returns a string that represents the strumming pattern for a guitar chord with the new root.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>PitchClass</code> | The root of the chord. |

