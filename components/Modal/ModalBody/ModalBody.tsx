import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import body from './ModalBody.scss?inline';

@customElement('tds-modal-body')
export class ModalBody extends LitElement {
  static styles = css`${unsafeCSS(body)}`;

  render() {
    return html`
      <div class="modal-body">
        <slot></slot>
      </div>
    `;
  }
}