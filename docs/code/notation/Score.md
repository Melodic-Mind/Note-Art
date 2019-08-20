---
title: Score
---

# Score

<a name="Score"></a>

## Score
Represents a full musical score consisting of a number of voices.

**Kind**: global class  

* [Score](#Score)
    * [new exports.Score()](#new_Score_new)
    * [.duration](#Score+duration) ⇒ <code>string</code>
    * [.duration](#Score+duration)
    * [.name](#Score+name) ⇒ <code>string</code>
    * [.voices](#Score+voices) ⇒ <code>Array</code>
    * [.setMeasureDuration(measureIndex, [voiceIndex])](#Score+setMeasureDuration)
    * [.getVoice([index])](#Score+getVoice) ⇒ <code>false</code> \| <code>Array</code>
    * [.addVoice()](#Score+addVoice)
    * [.deleteVoice(index)](#Score+deleteVoice) ⇒ <code>boolean</code> \| <code>Array</code>
    * [.getMeasure(measureIndex, [voiceIndex])](#Score+getMeasure)
    * [.addMeasure(index, [voiceIndex], [measure])](#Score+addMeasure)
    * [.addNote(note, [duration], position, measureIndex, [voiceIndex])](#Score+addNote) ⇒ <code>boolean</code>
    * [.addNotes(notes, [duration], position, measureIndex, [voiceIndex])](#Score+addNotes) ⇒ <code>boolean</code>
    * [.deleteNote(note, position, measureIndex, [voiceIndex])](#Score+deleteNote) ⇒ <code>boolean</code>
    * [.deleteNotes(notes, position, measureIndex, [voiceIndex])](#Score+deleteNotes) ⇒ <code>boolean</code>
    * [.clearMeasure(measureIndex, [voiceIndex])](#Score+clearMeasure) ⇒ <code>boolean</code>
    * [.deleteMeasure(measureIndex, [voiceIndex])](#Score+deleteMeasure) ⇒ <code>boolean</code>
    * [.cloneMeasure(measureIndex, [voiceIndex])](#Score+cloneMeasure) ⇒ <code>boolean</code>
    * [.transpose(interval, voice)](#Score+transpose)

<a name="new_Score_new"></a>

### new exports.Score()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [attributes.bpm] | <code>number</code> | <code>100</code> | The bpm for the score. |
| [attributes.timeSignature] | <code>Array</code> | <code>[4,4]</code> | Time signature for the score. |
| [attributes.name] | <code>string</code> | <code>&quot;my_score&quot;</code> | Name for the score. |

<a name="Score+duration"></a>

### score.duration ⇒ <code>string</code>
Returns the duration the score will use when adding a new member to a measure.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+duration"></a>

### score.duration
Sets the duration for the score's current measure next data input.

**Kind**: instance property of [<code>Score</code>](#Score)  

| Param | Type |
| --- | --- |
| duration | <code>string</code> | 

<a name="Score+name"></a>

### score.name ⇒ <code>string</code>
Returns the score name.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+voices"></a>

### score.voices ⇒ <code>Array</code>
Returns an array of voices where each voice represents an instrument.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+setMeasureDuration"></a>

### score.setMeasureDuration(measureIndex, [voiceIndex])
Sets the duration for a measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The measure index to set the duration to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The voice the measure belongs to. |

<a name="Score+getVoice"></a>

### score.getVoice([index]) ⇒ <code>false</code> \| <code>Array</code>
Returns the voice at the index if it exists, otherwise returns false.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [index] | <code>number</code> | <code>0</code> | The voice index. |

<a name="Score+addVoice"></a>

### score.addVoice()
Adds a new voice to the score, initialized with one empty measure.

**Kind**: instance method of [<code>Score</code>](#Score)  
<a name="Score+deleteVoice"></a>

### score.deleteVoice(index) ⇒ <code>boolean</code> \| <code>Array</code>
Deletes a voice from the score.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the voice to delete. |

<a name="Score+getMeasure"></a>

### score.getMeasure(measureIndex, [voiceIndex])
Returns a measure from a voice

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice that the measure belongs to. |

<a name="Score+addMeasure"></a>

### score.addMeasure(index, [voiceIndex], [measure])
Add measure to a voice at an index.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | Index to add the measure at. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice. |
| [measure] | <code>Measure</code> | <code></code> | Measure to add. |

<a name="Score+addNote"></a>

### score.addNote(note, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add a note to a measure in one of the voices.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | Raw note. |
| [duration] | <code>string</code> | <code>&quot;measure.duration&quot;</code> |  |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="Score+addNotes"></a>

### score.addNotes(notes, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add notes to a measure in one of the voices.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw note. |
| [duration] | <code>string</code> | <code>&quot;measure.duration&quot;</code> |  |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="Score+deleteNote"></a>

### score.deleteNote(note, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete a note from a measure in one of the voices.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | Raw note. |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="Score+deleteNotes"></a>

### score.deleteNotes(notes, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete notes from a measure in one of the voices.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw note. |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="Score+clearMeasure"></a>

### score.clearMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clears a measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clear. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Score+deleteMeasure"></a>

### score.deleteMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Deletes a measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to delete. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Score+cloneMeasure"></a>

### score.cloneMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clones a measure inside a voice and adds the clone next to the original measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clone. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="Score+transpose"></a>

### score.transpose(interval, voice)
Transposes a voice in the score.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | The interval to transpose by. |
| voice | <code>number</code> | Index of the voice to transpose. |

