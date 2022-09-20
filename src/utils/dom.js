export const $ = selector => document.querySelector(selector);

export const appendLastMent = $target => {
  if ($('.last-page')) return;
  const $last = document.createElement('div');
  $last.classList.add('last-page');
  $last.innerText = '더 이상 데이터가 없습니다.';
  $target.append($last);
}