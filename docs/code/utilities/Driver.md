---
title: Driver
---

# Driver

<a name="Driver"></a>

## Driver
Represents a driver that can play a piece.

**Kind**: global class  

* [Driver](#Driver)
    * [new exports.Driver(piece, Instruments)](#new_Driver_new)
    * [.state](#Driver+state) ⇒ <code>Tone.State</code>
    * [.beat](#Driver+beat) ⇒ <code>Ticks</code>
    * [.addInstrument(instrument)](#Driver+addInstrument)
    * [.scheduleVoices()](#Driver+scheduleVoices)
    * [.scheduleMeasures(voiceIndex)](#Driver+scheduleMeasures)
    * [.scheduleNotes(measureIndex, voiceIndex)](#Driver+scheduleNotes)
    * [.toggle([startTime])](#Driver+toggle)
    * [.play([startTime])](#Driver+play)

<a name="new_Driver_new"></a>

### new exports.Driver(piece, Instruments)

| Param | Type | Description |
| --- | --- | --- |
| piece | <code>Piece</code> | A piece containing voices. |
| Instruments | <code>Array</code> | An array of instrument instances which will be used to play the voices. |

<a name="Driver+state"></a>

### driver.state ⇒ <code>Tone.State</code>
Returns the current state of the transport.

**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+beat"></a>

### driver.beat ⇒ <code>Ticks</code>
**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+addInstrument"></a>

### driver.addInstrument(instrument)
Adds an instrument to the piece.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param |
| --- |
| instrument | 

<a name="Driver+scheduleVoices"></a>

### driver.scheduleVoices()
Schedules all the voices of the piece to the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+scheduleMeasures"></a>

### driver.scheduleMeasures(voiceIndex)
Schedules all the measures of a voice from the piece to the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Description |
| --- | --- | --- |
| voiceIndex | <code>number</code> | Index of the voice in the piece to schedule. |

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
| [startTime] | <code>number</code> | <code>0</code> | Time to start the piece. |

<a name="Driver+play"></a>

### driver.play([startTime])
Starts the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startTime] | <code>number</code> | <code>0</code> | Time to start the piece. |

