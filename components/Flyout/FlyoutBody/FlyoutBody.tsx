// src/components/React/FlyoutBody/FlyoutBody.tsx
import { LitElement, html, css, unsafeCSS } from "lit";
import customStyles from "./FlyoutBody.scss?inline";

export class FlyoutBody extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html` <div class="offcanvas-body"><slot></slot></div> `;
  }
}

customElements.define("tds-flyout-body", FlyoutBody);
