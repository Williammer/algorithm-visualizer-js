import {
  swapWithEffect,
  initGraph,
  delay,
  updateBarsColor,
  COLOR,
  defaultEffectFactory
} from "./base.js";

const beatTime = 1000;

async function showSortedPair(a, b) {
  updateBarsColor(COLOR.FINE, [a, b]);
  await delay(beatTime);
  updateBarsColor(COLOR.NORMAL, [a, b]);
}

async function bubble(arr, effect) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        await swapWithEffect(arr, effect, j, j + 1);
      } else {
        await showSortedPair(j, j + 1);
      }
    }
  }
  return arr;
}

const arrayToSort = [3, 2, 5, 4, 1, 11, 9, 7, 2];

initGraph(arrayToSort);
bubble(arrayToSort, defaultEffectFactory(beatTime));