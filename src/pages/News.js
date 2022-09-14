import Header from "../components/common/Header.js";
import Card from "../components/common/Card.js";

// [x] width, height 지정
// [x] Card 컴포넌트 구현
// [x] 비동기 요청 
// [ ] 비동기 요청 기다리기까지 header먼저 보이게 하기
async function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'NewsPage');

  // 컴포넌트로 분리할 것.
  const $foo = document.createElement('div');
  // upcoming데이터 얻고
  const upcoming = await getUpcoming();
  // upcoming의 rocket id로 rocket img 구하기 
    // -> upcoming에 속성 합침
  for (let i = 0; i < upcoming.length; i++) {
    const rocket = upcoming[i].rocket;
    upcoming[i].rocket_img = await getRocketImg(rocket);
  }
  const template = upcoming.map(obj => Card(obj)); // [element, ...]
  $foo.append(...template);
  
  $wrapper.append(
    Header(),
    $foo
  );

  return $wrapper;
}

export default News;

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