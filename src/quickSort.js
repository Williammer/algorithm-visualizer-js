import {
  swapWithEffect,
  initGraph,
  defaultEffectFactory
} from "./base.js";

const beatTime = 2000;

async function quickSort(array, effect, lo = 0, hi = array.length) {
  if (array.length <= 1 || hi <= lo) return array;

  const partition = async (arr, left, right, eff) => {
    let i = left;
    let j = right;
    const pivot = arr[left];

    while (i < j) {
      while (arr[++i] <= pivot)
        if (i === right) break; // eslint-disable-line no-plusplus
      while (arr[--j] >= pivot)
        if (j === left) break; // eslint-disable-line no-plusplus
      if (i < j) {
        await swapWithEffect(arr, eff, i, j);
      }
    }
    await swapWithEffect(arr, eff, left, j);
    return j;
  };
  const pivotIndex = await partition(array, lo, hi, effect);
  await quickSort(array, effect, lo, pivotIndex);
  await quickSort(array, effect, pivotIndex + 1, hi);

  return array;
}

const arrayToSort = [3, 2, 5, 4, 1, 11, 9, 7, 2];
initGraph(arrayToSort);
quickSort(arrayToSort, defaultEffectFactory(beatTime));