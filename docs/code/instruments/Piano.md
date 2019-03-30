---
title: Piano
---

# Piano

<a name="Piano"></a>

## Piano
Piano instance - creates a piano that can play any note from any octave in any duration.

**Kind**: global class  

* [Piano](#Piano)
    * [new exports.Piano()](#new_Piano_new)
    * [.note(note)](#Piano+note) ⇒ <code>PlayableNote</code>

<a name="new_Piano_new"></a>

### new exports.Piano()
initializes the piano object with all piano notes.

<a name="Piano+note"></a>

### piano.note(note) ⇒ <code>PlayableNote</code>
Gets a string consisting of:
1. The note
2. The octave
3. The duration
returns a Note object with the parameters and "Piano" as the instrument

**Kind**: instance method of [<code>Piano</code>](#Piano)  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

**Example**  
```js
const C = piano.note('c34n') // C is now a Note object
C.play()                    // Plays the note
```
