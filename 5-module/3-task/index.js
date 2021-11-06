function initCarousel() {
  const forwardArrow = document.querySelector('.carousel__arrow_right');
  const backArrow = document.querySelector('.carousel__arrow_left');
  const carouselTape = document.querySelector('.carousel__inner');
  const carouselSlide = document.querySelectorAll('.carousel__slide');
  let tapeOffsetWidh = carouselTape.offsetWidth;
  let position = 0;
  let counter = 1;

  if (counter === 1) {
    backArrow.style.display = 'none';
  }

  function moveTapeForward() {
    counter++;

    position += tapeOffsetWidh;
    carouselTape.style.transform = 'translateX(-' + position + 'px)';

    if (counter > 1) {
      backArrow.style.display = '';
    }
    
    if (counter === carouselSlide.length) {
      forwardArrow.style.display = 'none';
    }
  }

  function moveTapeBack() {
    --counter;
    position -= tapeOffsetWidh;
    carouselTape.style.transform = 'translateX(-' + position + 'px)';

    if (counter > 1) {
      backArrow.style.display = '';
    }

    if (counter === 1) {
      backArrow.style.display = 'none';
    }
    if (counter < carouselSlide.length) {
      forwardArrow.style.display = '';
    }
  }
  forwardArrow.addEventListener('click', moveTapeForward, false);
  backArrow.addEventListener('click', moveTapeBack, false);
}