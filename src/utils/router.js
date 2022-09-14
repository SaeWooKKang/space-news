import { $ } from './dom.js';

// Page Components
import Landing from '../pages/Landing.js';
import NotFound from '../pages/NotFound.js';
import News from '../pages/News.js';

export const routes = [
  { path: /^\/$/, component: Landing },
  { path: /^\/news$/, component: News}
];

// 비동기 요청 사용하는 컴포넌트 렌더링 위해서 
// async:await 사용
export const router = async (routes, path) => {
  const component = routes
    .find(route => route.path.test(path))
    ?.component || NotFound;
  
  $('#root').innerHTML = '';
  $('#root').append(await component());
};

// [x] 현재 header a태그에 종속적인데 path 받아서도 이동 할 수 있도록 구현
  // => 클로저 활용
export const navigate = path => e => {
  if (path) {
    window.history.pushState({}, null, path);
    router(routes, path);
  } 
  else {
    if (!e.target.matches('#navigation > li > a')) return;
    e.preventDefault();

    const path = e.target.getAttribute('href');
    
    window.history.pushState({}, null, path);
    router(routes, path);
  }
};
