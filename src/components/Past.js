import { get, BASE_URL, getRocketImg } from "../utils/api.js";
import { $ } from "../utils/dom.js";
import { isItLast, isItRightPage, isItBottom} from '../utils/index.js';
import { appendLastMent } from "../utils/dom.js";

import Card from "./common/Card.js";
import Loading from "./common/Loading.js";

// 리팩토링
// [x] 로직 분리
function Past() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'Past');

  const template = `
    <h1>Past.</h1>
  `;
  $wrapper.innerHTML = template;

  const componentDidMounted = async () => {
    $wrapper.append(Loading());

    const past = await get(`${ BASE_URL }/v5/launches/past`);
    
    past.reverse();

    if ($('#Loading')) $('#Loading').remove();

    mountTenItems(past)(1, $wrapper);
    sessionStorage.setItem('past', JSON.stringify(past));
    sessionStorage.setItem('page', 2);
  }
  componentDidMounted();

  return $wrapper;
};

export default Past;

const getInfinitePast = async () => {
  const $target = $('#Past');
    let page = Number(sessionStorage.getItem('page'));
    const past = JSON.parse(sessionStorage.getItem('past'));

    if (isItLast(page, past)) {
      appendLastMent($target);
      return;
    } 
    await mountTenItems(past)(page, $target)
    
    sessionStorage.setItem('page', ++page);
}
const getTenLocketImg = (past, page) => {
  const requestMaxLength = past.length;
  const res = []; 
  for (let i = (page - 1) * 10; i < page * 10; i++ ) {
    if (requestMaxLength <= i) break;
    
    const rocket_img_url = getRocketImg(past[i].rocket);
    res.push(rocket_img_url);
  }
  return res;
}
const mergeRocketImg = async (past, img_urls, page) => {
  const prepared_rocket_img_urls = await Promise.allSettled(img_urls); 
  prepared_rocket_img_urls.forEach((obj, i) => { 
    past[(page - 1) * 10 + i].rocket_img = obj.value;
  });
}
const mountTenItems = past => async (page, $target) => {
  // 로딩 컴포넌트 mount
  if(!$('#Loading')) $target.append(Loading());
  // 10개 단위 요청
  const rocket_img_urls = getTenLocketImg(past, page);
  // 결합 하는 부분
  await mergeRocketImg(past, rocket_img_urls, page);
  // cards 컴포넌트 만드는 부분
  let cards = [];
  for (let i = (page - 1) * 10; i < page * 10; i++) {
    cards.push(Card(past[i]));
  }
  // 로딩 컴포넌트 unmount
  if ($('#Loading')) $('#Loading').remove();
  // mount 하는 부분
  $target.append(...cards);
}
window.addEventListener('scroll', ()=> {
  if (!isItRightPage('#Past')) return;

  if (isItBottom()) getInfinitePast();
});