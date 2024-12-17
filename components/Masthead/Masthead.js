import { LitElement, html, css } from "lit";

class TdsMasthead extends LitElement {
  static get properties() {
    return {
      path: { type: String },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        vertical-align: middle;
        justify-content: center;
        color: var(--tds-icon-color, var(--white, #ffffff));
        pointer-events: none;
        padding: 0 5px;
      }
    `;
  }
  render() {
    return html`
      <tds-header>
        <tds-icon></tds-icon>
        <tds-menu></tds-menu>
        <tds-utility></tds-utility>
      </tds-header>
    `;
  }
}

customElements.define("tds-masthead", TdsMasthead);
