import { transposePitchClass, firstToUpper } from '../../lib/index.js';

describe('#transposePitchClass', () => {
  describe('regular pitch classes', () => {
    describe('Checks the pitch class Db', () => {
      const db = 'Db';
      const db_stub = {
        '-13': 'c',
        '-12': 'db',
        '-11': 'd',
        '-1': 'c',
        '0': 'db',
        '1': 'd',
        '11': 'c',
        '12': 'db',
        '13': 'd',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class C#', () => {
      const cs = 'C#';
      const cs_stub = {
        '-13': 'c',
        '-12': 'c#',
        '-11': 'd',
        '-1': 'c',
        '0': 'c#',
        '1': 'd',
        '11': 'c',
        '12': 'c#',
        '13': 'd',
      };
      testFn(transposePitchClass, cs, cs_stub);
    });

    describe('Checks the pitch class G', () => {
      const db = 'G';
      const db_stub = {
        '-13': 'Gb',
        '-12': 'G',
        '-11': 'Ab',
        '-1': 'Gb',
        '0': 'G',
        '1': 'Ab',
        '11': 'Gb',
        '12': 'G',
        '13': 'Ab',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class B', () => {
      const db = 'B';
      const db_stub = {
        '-13': 'Bb',
        '-12': 'B',
        '-11': 'C',
        '-1': 'Bb',
        '0': 'B',
        '1': 'C',
        '11': 'Bb',
        '12': 'B',
        '13': 'C',
      };
      testFn(transposePitchClass, db, db_stub);
    });
  });

  describe('multiple sharps', () => {
    describe('Checks the pitch class Cx', () => {
      const db = 'Cx';
      const db_stub = {
        '-13': 'Bx',
        '-12': 'Cx',
        '-11': 'Cx#',
        '-1': 'Bx',
        '0': 'Cx',
        '1': 'Cx#',
        '11': 'Bx',
        '12': 'Cx',
        '13': 'Cx#',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Ex#', () => {
      const db = 'Ex#';
      const db_stub = {
        '-13': 'Dxx',
        '-12': 'Ex#',
        '-11': 'Fx#',
        '-1': 'Dxx',
        '0': 'Ex#',
        '1': 'Fx#',
        '11': 'Dxx',
        '12': 'Ex#',
        '13': 'Fx#',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Bxx#', () => {
      const db = 'Bxx#';
      const db_stub = {
        '-13': 'Axxx',
        '-12': 'Bxx#',
        '-11': 'Cxx#',
        '-1': 'Axxx',
        '0': 'Bxx#',
        '1': 'Cxx#',
        '11': 'Axxx',
        '12': 'Bxx#',
        '13': 'Cxx#',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Fx#', () => {
      const db = 'Fx#';
      const db_stub = {
        '-13': 'Ex#',
        '-12': 'Fx#',
        '-11': 'Fxx',
        '-1': 'Ex#',
        '0': 'Fx#',
        '1': 'Fxx',
        '11': 'Ex#',
        '12': 'Fx#',
        '13': 'Fxx',
      };
      testFn(transposePitchClass, db, db_stub);
    });
  });

  describe('multiple flats', () => {
    describe('Checks the pitch class Abb', () => {
      const db = 'Abb';
      const db_stub = {
        '-13': 'Abbb',
        '-12': 'Abb',
        '-11': 'Bbbb',
        '-1': 'Abbb',
        '0': 'Abb',
        '1': 'Bbbb',
        '11': 'Abbb',
        '12': 'Abb',
        '13': 'Bbbb',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Fb', () => {
      const db = 'Fb';
      const db_stub = {
        '-13': 'Eb',
        '-12': 'Fb',
        '-11': 'Gbb',
        '-1': 'Eb',
        '0': 'Fb',
        '1': 'Gbb',
        '11': 'Eb',
        '12': 'Fb',
        '13': 'Gbb',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Cbbbb', () => {
      const db = 'Cbbbb';
      const db_stub = {
        '-13': 'Bbbbb',
        '-12': 'Cbbbb',
        '-11': 'Dbbbbb',
        '-1': 'Bbbbb',
        '0': 'Cbbbb',
        '1': 'Dbbbbb',
        '11': 'Bbbbb',
        '12': 'Cbbbb',
        '13': 'Dbbbbb',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Gbbb', () => {
      const db = 'Gbbb';
      const db_stub = {
        '-13': 'Gbbbb',
        '-12': 'Gbbb',
        '-11': 'Abbbb',
        '-1': 'Gbbbb',
        '0': 'Gbbb',
        '1': 'Abbbb',
        '11': 'Gbbbb',
        '12': 'Gbbb',
        '13': 'Abbbb',
      };
      testFn(transposePitchClass, db, db_stub);
    });

    describe('Checks the pitch class Ebbbb', () => {
      const db = 'Ebbbb';
      const db_stub = {
        '-13': 'Ebbbbb',
        '-12': 'Ebbbb',
        '-11': 'Fbbbb',
        '-1': 'Ebbbbb',
        '0': 'Ebbbb',
        '1': 'Fbbbb',
        '11': 'Ebbbbb',
        '12': 'Ebbbb',
        '13': 'Fbbbb',
      };
      testFn(transposePitchClass, db, db_stub);
    });
  });
});

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function testFn(fn, baseNote, stub) {
  Object.entries(stub).forEach(([interval, note]) => {
    note = firstToUpper(note);
    it(`${baseNote} with interval ${interval} to be ${note}`, () => {
      expect(fn(baseNote, interval)).to.equal(note);
    });
  });
}