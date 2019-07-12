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
    * [.pitchClass](#PitchClass+pitchClass) : <code>String</code>
    * [.classSet](#PitchClass+classSet) : <code>String</code>
    * [.classIndex](#PitchClass+classIndex) : <code>Number</code>
    * [.interval(interval)](#PitchClass+interval) ⇒ [<code>PitchClass</code>](#PitchClass)
    * [.toString()](#PitchClass+toString) ⇒ <code>String</code>

<a name="new_PitchClass_new"></a>

### new exports.PitchClass(pitchClass)

| Param |
| --- |
| pitchClass | 

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
<a name="PitchClass+interval"></a>

### pitchClass.interval(interval) ⇒ [<code>PitchClass</code>](#PitchClass)
Returns the pure pitch class at an interval.

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
