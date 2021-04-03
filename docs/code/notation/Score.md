---
title: Score
---

# Score

<a name="Score"></a>

## Score
Represents a full musical score consisting of a number of voices.

**Kind**: global class  

* [Score](#Score)
    * [new Score(voiceNames)](#new_Score_new)
    * _instance_
        * [.name](#Score+name) ⇒ <code>string</code>
        * [.name](#Score+name)
        * [.bpm](#Score+bpm) ⇒ <code>number</code>
        * [.bpm](#Score+bpm)
        * [.voices](#Score+voices) ⇒ <code>Array</code>
        * [.length](#Score+length) ⇒ <code>string</code>
        * [.setTimeSignature(timeSignature)](#Score+setTimeSignature)
        * [.getVoice(voiceName)](#Score+getVoice) ⇒ <code>Array</code> \| <code>undefined</code>
        * [.addVoice(voiceName, voiceData)](#Score+addVoice)
        * [.deleteVoice(voiceName)](#Score+deleteVoice) ⇒ <code>boolean</code>
        * [.getMeasure(voiceName, measureIndex)](#Score+getMeasure)
        * [.addMeasure(voiceName, data)](#Score+addMeasure)
        * [.addNote(voiceName, measureIndex, position, data)](#Score+addNote) ⇒ <code>boolean</code>
        * [.addNotes(voiceName, measureIndex, position, data)](#Score+addNotes) ⇒ <code>boolean</code>
        * [.addChord(voiceName, measureIndex, position, data)](#Score+addChord) ⇒ <code>boolean</code>
        * [.deleteNote(voiceName, measureIndex, position, note)](#Score+deleteNote) ⇒ <code>boolean</code>
        * [.deleteNotes(voiceName, measureIndex, position, notes)](#Score+deleteNotes) ⇒ <code>boolean</code>
        * [.deleteMember(voiceName, measureIndex, position)](#Score+deleteMember) ⇒ <code>\*</code> \| <code>boolean</code>
        * [.clearMeasure(voiceName, measureIndex)](#Score+clearMeasure) ⇒ <code>boolean</code>
        * [.deleteMeasure(voiceName, measureIndex)](#Score+deleteMeasure) ⇒ <code>boolean</code>
        * [.cloneMeasure(voiceName, measureIndex)](#Score+cloneMeasure) ⇒ <code>boolean</code>
        * [.transposeMeasure(voiceName, measureIndex, interval)](#Score+transposeMeasure) ⇒ <code>boolean</code>
        * [.transpose(voiceName, interval)](#Score+transpose)
    * _static_
        * [.getMeasureSize(timeSignature)](#Score.getMeasureSize) ⇒ <code>number</code>

<a name="new_Score_new"></a>

### new Score(voiceNames)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes.bpm | <code>number</code> | <code>100</code> | The bpm for the score. |
| attributes.timeSignature | <code>Array</code> | <code>[4,4</code> | Time signature for the score. |
| attributes.name | <code>string</code> | <code>&quot;my_score&quot;</code> | Name for the score. |
| voiceNames | <code>Array</code> | <code>[</code> | Array with the names of the voices in the score. |

<a name="Score+name"></a>

### score.name ⇒ <code>string</code>
Returns the score name.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+name"></a>

### score.name
Set the score's name.

**Kind**: instance property of [<code>Score</code>](#Score)  
**Throws**:

- InvalidInput


| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Score+bpm"></a>

### score.bpm ⇒ <code>number</code>
Get the score's BPM value.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+bpm"></a>

### score.bpm
Set the score's BPM value.

**Kind**: instance property of [<code>Score</code>](#Score)  
**Throws**:

- InvalidInput


| Param |
| --- |
| bpm | 

<a name="Score+voices"></a>

### score.voices ⇒ <code>Array</code>
Returns an object with the scores voices.

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+length"></a>

### score.length ⇒ <code>string</code>
Returns the length of the score as the length if it's longest voice.
The format is 'MM:QQ:SS' - Measures:Quarter-notes:Sixteenth-notes

**Kind**: instance property of [<code>Score</code>](#Score)  
<a name="Score+setTimeSignature"></a>

### score.setTimeSignature(timeSignature)
Set the score's time signature.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param |
| --- |
| timeSignature | 

<a name="Score+getVoice"></a>

### score.getVoice(voiceName) ⇒ <code>Array</code> \| <code>undefined</code>
Returns the voice with name.
If the voice doesn't exist it throws an error.

**Kind**: instance method of [<code>Score</code>](#Score)  
**Throws**:

- InvalidInput


| Param |
| --- |
| voiceName | 

<a name="Score+addVoice"></a>

### score.addVoice(voiceName, voiceData)
Adds a voice to the score.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice's name. |
| voiceData | <code>data</code> | <code>[</code> | An array of measures. |

<a name="Score+deleteVoice"></a>

### score.deleteVoice(voiceName) ⇒ <code>boolean</code>
Deletes a voice from the score.

**Kind**: instance method of [<code>Score</code>](#Score)  
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The name of the voice to delete. |

<a name="Score+getMeasure"></a>

### score.getMeasure(voiceName, measureIndex)
Returns a measure from a voice

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The index of the measure. |

<a name="Score+addMeasure"></a>

### score.addMeasure(voiceName, data)
Add measure to a voice at an index.
If no data object is sent it simply adds an empty measure to the end of the voice.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice name. |
| data | <code>Object</code> |  |  |
| data.measure | <code>Measure</code> | <code>new</code> | Measure() The measure to add. |
| data.index | <code>Number</code> | <code>voice.length</code> | Index to add the measure at. |

<a name="Score+addNote"></a>

### score.addNote(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add note to measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| data | <code>Object</code> |  |
| data.note | <code>string</code> | Raw note. |
| data.duration | <code>string</code> | Duration of the note. |

<a name="Score+addNotes"></a>

### score.addNotes(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add notes to measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| data | <code>Object</code> |  |
| data.notes | <code>Array</code> | An array of notes. |
| data.duration | <code>string</code> | Duration of the note. |

<a name="Score+addChord"></a>

### score.addChord(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add chord to measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| data | <code>Object</code> |  |
| data.notes | <code>Array</code> | An array of notes. |
| data.duration | <code>string</code> | Duration of the note. |
| data.name | <code>name</code> | Name of the chord. |

<a name="Score+deleteNote"></a>

### score.deleteNote(voiceName, measureIndex, position, note) ⇒ <code>boolean</code>
Delete note from measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>number</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| note | <code>string</code> | Note to delete. |

<a name="Score+deleteNotes"></a>

### score.deleteNotes(voiceName, measureIndex, position, notes) ⇒ <code>boolean</code>
Delete notes from measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>number</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| notes | <code>Array</code> | Array of notes to delete. |

<a name="Score+deleteMember"></a>

### score.deleteMember(voiceName, measureIndex, position) ⇒ <code>\*</code> \| <code>boolean</code>
Deletes

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |
| position | <code>number</code> | Position in the measure. |

<a name="Score+clearMeasure"></a>

### score.clearMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Clears a measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="Score+deleteMeasure"></a>

### score.deleteMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Deletes a measure.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="Score+cloneMeasure"></a>

### score.cloneMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Clones a measure inside a voice and adds the clone next to the original measure.

**Kind**: instance method of [<code>Score</code>](#Score)  
**Returns**: <code>boolean</code> - `  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="Score+transposeMeasure"></a>

### score.transposeMeasure(voiceName, measureIndex, interval) ⇒ <code>boolean</code>
Transpose a measure in one of the voices.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |
| interval | <code>number</code> | The interval to transpose by. |

<a name="Score+transpose"></a>

### score.transpose(voiceName, interval)
Transposes a voice in the score.

**Kind**: instance method of [<code>Score</code>](#Score)  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| interval | <code>number</code> | The interval to transpose by. |

<a name="Score.getMeasureSize"></a>

### Score.getMeasureSize(timeSignature) ⇒ <code>number</code>
Returns the maximum size a measure has, calculated using the time signature.

**Kind**: static method of [<code>Score</code>](#Score)  
**Throws**:

- Error


| Param | Type |
| --- | --- |
| timeSignature | <code>Array</code> | 

