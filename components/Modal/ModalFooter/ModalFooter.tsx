import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import customStyles from './ModalFooter.scss?inline';

@customElement('tds-modal-footer')
export class ModalFooter extends LitElement {
  static styles = css`${unsafeCSS(customStyles)}`;

  render() {
    return html`
      <div class="modal-footer">
        <slot></slot>
      </div>
    `;
  }
}

export default ModalFooter;