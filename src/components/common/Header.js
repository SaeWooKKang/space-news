import { navigate } from '../../utils/router.js'

function Header() {
  const $header = document.createElement('header');

  const template = `
    <nav>
      <ul id='navigation'>
        <li><a href='/'>Home</a></li>
        <li><a href='/news'>News</a></li>
      </ul>
    </nav>
  `;

  $header.innerHTML = template;

  $header.addEventListener('click', clickLink)

  return $header;
};

export default Header;

const clickLink = e => navigate(e);