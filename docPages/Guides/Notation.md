---
name: Notation
---

# Music Notation

Note-Art provides a way of creating music using a notation-like API - Measures, Voices etc.

You can create a measure and add notes to it:
```js
const measure = new Measure();
measure.addNotes({
  notes: ['C3', 'G3'],
  duration: '8n'
})
```
