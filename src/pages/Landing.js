import Header from "../components/common/Header.js";
import Home from "../components/Home.js";

// 구현 사항
// [x] 페이지 width, height css
function Landing() {
  const $landing = document.createElement('div');
  $landing.setAttribute('id', 'landingPage');

  $landing.append(
    Header(),
    Home()
  );

  return $landing;
};

export default Landing;