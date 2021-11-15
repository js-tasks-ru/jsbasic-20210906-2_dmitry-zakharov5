import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.template = this.createTemplate();
    this.insertSliderSteps();
    this.initAddEventListener();
  }

  createTemplate() {
    return createElement(`
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress">
    </div>
    <div class="slider__steps">
      <span class='slider__step-active'>
    </div>
  </div>
    `);
  }

  get elem() {
    return this.template;
  }

  insertSliderSteps() {
    for (let i = 0; i < this.steps - 1 ; i++) {
      const sliderSteps = this.template.querySelector('.slider__steps');
      sliderSteps.insertAdjacentHTML('beforeend', `
      <span></span>
      `);
    }
  }

  initAddEventListener () {
    this.template.addEventListener('click', (event) => {
      let left = event.clientX - this.template.getBoundingClientRect().left;
      let leftRelative = left / this.template.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      this.value = value;
      const sliderSteps = this.template.querySelector('.slider__steps');
      let spans = Array.from(sliderSteps.getElementsByTagName('span'));
      spans.forEach((item, i) => {
        item.classList.remove('slider__step-active');
        if (this.value === i) {
          item.classList.add('slider__step-active');
        }
      });
      const thumb = this.template.querySelector('.slider__thumb');
      const progress = this.template.querySelector('.slider__progress');
      const sliderValue = this.template.querySelector('.slider__value');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.textContent = ''; 
      sliderValue.textContent = value;

      let customEvent = new CustomEvent('slider-change', { 
        detail: this.value,
        bubbles: true 
      });
      this.template.dispatchEvent(customEvent);
    }, false);
  }
}
