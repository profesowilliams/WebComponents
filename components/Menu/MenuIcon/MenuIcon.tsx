import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import '../../Icon';
import customStyles from './MenuIcon.scss?inline';

export class MenuIcon extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String, reflect: true }) name = '';
  @property({ type: String, reflect: true }) state = 'default';
  @property({ type: String, reflect: true }) size = '24';
  @property({ type: String, reflect: true }) viewbox = '0 0 24 24';
  @property({ type: String, reflect: true }) flip = '';
  @property({ type: String, reflect: true }) rotate = '';
  @property({ type: String, reflect: true }) width = '';
  @property({ type: String, reflect: true }) height = '';
  @property({ type: String, reflect: true }) svgContent = '';

  render() {
    return html` <tds-icon .name=${this.name} .state=${this.state} .size=${this.size} .viewbox=${this.viewbox} .flip=${this.flip} .rotate=${this.rotate} .width=${this.width} .id=${this.id} .name=${this.name} .className=${this.className} .height=${this.height}><slot></slot></tds-icon> `;
  }
}

customElements.define('tds-menu-icon', MenuIcon);
