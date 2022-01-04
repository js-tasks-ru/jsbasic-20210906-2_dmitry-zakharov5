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
      <span class='slider__step-active'></span>
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
  
  defaultStep(steps, value) {
    const thumb = this.template.querySelector('.slider__thumb');
    const sliderSteps = this.template.querySelector('.slider__steps');
    const progress = this.template.querySelector('.slider__progress');
    const sliderValue = this.template.querySelector('.slider__value');
    let segment = steps - 1;
    let percents = (value * 100) / segment;
    let spans = Array.from(sliderSteps.getElementsByTagName('span'));
    spans[value].classList.add('slider__step-active');
    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
    sliderValue.textContent = `${value}`; 
    sliderValue.textContent = value;

  }

  onContainerClick(event) {
    const thumb = this.template.querySelector('.slider__thumb');
    const sliderSteps = this.template.querySelector('.slider__steps');
    const progress = this.template.querySelector('.slider__progress');
    const sliderValue = this.template.querySelector('.slider__value');

    let left = event.clientX - this.template.getBoundingClientRect().left;
    let leftRelative = left / this.template.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.value = value;
    let spans = Array.from(sliderSteps.getElementsByTagName('span'));
    spans.forEach((item, i) => {
      item.classList.remove('slider__step-active');
      if (this.value === i) {
        item.classList.add('slider__step-active');
      }
    });
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = ''; 
    sliderValue.textContent = value;

    let customEvent = new CustomEvent('slider-change', { 
      detail: this.value,
      bubbles: true 
    });
    this.template.dispatchEvent(customEvent);
  }

  onPointerDown() {
    const thumb = this.template.querySelector('.slider__thumb');
    const sliderSteps = this.template.querySelector('.slider__steps');
    const progress = this.template.querySelector('.slider__progress');
    const sliderValue = this.template.querySelector('.slider__value');

    const onMove = (event) => {
      this.template.classList.add('slider_dragging');

      let left = event.clientX - this.template.getBoundingClientRect().left;
      let leftRelative = left / this.template.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }    
      if (leftRelative > 1) {
        leftRelative = 1;
      } 

      let leftPercents = leftRelative * 100;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.textContent = ''; 
      sliderValue.textContent = value;
      this.value = value;

      let spans = Array.from(sliderSteps.getElementsByTagName('span'));
      spans.forEach((item, i) => {
        item.classList.remove('slider__step-active');
        if (this.value === i) {
          item.classList.add('slider__step-active');
        }
      });
    };

    document.addEventListener('pointermove', onMove, false);

    document.addEventListener('pointerup', () => {
      let customEvent = new CustomEvent('slider-change', { 
        detail: this.value,
        bubbles: true 
      });
      this.template.dispatchEvent(customEvent);
      
      this.template.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onMove, false);

    }, {once: true});
  }
   
  initAddEventListener () {
    const thumb = this.template.querySelector('.slider__thumb');

    this.template.addEventListener('click', (event) => {
      this.onContainerClick(event);
    });
  
    thumb.ondragstart = (event) => {
      event.preventDefault();
    };

    thumb.addEventListener('pointerdown', () => {
      this.onPointerDown();
    });

  }
}