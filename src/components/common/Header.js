import { router } from '../../utils/router.js'


function Header() {
  const $header = document.createElement('header');
  $header.setAttribute('id', 'Header');

  const template = `
    <nav>
      <ul id='navigation'>
        <li><a href='/'>Home</a></li>
        <li><a href='/news'>News</a></li>
      </ul>
    </nav>
  `;

  $header.innerHTML = template;
  
  $header.addEventListener('click', move);

  return $header;
};

export default Header;

const move = e => {
  if (!e.target.matches('#navigation > li > a')) return;
  e.preventDefault();
  const path = e.target.getAttribute('href');

  router.navigate(path);
}