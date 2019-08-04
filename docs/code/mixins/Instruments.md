---
title: Instruments
---

# Instruments

## Mixins

<dl>
<dt><a href="#playMelodically">playMelodically</a></dt>
<dd><p>Play a group of notes melodically.
If resolve is true the melody will resolve to the tonic in higher octave.</p>
</dd>
<dt><a href="#playNotes">playNotes</a></dt>
<dd><p>Play a group of notes Harmonically.</p>
</dd>
</dl>

<a name="playMelodically"></a>

## playMelodically
Play a group of notes melodically.
If resolve is true the melody will resolve to the tonic in higher octave.

**Kind**: global mixin  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array</code> |  | array of playable notes |
| timeInterval | <code>Number</code> |  | interval between each note in milli-seconds. |
| [resolve] | <code>boolean</code> | <code>false</code> | whether to resolve to tonic |

<a name="playNotes"></a>

## playNotes
Play a group of notes Harmonically.

**Kind**: global mixin  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | array of playable notes |
| duration | <code>string</code> | duration to play the notes for, e.g 4n. |

