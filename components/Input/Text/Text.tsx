import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import customStyles from './Text.scss?inline';

@customElement('tds-textfield')
export class TextInput extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  constructor() {
    super();
  }

  // Define allowed input types
  @property({ type: String }) placeholder = 'name@example.com';
  @property({ type: String }) label = 'Email address';
  @property({ type: String }) type:
    | 'hidden'
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'password'
    | 'datetime'
    | 'date'
    | 'month'
    | 'week'
    | 'time'
    | 'datetime-local'
    | 'number'
    | 'range'
    | 'color'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'submit'
    | 'image'
    | 'reset'
    | 'button' = 'email';
  @property({ type: String }) id = 'floatingInput';
  @property({ type: String }) supporttext?: string;
  @property({ type: String }) errormessage?: string;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false; // Add disabled property
  @property({ type: String }) pattern = '';
  @property({ type: Number }) minLength?: number;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Number }) size?: number;
  @property({ type: String }) value = '';

  private getLabel() {
    return this.required ? `* ${this.label}` : this.label;
  }

  render() {
    return html`
      <div class="form-floating mb-3">
        <input
          type="${this.type}"
          class="form-control"
          id="${this.id}"
          placeholder="${this.placeholder}"
          .pattern="${this.pattern}"
          minlength="${ifDefined(this.minLength)}"
          maxlength="${ifDefined(this.maxLength)}"
          size="${ifDefined(this.size)}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
        />
        ${this.supporttext
          ? html`<div class="form-text">${this.supporttext}</div>`
          : ''}
        ${this.errormessage
          ? html`<div class="error">${this.errormessage}</div>`
          : ''}
        <label for="${this.id}">${this.getLabel()}</label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tds-textfield': TextInput;
  }
}
