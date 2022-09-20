import { $ } from '../utils/dom.js';
import { get, BASE_URL, getRocketImg } from '../utils/api.js';

import Card from "./common/Card.js";
import Loading from "./common/Loading.js";

function UpComing() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'UpComing');

  const template = `
    <h1>Upcoming.</h1>
  `;
  $wrapper.innerHTML = template;

  const componentDidMounted = async () => {
    // Loading 추가
    $wrapper.append(Loading());

    const upcoming = await get(`${ BASE_URL }/v5/launches/upcoming`);
    const rocket_img_urls = upcoming.map(obj => getRocketImg(obj.rocket));
    const prepared_rocket_img_urls = await Promise.allSettled(rocket_img_urls);

    prepared_rocket_img_urls.forEach((obj, i) => { 
      upcoming[i].rocket_img = obj.value;
    });

    const cards = upcoming.map(obj => Card(obj)); // [element, ...]
    // Loading 제거
    if ($('#Loading')) $('#Loading').remove();
    $wrapper.append(...cards);
  }
  componentDidMounted();

  return $wrapper;
};

export default UpComing;