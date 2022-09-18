import { $ } from "../utils/dom.js";
import Card from "./common/Card.js";
import Loading from "./common/Loading.js";

// 문제
  // 컴포넌트자체가 비동기이다. 
  // router에서는 컴포넌트가 fulfilled가 될때까지 기다렸다 렌더링한다.
  
  // **기존 router순서**
  // 기존 dom을 지우고 
  // 컴포넌트의 비동기요청이 완료되고 template이 완성되면 
  // dom에 mount한다. 
  
  // **문제 발생**
  // 비동기 요청이 완료되지 않았을 때 페이지를 이동한다면 
  // 기존 페이지에 추가로 append하게 된다.

// 해결
  // router함수를 동기함수로 바꾸고
  // 비동기 컴포넌트를 동기로 바꾸고 
  // 비동기 요청에 관한 로직은
  // 'componentDidMount' 함수에 담고 실행한다.
  // 비동기 로직은 요청하고 즉시 종료되고
  // 컴포넌트는 html 요소를 반환한다.
  // componentDidMount함수는 해당 컴포넌트 요소를 
  // '클로저'로 갖는다.
  // 비동기 요청이 완료되면 해당 컴포넌트의 요소에 mount한다.
function Past() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'Past');

  const template = `
    <h1>Past.</h1>
  `;
  $wrapper.innerHTML = template;

  const componentDidMounted = async () => {
    $wrapper.append(Loading());

    const past = await getPast();
  
    let i = 10;
    while(i--) {
      const rocket = past[past.length -1 - i].rocket;
      past[past.length -1 - i].rocket_img = await getRocketImg(rocket);
    }
  
    const cards = [];
    for(let j = 0; j < 10; j++) {
      cards.push(Card(past[past.length - 1 - j]));
    }

    if ($('#Loading')) $('#Loading').remove();
    $wrapper.append(...cards);
  }
  componentDidMounted();

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