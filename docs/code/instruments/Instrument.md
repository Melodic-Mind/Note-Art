---
title: Instrument
---

# Instrument

## Classes

<dl>
<dt><a href="#Instrument">Instrument</a></dt>
<dd><p>Represents an abstract instrument with notes.
￿Should be used for creating new instruments.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#name">name</a> : <code>string</code></dt>
<dd><p>Returns the instrument&#39;s name.</p>
</dd>
<dt><a href="#server">server</a> ⇒ <code>string</code></dt>
<dd><p>The server to load the audio files for the instrument from,
can be overridden.</p>
</dd>
<dt><a href="#instrumentPath">instrumentPath</a> ⇒ <code>string</code></dt>
<dd><p>Returns string to be used when loading audio files from a specific path.
Can be easily over-ridden for a specific intrument by using the lib to set the instruments name.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getTonePlayers">getTonePlayers()</a> ⇒ <code>Tone.Players</code></dt>
<dd></dd>
<dt><a href="#init">init(base, range)</a> ⇒ <code>this</code></dt>
<dd><p>Should be called from any child class&#39;s constructor.
Initializes all the notes and audio players for the instrument.</p>
</dd>
<dt><a href="#getKey">getKey(note)</a></dt>
<dd><p>Calculates a specific note&#39;s key.</p>
</dd>
<dt><a href="#generatePath">generatePath(fileName)</a></dt>
<dd><p>Generates Tone player for some audio.</p>
</dd>
<dt><a href="#setPlayer">setPlayer(key, source)</a></dt>
<dd><p>Add a player for a note.</p>
</dd>
<dt><a href="#getPlayer">getPlayer(key)</a> ⇒ <code>Tone.Player</code></dt>
<dd><p>Get a note&#39;s player.</p>
</dd>
<dt><a href="#note">note(note)</a> ⇒ <code>Note</code></dt>
<dd><p>Gets a string consisting of:</p>
<ol>
<li>The pitch class</li>
<li>The octave</li>
</ol>
</dd>
<dt><a href="#hasNote">hasNote(note)</a> ⇒ <code>boolean</code></dt>
<dd><p>Whether an instrument has a note.</p>
</dd>
<dt><a href="#notePipeline">notePipeline(rawNote)</a> ⇒ <code>String</code></dt>
<dd><p>Returns the key for a raw note.</p>
</dd>
<dt><a href="#play">play(note, [duration])</a></dt>
<dd><p>Play sound, optionally for a duration.</p>
</dd>
<dt><a href="#loadFile">loadFile(rawNote, [source])</a> ⇒ <code>boolean</code></dt>
<dd><p>Load audio file for the instrument.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>string</code></dt>
<dd><p>Returns the name of the instrument.</p>
</dd>
</dl>

<a name="Instrument"></a>

## *Instrument*
Represents an abstract instrument with notes.
￿Should be used for creating new instruments.

**Kind**: global abstract class  
<a name="name"></a>

## name : <code>string</code>
Returns the instrument's name.

**Kind**: global variable  
<a name="server"></a>

## server ⇒ <code>string</code>
The server to load the audio files for the instrument from,
can be overridden.

**Kind**: global variable  
<a name="instrumentPath"></a>

## instrumentPath ⇒ <code>string</code>
Returns string to be used when loading audio files from a specific path.
Can be easily over-ridden for a specific intrument by using the lib to set the instruments name.

**Kind**: global variable  
**Example**  
```js
lib.set('Piano', () => {return 'MyUltimatePiano'}) // Piano will now load audio files from the
    server/MyUltimatePiano
```
<a name="getTonePlayers"></a>

## getTonePlayers() ⇒ <code>Tone.Players</code>
**Kind**: global function  
<a name="init"></a>

## init(base, range) ⇒ <code>this</code>
Should be called from any child class's constructor.
Initializes all the notes and audio players for the instrument.

**Kind**: global function  

| Param |
| --- |
| base | 
| range | 

<a name="getKey"></a>

## getKey(note)
Calculates a specific note's key.

**Kind**: global function  

| Param | Type |
| --- | --- |
| note | <code>Note</code> | 

<a name="generatePath"></a>

## generatePath(fileName)
Generates Tone player for some audio.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fileName | <code>\*</code> | 

<a name="setPlayer"></a>

## setPlayer(key, source)
Add a player for a note.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key to map the buffer to. |
| source | <code>string</code> \| <code>AudioBuffer</code> | The source for the player, can be url or AudioBuffer. |

<a name="getPlayer"></a>

## getPlayer(key) ⇒ <code>Tone.Player</code>
Get a note's player.

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="note"></a>

## note(note) ⇒ <code>Note</code>
Gets a string consisting of:
1. The pitch class
2. The octave

**Kind**: global function  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

**Example**  
```js
const C = someInstrument.note('c3') // C is now a Note object
console.log(C.interval(2))         // D3
```
<a name="hasNote"></a>

## hasNote(note) ⇒ <code>boolean</code>
Whether an instrument has a note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| note | <code>string</code> | 

<a name="notePipeline"></a>

## notePipeline(rawNote) ⇒ <code>String</code>
Returns the key for a raw note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| rawNote | <code>string</code> | 

<a name="play"></a>

## play(note, [duration])
Play sound, optionally for a duration.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| note | <code>string</code> |  | 
| [duration] | <code>string</code> | <code>&quot;&#x27;3&#x27;&quot;</code> | 

<a name="loadFile"></a>

## loadFile(rawNote, [source]) ⇒ <code>boolean</code>
Load audio file for the instrument.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rawNote | <code>string</code> |  | The note to load the file for. |
| [source] | <code>string</code> \| <code>AudioBuffer</code> | <code>null</code> | Optional: If the url is not in a path that follows the conventions     created, the api expects you can simply pass the a AudioBuffer or url for each file after generating them on     your own. |

<a name="toString"></a>

## toString() ⇒ <code>string</code>
Returns the name of the instrument.

**Kind**: global function  
