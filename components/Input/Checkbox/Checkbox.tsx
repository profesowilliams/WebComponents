import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './Checkbox.scss?inline';

/**
 * `tds-checkbox` is a custom checkbox element with indeterminate state support.
 *
 * @customElement tds-checkbox
 * @extends LitElement
 *
 * @property {boolean} checked - Indicates whether the checkbox is checked.
 * @property {boolean} disabled - Indicates whether the checkbox is disabled.
 * @property {string} id - The id attribute of the checkbox.
 * @property {boolean} indeterminate - Indicates whether the checkbox is in an indeterminate state.
 * @property {string} label - The label for the checkbox.
 */
export class Checkbox extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) id = '';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: String }) label = '';

  /**
   * Handles the change event for the checkbox.
   *
   * @param {Event} e - The change event object.
   */
  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    if (this.checked) {
      this.indeterminate = false; // Reset indeterminate state if checked
    }

    // Dispatch a custom event to propagate the change
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, indeterminate: this.indeterminate },
        bubbles: true,
        composed: true, // Ensures the event crosses shadow DOM boundaries
      })
    );
  }

  /**
   * Called when the element's properties change.
   *
   * @param {Map} changedProperties - A map of changed properties.
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('indeterminate')) {
      const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
      if (input) {
        input.indeterminate = this.indeterminate;
        if (this.indeterminate) {
          this.checked = false; // Ensure checked is false if indeterminate is true
        }
      }
    }
  }

  /**
   * Renders the checkbox element.
   *
   * @returns {TemplateResult} The rendered template.
   */
  render() {
    return html`
      <label class="form-control" for="${this.id}">
        <input
          type="checkbox"
          id="${this.id}"
          @change="${this.handleChange}"
          ?checked="${this.checked}"
          ?indeterminate="${this.indeterminate}"
          ?disabled="${this.disabled}"
          aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
          aria-disabled="${this.disabled}"
          class="form-check-input"
        />
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

customElements.define('tds-checkbox', Checkbox);
