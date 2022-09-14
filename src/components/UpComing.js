import Card from "./common/Card.js";

async function UpComing() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'UpComing');

  // upcoming데이터 얻고
  const upcoming = await getUpcoming();

  // rocket 이미지 url 합치기
  for (let i = 0; i < upcoming.length; i++) {
    const rocket = upcoming[i].rocket;
    upcoming[i].rocket_img = await getRocketImg(rocket);
  }
  const cards = upcoming.map(obj => Card(obj)); // [element, ...]
  
  const template = `
    <h1>Upcoming.</h1>
  `;
  $wrapper.innerHTML = template;
  $wrapper.append(...cards);

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