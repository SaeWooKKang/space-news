import Past from "../Past.js";
import UpComing from "../UpComing.js";

import { $ } from "../../utils/dom.js";

function Moves() {
  // 위치 이동 box
  const $wrapper = document.createElement('nav');
  $wrapper.setAttribute('id', 'Moves');
  
  const template = `
    <a class='move' href='UpComing'>Upcoming</a>
    <a class='move' href='Past'>Past</a>
  `;
  $wrapper.innerHTML = template;

  $wrapper.addEventListener('click', changeComponent);
  return $wrapper;
};

export default Moves;

// nav 클릭시 하위 컴포넌트 변경(upcoming, past)
const changeComponent = e => {
  e.preventDefault();

  const component_id = e.target.getAttribute('href');
  const $NewsPage = $('#NewsPage');

  // [x] component_id와 이미 마운트되어 있는 컴포넌트인지 확인
  if (component_id == 'UpComing' && !$NewsPage.querySelector('#UpComing')) {
    $NewsPage.querySelector('section').remove();
    $NewsPage.append(UpComing());
  } else if (component_id == 'Past' && !$NewsPage.querySelector('#Past')) {
    $NewsPage.querySelector('section').remove();
    $NewsPage.append(Past());
  }
}