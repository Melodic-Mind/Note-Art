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
<dd><p>Returns an array of voices where each voice represents an instrument.</p>
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
<dt><a href="#setMeasureDuration">setMeasureDuration(measureIndex, [voiceIndex])</a></dt>
<dd><p>Sets the duration for a measure.</p>
</dd>
<dt><a href="#getVoice">getVoice([index])</a> ⇒ <code>Array</code> | <code>false</code></dt>
<dd><p>Returns the voice at the index, starts from voice 0.
If the voice doesn&#39;t exist it returns false.</p>
</dd>
<dt><a href="#addVoice">addVoice(position, [voice])</a></dt>
<dd><p>Adds a voice to the score.</p>
</dd>
<dt><a href="#deleteVoice">deleteVoice(index)</a> ⇒ <code>Array</code></dt>
<dd><p>Deletes a voice from the score.</p>
</dd>
<dt><a href="#getMeasure">getMeasure(measureIndex, [voiceIndex])</a></dt>
<dd><p>Returns a measure from a voice</p>
</dd>
<dt><a href="#addMeasure">addMeasure(index, [voiceIndex], [measure])</a></dt>
<dd><p>Add measure to a voice at an index.</p>
</dd>
<dt><a href="#addNote">addNote(position, measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Add a note to a measure in one of the voices.</p>
</dd>
<dt><a href="#addNotes">addNotes(notes, [duration], position, measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Add notes to a measure in one of the voices.</p>
</dd>
<dt><a href="#addChord">addChord(notes, name, [duration], position, measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Add notes to a measure in one of the voices with a name for representing a chord.</p>
</dd>
<dt><a href="#deleteNote">deleteNote(note, position, measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete a note from a measure in one of the voices.</p>
</dd>
<dt><a href="#deleteNotes">deleteNotes(notes, position, measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Delete notes from a measure in one of the voices.</p>
</dd>
<dt><a href="#clearMeasure">clearMeasure(measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Clears a measure.</p>
</dd>
<dt><a href="#deleteMeasure">deleteMeasure(measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Deletes a measure.</p>
</dd>
<dt><a href="#cloneMeasure">cloneMeasure(measureIndex, [voiceIndex])</a> ⇒ <code>boolean</code></dt>
<dd><p>Clones a measure inside a voice and adds the clone next to the original measure.</p>
</dd>
<dt><a href="#transpose">transpose(interval, voice)</a></dt>
<dd><p>Transposes a voice in the score.</p>
</dd>
</dl>

<a name="Score"></a>

## Score
Represents a full musical score consisting of a number of voices.

**Kind**: global class  
<a name="new_Score_new"></a>

### new Score()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [attributes.bpm] | <code>number</code> | <code>100</code> | The bpm for the score. |
| [attributes.timeSignature] | <code>Array</code> | <code>[4,4]</code> | Time signature for the score. |
| [attributes.name] | <code>string</code> | <code>&quot;my_score&quot;</code> | Name for the score. |

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

| Param |
| --- |
| bpm | 

<a name="voices"></a>

## voices ⇒ <code>Array</code>
Returns an array of voices where each voice represents an instrument.

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

## setMeasureDuration(measureIndex, [voiceIndex])
Sets the duration for a measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The measure index to set the duration to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The voice the measure belongs to. |

<a name="getVoice"></a>

## getVoice([index]) ⇒ <code>Array</code> \| <code>false</code>
Returns the voice at the index, starts from voice 0.
If the voice doesn't exist it returns false.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [index] | <code>number</code> | <code>1</code> | The voice index. |

<a name="addVoice"></a>

## addVoice(position, [voice])
Adds a voice to the score.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| position | <code>number</code> |  | Position to add the voice in the score to. |
| [voice] | <code>Array</code> | <code>false</code> | An array of measures, defaults to an array with one empty measure. |

<a name="deleteVoice"></a>

## deleteVoice(index) ⇒ <code>Array</code>
Deletes a voice from the score.

**Kind**: global function  
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the voice to delete. |

<a name="getMeasure"></a>

## getMeasure(measureIndex, [voiceIndex])
Returns a measure from a voice

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice that the measure belongs to. |

<a name="addMeasure"></a>

## addMeasure(index, [voiceIndex], [measure])
Add measure to a voice at an index.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | Index to add the measure at. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice. |
| [measure] | <code>Measure</code> | <code></code> | Measure to add. |

<a name="addNote"></a>

## addNote(position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add a note to a measure in one of the voices.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data.note | <code>string</code> |  | Raw note. |
| [data.duration] | <code>string</code> | <code>&quot;measure.duration&quot;</code> |  |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="addNotes"></a>

## addNotes(notes, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add notes to a measure in one of the voices.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>obj.Array</code> |  | An array of raw note. |
| [duration] | <code>obj.string</code> | <code>measure.duration</code> |  |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="addChord"></a>

## addChord(notes, name, [duration], position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Add notes to a measure in one of the voices with a name for representing a chord.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>obj.Array</code> |  | An array of raw note. |
| name | <code>obj.name</code> |  | Name of the chord. |
| [duration] | <code>obj.string</code> | <code>measure.duration</code> |  |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="deleteNote"></a>

## deleteNote(note, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete a note from a measure in one of the voices.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  | Raw note. |
| position | <code>number</code> |  | Position in the measure to add the note to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the note to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the note to. |

<a name="deleteNotes"></a>

## deleteNotes(notes, position, measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Delete notes from a measure in one of the voices.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | An array of raw note. |
| position | <code>number</code> |  | Position in the measure to add the notes to. |
| measureIndex | <code>number</code> |  | The index of the measure to add the notes to. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice to add the notes to. |

<a name="clearMeasure"></a>

## clearMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clears a measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clear. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="deleteMeasure"></a>

## deleteMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Deletes a measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to delete. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="cloneMeasure"></a>

## cloneMeasure(measureIndex, [voiceIndex]) ⇒ <code>boolean</code>
Clones a measure inside a voice and adds the clone next to the original measure.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| measureIndex | <code>number</code> |  | The index of the measure to clone. |
| [voiceIndex] | <code>number</code> | <code>0</code> | The index of the voice the measure belongs to. |

<a name="transpose"></a>

## transpose(interval, voice)
Transposes a voice in the score.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>number</code> | The interval to transpose by. |
| voice | <code>number</code> | Index of the voice to transpose. |

