// Card 컴포넌트 구현

// [x] dummy 데이터로 Card 컴포넌트 UI 구현
// [ ] 인자로 name, rockets, date_local 받기
  // -> 객체 넘기자

// api 요청 
  // [ ] upcoming에서 name, rockets, date_local 속성 사용 
  // [ ] 시간을 짤라서 사용

  // upcoming에서 rokets ID 가져와서
  // rockets에서 flickr_images 가져오기 

  // 하나의 카드 컴포넌트에는 
  // flickr_image와  upcompimg에서 가져온 정보 필요 


function Card(plan) {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Card');
  
  const template = `
    <div>
      <img class='card-img' src='${ plan.rocket_img }'>
    </div>
    <div class='card-info'>
      <h2>${ plan.name }</h2>
      <p>${ plan.date_local }</p>
    </div>
  `;

  $wrapper.innerHTML = template;

  return $wrapper;
};

export default Card;