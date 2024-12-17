import { LitElement, html, css, unsafeCSS, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import customStyles from "./AccordionItem.scss?inline";

// Define the accordion item component
export class AccordionItem extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String, attribute: "accordion-id" })
  accordionId: string = "";

  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;

  @property({ type: String, attribute: "data-bs-outline" })
  outline: string = "";

  @property({ type: String, attribute: "data-bs-orientation" })
  orientation: string = "";

  constructor() {
    super();
    this.accordionId = "";
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("expanded")) {
      this.requestUpdateInternalComponents();
    }
  }

  async requestUpdateInternalComponents() {
    // Use a microtask to defer updates and avoid nested updates
    await new Promise(requestAnimationFrame);
    const buttons = this.querySelectorAll("tds-accordion-button");
    buttons.forEach((button) => {
      button.expanded = this.expanded;
    });
    const bodies = this.querySelectorAll("tds-accordion-body");
    bodies.forEach((body) => {
      body.open = this.expanded;
    });
  }

  render() {
    return html`
      <div
        class="accordion-item"
        id="${this.accordionId}"
        data-bs-outline="${this.outline}"
        data-bs-orientation="${this.orientation}"
      >
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("tds-accordion-item", AccordionItem);
