---
title: Paginator
---

# Paginator

<a name="Paginator"></a>

## Paginator
Pagination logic handling.

**Kind**: global class  

* [Paginator](#Paginator)
    * [new exports.Paginator([offset], [data])](#new_Paginator_new)
    * [.offset](#Paginator+offset) ⇒ <code>Number</code>
    * [.offset](#Paginator+offset)
    * [.page](#Paginator+page) ⇒ <code>Number</code>
    * [.page](#Paginator+page)
    * [.pages](#Paginator+pages) ⇒ <code>Number</code>
    * [.pageStart](#Paginator+pageStart) ⇒ <code>Number</code>
    * [.pageEnd](#Paginator+pageEnd) ⇒ <code>Number</code>
    * [.data([data])](#Paginator+data) ⇒ <code>Array</code>
    * [.inPageRange(page)](#Paginator+inPageRange) ⇒ <code>boolean</code>
    * [.hasNext()](#Paginator+hasNext) ⇒ <code>boolean</code>
    * [.hasPrevious()](#Paginator+hasPrevious) ⇒ <code>boolean</code>
    * [.next()](#Paginator+next)
    * [.previous()](#Paginator+previous)

<a name="new_Paginator_new"></a>

### new exports.Paginator([offset], [data])
Creates a new Paginator instance.


| Param | Type | Default |
| --- | --- | --- |
| [offset] | <code>Number</code> | <code>50</code> | 
| [data] | <code>Array</code> | <code>[]</code> | 

<a name="Paginator+offset"></a>

### paginator.offset ⇒ <code>Number</code>
Returns the paginator offset.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+offset"></a>

### paginator.offset
Sets the paginator offset.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  

| Param | Type |
| --- | --- |
| offset | <code>Number</code> | 

<a name="Paginator+page"></a>

### paginator.page ⇒ <code>Number</code>
Get the current paginator page.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+page"></a>

### paginator.page
Sets the current paginator page.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+pages"></a>

### paginator.pages ⇒ <code>Number</code>
Returns the overall number of pages.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+pageStart"></a>

### paginator.pageStart ⇒ <code>Number</code>
Returns the page start index.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
**Access**: protected  
<a name="Paginator+pageEnd"></a>

### paginator.pageEnd ⇒ <code>Number</code>
Returns the page end index.

**Kind**: instance property of [<code>Paginator</code>](#Paginator)  
**Access**: protected  
<a name="Paginator+data"></a>

### paginator.data([data]) ⇒ <code>Array</code>
if called with parameter sets the paginator data,
Retrieves the data from the current paginator page.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Array</code> | <code></code> | 

<a name="Paginator+inPageRange"></a>

### paginator.inPageRange(page) ⇒ <code>boolean</code>
Checks whether a page is valid.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  

| Param | Type |
| --- | --- |
| page | <code>Number</code> | 

<a name="Paginator+hasNext"></a>

### paginator.hasNext() ⇒ <code>boolean</code>
Checks if there's a next page.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+hasPrevious"></a>

### paginator.hasPrevious() ⇒ <code>boolean</code>
Checks if there's a previous page.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+next"></a>

### paginator.next()
Advances to the next page.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  
<a name="Paginator+previous"></a>

### paginator.previous()
Goes to the previous page.

**Kind**: instance method of [<code>Paginator</code>](#Paginator)  
