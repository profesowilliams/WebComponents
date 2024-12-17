import { LitElement, html, css, unsafeCSS } from 'lit';
import '../../Close';
import customStyles from './ModalClose.scss?inline';

export class ModalClose extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html` <tds-close-button data-bs-dismiss="modal" @click="${this._onClick}"></tds-close-button> `;
  }

  private _onClose(event: CustomEvent) {
    console.log(event.detail.message);
    // Add any additional modal close logic here
  }

  private _onClick() {
    if (this.hasAttribute('data-bs-dismiss') && this.getAttribute('data-bs-dismiss') === 'modal') {
      let modalElement: HTMLElement | null = this;
      while (modalElement && modalElement.tagName !== 'TDS-MODAL') {
        if (modalElement.parentElement) {
          modalElement = modalElement.parentElement;
        } else if ((modalElement.getRootNode() as ShadowRoot).host) {
          modalElement = (modalElement.getRootNode() as ShadowRoot).host as HTMLElement;
        } else {
          modalElement = null;
        }
      }

      if (modalElement) {
        if (modalElement.shadowRoot) {
          const modalContent = modalElement.shadowRoot.querySelector('.modal') as HTMLElement;
          if (modalContent) {
            modalContent.classList.remove('show');
            this.dispatchEvent(
              new CustomEvent('modalClosed', {
                detail: { modal: modalContent },
              })
            );
          }
        }
      }
    }
  }
}

customElements.define('tds-modal-close', ModalClose);
