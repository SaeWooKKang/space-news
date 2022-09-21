// 이미지 슬라이드 구현
  // [x] 템플릿 구현 
  // [x] makeSliders 함수 구현
const ImgSlider = (imgs) => {
  const $slider = document.createElement('div');
  $slider.setAttribute('id', 'Slider');

  // 미리 img 템플릿에 등록해두고
  const template = `
    <ul class="slides">
      ${ 
        imgs.map(img => `
          <li class="slide">
            <img src="${ img }">
          </li>`
        )
        .join('')
      }
    </ul>
  `;
  $slider.innerHTML = template;

  makeSlides($slider);

  return $slider;
  }

export default ImgSlider;

const makeSlides = $slider => {
  let $slides = $slider.querySelector('.slides');
  let $slide = $slides.querySelectorAll('.slide');

  let currentSlide = 0;

  setInterval(() => {
    let from = -(700 * currentSlide);
    let to = from - 700;
    
    $slides.animate({
        marginLeft: [from + "px", to + "px"]
    }, {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
    currentSlide++;
    if (currentSlide === ($slide.length - 1)) {
        currentSlide = 0;
    }
  }, 2500);
}