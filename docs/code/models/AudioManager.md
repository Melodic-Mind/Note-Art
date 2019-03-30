---
title: AudioManager
---

# AudioManager

<a name="AudioManager"></a>

## AudioManager
A singleton class which handles all file requests,
uses <a href="https://tonejs.github.io/">ToneJS</a> as the audio library.

**Kind**: global class  

* [AudioManager](#AudioManager)
    * [new exports.AudioManager()](#new_AudioManager_new)
    * _instance_
        * [.setNote(pn)](#AudioManager+setNote)
        * [.getPlayer(playableNote)](#AudioManager+getPlayer) ⇒ <code>Tone.Player</code>
        * [.setSound(fliepath, key)](#AudioManager+setSound)
        * [.playSound(key)](#AudioManager+playSound)
    * _static_
        * [.normalizeSet(pitchClass, classSet)](#AudioManager.normalizeSet) ⇒ <code>String</code>
        * [.getKey(note)](#AudioManager.getKey)

<a name="new_AudioManager_new"></a>

### new exports.AudioManager()
Should never be called

<a name="AudioManager+setNote"></a>

### audioManager.setNote(pn)
Add a note to the map.

**Kind**: instance method of [<code>AudioManager</code>](#AudioManager)  

| Param | Type |
| --- | --- |
| pn | <code>PlayableNote</code> | 

<a name="AudioManager+getPlayer"></a>

### audioManager.getPlayer(playableNote) ⇒ <code>Tone.Player</code>
Get a note's Player.

**Kind**: instance method of [<code>AudioManager</code>](#AudioManager)  

| Param | Type |
| --- | --- |
| playableNote | <code>PlayableNote</code> | 

<a name="AudioManager+setSound"></a>

### audioManager.setSound(fliepath, key)
Create a player for some sound.

**Kind**: instance method of [<code>AudioManager</code>](#AudioManager)  

| Param |
| --- |
| fliepath | 
| key | 

<a name="AudioManager+playSound"></a>

### audioManager.playSound(key)
Play sound by player key.

**Kind**: instance method of [<code>AudioManager</code>](#AudioManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Player key. |

<a name="AudioManager.normalizeSet"></a>

### AudioManager.normalizeSet(pitchClass, classSet) ⇒ <code>String</code>
Trnasforms notes of type '#' to 'b' in order to access the file's name.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  

| Param |
| --- |
| pitchClass | 
| classSet | 

<a name="AudioManager.getKey"></a>

### AudioManager.getKey(note)
Calculates a specific note's key.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  

| Param | Type |
| --- | --- |
| note | <code>PlayableNote</code> | 

