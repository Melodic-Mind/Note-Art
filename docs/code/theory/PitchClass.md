---
title: PitchClass
---

# PitchClass

## Classes

<dl>
<dt><a href="#PitchClass">PitchClass</a></dt>
<dd><p>Represents a pitch class.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#pitchClass">pitchClass</a> : <code>String</code></dt>
<dd><p>Returns the pitch class.</p>
</dd>
<dt><a href="#classSet">classSet</a> : <code>String</code></dt>
<dd><p>Get the set of the pitch class - sharp or flat.</p>
</dd>
<dt><a href="#classIndex">classIndex</a> : <code>Number</code></dt>
<dd><p>Get the index of the pitch class out of the 12 classes (C, Db, etc...).</p>
</dd>
<dt><a href="#raw">raw</a> ⇒ <code>String</code></dt>
<dd><p>Returns the pitch class as a string.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#isFlat">isFlat(pitchClass)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if pitch class has a flat in it, else false.</p>
</dd>
<dt><a href="#isSharp">isSharp(pitchClass)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if pitch class has a sharp in it, else false.</p>
</dd>
<dt><a href="#isPitchClass">isPitchClass(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if obj is an instance of PitchClass, else false.</p>
</dd>
<dt><a href="#interval">interval(interval)</a> ⇒ <code><a href="#PitchClass">PitchClass</a></code></dt>
<dd><p>Returns the pure pitch class at interval as a new instance.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Returns string of the pitch class.</p>
</dd>
</dl>

<a name="PitchClass"></a>

## PitchClass
Represents a pitch class.

**Kind**: global class  
<a name="new_PitchClass_new"></a>

### new PitchClass(pitchClass)

| Param | Type |
| --- | --- |
| pitchClass | <code>string</code> | 

**Example**  
```js
const c = new PitchClass('d')
```
<a name="pitchClass"></a>

## pitchClass : <code>String</code>
Returns the pitch class.

**Kind**: global variable  
<a name="classSet"></a>

## classSet : <code>String</code>
Get the set of the pitch class - sharp or flat.

**Kind**: global variable  
<a name="classIndex"></a>

## classIndex : <code>Number</code>
Get the index of the pitch class out of the 12 classes (C, Db, etc...).

**Kind**: global variable  
<a name="raw"></a>

## raw ⇒ <code>String</code>
Returns the pitch class as a string.

**Kind**: global variable  
<a name="isFlat"></a>

## isFlat(pitchClass) ⇒ <code>boolean</code>
Returns true if pitch class has a flat in it, else false.

**Kind**: global function  

| Param |
| --- |
| pitchClass | 

<a name="isSharp"></a>

## isSharp(pitchClass) ⇒ <code>boolean</code>
Returns true if pitch class has a sharp in it, else false.

**Kind**: global function  

| Param |
| --- |
| pitchClass | 

<a name="isPitchClass"></a>

## isPitchClass(obj) ⇒ <code>boolean</code>
Returns true if obj is an instance of PitchClass, else false.

**Kind**: global function  

| Param |
| --- |
| obj | 

<a name="interval"></a>

## interval(interval) ⇒ [<code>PitchClass</code>](#PitchClass)
Returns the pure pitch class at interval as a new instance.

**Kind**: global function  
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
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Returns string of the pitch class.

**Kind**: global function  
