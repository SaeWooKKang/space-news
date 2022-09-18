import Header from "../components/common/Header.js";
import UpComing from '../components/UpComing.js';
import Moves from "../components/common/Moves.js";
import Arrow from "../components/common/Arrow.js";

import { $ } from '../utils/dom.js';

function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'NewsPage');

  $('#root').append(
    Header(),
    Moves()
  );
  $wrapper.append(
    UpComing(),
    Arrow()
  );
  return $wrapper;
}

export default News;