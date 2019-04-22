---
title: Guitar
---

# Guitar

<a name="Guitar"></a>

## Guitar
Represents a guitar which can play notes, individually or strum them together
using different input methods.

**Kind**: global class  

* [Guitar](#Guitar)
    * [.playString(string, note, duration)](#Guitar+playString)
    * [.play(stringsAndNotes, duration)](#Guitar+play)
    * [.syncAndPlay(note, duration)](#Guitar+syncAndPlay)
    * [.strum(pattern, duration)](#Guitar+strum)

<a name="Guitar+playString"></a>

### guitar.playString(string, note, duration)
Plays a single note on a specific string for some duration.

**Kind**: instance method of [<code>Guitar</code>](#Guitar)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String to play. |
| note | <code>string</code> | Note to play. |
| duration | <code>string</code> | duration to play the note for. |

<a name="Guitar+play"></a>

### guitar.play(stringsAndNotes, duration)
**Kind**: instance method of [<code>Guitar</code>](#Guitar)  

| Param | Type | Description |
| --- | --- | --- |
| stringsAndNotes | <code>Object</code> | Object which contains string and notes to play. |
| duration |  | Duration to play for. |

**Example**  
```js
const stringsAndNotes = {1: 'E4', 2: 'C4'}
guitarInstance.play(stringsAndNotes, '4n')   //notes are played.
```
<a name="Guitar+syncAndPlay"></a>

### guitar.syncAndPlay(note, duration)
Syncs a note to the transport with a duration.

**Kind**: instance method of [<code>Guitar</code>](#Guitar)  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> |  |
| duration | <code>string</code> | duration to play the note for. |

<a name="Guitar+strum"></a>

### guitar.strum(pattern, duration)
Strums the guitar's strings using guitar pattern(low to high).

**Kind**: instance method of [<code>Guitar</code>](#Guitar)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | pattern to strum |
| duration | <code>string</code> | duration to play the note for. |

**Example**  
```js
guitarInstance.strum('x02210', '8n') //Plays Am chord.
guitarInstance.strum('320033', '8n') //Plays G chord.
```
