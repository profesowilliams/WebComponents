import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import customStyles from './ModalTitle.scss?inline';

@customElement('tds-modal-title')
export class ModalTitle extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }
  render() {
    return html`
      <div class="modal-title">
        <slot></slot>
      </div>
    `;
  }
}

export default ModalTitle;
