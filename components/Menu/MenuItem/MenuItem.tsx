import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './MenuItem.scss?inline';

export class MenuItem extends LitElement {
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) href: string | undefined = undefined;

  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <div class="dropdown-item">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tds-menu-item', MenuItem);
export default MenuItem;
