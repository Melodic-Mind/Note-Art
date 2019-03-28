import * as funcs from '../../src/utilities/ScientificFuncs'
import { Pitch } from '../../src';

describe('Scientific functions', () => {
    it('#freqFromPitch', () => {
        const pitch = new Pitch('a', 4)
        const pitch2 = new Pitch('e', 5)
        expect(funcs.freqFromPitch(pitch)).to.eql(440)
        expect(Math.ceil(funcs.freqFromPitch(pitch2))).to.eql(660)
    })

    it('#realNumberFromFreq', () => {
        expect(funcs.realNumberFromFreq(440)).to.eql(69)
    })

    it('#freqFromRealNumber', () => {
        expect(funcs.freqFromRealNumber(69)).to.eql(440)
        expect(funcs.freqFromRealNumber(57)).to.eql(220)
    })
})
