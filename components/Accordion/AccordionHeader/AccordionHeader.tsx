import { LitElement, html, css } from "lit";

/**
 * AccordonHeader is a custom web component that defines the header section of an accordion.
 *
 * @element tds-accordion-header
 */
export class AccordionHeader extends LitElement {
  /**
   * Defines the CSS styles for the component.
   */
  static get styles() {
    return css`
      /* Add any styles for the accordion header here */
    `;
  }

  /**
   * Renders the HTML template for the component.
   * @returns {TemplateResult} The rendered HTML template.
   */
  render() {
    return html`<div class="accordion-header"><slot></slot></div>`;
  }
}

// Register the custom element with the browser
customElements.define("tds-accordion-header", AccordionHeader);
