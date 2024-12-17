import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import customStyles from './FlyoutTitle.scss?inline';

@customElement('tds-flyout-title')
export class FlyoutTitle extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }
  render() {
    return html` <h5 class="offcanvas-title" id="offcanvasLabel"><slot></slot></h5> `;
  }
}

export default FlyoutTitle;
