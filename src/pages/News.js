import Header from "../components/common/Header.js";

function News() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Launchplan');

  $wrapper.append(
    'Launch Plan Page!',
    Header()
  );

  return $wrapper;
}

export default News;