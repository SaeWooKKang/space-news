import { $ } from './dom.js';

export const isItLast = (page, arr) => {
  if (page * 10 > arr.length) return true;
}
export const isItRightPage = selector => {
  if ($(selector)) return true;
  return false;
}
export const isItBottom = () => {
	const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight > scrollHeight - 1) return true;

  return false;
}