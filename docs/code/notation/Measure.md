---
title: Measure
---

# Measure

<a name="Measure"></a>

## Measure
Represents a single measure as part of a musical score in musical notation.

**Kind**: global class  

* [Measure](#Measure)
    * [new exports.Measure([maxDuration])](#new_Measure_new)
    * [.data](#Measure+data) ⇒ <code>Array</code>
    * [.duration](#Measure+duration) ⇒ <code>string</code>
    * [.duration](#Measure+duration)
    * [.maxDuration](#Measure+maxDuration) ⇒ <code>number</code>
    * [.clone()](#Measure+clone) ⇒ [<code>Measure</code>](#Measure)
    * [.durationLeft([position])](#Measure+durationLeft) ⇒ <code>number</code>
    * [.initNext(position)](#Measure+initNext)
    * [.validateInsertion(position, duration)](#Measure+validateInsertion) ⇒ <code>boolean</code>
    * [.addNote(note, [duration], position)](#Measure+addNote) ⇒ <code>boolean</code>
    * [.addNotes(notes, [duration], position)](#Measure+addNotes) ⇒ <code>\*</code>
    * [.addChord(notes, name, duration, position)](#Measure+addChord) ⇒ <code>boolean</code>
    * [.deleteNote(note, position)](#Measure+deleteNote) ⇒ <code>boolean</code>
    * [.deleteNotes(notes, position)](#Measure+deleteNotes) ⇒ <code>\*</code>
    * [.deleteMember(position)](#Measure+deleteMember) ⇒ <code>boolean</code>
    * [.transpose(interval)](#Measure+transpose) ⇒ [<code>Measure</code>](#Measure)
    * [.clear()](#Measure+clear) ⇒ <code>boolean</code>
    * [.toString()](#Measure+toString) ⇒ <code>string</code>

<a name="new_Measure_new"></a>

### new exports.Measure([maxDuration])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [maxDuration] | <code>Number</code> | <code>0</code> | Max duration of the measure(decided by time signature) |

<a name="Measure+data"></a>

### measure.data ⇒ <code>Array</code>
Returns the data of the measure - an array of objects where each
object has a set of notes and the duration for those notes.

**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+duration"></a>

### measure.duration ⇒ <code>string</code>
Returns the duration the measure will use when adding a new member to the data.

**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+duration"></a>

### measure.duration
Sets the duration for the measure's next data input.

**Kind**: instance property of [<code>Measure</code>](#Measure)  

| Param | Type |
| --- | --- |
| duration | <code>string</code> | 

<a name="Measure+maxDuration"></a>

### measure.maxDuration ⇒ <code>number</code>
Returns the maximum sum of durations for the measure as a number,
where each unit is 1/64 bit.

**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+clone"></a>

### measure.clone() ⇒ [<code>Measure</code>](#Measure)
Returns a deep clone of the measure.

**Kind**: instance method of [<code>Measure</code>](#Measure)  
<a name="Measure+durationLeft"></a>

### measure.durationLeft([position]) ⇒ <code>number</code>
Returns the duration left for notes in the measure.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Default |
| --- | --- | --- |
| [position] | <code>number</code> | <code>this.data.length</code> | 

<a name="Measure+initNext"></a>

### measure.initNext(position)
Creates a slot for the next notes that will be added in the measure if there is space.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position to initialize the next notes to. |

<a name="Measure+validateInsertion"></a>

### measure.validateInsertion(position, duration) ⇒ <code>boolean</code>
Checks whether a new data member can be added at a certain position in the measure.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | The position to check for. |
| duration |  |  |

<a name="Measure+addNote"></a>

### measure.addNote(note, [duration], position) ⇒ <code>boolean</code>
Adds a note to the measure at some position.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | raw note representation. |
| [duration] | <code>string</code> | <code>&quot;this.duration&quot;</code> |  |
| position | <code>number</code> |  | The position in the data to add the note to. |

<a name="Measure+addNotes"></a>

### measure.addNotes(notes, [duration], position) ⇒ <code>\*</code>
Adds notes to the note set at the position.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw notes. |
| [duration] | <code>string</code> | <code>&quot;this.duration&quot;</code> |  |
| position | <code>number</code> |  | The position in the data to add the notes to. |

<a name="Measure+addChord"></a>

### measure.addChord(notes, name, duration, position) ⇒ <code>boolean</code>
Adds notes to the measure plus a name that represents the chord and is saved in
the data at the position as caption

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param |
| --- |
| notes | 
| name | 
| duration | 
| position | 

**Example**  
```js
measure.addChord({
     notes: ['C3', 'E3', 'G3'],
     name: 'C Major',
     duration: '4n'
     }, 0)      // Adds a C major chord at the start of the measure.
```
<a name="Measure+deleteNote"></a>

### measure.deleteNote(note, position) ⇒ <code>boolean</code>
Delete note at the position.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | raw note. |
| position | <code>number</code> | The position in the data to delete the note at. |

<a name="Measure+deleteNotes"></a>

### measure.deleteNotes(notes, position) ⇒ <code>\*</code>
Deletes notes from the noteset at the position.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | An array of raw notes. |
| position | <code>number</code> | The position in the data to delete the notes at. |

<a name="Measure+deleteMember"></a>

### measure.deleteMember(position) ⇒ <code>boolean</code>
Delete member from the measure's data - removes all the notes from it
and initializes a new data member with the measure's duration.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position of the member to delete. |

<a name="Measure+transpose"></a>

### measure.transpose(interval) ⇒ [<code>Measure</code>](#Measure)
Returns a new measure where all the notes are transposed by the interval.

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | Interval to transpose by. |

<a name="Measure+clear"></a>

### measure.clear() ⇒ <code>boolean</code>
Removes all the data from the measure.

**Kind**: instance method of [<code>Measure</code>](#Measure)  
<a name="Measure+toString"></a>

### measure.toString() ⇒ <code>string</code>
Returns a simple representation of the measure as a string.

**Kind**: instance method of [<code>Measure</code>](#Measure)  
