---
title: ScorePlayer
---

# ScorePlayer

## Classes

<dl>
<dt><a href="#Transport">Transport</a></dt>
<dd><p>Represents a driver that can play a score.
Best practice is to create one driver that will be used to play everything inside the app/website.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#state">state</a> ⇒ <code>Tone.State</code></dt>
<dd><p>Returns the current state of the transport.</p>
</dd>
<dt><a href="#position">position</a> ⇒ <code>Ticks</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setScore">setScore(score, [updateTransport])</a> ⇒ <code>this</code></dt>
<dd><p>Set the score the driver will play.</p>
</dd>
<dt><a href="#setInstruments">setInstruments(Instruments)</a> ⇒ <code>this</code></dt>
<dd><p>Set the instruments the driver will play with.</p>
</dd>
<dt><a href="#addInstrument">addInstrument(instrument)</a></dt>
<dd><p>Adds an instrument to the score.</p>
</dd>
<dt><a href="#scheduleVoices">scheduleVoices()</a></dt>
<dd><p>Schedules all the voices of the score to the transport.</p>
</dd>
<dt><a href="#scheduleMeasures">scheduleMeasures(voiceIndex)</a></dt>
<dd><p>Schedules all the measures of a voice from the score to the transport.</p>
</dd>
<dt><a href="#scheduleNotes">scheduleNotes(measureIndex, voiceIndex)</a></dt>
<dd><p>Schedules the notes of a measure to the transport.</p>
</dd>
<dt><a href="#toggle">toggle([startTime])</a></dt>
<dd><p>Toggles the state of the transport.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Clear the transport from everything that was scheduled.</p>
</dd>
</dl>

<a name="Transport"></a>

## Transport
Represents a driver that can play a score.
Best practice is to create one driver that will be used to play everything inside the app/website.

**Kind**: global class  
<a name="state"></a>

## state ⇒ <code>Tone.State</code>
Returns the current state of the transport.

**Kind**: global variable  
<a name="position"></a>

## position ⇒ <code>Ticks</code>
**Kind**: global variable  
<a name="setScore"></a>

## setScore(score, [updateTransport]) ⇒ <code>this</code>
Set the score the driver will play.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| score | <code>Score</code> | <code></code> | A score containing voices. |
| [updateTransport] | <code>boolean</code> | <code>true</code> | Whether to update the transport's time signature and bpm values based on     the score. |

<a name="setInstruments"></a>

## setInstruments(Instruments) ⇒ <code>this</code>
Set the instruments the driver will play with.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| Instruments | <code>Array</code> | An array of instrument instances which will be used to play the voices. |

<a name="addInstrument"></a>

## addInstrument(instrument)
Adds an instrument to the score.

**Kind**: global function  

| Param |
| --- |
| instrument | 

<a name="scheduleVoices"></a>

## scheduleVoices()
Schedules all the voices of the score to the transport.

**Kind**: global function  
<a name="scheduleMeasures"></a>

## scheduleMeasures(voiceIndex)
Schedules all the measures of a voice from the score to the transport.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| voiceIndex | <code>number</code> | Index of the voice in the score to schedule. |

<a name="scheduleNotes"></a>

## scheduleNotes(measureIndex, voiceIndex)
Schedules the notes of a measure to the transport.

**Kind**: global function  

| Param | Type |
| --- | --- |
| measureIndex | <code>number</code> | 
| voiceIndex | <code>number</code> | 

<a name="toggle"></a>

## toggle([startTime])
Toggles the state of the transport.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startTime] | <code>number</code> | <code>0</code> | Time to start the score. |

<a name="clear"></a>

## clear()
Clear the transport from everything that was scheduled.

**Kind**: global function  
