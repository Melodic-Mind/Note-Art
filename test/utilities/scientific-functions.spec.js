import { freqFromPitch, freqToMidi, midiToFreq, freqToPitch, midiToPitch, pitchToMidi } from '../../lib/index.js';

describe('Scientific functions', () => {
  it('#freqFromPitch', () => {
    expect(freqFromPitch('A4')).to.eql(440);
    expect(Math.ceil(freqFromPitch('E5'))).to.eql(660);
    expect(Math.ceil(freqFromPitch('F4'))).to.eql(350);
    expect(Math.ceil(freqFromPitch('C4'))).to.eql(262);
    expect(Math.ceil(freqFromPitch('Db4'))).to.eql(278);
    expect(Math.ceil(freqFromPitch('C#4'))).to.eql(278);
  });

  it('#freqToMidi', () => {
    expect(freqToMidi(440)).to.eql(69);
    expect(freqToMidi(428)).to.eql(69);
  });

  it('#midiToFreq', () => {
    expect(midiToFreq(69)).to.eql(440);
    expect(midiToFreq(57)).to.eql(220);
  });
  it('#freqToPitch', () => {
    expect(freqToPitch(69.3)).to.eql('Db2');
    expect(freqToPitch(440)).to.eql('A4');
    expect(freqToPitch(220)).to.eql('A3');
    expect(freqToPitch(660)).to.eql('E5');
    expect(freqToPitch(349.23)).to.eql('F4');
  });
  it('#midiToPitch', () => {
    expect(midiToPitch(69)).to.eql('A4');
    expect(midiToPitch(57)).to.eql('A3');
    expect(midiToPitch(64)).to.eql('E4');
    expect(midiToPitch(53)).to.eql('F3');
    expect(midiToPitch(60)).to.eql('C4');
    expect(midiToPitch(61)).to.eql('Db4');
  });
  it('#pitchToMidi', () => {
    expect(pitchToMidi('A4')).to.eql(69);
    expect(pitchToMidi('A3')).to.eql(57);
    expect(pitchToMidi('E4')).to.eql(64);
    expect(pitchToMidi('F3')).to.eql(53);
    expect(pitchToMidi('C4')).to.eql(60);
    expect(pitchToMidi('Db4')).to.eql(61);
    expect(pitchToMidi('C#4')).to.eql(61);
  });
});
