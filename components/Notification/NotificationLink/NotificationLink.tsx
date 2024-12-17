// src/components/Lit/Notification/NotificationLink/NotificationLink.tsx
import { LitElement, html, css, unsafeCSS ,PropertyValues } from "lit";
import { property } from 'lit/decorators.js';
import customStyles from "./NotificationLink.scss?inline";
import '../../Button';

export class NotificationLink extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String }) type: string = 'link';
  @property({ type: String }) link: string = 'Hyperlink';
  @property({ type: String }) url: string = '';
  @property({ type: String }) variant: string = 'link';
  @property({ type: String }) label: string = '';
  @property({ type: String }) theme: string = 'light';
  @property({ type: String }) color: string = 'cobalt';

  constructor() {
    super();
    this.type = 'link';
    this.link = 'Hyperlink';
    this.url = '';
    this.variant = 'link';
    this.label = '';
    this.theme = 'light';
    this.color = 'cobalt';
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('show')) {
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <tds-button type="${this.type}" variant="${this.variant}" theme="${this.theme}" label="${this.label}" color="${this.color}" url="${this.url}">
        <slot></slot>
      </tds-button>
    `;
  }
}

customElements.define("tds-notification-link", NotificationLink);
