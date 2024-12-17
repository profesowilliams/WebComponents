import { LitElement, html, css, unsafeCSS } from "lit";
import "../../Close";
import customStyles from "./NotificationClose.scss?inline";

export class NotificationClose extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <tds-close-button
        data-bs-dismiss="alert"
        @click="${this._onClick}"
      ></tds-close-button>
    `;
  }

  private _onClose(event: CustomEvent) {
    console.log(event.detail.message);
    // Add any additional notification close logic here
  }

  private _onClick() {
    if (
      this.hasAttribute("data-bs-dismiss") &&
      this.getAttribute("data-bs-dismiss") === "notification"
    ) {
      let notificationElement: HTMLElement | null = this;
      while (notificationElement && notificationElement.tagName !== "TDS-NOTIFICATION") {
        if (notificationElement.parentElement) {
          notificationElement = notificationElement.parentElement;
        } else if ((notificationElement.getRootNode() as ShadowRoot).host) {
          notificationElement = (notificationElement.getRootNode() as ShadowRoot)
            .host as HTMLElement;
        } else {
          notificationElement = null;
        }
      }

      if (notificationElement) {
        if (notificationElement.shadowRoot) {
          const notificationContent = notificationElement.shadowRoot.querySelector(
            ".notification"
          ) as HTMLElement;
          if (notificationContent) {
            notificationContent.classList.remove("show");
            this.dispatchEvent(
              new CustomEvent("notificationClosed", {
                detail: { notification: notificationContent },
              })
            );
          }
        }
      }
    }
  }
}

customElements.define("tds-notification-close", NotificationClose);
