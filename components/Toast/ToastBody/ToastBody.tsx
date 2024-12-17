// src/components/Lit/Toast/ToastBody/ToastBody.tsx
import { LitElement, html, css, unsafeCSS } from "lit";
import customStyles from "./ToastBody.scss?inline";

export class ToastBody extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html` <div class="toast-body"><slot></slot></div> `;
  }
}

customElements.define("tds-toast-body", ToastBody);
