import { $ } from './dom.js';

// Page Components
import Landing from '../pages/Landing.js';
import NotFound from '../pages/NotFound.js';
import News from '../pages/News.js';

// [x] class 사용하여 코드 응집도 올리기
  // [x] navigate 함수 클로저 사용 -> path만 받도록 변경
  // [x] ROUTES에 NotFound 컴포넌트 정규표현식 추가
class Router {
  #routes;
  constructor(routes) {
    this.#routes = routes;
  }
  appendComponent(path) {
    const component = this.#routes  
      .find(route => route.path.test(path))
      .component;
   
    $('#root').innerHTML = '';
    $('#root').append(component());
  }
  navigate(path) {
    window.history.pushState({}, null, path);
    this.appendComponent(path);
  }
}
const ROUTES = [
  { path: /^\/$/, component: Landing },
  { path: /^\/news$/, component: News},
  { path: /^\//, component: NotFound},
];

export const router = new Router(ROUTES);