import { firstToUpper } from '../lib/index.js';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function testFn(fn, baseNote, stub) {
  Object.entries(stub).forEach(([interval, note]) => {
    note = firstToUpper(note);
    it(`${baseNote} with interval ${interval} to be ${note}`, () => {
      expect(fn(baseNote, interval)).to.equal(note);
    });
  });
}
