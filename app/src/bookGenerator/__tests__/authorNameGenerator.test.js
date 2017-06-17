import Chance from 'chance';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import { head } from 'ramda';

import { GENDER } from '../../constants';
import { generateAuthorName } from '../authorNameGenerator';

const { FEMALE, MALE, NON_BINARY } = GENDER;

describe('author name generator', () => {
  beforeEach(() => {
    Chance.prototype.pickone = spy(head);
  });

  afterEach(() => {
    Chance.prototype.pickone.reset();
  });

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
