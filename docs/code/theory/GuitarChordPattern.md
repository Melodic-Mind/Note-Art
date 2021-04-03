---
title: GuitarChordPattern
---

# GuitarChordPattern

<a name="GuitarChordPattern"></a>

## GuitarChordPattern
This class is used to implement the CAGED chord system in code.
basically, it converts a chord of a specific pattern to any other root of the same chord.

**Kind**: global class  

* [GuitarChordPattern](#GuitarChordPattern)
    * [new GuitarChordPattern(pattern, pitchClass, name)](#new_GuitarChordPattern_new)
    * [.pattern](#GuitarChordPattern+pattern) ⇒ <code>Array</code>
    * [.pitchClass](#GuitarChordPattern+pitchClass) ⇒ <code>PitchClass</code>
    * [.name](#GuitarChordPattern+name) ⇒ <code>string</code>
    * [.getChord(root)](#GuitarChordPattern+getChord) ⇒ <code>Object</code>

<a name="new_GuitarChordPattern_new"></a>

### new GuitarChordPattern(pattern, pitchClass, name)

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>Array</code> | The chords pattern. |
| pitchClass | <code>PitchClass</code> | The chord's root pitch class. |
| name | <code>string</code> | The chords name. |

<a name="GuitarChordPattern+pattern"></a>

### guitarChordPattern.pattern ⇒ <code>Array</code>
Returns the chord pattern.

**Kind**: instance property of [<code>GuitarChordPattern</code>](#GuitarChordPattern)  
<a name="GuitarChordPattern+pitchClass"></a>

### guitarChordPattern.pitchClass ⇒ <code>PitchClass</code>
Returns the chord's pitch class.

**Kind**: instance property of [<code>GuitarChordPattern</code>](#GuitarChordPattern)  
<a name="GuitarChordPattern+name"></a>

### guitarChordPattern.name ⇒ <code>string</code>
Returns the chord name.

**Kind**: instance property of [<code>GuitarChordPattern</code>](#GuitarChordPattern)  
<a name="GuitarChordPattern+getChord"></a>

### guitarChordPattern.getChord(root) ⇒ <code>Object</code>
Returns a string that represents the strumming pattern for a guitar chord with the new root.

**Kind**: instance method of [<code>GuitarChordPattern</code>](#GuitarChordPattern)  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>String</code> | The root of the chord. |

