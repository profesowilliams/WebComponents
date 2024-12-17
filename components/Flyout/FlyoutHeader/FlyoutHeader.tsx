import { LitElement, html, css, unsafeCSS } from 'lit';
import '../FlyoutClose';
import '../FlyoutTitle';
import customStyles from './FlyoutHeader.scss?inline';

export class FlyoutHeader extends LitElement {
  dismissType: string;

  static get styles() {
    return css`${unsafeCSS(customStyles)}`;
  }

  constructor() {
    super();
    this.dismissType = 'flyout'; // Default value
  }

  render() {
    return html`
      <div class="offcanvas-header">
        <tds-flyout-title><slot></slot></tds-flyout-title>
        <tds-flyout-close data-bs-dismiss="offcanvas"></tds-flyout-close>
      </div>
    `;
  }
}

customElements.define('tds-flyout-header', FlyoutHeader);
