---
title: Score
---

# Score

## Classes

<dl>
<dt><a href="#Score">Score</a></dt>
<dd><p>Represents a full musical score consisting of a number of voices.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#duration">duration</a> ⇒ <code>string</code></dt>
<dd><p>Returns the duration the score will use when adding a new member to a measure.</p>
</dd>
<dt><a href="#duration">duration</a></dt>
<dd><p>Sets the duration for the score&#39;s current measure next data input.</p>
</dd>
<dt><a href="#name">name</a> ⇒ <code>string</code></dt>
<dd><p>Returns the score name.</p>
</dd>
<dt><a href="#name">name</a></dt>
<dd><p>Set the score&#39;s name.</p>
</dd>
<dt><a href="#bpm">bpm</a> ⇒ <code>number</code></dt>
<dd><p>Get the score&#39;s BPM value.</p>
</dd>
<dt><a href="#bpm">bpm</a></dt>
<dd><p>Set the score&#39;s BPM value.</p>
</dd>
<dt><a href="#voices">voices</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an object with the scores voices.</p>
</dd>
<dt><a href="#length">length</a> ⇒ <code>0</code> | <code>string</code></dt>
<dd><p>Returns the length of the score as the length if it&#39;s longest voice.
The format is &#39;MM:QQ:SS&#39; - Measures:Quarter-notes:Sixteenth-notes</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getMeasureSize">getMeasureSize(timeSignature)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the maximum size a measure has, calculated using the time signature.</p>
</dd>
<dt><a href="#setTimeSignature">setTimeSignature(timeSignature)</a></dt>
<dd><p>Set the score&#39;s time signature.</p>
</dd>
<dt><a href="#setMeasureDuration">setMeasureDuration(voiceName, measureIndex)</a></dt>
<dd><p>Sets the duration for a measure.</p>
</dd>
<dt><a href="#getVoice">getVoice(name)</a> ⇒ <code>Array</code> | <code>undefined</code></dt>
<dd><p>Returns the voice with name.
If the voice doesn&#39;t exist it throws an error.</p>
</dd>
<dt><a href="#addVoice">addVoice(voiceName, data)</a></dt>
<dd><p>Adds a voice to the score.</p>
</dd>
<dt><a href="#deleteVoice">deleteVoice(voiceName)</a> ⇒ <code>boolean</code></dt>
<dd><p>Deletes a voice from the score.</p>
</dd>
<dt><a href="#getMeasure">getMeasure(voiceName, measureIndex)</a></dt>
<dd><p>Returns a measure from a voice</p>
</dd>
<dt><a href="#addMeasure">addMeasure(voiceName, data)</a></dt>
<dd><p>Add measure to a voice at an index.
If no data object is sent it simply adds an empty measure to the end of the voice.</p>
</dd>
<dt><a href="#addNote">addNote(voiceName, measureIndex, position, data)</a> ⇒ <code>boolean</code></dt>
<dd><p>Add note to measure.</p>
</dd>
<dt><a href="#addNotes">addNotes(voiceName, measureIndex, position, data)</a> ⇒ <code>boolean</code></dt>
<dd><p>Add notes to measure.</p>
</dd>
<dt><a href="#addChord">addChord(voiceName, measureIndex, position, data)</a> ⇒ <code>boolean</code></dt>
<dd><p>Add chord to measure.</p>
</dd>
<dt><a href="#deleteNote">deleteNote(voiceName, measureIndex, position, note)</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete note from measure.</p>
</dd>
<dt><a href="#deleteNotes">deleteNotes(voiceName, measureIndex, position, notes)</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete notes from measure.</p>
</dd>
<dt><a href="#deleteMember">deleteMember(voiceName, measureIndex, position)</a> ⇒ <code>*</code> | <code>boolean</code></dt>
<dd><p>Deletes</p>
</dd>
<dt><a href="#clearMeasure">clearMeasure(voiceName, measureIndex)</a> ⇒ <code>boolean</code></dt>
<dd><p>Clears a measure.</p>
</dd>
<dt><a href="#deleteMeasure">deleteMeasure(voiceName, measureIndex)</a> ⇒ <code>boolean</code></dt>
<dd><p>Deletes a measure.</p>
</dd>
<dt><a href="#cloneMeasure">cloneMeasure(voiceName, measureIndex)</a> ⇒ <code>boolean</code></dt>
<dd><p>Clones a measure inside a voice and adds the clone next to the original measure.</p>
</dd>
<dt><a href="#transposeMeasure">transposeMeasure(voiceName, measureIndex, interval)</a> ⇒ <code>boolean</code></dt>
<dd><p>Transpose a measure in one of the voices.</p>
</dd>
<dt><a href="#transpose">transpose(voiceName, interval)</a></dt>
<dd><p>Transposes a voice in the score.</p>
</dd>
</dl>

<a name="Score"></a>

## Score
Represents a full musical score consisting of a number of voices.

**Kind**: global class  
<a name="new_Score_new"></a>

### new Score(voiceNames)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes.bpm | <code>number</code> | <code>100</code> | The bpm for the score. |
| attributes.timeSignature | <code>Array</code> | <code>[4,4</code> | Time signature for the score. |
| attributes.name | <code>string</code> | <code>&quot;my_score&quot;</code> | Name for the score. |
| voiceNames | <code>Array</code> | <code>[</code> | Array with the names of the voices in the score. |

<a name="duration"></a>

## duration ⇒ <code>string</code>
Returns the duration the score will use when adding a new member to a measure.

**Kind**: global variable  
<a name="duration"></a>

## duration
Sets the duration for the score's current measure next data input.

**Kind**: global variable  

| Param | Type |
| --- | --- |
| duration | <code>string</code> | 

<a name="name"></a>

## name ⇒ <code>string</code>
Returns the score name.

**Kind**: global variable  
<a name="name"></a>

## name
Set the score's name.

**Kind**: global variable  
**Throws**:

- InvalidInput


| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="bpm"></a>

## bpm ⇒ <code>number</code>
Get the score's BPM value.

**Kind**: global variable  
<a name="bpm"></a>

## bpm
Set the score's BPM value.

**Kind**: global variable  
**Throws**:

- InvalidInput


| Param |
| --- |
| bpm | 

<a name="voices"></a>

## voices ⇒ <code>Array</code>
Returns an object with the scores voices.

**Kind**: global variable  
<a name="length"></a>

## length ⇒ <code>0</code> \| <code>string</code>
Returns the length of the score as the length if it's longest voice.
The format is 'MM:QQ:SS' - Measures:Quarter-notes:Sixteenth-notes

**Kind**: global variable  
<a name="getMeasureSize"></a>

## getMeasureSize(timeSignature) ⇒ <code>number</code>
Returns the maximum size a measure has, calculated using the time signature.

**Kind**: global function  
**Throws**:

- Error


| Param | Type |
| --- | --- |
| timeSignature | <code>Array</code> | 

<a name="setTimeSignature"></a>

## setTimeSignature(timeSignature)
Set the score's time signature.

**Kind**: global function  

| Param |
| --- |
| timeSignature | 

<a name="setMeasureDuration"></a>

## setMeasureDuration(voiceName, measureIndex)
Sets the duration for a measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice the measure belongs to. |
| measureIndex | <code>number</code> | The measure index to set the duration to. |

<a name="getVoice"></a>

## getVoice(name) ⇒ <code>Array</code> \| <code>undefined</code>
Returns the voice with name.
If the voice doesn't exist it throws an error.

**Kind**: global function  
**Throws**:

- InvalidInput


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The voice name. |

<a name="addVoice"></a>

## addVoice(voiceName, data)
Adds a voice to the score.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice's name. |
| data | <code>data</code> | <code>[</code> | An array of measures. |

<a name="deleteVoice"></a>

## deleteVoice(voiceName) ⇒ <code>boolean</code>
Deletes a voice from the score.

**Kind**: global function  
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The name of the voice to delete. |

<a name="getMeasure"></a>

## getMeasure(voiceName, measureIndex)
Returns a measure from a voice

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The index of the measure. |

<a name="addMeasure"></a>

## addMeasure(voiceName, data)
Add measure to a voice at an index.
If no data object is sent it simply adds an empty measure to the end of the voice.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice name. |
| data | <code>Object</code> |  |  |
| data.measure | <code>Measure</code> | <code>new</code> | Measure() The measure to add. |
| data.index | <code>Number</code> | <code>voice.length</code> | Index to add the measure at. |

<a name="addNote"></a>

## addNote(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add note to measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice name. |
| measureIndex | <code>number</code> |  | The measure's index. |
| position | <code>number</code> |  | Position in the measure. |
| data | <code>Object</code> |  |  |
| data.note | <code>string</code> |  | Raw note. |
| data.duration | <code>string</code> | <code>&quot;measure.duration&quot;</code> | Duration of the note. |

<a name="addNotes"></a>

## addNotes(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add notes to measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice name. |
| measureIndex | <code>number</code> |  | The measure's index. |
| position | <code>number</code> |  | Position in the measure. |
| data | <code>Object</code> |  |  |
| data.notes | <code>Array</code> |  | An array of notes. |
| data.duration | <code>string</code> | <code>&quot;measure.duration&quot;</code> | Duration of the note. |

<a name="addChord"></a>

## addChord(voiceName, measureIndex, position, data) ⇒ <code>boolean</code>
Add chord to measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| voiceName | <code>string</code> |  | The voice name. |
| measureIndex | <code>number</code> |  | The measure's index. |
| position | <code>number</code> |  | Position in the measure. |
| data | <code>Object</code> |  |  |
| data.notes | <code>Array</code> |  | An array of notes. |
| data.duration | <code>string</code> | <code>&quot;measure.duration&quot;</code> | Duration of the note. |
| data.name | [<code>name</code>](#name) |  | Name of the chord. |

<a name="deleteNote"></a>

## deleteNote(voiceName, measureIndex, position, note) ⇒ <code>boolean</code>
Delete note from measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>number</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| note | <code>string</code> | Note to delete. |

<a name="deleteNotes"></a>

## deleteNotes(voiceName, measureIndex, position, notes) ⇒ <code>boolean</code>
Delete notes from measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>number</code> | The voice name. |
| measureIndex | <code>number</code> | The measure's index. |
| position | <code>number</code> | Position in the measure. |
| notes | <code>Array</code> | Array of notes to delete. |

<a name="deleteMember"></a>

## deleteMember(voiceName, measureIndex, position) ⇒ <code>\*</code> \| <code>boolean</code>
Deletes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |
| position | <code>number</code> | Position in the measure. |

<a name="clearMeasure"></a>

## clearMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Clears a measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="deleteMeasure"></a>

## deleteMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Deletes a measure.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="cloneMeasure"></a>

## cloneMeasure(voiceName, measureIndex) ⇒ <code>boolean</code>
Clones a measure inside a voice and adds the clone next to the original measure.

**Kind**: global function  
**Returns**: <code>boolean</code> - `  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |

<a name="transposeMeasure"></a>

## transposeMeasure(voiceName, measureIndex, interval) ⇒ <code>boolean</code>
Transpose a measure in one of the voices.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| measureIndex | <code>number</code> | The measure index. |
| interval | <code>number</code> | The interval to transpose by. |

<a name="transpose"></a>

## transpose(voiceName, interval)
Transposes a voice in the score.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceName | <code>string</code> | The voice name. |
| interval | <code>number</code> | The interval to transpose by. |

