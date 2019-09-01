---
title: Guitar
---

# Guitar

## Classes

<dl>
<dt><a href="#Guitar">Guitar</a></dt>
<dd><p>Represents a guitar which can play notes, individually or strum them together
using different input methods.
This guitar uses all the audio files from the note-art server,
if you wish to create a different guitar you can do so easily by using the template below
with your number of strings, their ranges, etc.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#playString">playString(string, note, duration)</a></dt>
<dd><p>Plays a single note on a specific string for some duration.</p>
</dd>
<dt><a href="#playMultiple">playMultiple(stringsAndNotes, duration)</a></dt>
<dd></dd>
<dt><a href="#play">play(note, duration)</a></dt>
<dd><p>Syncs a note to the transport with a duration.</p>
</dd>
<dt><a href="#strum">strum(pattern, duration)</a></dt>
<dd><p>Strums the guitar&#39;s strings using guitar pattern(low to high).</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Returns the name of the instrument.</p>
</dd>
</dl>

<a name="Guitar"></a>

## Guitar
Represents a guitar which can play notes, individually or strum them together
using different input methods.
This guitar uses all the audio files from the note-art server,
if you wish to create a different guitar you can do so easily by using the template below
with your number of strings, their ranges, etc.

**Kind**: global class  
<a name="playString"></a>

## playString(string, note, duration)
Plays a single note on a specific string for some duration.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String to play. |
| note | <code>string</code> | Note to play. |
| duration | <code>string</code> | duration to play the note for. |

<a name="playMultiple"></a>

## playMultiple(stringsAndNotes, duration)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stringsAndNotes | <code>Object</code> | Object which contains string and notes to play. |
| duration |  | Duration to play for. |

**Example**  
```js
const stringsAndNotes = {1: 'E4', 2: 'C4'}
guitarInstance.play(stringsAndNotes, '4n')   //notes are played.
```
<a name="play"></a>

## play(note, duration)
Syncs a note to the transport with a duration.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>string</code> |  |  |
| duration | <code>string</code> | <code>&quot;100&quot;</code> | duration to play the note for. |

<a name="strum"></a>

## strum(pattern, duration)
Strums the guitar's strings using guitar pattern(low to high).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>Array</code> | pattern to strum |
| duration | <code>string</code> | duration to play the note for. |

**Example**  
```js
guitarInstance.strum(['x', 0, 2, 2, 1, 0], '8n') //Plays Am chord.
guitarInstance.strum([3, 2, 0, 0, 3, 3], '8n') //Plays G chord.
```
<a name="toString"></a>

## toString() ⇒ <code>string</code>
Returns the name of the instrument.

**Kind**: global function  
