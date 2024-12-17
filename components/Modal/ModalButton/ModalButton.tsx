// src/components/Lit/ModalButton.tsx
import { LitElement, html, css, unsafeCSS, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import '../../Button';
import customStyles from './ModalButton.scss?inline';

export class ModalButton extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Boolean }) primary = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) type = 'button';
  @property({ type: String }) link = '';
  @property({ type: String }) variant = 'primary';
  @property({ type: String }) theme = 'dark';
  @property({ type: Boolean }) minimal = false;
  @property({ type: String }) id = '';
  @property({ type: String }) name = '';
  @property({ type: String }) className = '';
  @property({ type: String }) label = 'Button';
  @property({ type: String }) color = '';
  @property({ type: String }) size = 'medium';
  @property({ type: String }) backgroundColor = '';
  @property({ attribute: false }) onClick = () => {};

  render() {
    return html` <tds-button .primary=${this.primary} .disabled=${this.disabled} .type=${this.type} .link=${this.link} .variant=${this.variant} .theme=${this.theme} .minimal=${this.minimal} .id=${this.id} .name=${this.name} .className=${this.className} .label=${this.label} .color=${this.color} .size=${this.size} .backgroundColor=${this.backgroundColor} .onClick=${this._handleClick.bind(this)}><slot></slot></tds-button> `;
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event: Event) {
    const toggle = this.getAttribute('data-bs-toggle');
    const dismiss = this.getAttribute('data-bs-dismiss');

    if (!toggle && !dismiss) {
      return;
    }

    if (toggle === 'modal' && this.hasAttribute('data-bs-target')) {
      const targetAttr = this.getAttribute('data-bs-target');
      if (targetAttr) {
        const targetId = targetAttr.substring(1);
        const modalElement = document.querySelector('tds-modal')?.shadowRoot?.getElementById(targetId);
        if (modalElement) {
          modalElement.classList.add('show');
        }
      }
    }

    if (dismiss === 'modal') {
      let modalElement: HTMLElement | null = this;
      while (modalElement && modalElement.tagName !== 'TDS-MODAL') {
        if (modalElement.parentElement) {
          modalElement = modalElement.parentElement;
        } else if (modalElement.getRootNode() instanceof ShadowRoot) {
          modalElement = (modalElement.getRootNode() as ShadowRoot).host as HTMLElement;
        } else {
          modalElement = null;
        }
      }

      if (modalElement) {
        const modalInstance = modalElement as any;
        if (modalInstance.closeModal) {
          modalInstance.closeModal();
        }
      }
    }
  }
}

customElements.define('tds-modal-button', ModalButton);
