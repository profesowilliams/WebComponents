import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import customStyles from './ModalHeader.scss?inline';

@customElement('tds-modal-header')
export class ModalHeader extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }
  
  render() {
    return html`
      <div class="modal-header">
        <slot></slot>
      </div>
    `;
  }
}

export default ModalHeader;
