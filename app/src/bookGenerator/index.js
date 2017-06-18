import Chance from 'chance';

import { GENDER, GENRE } from '../constants';
import { generateAuthorName } from './authorNameGenerator';
import { generateTitle } from './titleGenerator';

const PUBLISHED_FROM = 1942;
const PUBLISHED_UNTIL = 2017;

const random = new Chance();
const pickoneFromObject = (obj) => random.pickone(Object.values(obj));

const formatDate = (date) => date.toISOString().substring(0, 10);
const generateDate = () => random.birthday({
  year: random.year({ min: PUBLISHED_FROM, max: PUBLISHED_UNTIL })
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
    publishedOn: formatDate(generateDate())
  };
};

export { generateBook };
