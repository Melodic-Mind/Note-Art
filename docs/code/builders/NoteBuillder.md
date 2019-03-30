---
title: NoteBuillder
---

# NoteBuillder

<a name="NoteBuilder"></a>

## NoteBuilder
A builder that can build both a Note and a PlayableNote.,
           doesn't throw exceptions and defaults to:
           pitch class: C
           octave: 3
           duration: 4m
           instrument(in case of PlayableNote): Piano

**Kind**: global class  

* [NoteBuilder](#NoteBuilder)
    * [new exports.NoteBuilder([raw])](#new_NoteBuilder_new)
    * [.octave(value)](#NoteBuilder+octave) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
    * [.duration(value)](#NoteBuilder+duration) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
    * [.pitchClass(value)](#NoteBuilder+pitchClass) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
    * [.instrument(value)](#NoteBuilder+instrument) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
    * [.build([playable])](#NoteBuilder+build) ⇒ <code>Note</code> \| <code>PlayableNote</code>

<a name="new_NoteBuilder_new"></a>

### new exports.NoteBuilder([raw])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [raw] | <code>Object</code> | <code>{}</code> | Raw attributes for the new note. |
| [raw.pitchCLass] | <code>String</code> | <code>&#x27;C&#x27;</code> | Pitch CLass. |
| [raw.octave] | <code>Number</code> | <code>3</code> | Octave. |
| [raw.duration] | <code>String</code> | <code>&#x27;4n</code> | Octave. |
| [raw.instrument] | <code>String</code> | <code>&#x27;Piano&#x27;</code> | Instrument. |

**Example**  
```js
Build Note:
         const c1 = new NoteBuilder({pitchClass: 'F'}).build()       // Builds Note
         const c2 = new NoteBuilder({pitchClass: 'F'}).build(true)   // Builds PlayableNote
```
<a name="NoteBuilder+octave"></a>

### noteBuilder.octave(value) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
Verify octave.

**Kind**: instance method of [<code>NoteBuilder</code>](#NoteBuilder)  

| Param |
| --- |
| value | 

<a name="NoteBuilder+duration"></a>

### noteBuilder.duration(value) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
Verify duration.

**Kind**: instance method of [<code>NoteBuilder</code>](#NoteBuilder)  

| Param |
| --- |
| value | 

<a name="NoteBuilder+pitchClass"></a>

### noteBuilder.pitchClass(value) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
Verify pitch cLass.

**Kind**: instance method of [<code>NoteBuilder</code>](#NoteBuilder)  

| Param |
| --- |
| value | 

<a name="NoteBuilder+instrument"></a>

### noteBuilder.instrument(value) ⇒ [<code>NoteBuilder</code>](#NoteBuilder)
Verify instrument.

**Kind**: instance method of [<code>NoteBuilder</code>](#NoteBuilder)  

| Param |
| --- |
| value | 

<a name="NoteBuilder+build"></a>

### noteBuilder.build([playable]) ⇒ <code>Note</code> \| <code>PlayableNote</code>
Builds a new Note/PLayableNote.

**Kind**: instance method of [<code>NoteBuilder</code>](#NoteBuilder)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [playable] | <code>boolean</code> | <code>false</code> | Whether to build a PlayableNote. |

