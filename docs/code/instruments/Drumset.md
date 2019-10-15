---
title: Drumset
---

# Drumset

## Classes

<dl>
<dt><a href="#Drumset">Drumset</a> ⇐ <code>Instrument</code></dt>
<dd><p>Drumset for playing files which aren&#39;t represented as notes.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#generatePath">generatePath()</a></dt>
<dd></dd>
<dt><a href="#getPlayer">getPlayer(fileName)</a> ⇒ <code>Tone.Player</code></dt>
<dd><p>Get a note&#39;s Player.</p>
</dd>
<dt><a href="#loadFile">loadFile(rawNote, [source])</a> ⇒ <code>boolean</code></dt>
<dd><p>Load audio file specifically for the drumset, which means it doesn&#39;t have to be a note.</p>
</dd>
<dt><a href="#play">play(fileName)</a></dt>
<dd><p>Plays audio by name.</p>
</dd>
<dt><a href="#toString">toString()</a></dt>
<dd></dd>
</dl>

<a name="Drumset"></a>

## Drumset ⇐ <code>Instrument</code>
Drumset for playing files which aren't represented as notes.

**Kind**: global class  
**Extends**: <code>Instrument</code>  
<a name="generatePath"></a>

## generatePath()
**Kind**: global function  
<a name="getPlayer"></a>

## getPlayer(fileName) ⇒ <code>Tone.Player</code>
Get a note's Player.

**Kind**: global function  

| Param |
| --- |
| fileName | 

<a name="loadFile"></a>

## loadFile(rawNote, [source]) ⇒ <code>boolean</code>
Load audio file specifically for the drumset, which means it doesn't have to be a note.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rawNote | <code>string</code> |  | The note to load the file for. |
| [source] | <code>string</code> \| <code>AudioBuffer</code> | <code>null</code> | Optional: If the url is not in a path that follows the conventions     created, the api expects you can simply pass the a AudioBuffer or url for each file after generating them on     your own. |

<a name="play"></a>

## play(fileName)
Plays audio by name.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fileName | <code>string</code> | 

<a name="toString"></a>

## toString()
**Kind**: global function  
