import { LitElement, html, css, unsafeCSS, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import customStyles from './Toast.scss?inline';

/**
 * Type definition for toast placement options.
 * Represents where the toast will appear on the screen.
 */
type ToastPlacement =
  | 'custom'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast component to display messages or alerts with customizable placement, timeout, and styling.
 * Extends LitElement to leverage web component features.
 */
export class Toast extends LitElement {
  /**
   * Unique identifier for the toast.
   * @type {string}
   */
  @property({ type: String }) id: string = '';

  /**
   * Type of the toast. Can be 'banner' or 'toast'.
   * @type {string}
   */
  @property({ type: String }) type: string = 'toast';

  /**
   * Visual variant of the toast. Determines its appearance.
   * Options: 'default', 'information', 'confirmation', 'alert', 'error'.
   * @type {'default' | 'information' | 'confirmation' | 'alert' | 'error'}
   */
  @property({ type: String, reflect: true }) variant:
    | 'default'
    | 'information'
    | 'confirmation'
    | 'alert'
    | 'error' = 'default';

  /**
   * Size of the toast. Options: 'small', 'medium', 'large'.
   * @type {'small' | 'medium' | 'large'}
   */
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Text for the action link in the toast.
   * @type {string}
   */
  @property({ type: String }) link: string = '';

  /**
   * URL for the action link in the toast.
   * @type {string}
   */
  @property({ type: String }) url: string = '';

  /**
   * Target attribute for the action link. Default is '_self'.
   * @type {string}
   */
  @property({ type: String }) target: string = '_self';

  /**
   * Message displayed inside the toast.
   * @type {string}
   */
  @property({ type: String }) message: string = '';

  /**
   * Placement of the toast on the screen.
   * Options: ToastPlacement (e.g., 'top-center', 'bottom-right').
   * @type {ToastPlacement}
   */
  @property({ type: String, reflect: true }) placement: ToastPlacement =
    'middle-center';

  /**
   * Top position for custom placement. Used only when `placement` is 'custom'.
   * @type {string}
   */
  @property({ type: String }) top: string = '';

  /**
   * Right position for custom placement. Used only when `placement` is 'custom'.
   * @type {string}
   */
  @property({ type: String }) right: string = '';

  /**
   * Bottom position for custom placement. Used only when `placement` is 'custom'.
   * @type {string}
   */
  @property({ type: String }) bottom: string = '';

  /**
   * Left position for custom placement. Used only when `placement` is 'custom'.
   * @type {string}
   */
  @property({ type: String }) left: string = '';

  /**
   * Determines if the toast is visible.
   * @type {boolean}
   */
  @property({ type: Boolean }) show: boolean = false;

  /**
   * Duration (in milliseconds) before the toast automatically closes.
   * Default is 5000ms (5 seconds).
   * @type {number}
   */
  @property({ type: Number }) timeout: number = 5000;

  /**
   * Stores the timeout ID for auto-closing the toast.
   * @type {number | null}
   * @private
   */
  private autoCloseTimeout: number | null = null;

  /**
   * Determines if the toast is persistent (does not auto-close).
   * When `true`, the timeout functionality is ignored.
   * @type {boolean}
   */
  @property({ type: Boolean }) persistent: boolean = false;

  /**
   * CSS styles for the Toast component.
   */
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  /**
   * Lifecycle method: Runs when the component is updated.
   * Starts or clears the auto-close timeout based on the `show` property.
   * @param {PropertyValues} changedProperties - Map of changed properties.
   */
  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('show') && this.show) {
      this.startAutoClose();
    } else if (changedProperties.has('show') && !this.show) {
      this.clearAutoClose();
    }
  }

  /**
   * Starts the auto-close timer for the toast based on the `timeout` property.
   * If `persistent` is true, this method does nothing.
   * Also removes the 'show' attribute from the parent element when the toast closes.
   * @private
   */
  startAutoClose() {
    // If the toast is persistent, do not set a timeout.
    if (this.persistent) {
      return;
    }

    this.clearAutoClose();
    this.autoCloseTimeout = window.setTimeout(() => {
      this.show = false; // Hide the toast after the timeout

      // Remove the 'show' attribute from the element
      this.removeAttribute('show');
    }, this.timeout);
  }

  /**
   * Clears the existing auto-close timer.
   * @private
   */
  clearAutoClose() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }

  /**
   * Lifecycle method: Called when the component is removed from the DOM.
   * Ensures the auto-close timer is cleared to avoid memory leaks.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoClose();
  }

  /**
   * Returns CSS classes for the toast's placement based on the `placement` property.
   * If placement is 'custom', no placement classes are added.
   * @returns {string} The placement-related CSS classes or an empty string for custom placement.
   */
  getPlacementClasses() {
    return this.placement === 'custom'
      ? ''
      : Toast.position[this.placement] || 'top-50 start-50 translate-middle';
  }

  /**
   * Returns inline styles for custom positioning when `placement` is 'custom'.
   * Only includes `top`, `right`, `bottom`, and `left` when their values are defined.
   *
   * @returns {string} Inline style for custom placement.
   */
  getCustomStyle() {
    if (this.placement === 'custom') {
      const styles = [];
      if (this.top) styles.push(`top: ${this.top};`);
      if (this.right) styles.push(`right: ${this.right};`);
      if (this.bottom) styles.push(`bottom: ${this.bottom};`);
      if (this.left) styles.push(`left: ${this.left};`);
      return styles.join(' ');
    }
    return '';
  }

  /**
   * Controls whether the component should update when specific properties change.
   * @param {Map<string | number | symbol, unknown>} changedProperties - Map of changed properties.
   * @returns {boolean} Whether the component should update.
   */
  shouldUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    return [
      'variant',
      'placement',
      'message',
      'link',
      'url',
      'target',
      'top',
      'left',
      'show',
      'timeout',
    ].some((prop) => changedProperties.has(prop));
  }

  /**
   * Renders the toast component.
   * @returns {TemplateResult} The rendered HTML.
   */
  render() {
    return html`
      <div
        class="toast-container ${this.getPlacementClasses()} p-3"
        style="${this.getCustomStyle()}"
      >
        <div
          class="fade toast ${this.show ? 'show' : ''}"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-state="${this.variant}"
        >
          <slot>${this.message}</slot>
        </div>
      </div>
    `;
  }

  /**
   * Mapping of placement options to CSS classes.
   * @type {Record<ToastPlacement, string>}
   * @static
   */
  static position: Record<ToastPlacement, string> = {
    custom: '',
    'top-left': 'top-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'top-right': 'top-0 end-0',
    'middle-left': 'top-50 start-0 translate-middle-y',
    'middle-center': 'top-50 start-50 translate-middle',
    'middle-right': 'top-50 end-0 translate-middle-y',
    'bottom-left': 'bottom-0 start-0',
    'bottom-center': 'bottom-0 start-50 translate-middle-x',
    'bottom-right': 'bottom-0 end-0',
  };

  /**
   * Returns a list of placement options.
   * @returns {ToastPlacement[]} Array of placement option keys.
   * @static
   */
  static get placementOptions() {
    return Object.keys(this.position) as ToastPlacement[];
  }
}

export const placementOptions = Toast.placementOptions;
customElements.define('tds-toast', Toast);

declare global {
  interface HTMLElementTagNameMap {
    'tds-toast': Toast;
  }
}
