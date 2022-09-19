import { get, BASE_URL, getRocketImg } from "../utils/api.js";
import { $ } from "../utils/dom.js";

import Card from "./common/Card.js";
import Loading from "./common/Loading.js";

// [x] 모든 데이터 요청시 응답시간 체크
// [ ] 10개 단위로 요청 
function Past() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'Past');

  const template = `
    <h1>Past.</h1>
  `;
  $wrapper.innerHTML = template;

    // 문제 
    // 요청이 완료된 후 다음 요청을 하므로 
    // 요청(1) -> 요청 완료 -> 요청(2) -> 요청 완료 -> 요청(3) ...ing
    // 약 200개의 요청에 대해 약 3.3초가 걸림

    // 해결
    // Promise.allSettled 사용하자
    // Promise.allSettled([ P1, p2, ... ])
    // 약 200개의 요청에 대해 약 1.5초가 걸림

      // ==> 약 2배의 응답 속도 증가
  const componentDidMounted = async () => {
    $wrapper.append(Loading());
    
    const past = await get(`${ BASE_URL }/v5/launches/past`);
    past.reverse();
    const rocket_img_urls = past.map(obj => getRocketImg(obj.rocket));
    const prepared_rocket_img_urls = await Promise.allSettled(rocket_img_urls);

    prepared_rocket_img_urls.forEach((obj, i) => { 
      past[i].rocket_img = obj.value;
    });

    const cards = past.map(obj => Card(obj)); // [element, ...]

    if ($('#Loading')) $('#Loading').remove();

    $wrapper.append(...cards);
  }
  componentDidMounted();

  return $wrapper;
};

export default Past;