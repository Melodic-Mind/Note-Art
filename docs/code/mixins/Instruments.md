---
title: Instruments
---

# Instruments

<a name="playing"></a>

## playing : <code>Object</code>
**Kind**: global mixin  
<a name="playing.playMelodically"></a>

### playing.playMelodically(notes, timeInterval, [resolve])
Play a group of notes melodically.
If resolve is true the melody will resolve to the tonic in higher octave.

**Kind**: static method of [<code>playing</code>](#playing)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | array of playable notes |
| timeInterval | <code>Number</code> |  | interval between each note in milli-seconds. |
| [resolve] | <code>boolean</code> | <code>false</code> | whether to resolve to tonic |

