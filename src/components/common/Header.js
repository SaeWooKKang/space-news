import { navigate } from '../../utils/router.js'; 

function Header() {
  const $header = document.createElement('header');

  const template = `
    <nav>
      <ul id='navigation'>
        <li><a href='/'>Landing Page</a></li>
        <li><a href='/plan'>Plan Page</a></li>
      </ul>
    </nav>
  `;

  $header.innerHTML = template;

  $header.addEventListener('click', clickLink)

  return $header;
};

export default Header;

const clickLink = e => navigate(e);