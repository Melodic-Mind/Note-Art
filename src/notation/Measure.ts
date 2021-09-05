// import { firstToUpper } from '../utilities/GeneralFunctions';
// import { validateArray, validateDuration } from './Validators.js';
// import { NOTE_DURATIONS_AS_SIZE_IN_MEASURE } from '../Constants';
// import { isRest } from '../utilities/PureMusicUtils';
// import { NoteDuration, Note } from '../types.js';
// import { transpose } from '../index.js';

// export interface MeasureData {
//   notes: Array<string>;
//   duration: string;
//   name?: string;
// }

// export interface NormalizedMeasureData {
//   notes: Set<string>;
//   duration: string;
//   name?: string;
// }

// /**
//  * @class Measure
//  * @classdesc Represents a single measure as part of a musical score in musical notation.ds
//  * @param {Number} maxDuration=0 Max duration of the measure(determined by time signature)
//  */
// export class Measure {
//   _duration: string

//   constructor(maxDuration = 64) {
//     this._maxDuration = maxDuration;
//     this._duration    = '4n';
//     this._data        = [{ notes: new Set(), duration: '4n' }];
//   }

//   _maxDuration: number;

//   [key: string]: any;

//   /**
//    * Returns the maximum sum of durations for the measure as a number,
//    * where each unit is 1/64 bit.
//    * @returns {number}
//    * @readonly
//    */
//   get maxDuration() {
//     return this._maxDuration;
//   }

//   _data: Array<NormalizedMeasureData>

//   /**
//    * Returns the data of the measure - an array of objects where each
//    * object has a set of notes and the duration for those notes.
//    * @returns {Array}
//    */
//   get data() {
//     return this._data;
//   }

//   /**
//    * Returns the number of sixteenth notes in the measure.
//    * @returns {number}
//    */
//   get length() {
//     return this.data.reduce((acc, { duration }) => acc + NOTE_DURATIONS_AS_SIZE_IN_MEASURE[duration], 0) / 4;
//   }

//   static measureDataToString(notesMember: NormalizedMeasureData) {
//     const notes = Array.from(notesMember.notes).join('-');
//     if(notes) {
//       const duration = notesMember.duration;
//       const name     = notesMember.name;

//       return `${notes}_${duration}${name ? `_${name}` : ''}`;
//     }
//     return '';
//   }

//   static parseMeasureNoteMemberString(str: string) {
//     const [notes, duration, name] = str.split('_');
//     return {
//       notes: notes.split('-'),
//       duration,
//       name,
//     };
//   }

//   static stringToMeasure({ str, maxDuration }: { str: string, maxDuration: number }) {
//     const measure     = new Measure(maxDuration);
//     const noteMembers = str.split('__')
//       .map(el => Measure.parseMeasureNoteMemberString(el));

//     noteMembers.forEach((noteMember, i) => measure.addChord(noteMember, i));

//     return measure;
//   }

//   /**
//    * Returns a deep clone of the measure.
//    * @returns {Measure}
//    */
//   clone() {
//     return this.transpose(0);
//   }

//   /**
//    * Returns the duration left for notes in the measure.
//    * @param {number} position=this.data.length
//    * @returns {number}
//    */
//   durationLeft(position = this.data.length): number {
//     return this.maxDuration - this.data.slice(0, position)
//       .reduce((prev, curr) => {
//         return curr.notes.size ?
//           prev + NOTE_DURATIONS_AS_SIZE_IN_MEASURE[curr.duration] : prev;
//       }, 0);
//   }

//   /**
//    * Adds a note to the measure at some position.
//    * @param {Object} data
//    * @param {string} data.note raw note representation.
//    * @param {string} data.duration
//    * @param {number} position The position in the data to add the note to.
//    * @returns {boolean}
//    */
//   addNote({ note, duration }: { note: Note, duration: NoteDuration }, position: number): boolean {
//     validateDuration(duration);
//     if(this.canInsertToMeasure(position + 1, duration)) {
//       this.data[position].notes.add(note);
//       this.data[position].duration = duration;
//       this.initNext(position + 1, duration);
//       return true;
//     }
//     return false;
//   }

//   /**
//    * Adds notes to the note set at the position.
//    * @param {Array} notes An array of raw notes.
//    * @param {string} duration
//    * @param {number} position The position in the data to add the notes to.
//    * @returns {*}
//    */
//   addNotes({ notes, duration }: MeasureData, position: number) {
//     validateArray(notes);
//     return notes.every(note => this.addNote({ note, duration }, position));
//   }

//   /**
//    * Adds notes to the measure plus a name that represents the chord and is saved in
//    * the data at the position as name
//    * @param notes
//    * @param name
//    * @param duration
//    * @param position
//    * @return {boolean}
//    * @example
//    * measure.addChord({
//    *      notes: ['C3', 'E3', 'G3'],
//    *      name: 'C Major',
//    *      duration: '4n'
//    *      }, 0)      // Adds a C major chord at the start of the measure.
//    */
//   addChord({ notes, name, duration }: MeasureData, position: number) {
//     if(this.canInsertToMeasure(position + 1, duration)) {
//       if(name) {
//         this.data[position].name = name;
//       }
//       return this.addNotes({ notes, duration }, position);
//     }

//     return false;
//   }

//   /**
//    * Delete note at the position.
//    * @param {string} note raw note.
//    * @param {number} position The position in the data to delete the note at.
//    * @returns {boolean}
//    */
//   deleteNote(note: string, position: number) {
//     return this.data[position].notes.delete(firstToUpper(note));
//   }

//   /**
//    * Deletes notes from the noteset at the position.
//    * @param {Array} notes An array of raw notes.
//    * @param {number} position The position in the data to delete the notes at.
//    * @returns {*}
//    */
//   deleteNotes(notes: Array<string>, position: number) {
//     validateArray(notes);
//     return notes.every(note => this.deleteNote(note, position));
//   }

//   /**
//    * Delete member from the measure's data - removes all the notes from it
//    * and initializes a new data member with the measure's duration.
//    * @param {number} position Position of the member to delete.
//    * @return {boolean}
//    */
//   deleteMember(position: number) {
//     if(this.data[position]) {
//       this.data.splice(position, 1);
//       // if the measure doesnt have a new member ready for adding new notes, create one
//       if(this.data[this.data.length - 1].notes.size !== 0) {
//         this.initNext(this.data.length);
//       }
//       return true;
//     }

//     return false;
//   }

//   /**
//    * Returns true if the duration has space, else false.
//    * @param duration
//    * @returns {boolean}
//    */
//   isFull(duration: string) {
//     return !(NOTE_DURATIONS_AS_SIZE_IN_MEASURE[duration] <= this.durationLeft());
//   }

//   /**
//    * Returns a new measure where all the notes are transposed by the interval.
//    * @param {number} interval Interval to transpose by.
//    * @returns {Measure}
//    */
//   transpose(interval: number) {
//     const transposedMeasure = new Measure(this.maxDuration);
//     this.data.forEach((data: NormalizedMeasureData, position: number) => {
//       const { name, duration, notes } = data;

//       const transposedNotes: Array<Note> = [...notes].map(note => {
//         return isRest(note) ? note : transpose(note, interval);
//       });

//       const newData: MeasureData = { notes: transposedNotes, name, duration };
//       transposedMeasure.addChord(newData, position);
//     });

//     return transposedMeasure;
//   }

//   /**
//    * Removes all the data from the measure.
//    * @returns {boolean}
//    */
//   clear() {
//     this.data.length = 0;
//     this.initNext(0);
//     return true;
//   }

//   toString() {
//     return this.data.map(notesMember => Measure.measureDataToString(notesMember))
//       .filter(el => el !== '')
//       .join('__');
//   }

//   /**
//    * Creates a slot for the next notes that will be added in the measure if there is space.
//    * Should not be called as it's called automatically when needed.
//    * @param {number} position Position to initialize the next notes to.
//    * @param {string} duration duration to create for the notes
//    * @private
//    */
//   private initNext(position: number, duration = '4n') {
//     const durationLeft = this.durationLeft(this.data.length);
//     if(durationLeft > 0) {
//       this.data[position] = { notes: new Set(), duration };
//     }
//   }

//   /**
//    * Checks whether a new data member can be added at a certain position in the measure.
//    * @param {number} position The position to check for.
//    * @param {string} duration duration of new notes
//    * @returns {boolean}
//    */
//   private canInsertToMeasure(position: number, duration: string) {
//     const isPositionValid = position > this.data.length;

//     const durationSize            = NOTE_DURATIONS_AS_SIZE_IN_MEASURE[duration];
//     const enoughDurationAvailable = durationSize > this.durationLeft(position) + durationSize;

//     return !(isPositionValid || enoughDurationAvailable);
//   }
// }
