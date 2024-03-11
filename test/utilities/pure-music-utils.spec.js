import {
  enharmonicPitchClass, getNotesInterval, getPatternFromNotes, getPatternFromPitchClasses, isPitchClass, isNote, normalizePitchClass, toFlat, normalizeNote, pitchClassesToNotes,
} from '../../lib/index.js';

describe('#PureMusicUtils', () => {
  describe('#enharmonicPitchClass', () => {
    it('returns a pitch class properly spelled through 4 semitones', () => {
      expect(enharmonicPitchClass('B', 'G')).to.equal('Gxx');
    });

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('A#', 'G')).to.equal('Gx#');
    });

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('E', 'G')).to.equal('Gbbb');
    });

    it('properly spells sharp pitch class', () => {
      expect(enharmonicPitchClass('Ab', 'G')).to.equal('G#');
    });
  });

  describe('#normalizePitchClass', () => {
    it('just a letter', () => {
      expect(normalizePitchClass('c')).to.equal('C');
    });

    describe('with one sharp', () => {
      it('C# to C#', () => {
        expect(normalizePitchClass('C#')).to.equal('C#');
      });

      it('E# to F', () => {
        expect(normalizePitchClass('E#')).to.equal('F');
      });

      it('B# to C', () => {
        expect(normalizePitchClass('B#')).to.equal('C');
      });
    });

    describe('multiple sharps', () => {
      it('Cx to D', () => {
        expect(normalizePitchClass('cx')).to.equal('D');
      });

      it('Bx to C#', () => {
        expect(normalizePitchClass('bx')).to.equal('C#');
      });

      it('Fxx to A', () => {
        expect(normalizePitchClass('Fxx')).to.equal('A');
      });

      it('gxxx# to D', () => {
        expect(normalizePitchClass('Gxxx#')).to.equal('D');
      });

      it('Dxxxxxx to D', () => {
        expect(normalizePitchClass('Dxxxxxx')).to.equal('D');
      });
    });

    describe('flats', () => {
      it('Cb to B', () => {
        expect(normalizePitchClass('Cb')).to.equal('B');
      });

      it('Cbbb to A', () => {
        expect(normalizePitchClass('Cbbb')).to.equal('A');
      });

      it('Gb to Gb', () => {
        expect(normalizePitchClass('Gb')).to.equal('Gb');
      });

      it('Gbb to F', () => {
        expect(normalizePitchClass('Gbb')).to.equal('F');
      });

      it('Ebbbb to C', () => {
        expect(normalizePitchClass('Ebbbb')).to.equal('C');
      });

      it('Ebbbbb to B', () => {
        expect(normalizePitchClass('Ebbbbb')).to.equal('B');
      });

      it('Fbbb to D', () => {
        expect(normalizePitchClass('Fbbb')).to.equal('D');
      });

      it('Bbbbbbbbbbbbb to B', () => {
        expect(normalizePitchClass('Bbbbbbbbbbbbb')).to.equal('B');
      });

      it('Dbbbb to Bb', () => {
        expect(normalizePitchClass('Dbbbb')).to.equal('Bb');
      });
    });
  });

  describe('#normalizeNote', () => {
    it('should normalize a note', () => {
      expect(normalizeNote('C#3')).to.equal('C#3');
      expect(normalizeNote('Gx3')).to.equal('A3');
      expect(normalizeNote('B#3')).to.equal('C4');
      expect(normalizeNote('Ab3')).to.equal('Ab3');
      expect(normalizeNote('Bbb4')).to.equal('A4');
      expect(normalizeNote('Cbb3')).to.equal('Bb2');
    });
  });
  describe('#toFlat', () => {
    it('should turn sharp pitch classes flat', () => {
      expect(toFlat('C#')).to.equal('Db');
      expect(toFlat('D#')).to.equal('Eb');
    });

    it('should do nothing to other pitch classes', () => {
      expect(toFlat('C')).to.equal('C');
      expect(toFlat('Gb')).to.equal('Gb');
    });

    it('should turn sharp notes flat', () => {
      expect(toFlat('C#3')).to.equal('Db3');
      expect(toFlat('D#4')).to.equal('Eb4');
    });

    it('should do nothing to other notes', () => {
      expect(toFlat('C3')).to.equal('C3');
      expect(toFlat('Gb6')).to.equal('Gb6');
    });
  });

  describe('#getNotesInterval', () => {
    it('should return the correct interval between 2 notes', () => {
      expect(getNotesInterval('C3', 'G3')).to.equal(7);
      expect(getNotesInterval('C3', 'G4')).to.equal(19);
      expect(getNotesInterval('C3', 'G2')).to.equal(-5);
      expect(getNotesInterval('F3', 'Bb3')).to.equal(5);
      expect(getNotesInterval('C3', 'Dx#3')).to.equal(5);
    });
  });

  describe('#getPatternFromPitchClasses', () => {
    it('should return the correct pattern for pitch classes', () => {
      const pitchClasses = ['C', 'E', 'G', 'B'];
      expect(getPatternFromPitchClasses(pitchClasses)).to.eql([0, 4, 7, 11]);
    });

    it('should return the correct pattern for pitch classes - multiple octaves', () => {
      const pitchClasses = ['C', 'E', 'G', 'B', 'C', 'G', 'C'];
      expect(getPatternFromPitchClasses(pitchClasses)).to.eql([0, 4, 7, 11, 12, 19, 24]);
    });
  });

  describe('#getPatternFromNotes', () => {
    it('arbitrary set of notes', () => {
      const notes = ['C3', 'E3', 'G3', 'B2'];
      expect(getPatternFromNotes(notes)).to.eql([0, 4, 7, -1]);
    });

    it('multiple octaves', () => {
      const notes = ['C3', 'E3', 'G3', 'B2', 'C3', 'G4', 'C4'];
      expect(getPatternFromNotes(notes)).to.eql([0, 4, 7, -1, 0, 19, 12]);
    });

    it('with multiple sharps', () => {
      const notes = ['C3', 'C#3', 'Cx#3', 'Cx#4', 'Gx#4', 'Fx5'];
      expect(getPatternFromNotes(notes)).to.eql([0, 1, 3, 15, 22, 31]);
    });
  });

  describe('#isPitchClass', () => {
    it('should return true when string is a pitch class', () => {
      expect(isPitchClass('C')).to.equal(true);
    });
    it('should return true when containing flats', () => {
      expect(isPitchClass('Cb')).to.equal(true);
      expect(isPitchClass('Cbb')).to.equal(true);
    });
    it('should return true when containing sharps', () => {
      expect(isPitchClass('C#')).to.equal(true);
      expect(isPitchClass('Cx')).to.equal(true);
      expect(isPitchClass('Cx#')).to.equal(true);
    });
    it('should return false when string is note a pitch class', () => {
      expect(isPitchClass('NOT PITCH CLASS')).to.equal(false);
      expect(isPitchClass('Ce5')).to.equal(false);
      expect(isPitchClass('Bbbk')).to.equal(false);
    });
  });

  describe('#isNote', () => {
    it('should return true when string is a note', () => {
      expect(isNote('C3')).to.equal(true); 
    });
    it('should return false when string is note a note', () => {
      expect(isNote('C')).to.equal(false);
    });
  });

  describe('#pitchClassesToNotes', () => {
    it('should return an array of notes when input is valid', () => {
      const pitchClasses = ['C', 'E'];
      const stub         = ['C3', 'E3'];
      expect(pitchClassesToNotes(pitchClasses, 3)).to.eql(stub);
    });
  });
});
