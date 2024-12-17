import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { property } from 'lit/decorators.js';
import customStyles from './Button.scss?inline';

/**
 * @prop {boolean} primary - Indicates if the button is primary
 * @prop {boolean} disabled - Checks if the button should be disabled
 * @prop {string} type - The type of the button (e.g., 'button' or 'link')
 * @prop {string} link - The URL link for the button if type is 'link'
 * @prop {string} variant - The variant of the button (e.g., 'primary', 'secondary')
 * @prop {string} theme - The theme of the button
 * @prop {boolean} compact - Indicates if the button should be compact
 * @prop {string} id - The id of the button
 * @prop {string} name - The name of the button
 * @prop {string} className - The class of the button
 * @prop {string} label - The label of the button
 * @prop {string} color - The color of the button
 * @prop {string} size - The size of the button (e.g., 'small', 'medium', 'large')
 * @prop {string} backgroundColor - The background color of the button
 * @prop {function} onClick - The click handler for the button
 * @summary This is a custom button element
 * @tag tds-button
 */

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: string;
  url?: string;
  target?: string;
  variant?: string;
  theme?: string;
  id?: string;
  name?: string;
  className?: string;
  color?: string;
  compact?: boolean; // Add compact property to the interface
}

export class Button extends LitElement {
    static get styles() {
      return css`
        ${unsafeCSS(customStyles)}
      `;
    }

  @property({ type: Boolean, reflect: true }) primary = false;
  @property({ type: String, reflect: true }) backgroundColor = '';
  @property({ type: String, reflect: true }) size = 'medium';
  @property({ type: String, reflect: true }) label = '';
  @property({ attribute: false }) onClick: () => void = () => {};
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) type = 'button';
  @property({ type: String, reflect: true }) url = '';
  @property({ type: String, reflect: true }) target = '';
  @property({ type: String, reflect: true }) variant = 'primary';
  @property({ type: String, reflect: true }) theme = 'light';
  @property({ type: String, reflect: true }) id = '';
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String, reflect: true }) className = '';
  @property({ type: String, reflect: true }) color = '';
  @property({ type: Boolean, reflect: true }) compact = false;

  constructor() {
    super();
    this.type = 'button';
    this.label = 'Button';
    this.theme = 'light';
    this.variant = 'primary';
    this.compact = false;
    this.disabled = false;
  }

  render() {
    return html`
      ${choose(
        this.type,
        [
          [
            'link',
            () => html`
              <a
                id=${this.id}
                name=${this.name}
                class="btn btn-${this.variant}"
                data-bs-theme=${this.theme}
                data-bs-variant=${this.variant}
                data-bs-color=${this.color}
                ?data-bs-compact=${this.compact}
                data-bs-background-color=${this.backgroundColor}
                href=${this.url}
                target=${this.target}
                ?disabled=${this.disabled}
                aria-label="${this.ariaLabel || nothing}"
                style="align-content: center;"
              >
                <slot>${this.label}</slot>
              </a>
            `,
          ],
          [
            'button',
            () => html`
              <button
                id=${this.id}
                name=${this.name}
                class="btn btn-${this.variant}"
                data-bs-theme=${this.theme}
                data-bs-variant=${this.variant}
                data-bs-color=${this.color}
                ?data-bs-compact=${this.compact}
                data-bs-background-color=${this.backgroundColor}
                type="button"
                ?disabled=${this.disabled}
                aria-label="${this.ariaLabel || nothing}"
                style="align-content: center;"
              >
                <slot>${this.label}</slot>
              </button>
            `,
          ],
        ],
        () => html`<h1>Error</h1>`
      )}
    `;
  }
}

customElements.define('tds-button', Button);
