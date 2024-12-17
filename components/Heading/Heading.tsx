import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import customStyles from './Heading.scss?inline';

@customElement('tds-heading')
export class Heading extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String }) as: string = 'h2';
  @property({ type: String }) size?: string;
  @property({ type: String }) color?: string;

  private getAriaLevel() {
    const level = parseInt(this.as.replace('h', ''), 10);
    if (level >= 7 && level <= 10) {
      return level;
    }
    return undefined;
  }

  render() {
    const ariaLevel = this.getAriaLevel();
    const sizeClass = this.size ? `size-${this.size}` : '';
    const levelClass = this.as ? this.as : '';
    const colorClass = this.color ? this.color : '';

    return html`
      ${choose(
        this.as,
        [
          ['h1', () => html`<h1 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h1>`],
          ['h2', () => html`<h2 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h2>`],
          ['h3', () => html`<h3 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h3>`],
          ['h4', () => html`<h4 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h4>`],
          ['h5', () => html`<h5 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h5>`],
          ['h6', () => html`<h6 class="${levelClass} ${sizeClass} ${colorClass}"><slot></slot></h6>`],
        ],
        () => html`
          <div class="${levelClass} ${sizeClass} ${colorClass}" role="heading" aria-level="${ifDefined(ariaLevel)}">
            <slot></slot>
          </div>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tds-heading': Heading;
  }
}
