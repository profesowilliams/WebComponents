import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { computePosition, offset, arrow, shift, limitShift, flip, autoPlacement, size, hide, inline, Placement, Strategy, Boundary } from '@floating-ui/dom';
import customStyles from './Menu.scss?inline';

export class Menu extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) placement: Placement = 'bottom-start';
  @property({ type: String, reflect: true }) strategy: Strategy = 'fixed';
  @property({ type: Object, reflect: true }) boundary: Boundary = 'clippingAncestors';

  // Auto Placement Options
  @property({ type: String, reflect: true }) alignment: 'start' | 'end' | undefined = undefined;
  @property({ type: Boolean, reflect: true }) autoAlignment = true;
  @property({ type: Array, reflect: true }) allowedPlacements: Placement[] | undefined = undefined;

  // Middleware Configurations
  @property({ type: Number, reflect: true }) offset = 10;
  @property({ type: Boolean, reflect: true }) shift = true;
  @property({ type: Boolean, reflect: true }) flip = true;

  // Shift middleware properties
  @property({ type: Boolean, reflect: true }) shiftMainAxis = true;
  @property({ type: Boolean, reflect: true }) shiftCrossAxis = false;
  @property({ type: Number, reflect: true }) shiftLimiterOffset: number | { mainAxis?: number; crossAxis?: number } | ((args: { rects: any; placement: Placement }) => any) = 0;

  // Flip middleware properties
  @property({ type: Boolean, reflect: true }) flipMainAxis = true;
  @property({ type: Boolean, reflect: true }) flipCrossAxis = true;
  @property({ type: String, reflect: true }) flipFallbackAxisSideDirection: 'none' | 'start' | 'end' = 'none';
  @property({ type: Boolean, reflect: true }) flipAlignment = true;
  @property({ type: Array, reflect: true }) flipFallbackPlacements: Array<Placement> = [];
  @property({ type: String, reflect: true }) flipFallbackStrategy: 'bestFit' | 'initialPlacement' = 'bestFit';

  @property({ type: Boolean, reflect: true }) autoPlacement = false;
  @property({ type: Boolean, reflect: true }) size = false;
  @property({ type: Boolean, reflect: true }) inline = false;

  @property({ type: String }) triggerSelector: string | null = null;

  // Arrow middleware properties
  @property({ type: Boolean, reflect: true }) arrow = true;
  @property({ type: Number, reflect: true }) arrowPadding = 0;

  @property({ type: Boolean, reflect: true }) hide: boolean = false;

  private menuInstance: HTMLElement | null = null;
  private triggerElement: HTMLElement | null = null;
  private arrowElement: HTMLElement | null = null;

  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('open')) {
      const displayValue = this.open ? 'block' : 'none';
      this.style.setProperty('--menu-display', displayValue);

      // Call positionMenu() when the menu is opened
      if (this.open) {
        this.positionMenu();
      }
    }
  }

  firstUpdated() {
    // Set the first child as the default trigger element
    this.triggerElement = this.firstElementChild as HTMLElement;

    this.menuInstance = this.shadowRoot?.getElementById('menu-content') as HTMLElement;

    if (this.triggerElement) {
      // Add click listener to the default trigger element
      this.triggerElement.addEventListener('click', (e) => this.toggleMenu(e));

      if (this.hover) {
        this.triggerElement.addEventListener('mouseover', (e) => this.openMenu(e));
        this.triggerElement.addEventListener('mouseleave', (e) => this.closeMenuOnMouseLeave(e));
      }
    }

    if (this.menuInstance && this.hover) {
      this.menuInstance.addEventListener('mouseleave', (e) => this.closeMenuOnMouseLeave(e));
    }
  }

  private buildMiddleware() {
    const middleware = [];

    // Offset Middleware with Custom Logic for `top` Placement
    if (this.offset) {
      middleware.push(
        offset(({ placement }) => {
          if (placement.startsWith('top')) {
            return { mainAxis: '-30' }; // Reduce distance for top placement
          }
          if (placement.startsWith('bottom')) {
            return { mainAxis: '60' }; // Reduce distance for bottom placement
          }
          return { mainAxis: this.offset }; // Default offset for other placements
        })
      );
    }

    // Shift Middleware
    if (this.shift) {
      middleware.push(shift());
    }

    // Flip Middleware
    if (this.flip) {
      middleware.push(
        flip({
          fallbackPlacements: this.allowedPlacements || ['top', 'bottom', 'left', 'right'],
          //boundary: 'viewport', // Ensure it checks the viewport boundaries
        })
      );
    }

    // Auto Placement Middleware
    if (this.autoPlacement) {
      middleware.push(
        autoPlacement({
          alignment: this.alignment,
          autoAlignment: this.autoAlignment,
          allowedPlacements: this.allowedPlacements,
        })
      );
    }

    if (this.inline) middleware.push(inline());

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

  private toggleMenu(e: Event) {
    e.stopPropagation(); // Prevent propagation to other listeners
    this.open = !this.open; // Toggle open state
    if (this.open) {
      this.positionMenu(); // Position menu when it opens
    }
  }

  private openMenu(e: Event) {
    e.stopPropagation(); // Prevent propagation to other listeners
    this.open = true; // Open menu
    this.positionMenu(); // Position menu
  }

  private closeMenuOnMouseLeave(e: MouseEvent) {
    const target = e.relatedTarget as HTMLElement | null; // Ensure null safety
    if (!this.contains(target)) {
      this.open = false; // Close menu
    }
  }

  private async positionMenu() {
    const triggerElement = this.triggerElement || (this.firstElementChild as HTMLElement);
    const menuElement = this.shadowRoot?.getElementById('menu-content') as HTMLElement;

    if (!triggerElement || !menuElement) {
      console.warn('Trigger or menu element is not defined');
      return;
    }

    const middleware = this.buildMiddleware();

    const { x, y } = await computePosition(triggerElement, menuElement, {
      placement: this.placement, // Apply placement
      strategy: this.strategy,
      middleware,
    });

    Object.assign(menuElement.style, {
      // left: `${x}px`,
      top: `${y}px`,
    });
  }

  render() {
    return html`
      <div id="menu-content" class="dropdown-menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tds-menu', Menu);
export default Menu;
