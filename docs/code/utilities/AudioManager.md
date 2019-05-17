---
title: AudioManager
---

# AudioManager

<a name="AudioManager"></a>

## AudioManager
A static class which interacts with the Web Audio API
using <a href="https://tonejs.github.io/">ToneJS</a>.<br>
<b>Should only be called through the 'lib' model</b>.<br>
and the only reasons to call it are when creating a new instrument
or using it to resume the audio context.<br><br>
<b>Calling the Audio Manager using the lib</b>
```
import {lib} from 'note-art'
lib.get('audio-manager').resumeContext()
```

**Kind**: global class  

* [AudioManager](#AudioManager)
    * [.getAudioMap()](#AudioManager.getAudioMap) ⇒ <code>Tone.Players</code>
    * [.resumeContext()](#AudioManager.resumeContext)
    * [.toMaster(context)](#AudioManager.toMaster)

<a name="AudioManager.getAudioMap"></a>

### AudioManager.getAudioMap() ⇒ <code>Tone.Players</code>
**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  
<a name="AudioManager.resumeContext"></a>

### AudioManager.resumeContext()
Resumes audio context.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  
<a name="AudioManager.toMaster"></a>

### AudioManager.toMaster(context)
Connects audio node to master.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  

| Param | Description |
| --- | --- |
| context | File context instance. |

