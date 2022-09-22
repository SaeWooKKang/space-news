import { navigate } from "../utils/router.js";

// 구현 사항
// [x] 이미지 비동기 요청 로직
  // api의 이미지 응답이 매우 느림 -> 고정 이미지 
// [x] 서비스 멘트 
// [x] news 페이지 이동 버튼
  // [x] navigate 기능 구현
function Home() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'home');

  const template = `
    <h1 class='home-ment'>
      Are you interested in spaceX's plan?
    </h1>
    <button class='home-btn'>
      Watch the news
    </button>
  `;

  $wrapper.innerHTML = template;

  $wrapper.querySelector('.home-btn').addEventListener(
    'click',
    navigate('/news')
  );

  return $wrapper;
};

export default Home;