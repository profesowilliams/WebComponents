import { LitElement, html, css, unsafeCSS, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './AccordionBody.scss?inline';

// Define the accordion body component
export class AccordionBody extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    const parentItem = this.closest('tds-accordion-item');
    if (parentItem) {
      parentItem.addEventListener('toggle', this._toggleHandler.bind(this));
    }
  }

  disconnectedCallback() {
    const parentItem = this.closest('tds-accordion-item');
    if (parentItem) {
      parentItem.removeEventListener('toggle', this._toggleHandler.bind(this));
    }
    super.disconnectedCallback();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      this.dispatchEvent(
        new CustomEvent('body-toggled', {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _toggleHandler(event: Event) {
    const customEvent = event as CustomEvent<{ collapsed: boolean }>;
    const { collapsed } = customEvent.detail;
    this.open = !collapsed;
  }

  render() {
    return html`
      <div ?open="${this.open}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tds-accordion-body', AccordionBody);
