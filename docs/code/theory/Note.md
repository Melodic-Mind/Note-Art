---
title: Note
---

# Note

## Classes

<dl>
<dt><a href="#Note">Note</a></dt>
<dd><p>Represents an abstract musical note.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#octave">octave</a> : <code>String</code></dt>
<dd><p>Returns the octave of the note.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#builder">builder(noteString)</a> ⇒ <code><a href="#Note">Note</a></code></dt>
<dd><p>Builds a Note instance from string representing a note.</p>
</dd>
<dt><a href="#fromFrequency">fromFrequency(frequency)</a> ⇒ <code><a href="#Note">Note</a></code></dt>
<dd><p>Generates a new pitch from frequency.</p>
</dd>
<dt><a href="#interval">interval(interval)</a></dt>
<dd><p>Gets interval size (Number) and returns a new instance of a note
which is calculated by the musical interval formula.</p>
</dd>
<dt><a href="#transpose">transpose(interval)</a></dt>
<dd><p>Alias for interval()</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Returns a string of the pitch class and octave of the Note.</p>
</dd>
</dl>

<a name="Note"></a>

## Note
Represents an abstract musical note.

**Kind**: global class  
<a name="new_Note_new"></a>

### new Note(pitchClass, octave)

| Param | Type |
| --- | --- |
| pitchClass | <code>string</code> | 
| octave | <code>number</code> | 

**Example**  
```js
// Creating a note instance
let c = new Note('c', 3)

// Getting it's properties
console.log(c.pitchClass) // C
console.log(c.octave) // 3

// Getting a notes interval
let interval = c.interval(4)
console.log(interval.toString()) //E3
console.log(interval.constructor.name) //should output Note.

// Using the builder
const f = Note.builder('f4')
console.log(f) //F4

// Generating note from frequency
const a = Note.fromFrequency(440)
console.log(a) //A4
```
<a name="octave"></a>

## octave : <code>String</code>
Returns the octave of the note.

**Kind**: global variable  
<a name="builder"></a>

## builder(noteString) ⇒ [<code>Note</code>](#Note)
Builds a Note instance from string representing a note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| noteString | <code>string</code> | 

<a name="fromFrequency"></a>

## fromFrequency(frequency) ⇒ [<code>Note</code>](#Note)
Generates a new pitch from frequency.

**Kind**: global function  

| Param |
| --- |
| frequency | 

<a name="interval"></a>

## interval(interval)
Gets interval size (Number) and returns a new instance of a note
which is calculated by the musical interval formula.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | Musical Interval |

**Example**  
```js
let c = new Note({note:'c', octave:3}) //create a C3 note.
let interval = c.interval(4) //calling the function with the number 4(which is a major third).
console.log(interval.toStrring()) //should output 'E3'.
console.log(interval.constructor.name) //should output Note.
```
<a name="transpose"></a>

## transpose(interval)
Alias for interval()

**Kind**: global function  

| Param | Type |
| --- | --- |
| interval | <code>Number</code> | 

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Returns a string of the pitch class and octave of the Note.

**Kind**: global function  
