---
title: Measure
---

# Measure

<a name="Measure"></a>

## Measure
Represents a single measure as part of a musical piece in musical notation.

**Kind**: global class  

* [Measure](#Measure)
    * [new exports.Measure([maxDuration])](#new_Measure_new)
    * [.noteSets](#Measure+noteSets)
    * [.duration](#Measure+duration)
    * [.duration](#Measure+duration)
    * [.changeSet(set, i)](#Measure+changeSet)
    * [.pushSet(notes)](#Measure+pushSet)
    * [.pushSets(noteSets)](#Measure+pushSets)

<a name="new_Measure_new"></a>

### new exports.Measure([maxDuration])
Creates a Measure instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [maxDuration] | <code>Number</code> | <code>0</code> | Max duration of the measure(decided by time signature) |

<a name="Measure+noteSets"></a>

### measure.noteSets
**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+duration"></a>

### measure.duration
get the duration

**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+duration"></a>

### measure.duration
set the duration

**Kind**: instance property of [<code>Measure</code>](#Measure)  
<a name="Measure+changeSet"></a>

### measure.changeSet(set, i)
Change notes somewhere inside a measure

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| set | <code>Array</code> | The new set. |
| i | <code>Number</code> | The index of the set to replace with. |

<a name="Measure+pushSet"></a>

### measure.pushSet(notes)
Push notes to a measure

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| notes | <code>Array</code> | array of notes |

<a name="Measure+pushSets"></a>

### measure.pushSets(noteSets)
Add sets to the end of the measure

**Kind**: instance method of [<code>Measure</code>](#Measure)  

| Param | Type | Description |
| --- | --- | --- |
| noteSets | <code>Array</code> | array of sets |

