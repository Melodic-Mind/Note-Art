---
title: MusicalPattern
---

# MusicalPattern

<a name="MusicalPattern"></a>

## MusicalPattern
Represents an abstract musical pattern made out of pitch classes with a certain interval relationship.

**Kind**: global class  

* [MusicalPattern](#MusicalPattern)
    * [new MusicalPattern(pitchClass, pattern, [info])](#new_MusicalPattern_new)
    * [.pitchClasses](#MusicalPattern+pitchClasses) ⇒ <code>Array</code>
    * [.root](#MusicalPattern+root) ⇒ <code>\*</code>
    * [.info](#MusicalPattern+info) ⇒ <code>Object</code>
    * [.pattern](#MusicalPattern+pattern) ⇒ <code>Array</code>
    * [.raw](#MusicalPattern+raw) ⇒ <code>Array</code>
    * [.toString()](#MusicalPattern+toString) ⇒ <code>String</code>
    * [.transpose(interval)](#MusicalPattern+transpose) ⇒ [<code>MusicalPattern</code>](#MusicalPattern)

<a name="new_MusicalPattern_new"></a>

### new MusicalPattern(pitchClass, pattern, [info])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitchClass | <code>PitchClass</code> |  | The pitch class to create the pattern from. |
| pattern | <code>Array</code> |  | The pattern to use. |
| [info] | <code>Object</code> | <code>{}</code> | Any additional information to save about the pattern. |

<a name="MusicalPattern+pitchClasses"></a>

### musicalPattern.pitchClasses ⇒ <code>Array</code>
Returns an array of the pitch classes.

**Kind**: instance property of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+root"></a>

### musicalPattern.root ⇒ <code>\*</code>
Returns the root pitch class.

**Kind**: instance property of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+info"></a>

### musicalPattern.info ⇒ <code>Object</code>
Returns the information object the pattern was created with.

**Kind**: instance property of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+pattern"></a>

### musicalPattern.pattern ⇒ <code>Array</code>
Returns the pattern it self.

**Kind**: instance property of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+raw"></a>

### musicalPattern.raw ⇒ <code>Array</code>
Returns an array of the raw pitch classes.

**Kind**: instance property of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+toString"></a>

### musicalPattern.toString() ⇒ <code>String</code>
Returns a string of the musical pattern's pitch classes.

**Kind**: instance method of [<code>MusicalPattern</code>](#MusicalPattern)  
<a name="MusicalPattern+transpose"></a>

### musicalPattern.transpose(interval) ⇒ [<code>MusicalPattern</code>](#MusicalPattern)
Generates a new pattern with the interval applied

**Kind**: instance method of [<code>MusicalPattern</code>](#MusicalPattern)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>Number</code> | the interval to apply |

