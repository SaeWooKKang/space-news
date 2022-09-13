import { $ } from './dom.js';

// Page Components
import Landing from '../pages/Landing.js';
import NotFound from '../pages/NotFound.js';
import News from '../pages/News.js';

export const routes = [
  { path: /^\/$/, component: Landing },
  { path: /^\/news$/, component: News}
];
export const router = (routes, path) => {
  const component = routes
    .find(route => route.path.test(path))
    ?.component || NotFound;
  
  $('#root').innerHTML = '';
  $('#root').append(component());
};
export const navigate = e => {
  // [x] 여기에 유효성 검사 넣기 
  if (!e.target.matches('#navigation > li > a')) return;
  e.preventDefault();

  const path = e.target.getAttribute('href');
  
  window.history.pushState({}, null, path);
  router(routes, path);
};