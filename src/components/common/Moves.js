function Moves() {
  // 위치 이동 box
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Moves');
  
  const template = `
    <a class='move' href='#UpComing'>Upcoming</a>
    <a class='move' href='#Past'>Past</a>
  `;
  $wrapper.innerHTML = template;

  // [x] 문서내 이동(이벤트 위임)
  $wrapper.addEventListener('click', moveToId);
  return $wrapper;
};

export default Moves;

const moveToId = e => {
  if (!e.target.classList.contains('move')) return;
  e.preventDefault();
  let target = document.querySelector(e.target.getAttribute('href'));
  
  window.scrollTo({
    'behavior': 'smooth',
    'top':  target.offsetTop
  });
}