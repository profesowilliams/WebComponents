// Import the LitElement library and associated types
import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';
import customStyles from './Card.scss?inline';

// Define the Card class that extends LitElement
@customElement('tds-card')
export class Card extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  // Define the properties with appropriate TypeScript types
  @property({ type: String }) title: string = '';
  @property({ type: String }) content: string = '';
  @property({ type: String, reflect: true }) type: string = '';

  // Render the HTML template for the component
  render() {
    return html`
      <div class="card">
        <h2 class="card-title">${this.title}</h2>
        <p class="card-content">${this.content}</p>
      </div>
    `;
  }
}
