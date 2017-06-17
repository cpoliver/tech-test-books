import { describe, it } from 'mocha';
import { expect } from 'chai';

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

describe('title generator', () => {
  it('should be able to generate adventure titles', () => {
    expect(generateTitle(ADVENTURE)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate children titles', () => {
    expect(generateTitle(CHILDREN)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate drama titles', () => {
    expect(generateTitle(DRAMA)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate fantasy titles', () => {
    expect(generateTitle(FANTASY)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate horror titles', () => {
    expect(generateTitle(HORROR)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate humor titles', () => {
    expect(generateTitle(HUMOR)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate mystery titles', () => {
    expect(generateTitle(MYSTERY)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate non-fiction titles', () => {
    expect(generateTitle(NON_FICTION)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate romance titles', () => {
    expect(generateTitle(ROMANCE)).to.equal('xxxxxxxxxx');
  });

  it('should be able to generate sci-fi titles', () => {
    expect(generateTitle(SCI_FI)).to.equal('xxxxxxxxxx');
  });
});
