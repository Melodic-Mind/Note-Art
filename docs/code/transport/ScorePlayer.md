---
title: ScorePlayer
---

# ScorePlayer

## Classes

<dl>
<dt><a href="#ScorePlayerjjj">ScorePlayerjjj</a></dt>
<dd><p>Represents a driver that can play a score.
Best practice is to create one driver that will be used to play everything inside the app/website.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#bpm">bpm</a></dt>
<dd><p>Set the bpm value.</p>
</dd>
<dt><a href="#bpm">bpm</a> ⇒ <code>*</code></dt>
<dd><p>Get the current bpm value.</p>
</dd>
<dt><a href="#timeSignature">timeSignature</a></dt>
<dd><p>Set the time signature.</p>
</dd>
<dt><a href="#loopStart">loopStart</a></dt>
<dd><p>Set the loop start time.</p>
</dd>
<dt><a href="#state">state</a> ⇒ <code>Tone.State</code></dt>
<dd><p>Returns the current state of the transport.</p>
</dd>
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
<dt><a href="#startMetronome">startMetronome()</a> ⇒ <code>ScorePlayer</code></dt>
<dd><p>Schedules the metronome to the transport.</p>
</dd>
<dt><a href="#stopMetronome">stopMetronome()</a> ⇒ <code>ScorePlayer</code></dt>
<dd><p>Removes the metronome from the transport.</p>
</dd>
<dt><a href="#toggleMetronome">toggleMetronome()</a> ⇒ <code>ScorePlayer</code></dt>
<dd><p>Toggles the metronome.</p>
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
<dt><a href="#start">start(startTime, delay)</a></dt>
<dd><p>Start playing.</p>
</dd>
<dt><a href="#stop">stop()</a></dt>
<dd><p>Stop playing.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Clear the transport from everything that was scheduled.</p>
</dd>
</dl>

<a name="ScorePlayerjjj"></a>

## ScorePlayerjjj
Represents a driver that can play a score.
Best practice is to create one driver that will be used to play everything inside the app/website.

**Kind**: global class  
<a name="bpm"></a>

## bpm
Set the bpm value.

**Kind**: global variable  

| Param |
| --- |
| value | 

<a name="bpm"></a>

## bpm ⇒ <code>\*</code>
Get the current bpm value.

**Kind**: global variable  
<a name="timeSignature"></a>

## timeSignature
Set the time signature.

**Kind**: global variable  

| Param | Type |
| --- | --- |
| timeSignature | <code>Array</code> | 

<a name="loopStart"></a>

## loopStart
Set the loop start time.

**Kind**: global variable  

| Param |
| --- |
| time | 

<a name="state"></a>

## state ⇒ <code>Tone.State</code>
Returns the current state of the transport.

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

<a name="startMetronome"></a>

## startMetronome() ⇒ <code>ScorePlayer</code>
Schedules the metronome to the transport.

**Kind**: global function  
<a name="stopMetronome"></a>

## stopMetronome() ⇒ <code>ScorePlayer</code>
Removes the metronome from the transport.

**Kind**: global function  
<a name="toggleMetronome"></a>

## toggleMetronome() ⇒ <code>ScorePlayer</code>
Toggles the metronome.

**Kind**: global function  
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

<a name="start"></a>

## start(startTime, delay)
Start playing.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startTime |  | <code>0</code> | Time to start the transport from |
| delay | <code>string</code> | <code>&quot;0.3&quot;</code> | Time to delay the start of the transport for, gives more time to scheduling. |

<a name="stop"></a>

## stop()
Stop playing.

**Kind**: global function  
<a name="clear"></a>

## clear()
Clear the transport from everything that was scheduled.

**Kind**: global function  
