import { LitElement, html, css, unsafeCSS } from "lit";
import "../../../Close";
import customStyles from "./FileClose.scss?inline";

export class FileClose extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  render() {
    return html`
      <tds-close-button
        data-bs-dismiss="file"
        @click="${this._onClick}"
      ></tds-close-button>
    `;
  }

  private _onClose(event: CustomEvent) {
    console.log(event.detail.message);
    // Add any additional file close logic here
  }

  private _onClick() {
    if (
      this.hasAttribute("data-bs-dismiss") &&
      this.getAttribute("data-bs-dismiss") === "file"
    ) {
      let fileElement: HTMLElement | null = this;
      while (fileElement && fileElement.tagName !== "TDS-FILE-INPUT") {
        if (fileElement.parentElement) {
          fileElement = fileElement.parentElement;
        } else if ((fileElement.getRootNode() as ShadowRoot).host) {
          fileElement = (fileElement.getRootNode() as ShadowRoot)
            .host as HTMLElement;
        } else {
          fileElement = null;
        }
      }

      if (fileElement) {
        if (fileElement.shadowRoot) {
          const fileContent = fileElement.shadowRoot.querySelector(
            ".file-list"
          ) as HTMLElement;
          if (fileContent) {
            fileContent.classList.remove("show");
            this.dispatchEvent(
              new CustomEvent("fileClosed", {
                detail: { file: fileContent },
              })
            );
          }
        }
      }
    }
  }
}

customElements.define("tds-file-close", FileClose);
