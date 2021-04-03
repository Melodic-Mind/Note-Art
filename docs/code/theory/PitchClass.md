---
title: PitchClass
---

# PitchClass

<a name="PitchClass"></a>

## PitchClass
Represents a pitch class.

**Kind**: global class  

* [PitchClass](#PitchClass)
    * [new PitchClass(pitchClass)](#new_PitchClass_new)
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
        * [.isPitchClass(obj)](#PitchClass.isPitchClass) ⇒ <code>boolean</code>

<a name="new_PitchClass_new"></a>

### new PitchClass(pitchClass)

| Param | Type |
| --- | --- |
| pitchClass | <code>String</code> | 

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
Returns the pure pitch class at interval as a new instance.

**Kind**: instance method of [<code>PitchClass</code>](#PitchClass)  
**Throws**:

- InvalidInput


| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | The interval, e.g 5, 7 |

**Example**  
```js
const c = new PitchClass('c')
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

| Param | Type |
| --- | --- |
| pitchClass | <code>String</code> | 

<a name="PitchClass.isSharp"></a>

### PitchClass.isSharp(pitchClass) ⇒ <code>boolean</code>
Returns true if pitch class has a sharp in it, else false.

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param |
| --- |
| pitchClass | 

<a name="PitchClass.isPitchClass"></a>

### PitchClass.isPitchClass(obj) ⇒ <code>boolean</code>
Returns true if obj is an instance of PitchClass, else false.

**Kind**: static method of [<code>PitchClass</code>](#PitchClass)  

| Param |
| --- |
| obj | 

