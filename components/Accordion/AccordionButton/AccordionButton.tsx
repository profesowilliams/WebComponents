import { LitElement, html, css, unsafeCSS, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import customStyles from "./AccordionButton.scss?inline";

// Define the accordion button component
export class AccordionButton extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @query("button") buttonElement!: HTMLButtonElement;

  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;

  @property({ type: String, attribute: "data-bs-orientation" })
  orientation: string = "";

  firstUpdated() {
    this._inheritAttributes();
  }

  _inheritAttributes() {
    const parentItem = this.closest("tds-accordion-item");
    if (parentItem) {
      this.orientation = parentItem.getAttribute("data-bs-orientation") || "";
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("expanded")) {
      this._updateButtonState();
    }
  }

  _updateButtonState() {
    if (this.buttonElement) {
      this.buttonElement.classList.toggle("collapsed", !this.expanded);
      this.buttonElement.classList.toggle("expanded", this.expanded);
    }
  }

  render() {
    return html`
      <button
        class="accordion-button collapsed"
        @click="${this._onClick}"
        data-bs-orientation="${this.orientation}"
      >
        <slot></slot>
      </button>
    `;
  }

  _onClick() {
    // Defer property change to avoid nested updates
    requestAnimationFrame(() => {
      this.expanded = !this.expanded;
      this._dispatchToggleEvent();
    });
  }

  _dispatchToggleEvent() {
    this.dispatchEvent(
      new CustomEvent("toggle", {
        bubbles: true,
        composed: true,
        detail: { collapsed: !this.expanded },
      })
    );
  }
}

customElements.define("tds-accordion-button", AccordionButton);
