import { routes, router } from "./utils/router.js";

router(routes, window.location.pathname);

window.addEventListener('popstate', () => 
  router(routes, window.location.pathname)
);