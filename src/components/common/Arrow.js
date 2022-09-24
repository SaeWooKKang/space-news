// 상단 이동 화살표 컴포넌트
function Arrow() {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Arrow');

  const template = `
    <img src='../../assets/arrow.svg'>
  `;
  $wrapper.innerHTML = template;
  $wrapper.addEventListener('click', moveToTop);

  return $wrapper;
};

export default Arrow;

// [x] 상단으로 이동
const moveToTop = () => {
  const target = document.querySelector('section');
  window.scrollTo({
    'behavior': 'smooth',
    'top':  target.offsetTop
  });
}