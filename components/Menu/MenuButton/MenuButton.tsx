import { LitElement, html, css, unsafeCSS, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import '../../Button';
import customStyles from './MenuButton.scss?inline';

export class MenuButton extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) id = '';
  @property({ type: String }) name = '';

  render() {
    return html`<div class="menu-button"><slot></slot></div>`;
  }
}

customElements.define('tds-menu-button', MenuButton);
