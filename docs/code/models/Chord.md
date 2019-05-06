---
title: Chord
---

# Chord

<a name="Chord"></a>

## Chord
Represents a musical Chord - a number of notes with a specific
pattern which can be played together to form a harmonic sound.

**Kind**: global class  

* [Chord](#Chord)
    * [new Chord(attributes)](#new_Chord_new)
    * [.notes](#Chord+notes) : <code>Array</code>
    * [.fullName](#Chord+fullName) : <code>String</code>
    * [.name](#Chord+name) : <code>String</code>
    * [.octave](#Chord+octave) : <code>Number</code>
    * [.pitchIntervals](#Chord+pitchIntervals) : <code>Array</code>
    * [.type](#Chord+type) ⇒ <code>string</code> \| <code>undefined</code>
    * [.pitchClassesString](#Chord+pitchClassesString) ⇒ <code>string</code>
    * [.toString()](#Chord+toString) ⇒ <code>String</code>
    * [.transpose(interval)](#Chord+transpose) ⇒ [<code>Chord</code>](#Chord)

<a name="new_Chord_new"></a>

### new Chord(attributes)
**Throws**:

- <code>MissingInformation</code> When not provided with root and either name or pattern
- <code>DataNotFound</code> When called with name and the name cant be found in the


| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>Object</code> | Object that contains some of the following keys: |
| [attributes.root] | <code>Note</code> | chords root note |
| [attributes.name] | <code>String</code> | the chords name(e.g 'M') |
| [attributes.pattern] | <code>Array</code> | the pattern to build the chord by pitch intervals(e.g [3, 7] |

**Example**  
```js
const c = new Note({note: 'c'})
const C_Maj_by_pattern = new Chord({root:c, pattern: [4, 7]}) // new C major chord.
const C_min_by_name = new Chord({root:c, name: 'm'}) // new C minor chord.
```
<a name="Chord+notes"></a>

### chord.notes : <code>Array</code>
Array of the notes in the chord.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+fullName"></a>

### chord.fullName : <code>String</code>
Name of the chord.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+name"></a>

### chord.name : <code>String</code>
Chord type representation.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+octave"></a>

### chord.octave : <code>Number</code>
Returns chord root octave.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+pitchIntervals"></a>

### chord.pitchIntervals : <code>Array</code>
Array of the intervals from the root to each note in the chord(excluding the root)

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+type"></a>

### chord.type ⇒ <code>string</code> \| <code>undefined</code>
Whether chord is major, minor or neither.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+pitchClassesString"></a>

### chord.pitchClassesString ⇒ <code>string</code>
Returns a string of the chord notes pitch classes.

**Kind**: instance property of [<code>Chord</code>](#Chord)  
<a name="Chord+toString"></a>

### chord.toString() ⇒ <code>String</code>
Returns a string of the chord's name.

**Kind**: instance method of [<code>Chord</code>](#Chord)  
<a name="Chord+transpose"></a>

### chord.transpose(interval) ⇒ [<code>Chord</code>](#Chord)
Generates a new chord with the interval applied

**Kind**: instance method of [<code>Chord</code>](#Chord)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>Number</code> | the interval to apply |

