export const pickRandomItems = (array, number) => {
  if (number === undefined) {
    return array;
  }
  const originalArrCopy = [...array];
  const randomArr = [];
  for (let i = 0; i < number; i++) {
    let randomIndex = Math.floor(Math.random() * originalArrCopy.length);
    randomArr.push(originalArrCopy[randomIndex]);
    originalArrCopy.splice(randomIndex, 1);
  }
  return randomArr;
};

export const shuffleArray = (array) => {
  let shuffledArr = array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return shuffledArr;
};
