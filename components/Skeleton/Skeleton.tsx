import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './Skeleton.scss?inline';

export class Skeleton extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: String }) baseColor: string = '#ebebeb';
  @property({ type: String }) highlightColor: string = '#f5f5f5';
  @property({ type: String }) width: string = '100%'; // Simplified from `string | number`
  @property({ type: String }) height: string = ''; // Simplified from `string | number`
  @property({ type: String }) borderRadius: string = '0.25rem';
  @property({ type: Boolean }) inline: boolean = false;
  @property({ type: Number }) duration: number = 1.5;
  @property({ type: String }) direction: 'ltr' | 'rtl' = 'ltr';
  @property({ type: Boolean, reflect: true }) enableAnimation: boolean = true;
  @property({ type: String }) customHighlightBackground: string | undefined = undefined;
  @property({ type: Number }) count: number = 1;
  @property({ type: Boolean }) circle: boolean = false;

  /**
   * Dynamically compute styles for the skeleton based on component properties
   */
  private getSkeletonStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      '--base-color': this.baseColor,
      '--highlight-color': this.highlightColor,
      '--animation-duration': this.enableAnimation ? `${this.duration}s` : '0s',
      '--animation-direction': this.direction,
      '--pseudo-element-display': this.enableAnimation ? 'block' : 'none',
    };

    if (this.width) {
      styles['width'] = typeof this.width === 'number' ? `${this.width}px` : this.width;
    }
    if (this.height) {
      styles['height'] = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }
    if (this.circle) {
      styles['border-radius'] = '50%';
    } else if (this.borderRadius) {
      styles['border-radius'] = this.borderRadius;
    }
    if (this.customHighlightBackground) {
      styles['--custom-highlight-background'] = this.customHighlightBackground;
    }

    return styles;
  }

  render() {
    const skeletonElements = Array.from({ length: Math.ceil(this.count) }, (_, index) => {
      // Handle fractional width for the last skeleton item
      let fractionalWidth = '';
      if (this.count % 1 && index === Math.floor(this.count)) {
        const fractionalPart = this.count % 1;
        const width = typeof this.width === 'number' ? `${this.width * fractionalPart}px` : `calc(${this.width} * ${fractionalPart})`;
        fractionalWidth = width;
      }

      const styles = this.getSkeletonStyles();
      if (fractionalWidth) {
        styles['width'] = fractionalWidth;
      }

      return html` <span class="react-loading-skeleton" style=${this.styleToString(styles)}> &zwnj; </span> `;
    });

    return html` <div class="react-loading-skeleton-container" style=${this.inline ? 'display: inline-flex;' : ''} aria-live="polite" aria-busy="${this.enableAnimation}">${skeletonElements}</div> `;
  }

  /**
   * Converts an object of styles into a string for inline application
   */
  private styleToString(styles: Record<string, string>): string {
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('enableAnimation')) {
      console.log('enableAnimation updated:', this.enableAnimation);
    }
    super.updated(changedProperties);
  }
}

customElements.define('tds-skeleton', Skeleton);
