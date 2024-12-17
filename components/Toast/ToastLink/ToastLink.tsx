import { LitElement, html, css, unsafeCSS } from "lit";
import { property } from 'lit/decorators.js';
import '../../Button/Button';
import customStyles from "./ToastLink.scss?inline";

export class ToastLink extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String }) url: string = '';
  @property({ type: String }) target: string = '';

  render() {
    return html`
      <tds-button
        type="link"
        variant="link"
        theme="light"
        label="Button"
        color="cobalt"
        url="${this.url}"
        target="${this.target}"
      >
        <slot></slot>
      </tds-button>
    `;
  }
}

customElements.define("tds-toast-link", ToastLink);
