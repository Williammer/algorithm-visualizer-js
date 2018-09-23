function swap(arr, i, j) {
  if (i === j) {
    return;
  }
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function setBarValue(bar, value) {
  bar.style.height = value * 20 + "px";
  bar.innerHTML = value;
}

export const COLOR = {
  NORMAL: "#40a9f3",
  SWAPPING: "#F3D23F",
  FINE: "#7EF33F"
};

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export function initGraph(array) {
  const root = document.querySelector("#app");

  const list = document.createElement("ul");
  list.className = "list";

  array.forEach((num, index) => {
    const li = document.createElement("li");
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.id = `bar-${index}`;
    setBarValue(bar, num);

    li.appendChild(bar);
    list.appendChild(li);
  });

  root.appendChild(list);
}

export function updateGraph(value, index) {
  const targetBar = document.querySelector(`#bar-${index}`);
  setBarValue(targetBar, value);
}

export function updateBarValue(index, value) {
  const targetBar = document.querySelector(`#bar-${index}`);
  setBarValue(targetBar, value);
}

export function updateBarColor(color, index) {
  const targetBar = document.querySelector(`#bar-${index}`);
  targetBar.style.background = color;
}

export function updateBarsColor(color, bars) {
  bars.forEach(updateBarColor.bind(null, color));
}

export async function swapWithEffect(arr, effect, a, b) {
  swap(arr, a, b);
  if (a !== b) {
    updateBarsColor(COLOR.SWAPPING, [a, b]);
  } else {
    updateBarColor(COLOR.FINE, a);
  }
  await effect(arr);
  await delay(500);
  updateBarsColor(COLOR.NORMAL, [a, b]);
}

export const defaultEffectFactory = (delayTime) => (arr) =>
  delay(delayTime).then(() => arr.forEach(updateGraph));