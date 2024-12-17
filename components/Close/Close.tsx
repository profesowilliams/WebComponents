import { LitElement, html, css, unsafeCSS } from 'lit';
import customStyles from "./Close.scss?inline";

export class CloseButton extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="${this._onClick}"
      ></button>
    `;
  }

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent("close", { detail: { message: "Modal is closing" } })
    );

    if (
      this.hasAttribute("data-bs-dismiss") &&
      this.getAttribute("data-bs-dismiss") === "modal"
    ) {
      let modalElement: HTMLElement | null = this;
      while (modalElement && modalElement.tagName !== "TDS-MODAL") {
        if (modalElement.parentElement) {
          modalElement = modalElement.parentElement;
        } else if ((modalElement.getRootNode() as ShadowRoot).host) {
          modalElement = (modalElement.getRootNode() as ShadowRoot)
            .host as HTMLElement;
        } else {
          modalElement = null;
        }
      }

      if (modalElement) {
        if (modalElement.shadowRoot) {
          const modalContent = modalElement.shadowRoot.querySelector(
            ".modal"
          ) as HTMLElement;
          if (modalContent) {
            modalContent.classList.remove("show");
            this.dispatchEvent(
              new CustomEvent("modalClosed", {
                detail: { modal: modalContent },
              })
            );
          }
        }
      }
    }

    if (
      this.hasAttribute("data-bs-dismiss") &&
      this.getAttribute("data-bs-dismiss") === "alert"
    ) {
      let alertElement: HTMLElement | null = this;
      while (alertElement && alertElement.tagName !== "TDS-NOTIFICATION") {
        if (alertElement.parentElement) {
          alertElement = alertElement.parentElement;
        } else if ((alertElement.getRootNode() as ShadowRoot).host) {
          alertElement = (alertElement.getRootNode() as ShadowRoot)
            .host as HTMLElement;
        } else {
          alertElement = null;
        }
      }

      if (alertElement) {
        if (alertElement.shadowRoot) {
          const alertContent = alertElement.shadowRoot.querySelector(
            ".alert"
          ) as HTMLElement;
          if (alertContent) {
            alertContent.classList.remove("show");
            this.dispatchEvent(
              new CustomEvent("alertClosed", {
                detail: { modal: alertContent },
              })
            );
          }
        }
      }
    }


  }
}

customElements.define('tds-close-button', CloseButton);
