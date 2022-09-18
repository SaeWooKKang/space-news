import { $ } from '../utils/dom.js';

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

    const upcoming = await getUpcoming();
    
    for (let i = 0; i < upcoming.length; i++) {
      const rocket = upcoming[i].rocket;
      upcoming[i].rocket_img = await getRocketImg(rocket);
    }

    const cards = upcoming.map(obj => Card(obj)); // [element, ...]
    // Loading 제거
    if ($('#Loading')) $('#Loading').remove();
    $wrapper.append(...cards);
  }
  componentDidMounted();

  return $wrapper;
};

export default UpComing;

const getUpcoming = async () => {
  const upcoming = await fetch('https://api.spacexdata.com/v5/launches/upcoming')
    .then(res => res.json()); 
  return upcoming;
}
const getRocketImg = async id => {
  const rocketAPI = 'https://api.spacexdata.com/v4/rockets/';
  const rocketImg = await fetch(rocketAPI + id)
    .then(res => res.json())
    .then(res => res.flickr_images[1]);

  return rocketImg;
}