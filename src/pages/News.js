import Header from "../components/common/Header.js";
import UpComing from '../components/UpComing.js';
import Moves from "../components/common/Moves.js";
import Arrow from "../components/common/Arrow.js";
import ImgSlider from "../components/common/ImgSlider.js";

import { $ } from '../utils/dom.js';
import { slider_imgs } from '../utils/urls.js';

function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'NewsPage');

  $('#root').append(
    Header(),
    Moves()
  );
  $wrapper.append(
    ImgSlider(slider_imgs),
    UpComing(),
    Arrow()
  );
  
  return $wrapper;
}

export default News;