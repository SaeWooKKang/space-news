import { get, BASE_URL, getRocketImg } from "../utils/api.js";
import { $ } from "../utils/dom.js";

import Card from "./common/Card.js";
import Loading from "./common/Loading.js";

function Past() {
  const $wrapper = document.createElement('section');
  $wrapper.setAttribute('id', 'Past');

  const template = `
    <h1>Past.</h1>
  `;
  $wrapper.innerHTML = template;

  // 무한 스크롤 구현
  // [x] 초기 10개 요청
  // [x] 스크롤 바닥 닿는 이벤트 생성
  // [x] 스크롤이 바닥에 닿게 되면 10개의 아이템을 볼러온다.
  // [x] 10개의 아이템을 불러오는 시간동안 로딩 UI를 띄운다.
  // [x] 아이템이 다 불러와지면 로딩 컴포넌트를 지운다. 
  // [x] 아이템이 다 불러와지면 무한 스크롤은 멈추게 된다. 

  // 순서
  // 10개씩 데이터 불러와야 하니깐 
  // 어디까지 불러왔는지 page 저장 변수 필요하고
  // -> sessionStorage 사용 

  // 다음 페이지부터
  // past를 10개 단위로 img_url 가져오고
  // page++ 시키고
  // past에 로켓 주소 붙이고
  // Cards 컴포넌트 호출해서
  // 기존 element에 append 하기
  const componentDidMounted = async () => {
    $wrapper.append(Loading());

    const past = await get(`${ BASE_URL }/v5/launches/past`);
    past.reverse();

    if ($('#Loading')) $('#Loading').remove();

    mountTenItmems(past)(1, $wrapper);
    
    sessionStorage.setItem('past', JSON.stringify(past));
    sessionStorage.setItem('page', 2);
  }
  componentDidMounted();

  return $wrapper;
};

export default Past;

window.addEventListener('scroll',()=> {
  if (!$('#Past')) return;
	const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight > scrollHeight - 1) {
    const $target = $('#Past');
    let page = Number(sessionStorage.getItem('page'));
    const past = JSON.parse(sessionStorage.getItem('past'));

    if (page * 10 > past.length){
      if ($('.last-page')) return;

      const $last = document.createElement('div');
      $last.classList.add('last-page');
      $last.innerText = '더 이상 데이터가 없습니다.';
      $target.append($last);

      return;
    };

    mountTenItmems(past)(page, $target);

    sessionStorage.setItem('page', ++page);
	}
});

const mountTenItmems = past => async (page, $target) => {
    
  // 로딩 컴포넌트 mount
  if(!$('#Loading'))  $target.append(Loading());

  // 요청갯수 확인
  const requestMaxLength = past.length;
  const rocket_img_urls = []; 
  for (let i = (page - 1) * 10; i < page * 10; i++ ) {
    if (requestMaxLength <= i) break;

    const rocket_img_url = getRocketImg(past[i].rocket);
    rocket_img_urls.push(rocket_img_url);
  }

  // 결합 하는 부분
  const prepared_rocket_img_urls = await Promise.allSettled(rocket_img_urls); 
  prepared_rocket_img_urls.forEach((obj, i) => { 
    past[(page - 1) * 10 + i].rocket_img = obj.value;
  });

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