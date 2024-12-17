import { LitElement, html, css, unsafeCSS } from 'lit';
import '../ToastClose';
import customStyles from './ToastHeader.scss?inline';

export class ToastHeader extends LitElement {
  variant: string;

  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  constructor() {
    super();
    this.variant = ''; // Default value
  }

  connectedCallback() {
    super.connectedCallback();
    this._setVariant();
  }

  _setVariant() {
    // Find the closest parent 'tds-toast' and get its 'variant' attribute
    const parentToast = this.closest('tds-toast');
    if (parentToast) {
      this.variant = parentToast.getAttribute('variant') || '';
    }
  }

  render() {
    return html`
      <div class="toast-header ${this.variant}">
        <div class="me-auto"><slot></slot></div>
        <tds-toast-close data-bs-dismiss="toast"></tds-toast-close>
      </div>
    `;
  }
}

customElements.define('tds-toast-header', ToastHeader);
