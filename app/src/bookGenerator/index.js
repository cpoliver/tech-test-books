import Chance from 'chance';

import { GENDER, GENRE } from '../constants';
import { generateAuthorName } from './authorNameGenerator';
import { generateTitle } from './titleGenerator';

const random = new Chance();

const pickoneFromObject = (obj) => random.pickone(Object.values(obj));

const generateDate = () => random.birthday({
  year: random.year({ min: 1942, max: 2017 })
});

const generateBook = (overrides = {}) => {
  const {
    authorGender = pickoneFromObject(GENDER),
    genre = pickoneFromObject(GENRE)
  } = overrides;

  return {
    genre,
    title: generateTitle(genre),
    author: {
      gender: authorGender,
      ...generateAuthorName(authorGender)
    },
    publishedOn: generateDate()
  };
};

export { generateBook };
