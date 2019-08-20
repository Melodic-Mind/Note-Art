---
title: PitchClass
---

# PitchClass

<a name="PitchClass"></a>

## PitchClass
Represents a pitch class.

**Kind**: global class  

* [PitchClass](#PitchClass)
    * [new exports.PitchClass(pitchClass)](#new_PitchClass_new)
    * _instance_
        * [.pitchClass](#PitchClass+pitchClass) : <code>String</code>
        * [.classSet](#PitchClass+classSet) : <code>String</code>
        * [.classIndex](#PitchClass+classIndex) : <code>Number</code>
        * [.raw](#PitchClass+raw) ⇒ <code>String</code>
        * [.interval(interval)](#PitchClass+interval) ⇒ [<code>PitchClass</code>](#PitchClass)
        * [.toString()](#PitchClass+toString) ⇒ <code>String</code>
    * _static_
        * [.isFlat(pitchClass)](#PitchClass.isFlat) ⇒ <code>boolean</code>
        * [.isSharp(pitchClass)](#PitchClass.isSharp) ⇒ <code>boolean</code>
        * [.flatToSharp(pitchClass)](#PitchClass.flatToSharp) ⇒ <code>string</code>
        * [.sharpToFlat(pitchClass)](#PitchClass.sharpToFlat) ⇒ <code>string</code>

<a name="new_PitchClass_new"></a>

### new exports.PitchClass(pitchClass)

| Param |
| --- |
| pitchClass | 

**Example**  
```js
const c = new PitchClass('d')
```
<a name="PitchClass+pitchClass"></a>

### pitchClass.pitchClass : <code>String</code>
Returns the pitch class.

**Kind**: instance property of [<code>PitchClass</code>](#PitchClass)  
<a name="PitchClass+classSet"></a>

### pitchClass.classSet : <code>String</code>
Get the set of the pitch class - sharp or flat.

**Kind**: instance property of [<code>PitchClass</code>](#PitchClass)  
<a name="PitchClass+classIndex"></a>

### pitchClass.classIndex : <code>Number</code>
Get the index of the pitch class out of the 12 classes (C, Db, etc...).

**Kind**: instance property of [<code>PitchClass</code>](#PitchClass)  
<a name="PitchClass+raw"></a>

### pitchClass.raw ⇒ <code>String</code>
Returns the pitch class as a string.

**Kind**: instance property of [<code>PitchClass</code>](#PitchClass)  
<a name="PitchClass+interval"></a>

### pitchClass.interval(interval) ⇒ [<code>PitchClass</code>](#PitchClass)
Retuns the pure pitch class at interval.

**Kind**: instance method of [<code>PitchClass</code>](#PitchClass)  

| Param |
| --- |
| interval | 

**Example**  
```js
const c = new PitchClass('c")
console.log(c.interval(5)) // F
```
<a name="PitchClass+toString"></a>

### pitchClass.toString() ⇒ <code>String</code>
Returns string of the pitch class.

**Kind**: instance method of [<code>PitchClass</code>](#PitchClass)  
<a name="PitchClass.isFlat"></a>

### PitchClass.isFlat(pitchClass) ⇒ <code>boolean</code>
Returns true if pitch class has a flat in it, else false.

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param |
| --- |
| pitchClass | 

<a name="PitchClass.isSharp"></a>

### PitchClass.isSharp(pitchClass) ⇒ <code>boolean</code>
Returns true if pitch class has a sharp in it, else false.

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param |
| --- |
| pitchClass | 

<a name="PitchClass.flatToSharp"></a>

### PitchClass.flatToSharp(pitchClass) ⇒ <code>string</code>
Transforms a pitch class represented with a flat to a sharp. e.g Gb -> F#

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param | Type |
| --- | --- |
| pitchClass | <code>string</code> | 

<a name="PitchClass.sharpToFlat"></a>

### PitchClass.sharpToFlat(pitchClass) ⇒ <code>string</code>
Transforms a pitch class represented with a sharp to a flat. e.g F# -> Gb

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param | Type |
| --- | --- |
| pitchClass | <code>string</code> | 

