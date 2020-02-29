---
title: Measure
---

# Measure

## Classes

<dl>
<dt><a href="#Measure">Measure</a></dt>
<dd><p>Represents a single measure as part of a musical score in musical notation.ds</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#data">data</a> ⇒ <code>Array</code></dt>
<dd><p>Returns the data of the measure - an array of objects where each
object has a set of notes and the duration for those notes.</p>
</dd>
<dt><a href="#duration">duration</a> ⇒ <code>string</code></dt>
<dd><p>Returns the duration the measure will use when adding a new member to the data.</p>
</dd>
<dt><a href="#duration">duration</a></dt>
<dd><p>Sets the duration for the measure&#39;s next data input.</p>
</dd>
<dt><a href="#maxDuration">maxDuration</a> ⇒ <code>number</code></dt>
<dd><p>Returns the maximum sum of durations for the measure as a number,
where each unit is 1/64 bit.</p>
</dd>
<dt><a href="#length">length</a> ⇒ <code>number</code></dt>
<dd><p>Returns the number of sixteenth notes in the measure.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#clone">clone()</a> ⇒ <code><a href="#Measure">Measure</a></code></dt>
<dd><p>Returns a deep clone of the measure.</p>
</dd>
<dt><a href="#durationLeft">durationLeft(position)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the duration left for notes in the measure.</p>
</dd>
<dt><a href="#initNext">initNext(position)</a></dt>
<dd><p>Creates a slot for the next notes that will be added in the measure if there is space.
Should not be called as it&#39;s called automatically when needed.</p>
</dd>
<dt><a href="#validateInsertion">validateInsertion(position, duration)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks whether a new data member can be added at a certain position in the measure.</p>
</dd>
<dt><a href="#addNote">addNote(data, position)</a> ⇒ <code>boolean</code></dt>
<dd><p>Adds a note to the measure at some position.</p>
</dd>
<dt><a href="#addNotes">addNotes(notes, duration, position)</a> ⇒ <code>*</code></dt>
<dd><p>Adds notes to the note set at the position.</p>
</dd>
<dt><a href="#addChord">addChord(notes, name, duration, position)</a> ⇒ <code>boolean</code></dt>
<dd><p>Adds notes to the measure plus a name that represents the chord and is saved in
the data at the position as name</p>
</dd>
<dt><a href="#deleteNote">deleteNote(note, position)</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete note at the position.</p>
</dd>
<dt><a href="#deleteNotes">deleteNotes(notes, position)</a> ⇒ <code>*</code></dt>
<dd><p>Deletes notes from the noteset at the position.</p>
</dd>
<dt><a href="#deleteMember">deleteMember(position)</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete member from the measure&#39;s data - removes all the notes from it
and initializes a new data member with the measure&#39;s duration.</p>
</dd>
<dt><a href="#isFull">isFull(duration)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if the duration has space, else false.</p>
</dd>
<dt><a href="#transpose">transpose(interval)</a> ⇒ <code><a href="#Measure">Measure</a></code></dt>
<dd><p>Returns a new measure where all the notes are transposed by the interval.</p>
</dd>
<dt><a href="#clear">clear()</a> ⇒ <code>boolean</code></dt>
<dd><p>Removes all the data from the measure.</p>
</dd>
</dl>

<a name="Measure"></a>

## Measure
Represents a single measure as part of a musical score in musical notation.ds

**Kind**: global class  
<a name="new_Measure_new"></a>

### new Measure(maxDuration)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| maxDuration | <code>Number</code> | <code>0</code> | Max duration of the measure(determined by time signature) |

<a name="data"></a>

## data ⇒ <code>Array</code>
Returns the data of the measure - an array of objects where each
object has a set of notes and the duration for those notes.

**Kind**: global variable  
<a name="duration"></a>

## duration ⇒ <code>string</code>
Returns the duration the measure will use when adding a new member to the data.

**Kind**: global variable  
<a name="duration"></a>

## duration
Sets the duration for the measure's next data input.

**Kind**: global variable  

| Param | Type |
| --- | --- |
| duration | <code>string</code> | 

<a name="maxDuration"></a>

## maxDuration ⇒ <code>number</code>
Returns the maximum sum of durations for the measure as a number,
where each unit is 1/64 bit.

**Kind**: global variable  
**Read only**: true  
<a name="length"></a>

## length ⇒ <code>number</code>
Returns the number of sixteenth notes in the measure.

**Kind**: global variable  
<a name="clone"></a>

## clone() ⇒ [<code>Measure</code>](#Measure)
Returns a deep clone of the measure.

**Kind**: global function  
<a name="durationLeft"></a>

## durationLeft(position) ⇒ <code>number</code>
Returns the duration left for notes in the measure.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| position | <code>number</code> | <code>this.data.length</code> | 

<a name="initNext"></a>

## initNext(position)
Creates a slot for the next notes that will be added in the measure if there is space.
Should not be called as it's called automatically when needed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position to initialize the next notes to. |

<a name="validateInsertion"></a>

## validateInsertion(position, duration) ⇒ <code>boolean</code>
Checks whether a new data member can be added at a certain position in the measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | The position to check for. |
| duration |  |  |

<a name="addNote"></a>

## addNote(data, position) ⇒ <code>boolean</code>
Adds a note to the measure at some position.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  |  |
| data.note | <code>string</code> |  | raw note representation. |
| data.duration | <code>string</code> | <code>&quot;this.duration&quot;</code> |  |
| position | <code>number</code> |  | The position in the data to add the note to. |

<a name="addNotes"></a>

## addNotes(notes, duration, position) ⇒ <code>\*</code>
Adds notes to the note set at the position.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw notes. |
| duration | <code>string</code> | <code>&quot;this.duration&quot;</code> |  |
| position | <code>number</code> |  | The position in the data to add the notes to. |

<a name="addChord"></a>

## addChord(notes, name, duration, position) ⇒ <code>boolean</code>
Adds notes to the measure plus a name that represents the chord and is saved in
the data at the position as name

**Kind**: global function  

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
<a name="deleteNote"></a>

## deleteNote(note, position) ⇒ <code>boolean</code>
Delete note at the position.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | raw note. |
| position | <code>number</code> | The position in the data to delete the note at. |

<a name="deleteNotes"></a>

## deleteNotes(notes, position) ⇒ <code>\*</code>
Deletes notes from the noteset at the position.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | An array of raw notes. |
| position | <code>number</code> | The position in the data to delete the notes at. |

<a name="deleteMember"></a>

## deleteMember(position) ⇒ <code>boolean</code>
Delete member from the measure's data - removes all the notes from it
and initializes a new data member with the measure's duration.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | Position of the member to delete. |

<a name="isFull"></a>

## isFull(duration) ⇒ <code>boolean</code>
Returns true if the duration has space, else false.

**Kind**: global function  

| Param |
| --- |
| duration | 

<a name="transpose"></a>

## transpose(interval) ⇒ [<code>Measure</code>](#Measure)
Returns a new measure where all the notes are transposed by the interval.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | Interval to transpose by. |

<a name="clear"></a>

## clear() ⇒ <code>boolean</code>
Removes all the data from the measure.

**Kind**: global function  
