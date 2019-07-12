---
title: Driver
---

# Driver

<a name="Driver"></a>

## Driver
Represents a driver that can play a score.
Uses Tone.Transport, which is a member of the class.
Best practice is to create one driver that will be used to play everything.

**Kind**: global class  

* [Driver](#Driver)
    * [.bpm](#Driver+bpm)
    * [.bpm](#Driver+bpm) ⇒ <code>number</code>
    * [.loopStart](#Driver+loopStart)
    * [.state](#Driver+state) ⇒ <code>String</code>
    * [.position](#Driver+position) ⇒ <code>Ticks</code>
    * [.setScore(score, [updateTransport])](#Driver+setScore) ⇒ <code>this</code>
    * [.setInstruments(Instruments)](#Driver+setInstruments) ⇒ <code>this</code>
    * [.addInstrument(instrument)](#Driver+addInstrument)
    * [.startMetronome()](#Driver+startMetronome) ⇒ <code>this</code>
    * [.stopMetronome()](#Driver+stopMetronome) ⇒ <code>this</code>
    * [.toggleMetronome()](#Driver+toggleMetronome) ⇒ [<code>Driver</code>](#Driver)
    * [.scheduleVoices()](#Driver+scheduleVoices) ⇒ <code>this</code>
    * [.scheduleMeasures(voiceIndex)](#Driver+scheduleMeasures)
    * [.scheduleNotes(measureIndex, voiceIndex)](#Driver+scheduleNotes)
    * [.toggle([startTime])](#Driver+toggle)
    * [.start(startTime)](#Driver+start) ⇒ <code>this</code>
    * [.stop()](#Driver+stop) ⇒ <code>this</code>
    * [.clear()](#Driver+clear) ⇒ <code>this</code>

<a name="Driver+bpm"></a>

### driver.bpm
Set the bpm value of the transport.

**Kind**: instance property of [<code>Driver</code>](#Driver)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="Driver+bpm"></a>

### driver.bpm ⇒ <code>number</code>
Get the bpm value of the transport.

**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+loopStart"></a>

### driver.loopStart
Sets the point in time to start the loop of the transport.

**Kind**: instance property of [<code>Driver</code>](#Driver)  

| Param |
| --- |
| time | 

<a name="Driver+state"></a>

### driver.state ⇒ <code>String</code>
Returns the current state of the transport,
either 'stopped', 'started' or 'paused'.

**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+position"></a>

### driver.position ⇒ <code>Ticks</code>
Returns the position in the transport that is currently being played.

**Kind**: instance property of [<code>Driver</code>](#Driver)  
<a name="Driver+setScore"></a>

### driver.setScore(score, [updateTransport]) ⇒ <code>this</code>
Set the score the driver will play.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| score | <code>Score</code> | <code></code> | A score containing voices. |
| [updateTransport] | <code>boolean</code> | <code>true</code> | Whether to update the transport's time signature and bpm values based on     the score. |

<a name="Driver+setInstruments"></a>

### driver.setInstruments(Instruments) ⇒ <code>this</code>
Set the instruments the driver will play with.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Type | Description |
| --- | --- | --- |
| Instruments | <code>Array</code> | An array of instrument instances which will be used to play the voices. |

<a name="Driver+addInstrument"></a>

### driver.addInstrument(instrument)
Adds an instrument to the score.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param |
| --- |
| instrument | 

<a name="Driver+startMetronome"></a>

### driver.startMetronome() ⇒ <code>this</code>
Schedule metronome and start it.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+stopMetronome"></a>

### driver.stopMetronome() ⇒ <code>this</code>
Stops the metronome and removes it from the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+toggleMetronome"></a>

### driver.toggleMetronome() ⇒ [<code>Driver</code>](#Driver)
Starts the metronome if it's stopped, otherwise stops it.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+scheduleVoices"></a>

### driver.scheduleVoices() ⇒ <code>this</code>
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

<a name="Driver+start"></a>

### driver.start(startTime) ⇒ <code>this</code>
Start the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  

| Param | Default |
| --- | --- |
| startTime | <code>0</code> | 

<a name="Driver+stop"></a>

### driver.stop() ⇒ <code>this</code>
Stops the transport.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
<a name="Driver+clear"></a>

### driver.clear() ⇒ <code>this</code>
Clear the transport from everything that was scheduled.

**Kind**: instance method of [<code>Driver</code>](#Driver)  
