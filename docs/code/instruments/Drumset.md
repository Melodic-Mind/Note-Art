---
title: Drumset
---

# Drumset

<a name="Drumset"></a>

## Drumset ⇐ <code>Instrument</code>
Can play drum sounds, has clap, hihat-closed, hihat-open, kick, snare, tom-high, tom-low, tom-mid.

**Kind**: global class  
**Extends**: <code>Instrument</code>  

* [Drumset](#Drumset) ⇐ <code>Instrument</code>
    * [.init()](#Drumset+init)
    * [.generatePath()](#Drumset+generatePath)
    * [.getPlayer(fileName)](#Drumset+getPlayer) ⇒ <code>Tone.Player</code>
    * [.play(fileName)](#Drumset+play)
    * [.syncAndPlay(fileName)](#Drumset+syncAndPlay)

<a name="Drumset+init"></a>

### drumset.init()
**Kind**: instance method of [<code>Drumset</code>](#Drumset)  
<a name="Drumset+generatePath"></a>

### drumset.generatePath()
**Kind**: instance method of [<code>Drumset</code>](#Drumset)  
<a name="Drumset+getPlayer"></a>

### drumset.getPlayer(fileName) ⇒ <code>Tone.Player</code>
Get a note's Player.

**Kind**: instance method of [<code>Drumset</code>](#Drumset)  

| Param |
| --- |
| fileName | 

<a name="Drumset+play"></a>

### drumset.play(fileName)
Plays audio by name.

**Kind**: instance method of [<code>Drumset</code>](#Drumset)  

| Param | Type |
| --- | --- |
| fileName | <code>string</code> | 

<a name="Drumset+syncAndPlay"></a>

### drumset.syncAndPlay(fileName)
Syncs a sound to the transport and plays it.

**Kind**: instance method of [<code>Drumset</code>](#Drumset)  

| Param | Type |
| --- | --- |
| fileName | <code>string</code> | 

