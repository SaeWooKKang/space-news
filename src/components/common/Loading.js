const Loading = () => {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Loading');

  const template = `
    <div class="ball first"></div>
    <div class="ball second"></div>
    <div class="ball third"></div>
  `;

  $wrapper.innerHTML = template;

  return $wrapper;
}

export default Loading;