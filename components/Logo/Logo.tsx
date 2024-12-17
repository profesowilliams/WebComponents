import { LitElement, html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export class Logo extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) state = '';
  @property({ type: String }) width = '';
  @property({ type: String }) height = '';
  @property({ type: String }) svgContent = '';

  static styles = css`
    :host {
      display: inline-block;
    }
    .icon-container {
      display: inline-block;
      width: var(--icon-width, auto);
      height: var(--icon-height, auto);
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  get iconPath() {
    const server = window.location.origin;
    return `${server}/content/dam/global-shared/logos/${this.state}/${this.name}.svg`;
  }

  async loadSVG() {
    try {
      const response = await fetch(this.iconPath);
      if (response.ok) {
        let svgText = await response.text();

        // Create a temporary container to manipulate the SVG
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = svgText;

        const svgElement = tempContainer.querySelector('svg');
        if (svgElement) {
          if (this.width && this.width !== 'auto') {
            svgElement.setAttribute('width', this.width);
          } else {
            svgElement.removeAttribute('width');
          }

          if (this.height && this.height !== 'auto') {
            svgElement.setAttribute('height', this.height);
          } else {
            svgElement.removeAttribute('height');
          }
        }

        this.svgContent = tempContainer.innerHTML;
      } else {
        console.error('SVG not found:', this.iconPath);
        this.svgContent = '';
      }
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching SVG:', error);
      this.svgContent = '';
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('name') || changedProperties.has('state')) {
      this.loadSVG();
    }
  }

  render() {
    const width = this.width || 'auto';
    const height = this.height || 'auto';

    return html`
      <div
        class="icon-container"
        style="--icon-width: ${width}; --icon-height: ${height};"
      >
        ${unsafeSVG(this.svgContent)}
      </div>
    `;
  }
}

customElements.define('tds-logo', Logo);
