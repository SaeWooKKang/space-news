import Card from "./common/Card.js";

// [x] 과거 데이터 추가 
  // [x] Upcoming 컴포넌트와 비슷하므로 참고하여 작업
  // [x] api 호출 순서 확인
  // [x] 실제 응답 확인
  // [x] api 가공
  // [x] 10개만 요청, 더보기 클릭시 추가 요청
  // [x] Upcoming 하단에 추가 
  // [x] 상단에 링크 태그 생성
  // [x] style 적용
async function Past() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'Past');

  // past 데이터 얻고
  const past = await getPast();

  // 최신 10개만 
  // rocket 이미지 url 합치기
  let i = 10;
  while(i--) {
    const rocket = past[past.length -1 - i].rocket;
    past[past.length -1 - i].rocket_img = await getRocketImg(rocket);
  }

  const cards = [];
  for(let j = 0; j < 10; j++) {
    cards.push(Card(past[past.length - 1 - j]));
  }
  
  const template = `
    <h1>Past.</h1>
  `;
  $wrapper.innerHTML = template;
  $wrapper.append(...cards);

  return $wrapper;
};

export default Past;

// 날짜별 오름차순으로 보내줌
// 내림차순으로 10개 뽑고 싶음 
// for문으로 뒤에서 부터 열개 뽑자
// upcoming과 데이터 형식은 동일

// TODO 에러 처리 추가해서 재사용 가능
const getPast = async () => {
  const upcoming = await fetch('https://api.spacexdata.com/v5/launches/past')
    .then(res => res.json()); 
  return upcoming;
}
// TODO 재사용 가능 
const getRocketImg = async roketId => {
  const rocketAPI = 'https://api.spacexdata.com/v4/rockets/';
  const rocketImg = await fetch(rocketAPI + roketId)
    .then(res => res.json())
    .then(res => res.flickr_images[1]);

  return rocketImg;
}