import Header from "../components/common/Header.js";
import UpComing from '../components/UpComing.js';

import {$} from '../utils/dom.js';

// [x] 비동기 요청 기다리기까지 header먼저 보이게 하기
  // [x] root dom에 먼저 넣는것으로 해결

// [x] Upcoming Title 
async function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'NewsPage');

  $('#root').append(
    Header()
  );
  $wrapper.append(
    await UpComing()
  );

  return $wrapper;
}

export default News;