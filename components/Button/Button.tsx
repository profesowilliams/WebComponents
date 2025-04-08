import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { property } from 'lit/decorators.js';
import customStyles from './Button.scss?inline';
/**
 * @class Button
 * @extends LitElement
 * @summary A custom button component that supports various configurations, including links, themes, and styles.
 * @description
 * This `Button` component can render as a standard button or a link, with customizable properties for styling,
 * behavior, and accessibility. It is built using the Lit framework and supports various themes, sizes, and states.
 *
 * @tag tds-button
 * @example
 * // Example usage in HTML:
 * <tds-button
 *   primary
 *   size="large"
 *   background-color="blue"
 *   variant="secondary"
 * >Click Me</tds-button>
 *
 * @example
 * // Example usage in JavaScript:
 * const button = document.createElement('tds-button');
 * button.label = 'Click Me';
 * button.primary = true;
 * button.addEventListener('click', () => console.log('Button clicked!'));
 * document.body.appendChild(button);
 */
export class Button extends LitElement {
  /**
   * Indicates whether the button is a primary button.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) primary = false;

  /**
   * The background color of the button.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) backgroundColor = '';

  /**
   * The size of the button. Can be 'small', 'medium', or 'large'.
   * @type {'small' | 'medium' | 'large'}
   * @default 'medium'
   */
  @property({ type: String, reflect: true }) size = 'medium';

  /**
   * The label displayed on the button.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) label = '';

  /**
   * Click handler for the button.
   * @type {() => void}
   * @default () => {}
   */
  @property({ attribute: false }) onClick: () => void = () => {};

  /**
   * Indicates whether the button is disabled.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The type of the button, either 'button' or 'link'.
   * @type {'button' | 'link'}
   * @default 'button'
   */
  @property({ type: String, reflect: true }) type = 'button';

  /**
   * The URL to navigate to if the button type is 'link'.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) url = '';

  /**
   * The target attribute for the link, used if the button type is 'link'.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) target = '';

  /**
   * The visual variant of the button. Can be 'primary', 'secondary', etc.
   * @type {string}
   * @default 'primary'
   */
  @property({ type: String, reflect: true }) variant = 'primary';

  /**
   * The theme of the button. Can be 'light' or 'dark'.
   * @type {string}
   * @default 'light'
   */
  @property({ type: String, reflect: true }) theme = 'light';

  /**
   * The ID of the button element.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) id = '';

  /**
   * The name of the button element.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) name = '';

  /**
   * The custom class name for the button.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) className = '';

  /**
   * The color of the button.
   * @type {string}
   * @default ''
   */
  @property({ type: String, reflect: true }) color = '';

  /**
   * Indicates whether the button should have a compact style.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) compact = false;

  /**
   * The constructor initializes default property values.
   */
  constructor() {
    super();
    this.type = 'button';
    this.label = 'Button';
    this.theme = 'light';
    this.variant = 'primary';
    this.compact = false;
    this.disabled = false;
  }

  /**
   * The render method returns the HTML template for the button.
   * Depending on the `type` property, it renders either a `<button>` or an `<a>` element.
   *
   * @returns {TemplateResult}
   */
  render() {
    return html`
      ${choose(
        this.type,
        [
          [
            'link',
            () => html`
              <a id=${this.id} name=${this.name} class="btn btn-${this.variant}" data-bs-theme=${this.theme} data-bs-variant=${this.variant} data-bs-color=${this.color} ?data-bs-compact=${this.compact} data-bs-background-color=${this.backgroundColor} href=${this.url} target=${this.target} ?disabled=${this.disabled} aria-label="${this.ariaLabel || nothing}" style="align-content: center;">
                <slot>${this.label}</slot>
              </a>
            `,
          ],
          [
            'button',
            () => html`
              <button id=${this.id} name=${this.name} class="btn btn-${this.variant}" data-bs-theme=${this.theme} data-bs-variant=${this.variant} data-bs-color=${this.color} ?data-bs-compact=${this.compact} data-bs-background-color=${this.backgroundColor} type="button" ?disabled=${this.disabled} aria-label="${this.ariaLabel || nothing}" style="align-content: center;">
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
