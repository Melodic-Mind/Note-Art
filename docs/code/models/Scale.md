---
title: Scale
---

# Scale

<a name="Scale"></a>

## Scale
Represents a musical scale - a series of pitch classes following a specific pattern from a root(the
    tonic) which forms chords and can be used to compose melodies.

**Kind**: global class  

* [Scale](#Scale)
    * [new exports.Scale(tonic, name, pattern)](#new_Scale_new)
    * [.chords](#Scale+chords) : <code>Array</code>
    * [.seventhChords](#Scale+seventhChords) : <code>Array</code>
    * [.degree(degree)](#Scale+degree) ⇒ <code>PitchClass</code>
    * [.chord(degree, [size])](#Scale+chord) ⇒ <code>\*</code>

<a name="new_Scale_new"></a>

### new exports.Scale(tonic, name, pattern)

| Param | Type |
| --- | --- |
| tonic | <code>String/Note</code> | 
| name |  | 
| pattern | <code>Array</code> | 

**Example**  
```js
const c = new PitchClass('c')
const C_Major_by_pattern = new Scale(c, [0, 2, 4, 5, 7, 9, 11]) // new C major scale.
```
<a name="Scale+chords"></a>

### scale.chords : <code>Array</code>
Returns an array of chords(triads) where each member is the chord at the degree where 0 is the root chord.

**Kind**: instance property of [<code>Scale</code>](#Scale)  
<a name="Scale+seventhChords"></a>

### scale.seventhChords : <code>Array</code>
Returns an array of chords(seventh) where each member is the chord at the degree where 0 is the root chord.

**Kind**: instance property of [<code>Scale</code>](#Scale)  
<a name="Scale+degree"></a>

### scale.degree(degree) ⇒ <code>PitchClass</code>
Returns the degree inside the Scale.
for example - if the Scale is a C Major,
than interval(1) will return D.

**Kind**: instance method of [<code>Scale</code>](#Scale)  

| Param | Type |
| --- | --- |
| degree | <code>Number</code> | 

<a name="Scale+chord"></a>

### scale.chord(degree, [size]) ⇒ <code>\*</code>
Returns the chord at the degree with size.

**Kind**: instance method of [<code>Scale</code>](#Scale)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| degree | <code>number</code> |  | Degree to get chord at. |
| [size] | <code>number</code> | <code>3</code> | Number of pitch classes in the chord. |

