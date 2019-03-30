---
title: Addons
---

# Addons

## Functions

<dl>
<dt><a href="#firstToUpper">firstToUpper(str)</a> ⇒ <code>String</code></dt>
<dd><p>Transforms the first letter of a string to upper case.</p>
</dd>
<dt><a href="#twoDigitFormat">twoDigitFormat(num)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns a number formatted to show only 2 digits after the decimal point.</p>
</dd>
<dt><a href="#findQuery">findQuery([name], [pattern], source)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets either a name, a pattern, or nothing.
checks which one it got
and tries to find it in the source.</p>
</dd>
<dt><a href="#findQueryByString">findQueryByString(name)</a> ⇒ <code>Object</code></dt>
<dd><p>Retrieves data from resource by name.</p>
</dd>
<dt><a href="#findQueryByArray">findQueryByArray(source, key, query)</a> ⇒ <code>Object</code></dt>
<dd><p>Retrieves data from resource by Array.
if not found returns object with
name: unknown
key: query</p>
</dd>
</dl>

<a name="firstToUpper"></a>

## firstToUpper(str) ⇒ <code>String</code>
Transforms the first letter of a string to upper case.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String to transform |

<a name="twoDigitFormat"></a>

## twoDigitFormat(num) ⇒ <code>Number</code>
Returns a number formatted to show only 2 digits after the decimal point.

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>Number</code> | 

<a name="findQuery"></a>

## findQuery([name], [pattern], source) ⇒ <code>Object</code>
Gets either a name, a pattern, or nothing.
checks which one it got
and tries to find it in the source.

**Kind**: global function  
**Throws**:

- <code>MissingInformation</code> 


| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>String</code> | name |
| [pattern] | <code>Array</code> | pattern |
| source | <code>Object</code> | the source to search in |

<a name="findQueryByString"></a>

## findQueryByString(name) ⇒ <code>Object</code>
Retrieves data from resource by name.

**Kind**: global function  
**Throws**:

- <code>DataNotFound</code> 


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of chord |

<a name="findQueryByArray"></a>

## findQueryByArray(source, key, query) ⇒ <code>Object</code>
Retrieves data from resource by Array.
if not found returns object with
name: unknown
key: query

**Kind**: global function  

| Param |
| --- |
| source | 
| key | 
| query | 

