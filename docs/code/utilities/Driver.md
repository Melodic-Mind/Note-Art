---
title: Driver
---

# Driver

<a name="Driver"></a>

## Driver
Represents a driver that can play a score.

**Kind**: global class  

* [Driver](#Driver)
    * [new exports.Driver(score, Instruments)](#new_Driver_new)
    * [.state](#Driver+state) ⇒ <code>Tone.State</code>
    * [.position](#Driver+position) ⇒ <code>Ticks</code>
    * [.addInstrument(instrument)](#Driver+addInstrument)
    * [.scheduleVoices()](#Driver+scheduleVoices)
    * [.scheduleMeasures(voiceIndex)](#Driver+scheduleMeasures)
    * [.scheduleNotes(measureIndex, voiceIndex)](#Driver+scheduleNotes)
    * [.toggle([startTime])](#Driver+toggle)
    * [.clear()](#Driver+clear)

<a name="new_Driver_new"></a>

### new exports.Driver(score, Instruments)

| Param | Type | Description |
| --- | --- | --- |
| score | <code>Score</code> | A score containing voices. |
| Instruments | <code>Array</code> | An array of instrument instances which will be used to play the voices. |

<a name="Driver+state"></a>

### driver.state ⇒ <code>Tone.State</code>
Returns the current state of the transport.

**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+position"></a>

### driver.position ⇒ <code>Ticks</code>
**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+addInstrument"></a>

### driver.addInstrument(instrument)
Adds an instrument to the score.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param |
| --- |
| instrument | 

<a name="Driver+scheduleVoices"></a>

### driver.scheduleVoices()
Schedules all the voices of the score to the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+scheduleMeasures"></a>

### driver.scheduleMeasures(voiceIndex)
Schedules all the measures of a voice from the score to the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Description |
| --- | --- | --- |
| voiceIndex | <code>number</code> | Index of the voice in the score to schedule. |

<a name="Driver+scheduleNotes"></a>

### driver.scheduleNotes(measureIndex, voiceIndex)
Schedules the notes of a measure to the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type |
| --- | --- |
| measureIndex | <code>number</code> | 
| voiceIndex | <code>number</code> | 

<a name="Driver+toggle"></a>

### driver.toggle([startTime])
Toggles the state of the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startTime] | <code>number</code> | <code>0</code> | Time to start the score. |

<a name="Driver+clear"></a>

### driver.clear()
Clear the transport from everything that was scheduled.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
