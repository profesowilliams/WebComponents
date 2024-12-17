import { LitElement, html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import { computePosition, offset, arrow, shift, limitShift, flip, autoPlacement, size, hide, inline, Placement, Strategy } from '@floating-ui/dom';
import customStyles from './Tooltip.scss?inline';

export class Tooltip extends LitElement {
  @property({ type: String }) text: string | undefined = undefined;
  @property({ type: String, reflect: true }) placement: Placement = 'bottom';
  @property({ type: String, reflect: true }) strategy: Strategy = 'fixed';
  @property({ type: String }) type: 'text' | 'html' = 'text';
  @property({ type: String }) width: string | undefined = undefined;
  @property({ type: String }) height: string | undefined = undefined;

  // Offset middleware properties
  @property({ type: Number }) offset: number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null } | ((args: { rects: any }) => any) = 10;

  // Shift middleware properties
  @property({ type: Boolean }) shift = true;
  @property({ type: Boolean }) shiftMainAxis = true;
  @property({ type: Boolean }) shiftCrossAxis = false;
  @property({ type: Number }) shiftLimiterOffset: number | { mainAxis?: number; crossAxis?: number } | ((args: { rects: any; placement: Placement }) => any) = 0;

  // Flip middleware properties
  @property({ type: Boolean }) flip = true;
  @property({ type: Boolean }) flipMainAxis = true;
  @property({ type: Boolean }) flipCrossAxis = true;
  @property({ type: String }) flipFallbackAxisSideDirection: 'none' | 'start' | 'end' = 'none';
  @property({ type: Boolean }) flipAlignment = true;
  @property({ type: Array }) flipFallbackPlacements: Array<Placement> = [];
  @property({ type: String }) flipFallbackStrategy: 'bestFit' | 'initialPlacement' = 'bestFit';

  @property({ type: Boolean }) autoPlacement = false;
  @property({ type: Boolean }) size = false;
  @property({ type: Boolean }) inline = false;

  // Arrow middleware properties
  @property({ type: Boolean }) arrow = true;
  @property({ type: Number }) arrowPadding = 0;

  @property({ type: Boolean }) hide: boolean = false;

  private tooltipInstance: HTMLElement | null = null;
  private targetElement: HTMLElement | null = null;
  private arrowElement: HTMLElement | null = null;

  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('strategy')) {
      this.style.setProperty('--tooltip-strategy', this.strategy);
    }
    if (changedProperties.has('hide')) {
      const hideValue = this.hide ? 'none' : 'initial';
      this.style.setProperty('--tooltip-hide', hideValue);
    }
    if (changedProperties.has('type')) {
      const backgroundColor = this.type === 'html' ? '#FFFFFF' : '#262626';
      const textColor = this.type === 'html' ? '#262626' : '#FFFFFF';
      this.style.setProperty('--tooltip-background', backgroundColor);
      this.style.setProperty('--tooltip-text-color', textColor);
    }
    if (changedProperties.has('width') && this.width) {
      this.style.setProperty('--tooltip-width', this.width);
    }
    if (changedProperties.has('height') && this.height) {
      this.style.setProperty('--tooltip-height', this.height);
    }
  }

  firstUpdated() {
    this.targetElement = this.firstElementChild as HTMLElement;
    this.tooltipInstance = this.shadowRoot?.getElementById('tooltip-content') as HTMLElement;
    this.arrowElement = this.shadowRoot?.getElementById('tooltip-arrow') as HTMLElement;

    if (this.targetElement) {
      this.targetElement.addEventListener('mouseenter', () => this.showTooltip());
      this.targetElement.addEventListener('mouseleave', () => this.hideTooltip());
      this.targetElement.addEventListener('focus', () => this.showTooltip());
      this.targetElement.addEventListener('blur', () => this.hideTooltip());
    }
  }

  private buildMiddleware() {
    const middleware = [];

    // Offset middleware
    if (this.offset !== undefined) {
      middleware.push(typeof this.offset === 'function' ? offset(this.offset) : offset(this.offset));
    }

    // Shift middleware with custom limiter options
    if (this.shift) {
      middleware.push(
        shift({
          mainAxis: this.shiftMainAxis,
          crossAxis: this.shiftCrossAxis,
          limiter: limitShift({
            offset: this.shiftLimiterOffset,
          }),
        })
      );
    }

    // Flip middleware with advanced configuration
    if (this.flip) {
      middleware.push(
        flip({
          mainAxis: this.flipMainAxis,
          crossAxis: this.flipCrossAxis,
          fallbackAxisSideDirection: this.flipFallbackAxisSideDirection,
          flipAlignment: this.flipAlignment,
          fallbackPlacements: this.flipFallbackPlacements.length > 0 ? this.flipFallbackPlacements : undefined,
          fallbackStrategy: this.flipFallbackStrategy,
        })
      );
    }

    if (this.inline) middleware.push(inline());
    if (this.autoPlacement) middleware.push(autoPlacement());

    // Size middleware for limiting dimensions based on available space
    if (this.size) {
      middleware.push(
        size({
          apply: ({ availableWidth, availableHeight, elements }) => {
            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(0, availableWidth)}px`,
              maxHeight: `${Math.max(0, availableHeight)}px`,
            });
          },
        })
      );
    }

    // Arrow middleware for pointing the arrow element
    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowElement!, padding: this.arrowPadding }));
    }

    if (this.hide) middleware.push(hide());

    return middleware;
  }

  async showTooltip() {
    this.tooltipInstance!.classList.add('show');
    if (this.arrow && this.arrowElement) {
      this.arrowElement.style.display = 'block';
    }
    await computePosition(this.targetElement!, this.tooltipInstance!, {
      placement: this.placement,
      strategy: this.strategy,
      middleware: this.buildMiddleware(),
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.tooltipInstance!.style, {
        top: `${y}px`,
        left: `${x}px`,
      });

      if (this.arrow && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(this.arrowElement!.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      }
    });
  }

  hideTooltip() {
    this.tooltipInstance!.classList.remove('show');
    if (this.arrowElement) {
      this.arrowElement.style.display = 'none';
    }
  }

  render() {
    return html`
      <slot></slot>
      <div id="tooltip-content" class="tooltip" role="tooltip">
        <div id="tooltip-arrow" class="tooltip-arrow" data-popper-arrow></div>
        <div class="tooltip-inner">${this.text ? (this.type === 'html' ? unsafeHTML(this.text) : html`${this.text}`) : ''}</div>
      </div>
    `;
  }
}

customElements.define('tds-tooltip', Tooltip);
export default Tooltip;
