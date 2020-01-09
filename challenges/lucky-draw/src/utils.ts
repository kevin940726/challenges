import Lcg from './Lcg';

const lcg = new Lcg();

function shuffle(array: number[]) {
  const newArr = array.slice();
  var currIndex = newArr.length,
    tempValue,
    randomIndex;

  while (0 !== currIndex) {
    randomIndex = Math.floor(lcg.nextFloat() * currIndex);
    currIndex -= 1;
    tempValue = newArr[currIndex];
    newArr[currIndex] = newArr[randomIndex];
    newArr[randomIndex] = tempValue;
  }

  return newArr;
}

const getRand = (numOfOptions: number, numOfDraws: number) => {
  if (numOfDraws > numOfOptions) {
    throw new Error('more prizes than participants!');
  }
  return shuffle(new Array(numOfOptions).fill(1).map((_, i) => i)).slice(
    0,
    numOfDraws
  );
};

export { getRand };
