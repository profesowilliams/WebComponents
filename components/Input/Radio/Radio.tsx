import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './Radio.scss?inline';

export class Radio extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String }) path: string = '';
  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: String, reflect: true }) id: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: String, reflect: true }) name: string = '';

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.id = '';
    this.label = '';
    this.name = '';
  }

  handleChange(event: Event) {
    if (!this.disabled) {
      const rootNode = this.getRootNode();
      let radioGroup: NodeListOf<Radio> | null = null;

      if (rootNode instanceof Document || rootNode instanceof ShadowRoot) {
        radioGroup = rootNode.querySelectorAll<Radio>(`tds-radio[name="${this.name}"]`);
      }

      if (radioGroup) {
        radioGroup.forEach((radio: Radio) => {
          if (radio !== this) {
            radio.checked = false;
          }
        });
      }

      this.checked = true;
      this.dispatchEvent(new Event('change'));
    }
  }

  render() {
    return html`
      <label class="form-control" for="${this.id}">
        <input type="radio" id="${this.id}" name="${this.name}" @change="${this.handleChange}" .checked="${this.checked}" ?disabled="${this.disabled}" aria-checked="${this.checked}" aria-disabled="${this.disabled}" data-theme="dark" class="form-check-input" />
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

customElements.define('tds-radio', Radio);
export default Radio;
