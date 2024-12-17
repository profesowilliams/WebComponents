import { LitElement, html, css, unsafeCSS } from 'lit';
import customStyles from './MenuText.scss?inline';

export class MenuText extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`<div class="menu-text"><slot></slot></div>`;
  }
}

customElements.define('tds-menu-text', MenuText);
