import Chance from 'chance';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import { head } from 'ramda';

import { GENRE } from '../../../constants';
import { generateTitle } from '../title';

const {
  ADVENTURE,
  CHILDREN,
  DRAMA,
  FANTASY,
  HORROR,
  HUMOR,
  MYSTERY,
  NON_FICTION,
  ROMANCE,
  SCI_FI
} = GENRE;

describe('title generator', () => {
  beforeEach(() => {
    Chance.prototype.pickone = spy(head);
  });

  afterEach(() => {
    Chance.prototype.pickone.reset();
  });

  it('should be able to generate adventure titles', () => {
    expect(generateTitle(ADVENTURE)).to.equal('Agent of Darkness');
  });

  it('should be able to generate children titles', () => {
    expect(generateTitle(CHILDREN)).to.equal('Baby in My House');
  });

  it('should be able to generate drama titles', () => {
    expect(generateTitle(DRAMA)).to.equal('Accomplice Dressed in Black');
  });

  it('should be able to generate fantasy titles', () => {
    expect(generateTitle(FANTASY)).to.equal('Imp of Autumn');
  });

  it('should be able to generate horror titles', () => {
    expect(generateTitle(HORROR)).to.equal('Angel at the Catacombs');
  });

  it('should be able to generate humor titles', () => {
    expect(generateTitle(HUMOR)).to.equal('Agent of Jokes');
  });

  it('should be able to generate mystery titles', () => {
    expect(generateTitle(MYSTERY)).to.equal('Agent from Beyond the Grave');
  });

  it('should be able to generate non-fiction titles', () => {
    expect(generateTitle(NON_FICTION)).to.equal('Horses Around the World');
  });

  it('should be able to generate romance titles', () => {
    expect(generateTitle(ROMANCE)).to.equal('Admirer at My School');
  });

  it('should be able to generate sci-fi titles', () => {
    expect(generateTitle(SCI_FI)).to.equal('Agent of the Sun');
  });
});
