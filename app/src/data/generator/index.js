import Chance from 'chance';

import { GENDER, GENRE } from '../../constants';
import { generateAuthorName } from './authorName';
import { generateTitle } from './title';

const PUBLISHED_FROM = 1942;
const PUBLISHED_UNTIL = 2017;

const random = new Chance();

const pickoneFromObject = (obj) => random.pickone(Object.values(obj));
const weightedFromObject = (obj, weights) => random.weighted(Object.values(obj), weights);

const formatDate = (date) => date.toISOString().substring(0, 10);
const generateDate = () => random.birthday({
  year: random.year({ min: PUBLISHED_FROM, max: PUBLISHED_UNTIL })
});

export const generateBook = (overrides = {}) => {
  const {
    authorGender = weightedFromObject(GENDER, [50, 50, 1]),
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
