/* eslint-disable max-nested-callbacks */
import Chance from 'chance';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import { head } from 'ramda';

import { GENDER, GENRE } from '../../constants';
import { generateBook } from '../';

const generatePresetBook = () => generateBook({
  authorGender: GENDER.FEMALE,
  genre: GENRE.FANTASY
});

describe('book generator', () => {
  beforeEach(() => {
    Chance.prototype.pickone = spy(head);
    Chance.prototype.birthday = spy(() => new Date(1991, 3, 15));
  });

  afterEach(() => {
    Chance.prototype.pickone.reset();
    Chance.prototype.birthday.reset();
  });

  describe('a book generated by the book generator', () => {
    it('should have a genre', () => {
      expect(generatePresetBook().genre).to.equal('fantasy');
    });

    it('should have a title for the correct genre', () => {
      expect(generatePresetBook().title).to.equal('Imp of Autumn');
    });

    describe('the author', () => {
      it('should have a gender', () => {
        expect(generatePresetBook().author.gender).to.equal('female');
      });

      it('should have a first name for the correct gender', () => {
        expect(generatePresetBook().author.firstName).to.equal('Sophia');
      });

      it('should have a last name', () => {
        expect(generatePresetBook().author.surname).to.equal('Smith');
      });
    });

    it('should have a publish date', () => {
      expect(generatePresetBook().publishedOn).to.equal('1991-04-14');
    });
  });
});
