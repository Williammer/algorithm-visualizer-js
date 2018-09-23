import {
  swapWithEffect,
  initGraph,
  delay,
  defaultEffectFactory
} from "./base.js";

const beatTime = 1000;

async function selection(arr, effect) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] >= arr[j]) {
        min = j;
      }
    }
    await swapWithEffect(arr, effect, i, min);
  }
  return arr;
}

const arrayToSort = [3, 2, 5, 4, 1, 11, 9, 7, 2];

initGraph(arrayToSort);
selection(arrayToSort, defaultEffectFactory(beatTime));