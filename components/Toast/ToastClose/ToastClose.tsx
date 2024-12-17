import { LitElement, html, css, unsafeCSS } from "lit";
import "../../Close";
import customStyles from "./ToastClose.scss?inline";

export class ToastClose extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <tds-close-button
        data-bs-dismiss="toast"
        @click="${this._onClick}"
      ></tds-close-button>
    `;
  }

  private _onClose(event: CustomEvent) {
    console.log(event.detail.message);
    // Add any additional toast close logic here
  }

  private _onClick() {
    if (
      this.hasAttribute("data-bs-dismiss") &&
      this.getAttribute("data-bs-dismiss") === "toast"
    ) {
      let toastElement: HTMLElement | null = this;
      while (toastElement && toastElement.tagName !== "TDS-TOAST") {
        if (toastElement.parentElement) {
          toastElement = toastElement.parentElement;
        } else if ((toastElement.getRootNode() as ShadowRoot).host) {
          toastElement = (toastElement.getRootNode() as ShadowRoot)
            .host as HTMLElement;
        } else {
          toastElement = null;
        }
      }

      if (toastElement) {
        if (toastElement.shadowRoot) {
          const toastContent = toastElement.shadowRoot.querySelector(
            ".toast"
          ) as HTMLElement;
          if (toastContent) {
            toastContent.classList.remove("show");
            this.dispatchEvent(
              new CustomEvent("toastClosed", {
                detail: { toast: toastContent },
              })
            );
          }
        }
      }
    }
  }
}

customElements.define("tds-toast-close", ToastClose);
