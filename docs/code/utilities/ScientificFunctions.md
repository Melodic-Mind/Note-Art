---
title: ScientificFunctions
---

# ScientificFunctions

## Functions

<dl>
<dt><a href="#freqFromPitch">freqFromPitch(note)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).</p>
</dd>
<dt><a href="#freqFromMidi">freqFromMidi(midi)</a> ⇒ <code>number</code></dt>
<dd><p>Turns a midi value to frequency.</p>
</dd>
<dt><a href="#freqToFloatMidi">freqToFloatMidi(frequency)</a> ⇒ <code>number</code></dt>
<dd><p>Turns a frequency value to midi note.</p>
</dd>
<dt><a href="#freqToMidi">freqToMidi(frequency)</a> ⇒ <code>number</code></dt>
<dd><p>Turns frequency value to a ABSOLUTE midi note.</p>
</dd>
<dt><a href="#centsOffFromFreq">centsOffFromFreq(frequency, midi)</a> ⇒ <code>number</code></dt>
<dd><p>Returns how much cents off a frequency is from an absolute note.</p>
</dd>
<dt><a href="#midiToFreq">midiToFreq(realNumber)</a> ⇒ <code>Number</code></dt>
<dd><p>Generate frequency from real number.</p>
</dd>
</dl>

<a name="freqFromPitch"></a>

## freqFromPitch(note) ⇒ <code>Number</code>
Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).

**Kind**: global function  

| Param | Type |
| --- | --- |
| note | <code>String</code> | 

<a name="freqFromMidi"></a>

## freqFromMidi(midi) ⇒ <code>number</code>
Turns a midi value to frequency.

**Kind**: global function  

| Param | Type |
| --- | --- |
| midi | <code>Number</code> | 

<a name="freqToFloatMidi"></a>

## freqToFloatMidi(frequency) ⇒ <code>number</code>
Turns a frequency value to midi note.

**Kind**: global function  

| Param |
| --- |
| frequency | 

<a name="freqToMidi"></a>

## freqToMidi(frequency) ⇒ <code>number</code>
Turns frequency value to a ABSOLUTE midi note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| frequency | <code>Number</code> | 

<a name="centsOffFromFreq"></a>

## centsOffFromFreq(frequency, midi) ⇒ <code>number</code>
Returns how much cents off a frequency is from an absolute note.

**Kind**: global function  

| Param | Type |
| --- | --- |
| frequency | <code>Number</code> | 
| midi | <code>Number</code> | 

<a name="midiToFreq"></a>

## midiToFreq(realNumber) ⇒ <code>Number</code>
Generate frequency from real number.

**Kind**: global function  

| Param |
| --- |
| realNumber | 

