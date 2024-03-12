import {
  extractOctave, extractPitchClass, getPitchClassesInterval, notesInRange, noteToObject,
  pitchClassesToPianoChordNotes, transposeNote, intervalsToNotes,
  spellScale,
} from '../../lib/index.js';

describe('Music addon functions', () => {
  describe('#getPitchClassesInterval', () => {
    it('calculates the correct interval between two pitch classes', () => {
      expect(getPitchClassesInterval('C', 'G')).to.eql(7);
    });
  });

  describe('#transposeNote', () => {
    it('transpose a note correctly by interval', () => {
      expect(transposeNote('C3', 7)).to.eql('G3');
      expect(transposeNote('C3', -7)).to.eql('F2');
      expect(transposeNote('G3', 7)).to.eql('D4');
    });
  });

  describe('#extractFromPitch', () => {
    it('returns an object with pitch class and octave', () => {
      expect(noteToObject('e3')).to.eql({ pitchClass: 'E', octave: 3 });
      expect(noteToObject('bb4')).to.eql({ pitchClass: 'Bb', octave: 4 });
    });
  });

  describe('#notesInRange', () => {
    it('returns an array of notes formatted as cords', () => {
      expect(Object.keys(notesInRange('a3', 3))).to.eql(['A3', 'Bb3', 'B3', 'C4']);
    });
  });

  describe('#extractOctave', () => {
    it('returns the octave of a raw note', () => {
      expect(extractOctave('c5')).to.equal('5');
      expect(extractOctave('ebb4')).to.equal('4');
    });
  });

  describe('#extractPitchClass', () => {
    it('returns the pitch class of a raw note', () => {
      expect(extractPitchClass('c5')).to.equal('c');
      expect(extractPitchClass('ebb4')).to.equal('ebb');
    });
  });

  describe('#pitchClassesToPianoChordNotes', () => {
    let g, gChord;
    beforeEach(() => {
      g      = 'G';
      gChord = ['G', 'B', 'D'];
    });

    describe('returns the correct notes for a chord', () => {
      it('normal chord', () => {
        const stub = ['G3', 'B3', 'D4'];
        expect(pitchClassesToPianoChordNotes(gChord, 3)).to.eql(stub);
      });

      it('another normal chord', () => {
        const pitchClasses = ['G#', 'B', 'D'];
        const stub         = ['G#3', 'B3', 'D4'];
        expect(pitchClassesToPianoChordNotes(pitchClasses, 3)).to.eql(stub);
      });

      it('big Chord', () => {
        const bigChord = intervalsToNotes(g, [0, 4, 7, 13, 17]);
        const stub    = ['G3', 'B3', 'D4', 'Ab4', 'C5'];

        expect(pitchClassesToPianoChordNotes(bigChord, 3)).to.eql(stub);
      });

      it('with a flats scale', () => {
        const bigChord = spellScale(intervalsToNotes('E', [0, 1, 2, 3, 5, 7, 9, 10]));
        const stub    = ['E3', 'F3', 'Gb3', 'Abb3', 'Bbb3', 'Cb4', 'Db4', 'Ebb4'];

        expect(pitchClassesToPianoChordNotes(bigChord, 3)).to.eql(stub);
      });

      it('with a sharps scale', () => {
        const bigChord = spellScale(intervalsToNotes('E', [0, 3, 4, 6, 8, 9, 11]));
        const stub    = ['E3', 'Fx3', 'G#3', 'A#3', 'B#3', 'C#4', 'D#4'];

        expect(pitchClassesToPianoChordNotes(bigChord, 3)).to.eql(stub);
      });
    });

    describe('should return the correct notes for a scale', () => {
      it('Ab Phrygian Aeolian 2b 4b 6b', () => {
        const scale = {
          scale: ['Ab', 'Bbb', 'Cbb', 'Dbbb', 'Ebbb', 'Fbb', 'Gbbb', 'Abbb'],
          stub: ['Ab3', 'Bbb3', 'Cbb4', 'Dbbb4', 'Ebbb4', 'Fbb4', 'Gbbb4', 'Abbb4'],
        };
        expect(pitchClassesToPianoChordNotes(scale.scale, 3)).to.eql(scale.stub);
      });
    });

    it('should invert chords when called with inversion value', () => {
      const stub = ['B3', 'D4', 'G4'];
      expect(pitchClassesToPianoChordNotes(gChord, 3, 1)).to.eql(stub);
    });
  });

  describe('#spellScale', () => {
    describe('should return an array of correctly spelled scales', () => {
      describe('major scales', () => {
        const majorScaleTests = [
          {
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            stub: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
          }, {
            scale: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
            stub: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
          }, {
            scale: ['D', 'E', 'Gb', 'G', 'A', 'B', 'Db'],
            stub: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
          }, {
            scale: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
            stub: ['D#', 'E#', 'Fx', 'G#', 'A#', 'B#', 'Cx'],
          }, {
            scale: ['E', 'Gb', 'Ab', 'A', 'B', 'Db', 'Eb'],
            stub: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
          }, {
            scale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
            stub: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
          }, {
            scale: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
            stub: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
          }, {
            scale: ['G', 'A', 'B', 'C', 'D', 'E', 'Gb'],
            stub: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
          }, {
            scale: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
            stub: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'Fx'],
          }, {
            scale: ['A', 'B', 'Db', 'D', 'E', 'Gb', 'Ab'],
            stub: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
          }, {
            scale: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
            stub: ['A#', 'B#', 'Cx', 'D#', 'E#', 'Fx', 'Gx'],
          }, {
            scale: ['B', 'Db', 'Eb', 'E', 'Gb', 'Ab', 'Bb'],
            stub: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
          },
        ];
        majorScaleTests.forEach(({ scale, stub }, index) => {
          isScalesEqual({ scale, stub, index });
        });
      });
      describe('non diatonic scales', () => {
        const testCases = [
          {
            scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
            stub: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
          }, {
            scale: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C', 'C#', 'Eb'],
            stub: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#'],
          },
        ];
        testCases.forEach(({ scale, stub }, index) => {
          isScalesEqual({ scale, stub, index });
        });
      });

    });
  });
});

function isScalesEqual({
  scale, stub, index,
}) {
  it(`${index}: should return true if scales are equal`, () => {
    expect(spellScale(scale)).to.eql(stub);
  }); 
}
