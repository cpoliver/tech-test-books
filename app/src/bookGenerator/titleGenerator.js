import Chance from 'chance';

import titleParts from './titleParts.json';

const random = new Chance();

const generateTitle = (genre) => {
  const [part1, part2, part3, part4, part5, part6, part7] = titleParts[genre];

  const titles = [
    `${random.pickone(part1)} ${random.pickone(part4)}`,
    `${random.pickone(part2)} ${random.pickone(part4)}`,
    `${random.pickone(part2)} and ${random.pickone(part2)}`,
    `${random.pickone(part3)} ${random.pickone(part7)}`,
    `${random.pickone(part5)} ${random.pickone(part6)}`
  ];

  return random.pickone(titles);
};

export { generateTitle };
