---
title: Chord
---

# Chord

<a name="Chord"></a>

## Chord
Represents a musical Chord - a number of pitch classes with a specific
pattern which can be played together to form a harmonic sound.

**Kind**: global class  
<a name="new_Chord_new"></a>

### new exports.Chord([root], [pattern])

| Param | Type | Description |
| --- | --- | --- |
| [root] | <code>PitchClass</code> | chords root note |
| [pattern] | <code>Array</code> | the pattern to build the chord by pitch intervals(e.g [3, 7]) |

**Example**  
```js
const c = new PitchClass('c')
const C_Maj = new Chord(c, [4, 7]) // new C major chord.
```
