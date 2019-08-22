---
title: Instrument
---

# Instrument

## Classes

<dl>
<dt><a href="#Instrument">Instrument</a></dt>
<dd><p>Represents an abstract instrument with notes.</p>
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
Can be easily over-riden for a specific intrument by using the lib to set the instruments name.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getTonePlayers">getTonePlayers()</a> ⇒ <code>Tone.Players</code></dt>
<dd></dd>
<dt><a href="#toMaster">toMaster(context)</a></dt>
<dd><p>Connects audio node to master.</p>
</dd>
<dt><a href="#init">init(base, range)</a></dt>
<dd><p>Should be called from any child class&#39;s constructor.
Initializes all the notes and audio players for the instrument.</p>
</dd>
<dt><a href="#getKey">getKey(note)</a></dt>
<dd><p>Calculates a specific note&#39;s key.</p>
</dd>
<dt><a href="#normalizeNoteStr">normalizeNoteStr(noteStr)</a> ⇒ <code>String</code></dt>
<dd><p>Turns a string representing a note to upper case.</p>
</dd>
<dt><a href="#generatePath">generatePath(fileName)</a></dt>
<dd><p>Generates player for some audio.</p>
</dd>
<dt><a href="#setPlayer">setPlayer(key, note)</a></dt>
<dd><p>Add a player for a note.</p>
</dd>
<dt><a href="#getPlayer">getPlayer(note)</a> ⇒ <code>Tone.Player</code></dt>
<dd><p>Get a note&#39;s player.</p>
</dd>
<dt><a href="#note">note(note)</a> ⇒ <code>Note</code></dt>
<dd><p>Gets a string consisting of:</p>
<ol>
<li>The pitch CLASS</li>
<li>The octave</li>
</ol>
</dd>
<dt><a href="#hasNote">hasNote(note)</a> ⇒ <code>boolean</code></dt>
<dd><p>Whether an instrument has a note.</p>
</dd>
<dt><a href="#play">play(note, [duration])</a></dt>
<dd><p>Play sound, optionally for a duration.</p>
</dd>
</dl>

<a name="Instrument"></a>

## *Instrument*
Represents an abstract instrument with notes.

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
Can be easily over-riden for a specific intrument by using the lib to set the instruments name.

**Kind**: global variable  
**Example**  
```js
lib.set('Piano', () => {return 'MyUltimatePiano'}) // Piano will now load audio files from the
    server/MyUltimatePiano
```
<a name="getTonePlayers"></a>

## getTonePlayers() ⇒ <code>Tone.Players</code>
**Kind**: global function  
<a name="toMaster"></a>

## toMaster(context)
Connects audio node to master.

**Kind**: global function  

| Param | Description |
| --- | --- |
| context | File context instance. |

<a name="init"></a>

## init(base, range)
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

<a name="normalizeNoteStr"></a>

## normalizeNoteStr(noteStr) ⇒ <code>String</code>
Turns a string representing a note to upper case.

**Kind**: global function  

| Param |
| --- |
| noteStr | 

<a name="generatePath"></a>

## generatePath(fileName)
Generates player for some audio.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fileName | <code>String</code> | 

<a name="setPlayer"></a>

## setPlayer(key, note)
Add a player for a note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| key |  | 
| note | <code>Note</code> | 

<a name="getPlayer"></a>

## getPlayer(note) ⇒ <code>Tone.Player</code>
Get a note's player.

**Kind**: global function  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

<a name="note"></a>

## note(note) ⇒ <code>Note</code>
Gets a string consisting of:
1. The pitch CLASS
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

<a name="play"></a>

## play(note, [duration])
Play sound, optionally for a duration.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| note | <code>string</code> |  | 
| [duration] | <code>string</code> | <code>&quot;&#x27;10&#x27;&quot;</code> | 

