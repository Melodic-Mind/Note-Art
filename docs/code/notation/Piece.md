---
title: Piece
---

# Piece

<a name="Piece"></a>

## Piece
Represents a full musical piece consisting of a number of voices.

**Kind**: global class  

* [Piece](#Piece)
    * [.duration](#Piece+duration) ⇒ <code>string</code>
    * [.duration](#Piece+duration)
    * [.voices](#Piece+voices) ⇒ <code>Array</code>
    * [.setMeasureDuration(measureIndex, [voiceIndex])](#Piece+setMeasureDuration)
    * [.getVoice([index])](#Piece+getVoice) ⇒ <code>false</code> \| <code>Array</code>
    * [.addVoice()](#Piece+addVoice)
    * [.deleteVoice(index)](#Piece+deleteVoice) ⇒ <code>boolean</code> \| <code>Array</code>
    * [.getMeasure(measureIndex, [voiceIndex])](#Piece+getMeasure)
    * [.addMeasure(index, [voiceIndex], [measure])](#Piece+addMeasure)
    * [.addNote(note, [duration], position, measureIndex, [voiceIndex])](#Piece+addNote) ⇒ <code>boolean</code>
    * [.addNotes(notes, [duration], position, measureIndex, [voiceIndex])](#Piece+addNotes) ⇒ <code>boolean</code>
    * [.deleteNote(note, position, measureIndex, [voiceIndex])](#Piece+deleteNote) ⇒ <code>boolean</code>
    * [.deleteNotes(notes, position, measureIndex, [voiceIndex])](#Piece+deleteNotes) ⇒ <code>boolean</code>
    * [.clearMeasure(measureIndex, [voiceIndex])](#Piece+clearMeasure) ⇒ <code>boolean</code>
    * [.deleteMeasure(measureIndex, [voiceIndex])](#Piece+deleteMeasure) ⇒ <code>boolean</code>
    * [.cloneMeasure(measureIndex, [voiceIndex])](#Piece+cloneMeasure) ⇒ <code>boolean</code>
    * [.transpose(interval, voice)](#Piece+transpose)

<a name="Piece+duration"></a>

### piece.duration ⇒ <code>string</code>
Returns the duration the piece will use when adding a new member to a measure.

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+duration"></a>

### piece.duration
Sets the duration for the piece's current measure next data input.

**Kind**: instance property of [<code>Piece</code>](#Piece)  

| Param | Type |
| --- | --- |
| duration | <code>string</code> | 

<a name="Piece+voices"></a>

### piece.voices ⇒ <code>Array</code>
Returns an array of voices where each voice represents an instrument.

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+setMeasureDuration"></a>

### piece.setMeasureDuration(measureIndex, [voiceIndex])
Sets the duration for a measure.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The measure index to set the duration to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The voice the measure belongs to. |

<a name="Piece+getVoice"></a>

### piece.getVoice([index]) ⇒ <code>false</code> \| <code>Array</code>
Returns the voice at the index if it exists, otherwise returns false.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [index] | <code>number</code> | <code>0</code> | The voice index. |

<a name="Piece+addVoice"></a>

### piece.addVoice()
Adds a new voice to the piece, initialized with one empty measure.

**Kind**: instance method of [<code>Piece</code>](#Piece)  
<a name="Piece+deleteVoice"></a>

### piece.deleteVoice(index) ⇒ <code>boolean</code> \| <code>Array</code>
Deletes a voice from the piece.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the voice to delete. |

<a name="Piece+getMeasure"></a>

### piece.getMeasure(measureIndex, [voiceIndex])
Returns a measure from a voice

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice that the measure belongs to. |

<a name="Piece+addMeasure"></a>

### piece.addMeasure(index, [voiceIndex], [measure])
Add measure to a voice at an index.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | Index to add the measure at. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice. |
| [measure] | <code>Measure</code> | <code></code> | Measure to add. |

<a name="Piece+addNote"></a>

### piece.addNote(note, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add a note to a measure in one of the voices.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | Raw note. |
| [duration] | <code>string</code> | <code>&quot;measure.duration&quot;</code> |  |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="Piece+addNotes"></a>

### piece.addNotes(notes, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add notes to a measure in one of the voices.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw note. |
| [duration] | <code>string</code> | <code>&quot;measure.duration&quot;</code> |  |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="Piece+deleteNote"></a>

### piece.deleteNote(note, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete a note from a measure in one of the voices.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | Raw note. |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="Piece+deleteNotes"></a>

### piece.deleteNotes(notes, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete notes from a measure in one of the voices.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw note. |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="Piece+clearMeasure"></a>

### piece.clearMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clears a measure.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clear. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Piece+deleteMeasure"></a>

### piece.deleteMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Deletes a measure.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to delete. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Piece+cloneMeasure"></a>

### piece.cloneMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clones a measure inside a voice and adds the clone next to the original measure.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clone. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Piece+transpose"></a>

### piece.transpose(interval, voice)
Transposes a voice in the piece.

**Kind**: instance method of [<code>Piece</code>](#Piece)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | The interval to transpose by. |
| voice | <code>number</code> | Index of the voice to transpose. |

