
import { transposeNote, firstToUpper, transpose, noteFromFrequency, intervalsToNotes, invertChord, scaleDegree, getChordFromScale, scaleToChords } from '../../lib/index.js';

describe('Theory', () => {
  describe('#transposePitchClass', () => {
    describe('Checks the note Db', () => {
      const db = 'Db5';
      const db_stub = {
        '-13': 'c4',
        '-12': 'db4',
        '-11': 'd4',
        '-1': 'c5',
        '0': 'db5',
        '1': 'd5',
        '11': 'c6',
        '12': 'db6',
        '13': 'd6',
      };
      helperFn(transposeNote, db, db_stub);
    });

    describe('Checks the note Db', function() {
      const c = 'c5';
      const c_stub = {
        '-13': 'B3',
        '-12': 'c4',
        '-11': 'Db4',
        '-1': 'B4',
        '0': 'c5',
        '1': 'Db5',
        '11': 'B5',
        '12': 'c6',
        '13': 'Db6',
      };
      helperFn(transposeNote, c, c_stub);
    });

    describe('Checks the note cs', function() {
      const cs = 'C#3';
      const cs_stub = {
        '-13': 'c2',
        '-12': 'c#2',
        '-11': 'd2',
        '-1': 'c3',
        '0': 'c#3',
        '1': 'd3',
        '11': 'c4',
        '12': 'c#4',
        '13': 'd4',
      };
      helperFn(transposeNote, cs, cs_stub);
    });
  });

  describe('#transpose', () => {
    it('should transpose pitch class', () => {
      const pitchClass = 'C';
      expect(transpose(pitchClass, -1)).to.equal('B');
    });
    it('should transpose note', () => {
      const pitchClass = 'C5';
      expect(transpose(pitchClass, -1)).to.equal('B4');
    });
  });

  it('#fromFrequency', () => {
    expect(noteFromFrequency(440)).to.eql('A4');
  });

  it('#intervalsToNotes', () => {
    expect(intervalsToNotes('C3', [0,2,4,5])).to.eql(['C3', 'D3', 'E3', 'F3']);
  });

  describe('#invertChord', () => {
    const cMaj = ['C3', 'E3', 'G3'];
    it('first inversion', () => {
      const stub = ['E3', 'G3', 'C3'];
      expect(invertChord(cMaj, 1)).to.eql(stub);
    });
    it('second inversion', () => {
      const stub = ['G3', 'C3', 'E3'];
      expect(invertChord(cMaj, 2)).to.eql(stub);
    });
  });

  describe('#scaleDegree', () => {
    it('should return the correct scale degree', () => {
      expect(scaleDegree(['C3', 'D3', 'E3', 'F3'], 1)).to.equal('C3');
      expect(scaleDegree(['C3', 'D3', 'E3', 'F3'], 2)).to.equal('D3');
      expect(scaleDegree(['C3', 'D3', 'E3', 'F3'], 3)).to.equal('E3');
      expect(scaleDegree(['C3', 'D3', 'E3', 'F3'], 4)).to.equal('F3');
    });
  });
  
  describe('#getChordFromScale', () => {
    const scale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
    it('should return a chord at degree from scale', () => {
      expect(getChordFromScale(scale, 1)).to.eql(['C3', 'E3', 'G3']);
      expect(getChordFromScale(scale, 2)).to.eql(['D3', 'F3', 'A3']);
      expect(getChordFromScale(scale, 5)).to.eql(['G3', 'B3', 'D4']);
    });

    it('should return a chord with specified size', () => {
      expect(getChordFromScale(scale, 1, 4)).to.eql(['C3', 'E3', 'G3', 'B3']);
      expect(getChordFromScale(scale, 2,4)).to.eql(['D3', 'F3', 'A3', 'C4']);
    });
  });

  describe('#scaleToChords', () => {
    it('should return all the chords of a scale', () => {
      expect(scaleToChords(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'])).to.eql([
        ['C3', 'E3', 'G3'], ['D3', 'F3', 'A3'], ['E3', 'G3', 'B3'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['B3', 'D4', 'F4'],
      ]);
    });
  });
});

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function helperFn(fn, baseNote, stub) {
  Object.entries(stub).forEach(([interval, note]) => {
    note = firstToUpper(note);
    it(`${baseNote} with interval ${interval} to be ${note}`, () => {
      expect(fn(baseNote, parseInt(interval))).to.equal(note);
    });
  });
}