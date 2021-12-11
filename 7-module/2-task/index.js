import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.template = this.createTemplate();
    this.initAddEventListener();
  }
  createTemplate() {
    return createElement(`
  <div class="container">
  <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>
  </div>
  </div>
`);
  }
  open() {
    document.body.classList.add('is-modal-open');
    document.body.prepend(this.template);
  }
  setTitle(title) {
    const modalTitle = this.template.querySelector('.modal__title');
    modalTitle.textContent = '';
    modalTitle.prepend(title);
  }

  setBody(content) {
    const modalBody = this.template.querySelector('.modal__body');
    modalBody.textContent = '';
    modalBody.insertAdjacentElement('afterbegin', content);
  }

  close() {
    if (document.body.classList.contains('is-modal-open')) {
      document.body.classList.remove('is-modal-open');
    }
    const modalContainer = Array.from(document.querySelectorAll('.container'));
    modalContainer.forEach((item) => {
      item.remove();
    });
  }
  
  initAddEventListener() {
    const closeButton = this.template.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
      this.close();
    }, {onсe: true});

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        event.preventDefault();
        this.close();
      }
      return;
        
    }, {once: true});
  }
}