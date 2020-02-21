---
title: GeneralFunctions
---

# GeneralFunctions

## Functions

<dl>
<dt><a href="#twoDigitFormat">twoDigitFormat(num)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns a number formatted to show only 2 digits after the decimal point.</p>
</dd>
<dt><a href="#switchMembers">switchMembers(arr, i1, i2)</a> ⇒ <code>Array</code></dt>
<dd><p>Gets an array and 2 indexes and returns a new array with those members indexes switched.</p>
</dd>
<dt><a href="#rearrangeArray">rearrangeArray(array, index)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns a new array which starts from index, adds the rest of the members to it&#39;s end.</p>
</dd>
<dt><a href="#mapString">mapString(str, toMap, mapTo)</a> ⇒ <code>string</code></dt>
<dd><p>Map a string substring to a different string.</p>
</dd>
<dt><a href="#occurrencesInString">occurrencesInString(string, subString)</a> ⇒ <code>number</code></dt>
<dd><p>Function that count occurrences of a substring in a string.</p>
</dd>
<dt><a href="#fitArrayToSize">fitArrayToSize(arr, size)</a> ⇒ <code>Array</code></dt>
<dd><p>Fills an array with it&#39;s own elements to fit a certain size.</p>
</dd>
<dt><a href="#longestArray">longestArray(matrix)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns the longest array from an array of arrays.</p>
</dd>
</dl>

<a name="twoDigitFormat"></a>

## twoDigitFormat(num) ⇒ <code>Number</code>
Returns a number formatted to show only 2 digits after the decimal point.

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="switchMembers"></a>

## switchMembers(arr, i1, i2) ⇒ <code>Array</code>
Gets an array and 2 indexes and returns a new array with those members indexes switched.

**Kind**: global function  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> | 
| i1 | <code>number</code> | 
| i2 | <code>number</code> | 

<a name="rearrangeArray"></a>

## rearrangeArray(array, index) ⇒ <code>Array</code>
Returns a new array which starts from index, adds the rest of the members to it's end.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array to rearrange. |
| index | <code>number</code> | to arrange from. |

<a name="mapString"></a>

## mapString(str, toMap, mapTo) ⇒ <code>string</code>
Map a string substring to a different string.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to reduce. |
| toMap | <code>string</code> | Substring to reduce. |
| mapTo | <code>string</code> | String to reduce to. |

<a name="occurrencesInString"></a>

## occurrencesInString(string, subString) ⇒ <code>number</code>
Function that count occurrences of a substring in a string.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | The string |
| subString | <code>String</code> | The sub string to search for |

<a name="fitArrayToSize"></a>

## fitArrayToSize(arr, size) ⇒ <code>Array</code>
Fills an array with it's own elements to fit a certain size.

**Kind**: global function  

| Param | Description |
| --- | --- |
| arr | The array to fit. |
| size | The new size. |

<a name="longestArray"></a>

## longestArray(matrix) ⇒ <code>Array</code>
Returns the longest array from an array of arrays.

**Kind**: global function  

| Param | Description |
| --- | --- |
| matrix | Array of arrays |

