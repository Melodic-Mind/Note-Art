---
title: MusicalPattern
---

# MusicalPattern

## Classes

<dl>
<dt><a href="#MusicalPattern">MusicalPattern</a></dt>
<dd><p>Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#pitchClasses">pitchClasses</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of the pitch classes.</p>
</dd>
<dt><a href="#root">root</a> ⇒ <code>*</code></dt>
<dd><p>Returns the root pitch class.</p>
</dd>
<dt><a href="#info">info</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the information object the pattern was created with.</p>
</dd>
<dt><a href="#pattern">pattern</a> ⇒ <code>Array</code></dt>
<dd><p>Returns the pattern it self.</p>
</dd>
<dt><a href="#raw">raw</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of the raw pitch classes.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Returns a string of the musical pattern&#39;s pitch classes.</p>
</dd>
<dt><a href="#transpose">transpose(interval)</a> ⇒ <code><a href="#MusicalPattern">MusicalPattern</a></code></dt>
<dd><p>Generates a new chord with the interval applied</p>
</dd>
</dl>

<a name="MusicalPattern"></a>

## MusicalPattern
Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.

**Kind**: global class  
<a name="new_MusicalPattern_new"></a>

### new MusicalPattern(pitchClass, pattern, [info])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitchClass | <code>PitchClass</code> |  | The pitch class to create the pattern from. |
| pattern | <code>Array</code> |  | The pattern to use. |
| [info] | <code>Object</code> | <code>{}</code> | Any additional information to save about the pattern. |

<a name="pitchClasses"></a>

## pitchClasses ⇒ <code>Array</code>
Returns an array of the pitch classes.

**Kind**: global variable  
<a name="root"></a>

## root ⇒ <code>\*</code>
Returns the root pitch class.

**Kind**: global variable  
<a name="info"></a>

## info ⇒ <code>Object</code>
Returns the information object the pattern was created with.

**Kind**: global variable  
<a name="pattern"></a>

## pattern ⇒ <code>Array</code>
Returns the pattern it self.

**Kind**: global variable  
<a name="raw"></a>

## raw ⇒ <code>Array</code>
Returns an array of the raw pitch classes.

**Kind**: global variable  
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Returns a string of the musical pattern's pitch classes.

**Kind**: global function  
<a name="transpose"></a>

## transpose(interval) ⇒ [<code>MusicalPattern</code>](#MusicalPattern)
Generates a new chord with the interval applied

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>Number</code> | the interval to apply |

