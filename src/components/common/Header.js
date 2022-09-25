import { navigate } from '../../utils/router.js'

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
  
  $header.addEventListener('click', navigate())

  return $header;
};

export default Header;