import Header from "../components/common/Header.js";
import UpComing from '../components/UpComing.js';
import Past from "../components/Past.js";
import Moves from "../components/common/Moves.js";

import { $ } from '../utils/dom.js';

async function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'NewsPage');
  
  $('#root').append(
    Header(),
    Moves()
  );
  $wrapper.append(
    await UpComing(),
    await Past()
  );

  return $wrapper;
}

export default News;