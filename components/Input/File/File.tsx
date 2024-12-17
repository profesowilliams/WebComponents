import { LitElement, html, css, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import customStyles from './File.scss?inline';

import { mimeTypeToLabel } from '../../../../constants/mimeTypes';

import './FileClose';

interface FileUploadProgress {
  file: File;
  progress: number;
  error?: string; // Optional error message
}

@customElement('tds-file-input')
export class FileInput extends LitElement {
  /**
   * Styles for the file input component.
   * @returns {CSSResult} - Returns a CSS template with custom styles.
   */
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  /**
   * List of files being uploaded with their progress and error status.
   * @type {FileUploadProgress[]}
   */
  @property({ type: Array })
  files: FileUploadProgress[] = [];

  /**
   * Indicates if the drag area is active.
   * @type {boolean}
   */
  @property({ type: Boolean })
  isDragOver = false;

  /**
   * Maximum allowed file size for uploads.
   * @type {string}
   */
  @property({ type: String })
  maxFileSize = '2MB'; // Default to 2MB

  /**
   * Name of the icon used in the upload area.
   * @type {string}
   */
  @property({ type: String })
  iconName = 'upload';

  /**
   * State of the icon used in the upload area.
   * @type {string}
   */
  @property({ type: String })
  iconState = 'default';

  /**
   * Heading text displayed in the drop area.
   * @type {string}
   */
  @property({ type: String })
  headingText = 'Drag & Drop or Choose file from device';

  /**
   * Secondary text indicating file size limit.
   * @type {string}
   */
  @property({ type: String })
  secondaryText = 'Max file size';

  /**
   * Text for the browse button.
   * @type {string}
   */
  @property({ type: String })
  buttonText = 'Browse file';

  /**
   * List of allowed file types for uploads.
   * @type {string[]}
   */
  @property({ type: Array })
  allowedFileTypes: string[] = ['application/pdf']; // Default to PDFs only

  /**
   * Clears all uploaded files.
   */
  public clearFiles(): void {
    this.files = [];
  }

  /**
   * Mapping of MIME types to human-readable labels.
   * @type {Record<string, string>}
   */
  private mimeTypeToLabel = mimeTypeToLabel;

  /**
   * Lifecycle hook called when the element is added to the DOM.
   */
  connectedCallback() {
    super.connectedCallback();
    // Listen for error events from FileUpload
    document.addEventListener(
      'file-upload-error',
      this.handleFileError as EventListener
    );

    // Listen for clear file uploads event
    this.addEventListener('clear-file-uploads', this.handleClearFiles);
  }

  /**
   * Lifecycle hook called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    // Clean up event listeners
    document.removeEventListener(
      'file-upload-error',
      this.handleFileError as EventListener
    );

    this.removeEventListener('clear-file-uploads', this.handleClearFiles);
    super.disconnectedCallback();
  }

  /**
   * Event handler to clear all file uploads.
   */
  private handleClearFiles = (): void => {
    this.clearFiles();
  };

  /**
   * Handles the file-upload-error event by updating the error status of the specific file.
   * @param {CustomEvent} event - The event containing the file error details.
   */
  private handleFileError = (
    event: CustomEvent<{ fileName: string; error: string }>
  ) => {
    const { fileName, error } = event.detail;
    console.log('Handling error for file:', fileName, 'with error:', error); // Debugging log
    this.files = this.files.map((fileUpload) =>
      fileUpload.file.name === fileName ? { ...fileUpload, error } : fileUpload
    );
  };

  /**
   * Renders the HTML template for the component.
   * @returns {TemplateResult} - The rendered HTML template.
   */
  render(): TemplateResult {
    return html`
      <div class="file-input">
        <div class="file-upload">
          <label>Upload Template File</label>
          <div
            class=${classMap({ 'drop-area': true, dragover: this.isDragOver })}
            @dragover="${this.handleDragOver}"
            @dragenter="${this.handleDragEnter}"
            @dragleave="${this.handleDragLeave}"
            @drop="${this.handleDrop}"
            @click="${this.handleClick}"
          >
            <tds-icon
              name="${this.iconName}"
              state="${this.iconState}"
            ></tds-icon>
            <div class="file-text">
              <tds-heading as="h10">
                <strong>${this.headingText}</strong>
              </tds-heading>
              <p class="extra-small">
                ${this.formatAllowedFileTypes()}, ${this.secondaryText}
                ${this.maxFileSize}.
              </p>
            </div>
            <tds-button
              type="button"
              variant="filled"
              theme="light"
              label="Button"
              color="teal"
              compact
            >
              ${this.buttonText}
            </tds-button>
          </div>
        </div>
        ${this.files.length > 0
          ? html`
              <div class="file-list">
                ${this.files.map(
                  (fileUpload, index) => html`
                    <div class="file-item">
                      <div class="file-progress">
                        <div class="file-name">${fileUpload.file.name}</div>
                        <div class="file-size">
                          ${this.formatFileSize(fileUpload.file.size)}
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress ${fileUpload.error
                              ? 'progress-error'
                              : ''}"
                            style="
                              --progress-width: ${fileUpload.progress}%;
                              background-color: ${fileUpload.error
                              ? '#cd163f'
                              : fileUpload.progress === 100
                              ? '#4caf50'
                              : '#F7B500'};
                            "
                          ></div>
                          <span class="progress-percentage">
                            ${fileUpload.error
                              ? '0%'
                              : `${fileUpload.progress}%`}
                          </span>
                        </div>
                        ${fileUpload.error
                          ? html`<div class="error-message">
                              ${fileUpload.error}
                            </div>`
                          : ''}
                      </div>
                      <tds-file-close
                        @click="${() => this.removeFile(index)}"
                      ></tds-file-close>
                    </div>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  /**
   * Formats the allowed file types for display.
   * @returns {string} - The formatted list of allowed file types.
   */
  private formatAllowedFileTypes(): string {
    const types = this.allowedFileTypes || [];
    return types.map((type) => this.mimeTypeToLabel[type] || type).join(', ');
  }

  /**
   * Parses the file size from a string to a number of bytes.
   * @param {string} size - File size as a string (e.g., '2MB').
   * @returns {number} - The parsed file size in bytes.
   */
  private parseFileSize(size: string): number {
    const units: Record<string, number> = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    };
    const match = size.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);
    if (!match) throw new Error('Invalid file size format');
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    return value * (units[unit] || 1);
  }

  /**
   * Handles the dragover event to allow file drop.
   * @param {DragEvent} event - The dragover event.
   */
  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Handles the dragenter event when a file enters the drop area.
   * @param {DragEvent} event - The dragenter event.
   */
  private handleDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  /**
   * Handles the dragleave event when a file leaves the drop area.
   * @param {DragEvent} event - The dragleave event.
   */
  private handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  /**
   * Handles the drop event when a file is dropped in the drop area.
   * @param {DragEvent} event - The drop event.
   */
  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    this.addFiles(droppedFiles);
    this.dispatchFilesEvent(droppedFiles);
  }

  /**
   * Handles the click event to simulate file input selection.
   */
  private handleClick(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = this.allowedFileTypes.join(',');
    fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    fileInput.click();
  }

  /**
   * Handles the selection of files through the file input element.
   * @param {Event} event - The change event of the file input.
   */
  private handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files || []);
    this.addFiles(selectedFiles);
    this.dispatchFilesEvent(selectedFiles);
  }

  /**
   * Adds the selected files to the list of files to be uploaded.
   * @param {File[]} newFiles - List of newly selected files.
   */
  private addFiles(newFiles: File[]): void {
    const maxSizeInBytes = this.parseFileSize(this.maxFileSize);
    const validFiles = newFiles.map((file) => {
      if (!this.isFileTypeAllowed(file)) {
        return { file, progress: 0, error: 'Invalid file type.' };
      }
      if (file.size > maxSizeInBytes) {
        return { file, progress: 0, error: 'File size exceeds the limit.' };
      }
      return { file, progress: 0 };
    });
    this.files = [...this.files, ...validFiles];
    setTimeout(() => this.forceReflow(), 0);
    this.simulateUploadProgress(validFiles.filter((file) => !file.error));
    this.dispatchFilesEvent(newFiles);
  }

  /**
   * Dispatches a custom event with the selected files.
   * @param {File[]} files - List of selected files.
   */
  private dispatchFilesEvent(files: File[]): void {
    const event = new CustomEvent('file-selected', {
      detail: { files },
      bubbles: false,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Checks if a file's type is allowed for upload.
   * @param {File} file - The file to be checked.
   * @returns {boolean} - True if the file type is allowed, false otherwise.
   */
  private isFileTypeAllowed(file: File): boolean {
    return this.allowedFileTypes.includes(file.type);
  }

  /**
   * Forces a reflow to update progress bar rendering.
   */
  private forceReflow(): void {
    const progressElements = this.shadowRoot?.querySelectorAll('.progress');
    progressElements?.forEach((el) => el.getBoundingClientRect());
  }

  /**
   * Removes a file from the list of files to be uploaded and emits an event.
   * @param {number} index - Index of the file to remove.
   */
  private removeFile(index: number): void {
    const removedFile = this.files[index]; // Get the file being removed
    this.files = this.files.filter((_, i) => i !== index);

    // Emit a custom event with the removed file details
    const event = new CustomEvent('file-removed', {
      detail: { removedFile },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Formats the file size for display.
   * @param {number} size - File size in bytes.
   * @returns {string} - Formatted file size as a string.
   */
  private formatFileSize(size: number): string {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
  }

  /**
   * Simulates the upload progress for the provided files.
   * @param {FileUploadProgress[]} files - Files for which to simulate upload progress.
   */
  private simulateUploadProgress(files: FileUploadProgress[]): void {
    files.forEach((fileUpload) => {
      const interval = setInterval(() => {
        if (fileUpload.progress >= 100) {
          clearInterval(interval);
        } else {
          fileUpload.progress += 10;
          this.files = [...this.files];
        }
      }, 300);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tds-file-input': FileInput;
  }
}
