import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './Template.scss?inline';

export class Template extends LitElement {
  @property({ type: String }) title: string = 'Default Title';
  @property({ type: Boolean }) visible: boolean = true;

  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <div class="template-container">
        <h1>${this.title}</h1>
        <slot></slot>
      </div>
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('visible')) {
      this.style.display = this.visible ? 'block' : 'none';
    }
  }
}

customElements.define('tds-template', Template);
export default Template;
