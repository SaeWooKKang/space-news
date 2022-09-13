import Header from "../components/common/Header.js";

function Landing() {
  const $landing = document.createElement('div');
  $landing.setAttribute('id', 'landingPage');

  $landing.append(
    Header(),
    'Landing Page!'
  );

  return $landing;
};

export default Landing;