import Chance from 'chance';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { head } from 'ramda';

import { GENDER } from '../../constants';
import { generateAuthorName } from '../authorNameGenerator';

const { FEMALE, MALE, NON_BINARY } = GENDER;

Chance.prototype.pickone = (arr) => head(arr);

describe('author name generator', () => {
  it('should be able to generate female names', () => {
    expect(generateAuthorName(FEMALE)).to.deep.equal({
      firstName: 'Sophia',
      surname: 'Smith'
    });
  });

  it('should be able to generate male names', () => {
    expect(generateAuthorName(MALE)).to.deep.equal({
      firstName: 'Jackson',
      surname: 'Smith'
    });
  });

  it('should be able to generate non-binary names', () => {
    expect(generateAuthorName(NON_BINARY)).to.deep.equal({
      firstName: 'Sophia',
      surname: 'Smith'
    });
  });
});
