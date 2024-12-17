// src/components/Lit/Modal.tsx
import { LitElement, html, css, unsafeCSS, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import customStyles from './Modal.scss?inline';

type ModalPlacement = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'inline';

export class Modal extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Boolean, reflect: true }) show: boolean = false;
  @property({ type: Boolean, reflect: true }) fade: boolean = false;
  @property({ type: Boolean }) backdrop: boolean | 'static' = false;
  @property({ type: String, reflect: true }) size: string = 'md';
  @property({ type: Boolean, reflect: true }) centered: boolean = false;
  @property({ type: Boolean, reflect: true }) fullscreen: boolean = false;
  @property({ type: Boolean, reflect: true }) scrollable: boolean = false;
  @property({ type: String }) dialogClassName: string = '';
  @property({ type: String }) contentClassName: string = '';
  @property({ type: String }) backdropClassName: string = '';
  @property({ type: String }) placement: ModalPlacement = 'middle-center';

  static position: Record<ModalPlacement, string> = {
    'top-left': 'top-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'top-right': 'top-0 end-0',
    'middle-left': 'top-50 start-0 translate-middle-y',
    'middle-center': 'modal-dialog-centered',
    'middle-right': 'top-50 end-0 translate-middle-y',
    'bottom-left': 'bottom-0 start-0',
    'bottom-center': 'bottom-0 start-50 translate-middle-x',
    'bottom-right': 'bottom-0 end-0',
    'inline': 'modal-dialog-inline position-absolute bottom-0 end-0 m-0',
  };

  static get placementOptions() {
    return Object.keys(this.position) as ModalPlacement[];
  }

  constructor() {
    super();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('backdrop') || changedProperties.has('placement')) {
      this._updateBackdropClass();
    }
  }

  _updateBackdropClass() {
    if (this.backdrop === true || this.backdrop === 'static' || this.placement === 'inline') {
      this.classList.add('modal-backdrop');
    } else {
      this.classList.remove('modal-backdrop');
    }
  }

  getPlacementClasses() {
    return Modal.position[this.placement] || '';
  }

  closeModal() {
    this.show = false;
    this.classList.remove('modal-backdrop');
  }

  render() {
    const modalClasses = {
      modal: true,
      [`modal-${this.size}`]: true,
      fade: this.fade,
      show: this.show,
    };

    return html`
      <div id="modal" class=${classMap(modalClasses)} tabindex="-1" role="dialog">
        <div class="modal-dialog ${this.getPlacementClasses()} ${this.scrollable ? 'modal-dialog-scrollable' : ''}">
          <div class="modal-content ${this.contentClassName}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('tds-modal', Modal);
export default Modal;

declare global {
  interface HTMLElementTagNameMap {
    'tds-modal': Modal;
  }
}
