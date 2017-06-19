import Chance from 'chance';
import { femaleNames, maleNames, surnames } from './authorNames.json';

import { GENDER } from '../../constants';

const random = new Chance();

const { FEMALE, MALE, NON_BINARY } = GENDER;

const firstNames = {
  [FEMALE]: femaleNames,
  [MALE]: maleNames,
  [NON_BINARY]: random.pickone([femaleNames, maleNames])
};

export const generateAuthorName = (gender) => ({
  firstName: random.pickone(firstNames[gender]),
  surname: random.pickone(surnames)
});
