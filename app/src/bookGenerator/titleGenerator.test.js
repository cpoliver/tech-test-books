import Chance from 'chance';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { head } from 'ramda';

import { GENRE } from '../constants';
import { generateTitle } from './titleGenerator';

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

Chance.prototype.pickone = (arr) => head(arr);

describe('title generator', () => {
  it('should be able to generate adventure titles', () => {
    expect(generateTitle(ADVENTURE)).to.equal('agent of darkness');
  });

  it('should be able to generate children titles', () => {
    expect(generateTitle(CHILDREN)).to.equal('baby in my house');
  });

  it('should be able to generate drama titles', () => {
    expect(generateTitle(DRAMA)).to.equal('accomplice dressed in black');
  });

  it('should be able to generate fantasy titles', () => {
    expect(generateTitle(FANTASY)).to.equal('imp of autumn');
  });

  it('should be able to generate horror titles', () => {
    expect(generateTitle(HORROR)).to.equal('angel at the catacombs');
  });

  it('should be able to generate humor titles', () => {
    expect(generateTitle(HUMOR)).to.equal('agent of jokes');
  });

  it('should be able to generate mystery titles', () => {
    expect(generateTitle(MYSTERY)).to.equal('agent from beyond the grave');
  });

  it('should be able to generate non-fiction titles', () => {
    expect(generateTitle(NON_FICTION)).to.equal('horses around the world');
  });

  it('should be able to generate romance titles', () => {
    expect(generateTitle(ROMANCE)).to.equal('admirer at my school');
  });

  it('should be able to generate sci-fi titles', () => {
    expect(generateTitle(SCI_FI)).to.equal('agent of the sun');
  });
});
