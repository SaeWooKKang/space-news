import { router } from "./utils/router.js";

// [x] app 함수로 초기 실행 감싸기
const app = () => {
  router.navigate(window.location.pathname);

  window.addEventListener('popstate', () => 
    router.navigate(window.location.pathname)
  );
}

app();