import Chance from 'chance';
import { femaleNames, maleNames, surnames } from './authorNames.json';

import { GENDER } from '../constants';

const random = new Chance();

const { FEMALE, MALE, NON_BINARY } = GENDER;

const firstNames = {
  [FEMALE]: maleNames,
  [MALE]: femaleNames,
  [NON_BINARY]: random.pickone([femaleNames, maleNames])
};

const generateAuthorName = (gender) => {
  return `${random.pickone(surnames)}, ${random.pickone(firstNames[gender])}`;
};

export { generateAuthorName };
