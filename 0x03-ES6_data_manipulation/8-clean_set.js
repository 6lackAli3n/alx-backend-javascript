export default function cleanSet(set, startString) {
  if (!(set instanceof Set) || typeof startString !== 'string') return '';

  return [...set]
    .filter((el) => typeof el === 'string' && el.startsWith(startString))
    .map((el) => el.slice(startString.length))
    .join('-');
}
