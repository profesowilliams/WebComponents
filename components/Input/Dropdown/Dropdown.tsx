import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import customStyles from './Dropdown.scss?inline';

@customElement('tds-dropdown')
export class Dropdown extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(customStyles)}
    `;
  }

  @property({ type: Array, reflect: true }) options: Array<{
    text: string;
    value: string;
  }> = [];
  @property({ type: Array, reflect: true }) filteredResults: Array<{
    text: string;
    value: string;
  }> = [];
  @property({ type: Boolean, reflect: true }) isDropDownOpen = false;
  @property({ type: Number, reflect: true }) currentListItemFocused = -1;
  @property({ type: Array, reflect: true }) selectedValues: Array<string> = [];
  @property({ type: String, reflect: true, attribute: 'value' }) value: string =
    '';
  @property({ type: Boolean }) multiselect: boolean = false;

  // New properties
  @property({ type: String, reflect: true }) id: string = 'autocomplete-input';
  @property({ type: String, reflect: true }) label: string = 'Choose a value';
  @property({ type: Number, reflect: true }) minlength?: number;
  @property({ type: Number, reflect: true }) maxlength?: number;
  @property({ type: Number, reflect: true }) size?: number;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) required: boolean = false;

  @property({ type: String, reflect: true }) supporttext?: string;
  @property({ type: String, reflect: true }) errormessage?: string;

  @query('#autocomplete-input') input!: HTMLInputElement;
  @query('#autocomplete-results') resultsList!: HTMLUListElement;
  @query('.autocomplete__dropdown-arrow') dropdownArrow!: HTMLElement;
  @query('.autocomplete__container') comboBox!: HTMLElement;
  @query('slot') slotElement!: HTMLSlotElement;

  @property({ type: String, reflect: true }) optionTextKey: keyof {
    text: string;
    value: string;
  } = 'text';
  @property({ type: String, reflect: true }) optionValueKey: keyof {
    text: string;
    value: string;
  } = 'value';

  debounceTimeout?: number;
  DEBOUNCE_TIMEOUT_MS = 100;

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties); // Pass the argument to the parent class method

    window.addEventListener('click', this.handleOutsideClick.bind(this));
    if (this.input) {
      this.updateInputValue(); // Set initial value if provided
      this.input.addEventListener('focusout', this.validateInput.bind(this));
    }

    // Parse options if provided as a string attribute
    const optionsAttr = this.getAttribute('options');
    if (optionsAttr) {
      try {
        this.options = JSON.parse(optionsAttr);
        this.filteredResults = [...this.options];
      } catch (e) {
        console.error(
          'Invalid options attribute, must be a valid JSON array of objects.'
        );
      }
    }

    // Handle slot content
    if (this.slotElement) {
      this.slotElement.addEventListener('slotchange', () => {
        const slottedNodes = this.slotElement.assignedNodes({ flatten: true });
        if (slottedNodes.length > 0) {
          const textContent = slottedNodes[0].textContent?.trim();
          if (textContent) {
            this.label = textContent; // Set the label property to the slot content
          }
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.handleOutsideClick.bind(this));
    if (this.input) {
      this.input.removeEventListener('focusout', this.validateInput.bind(this));
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('options')) {
      this.filteredResults = [...this.options];
      this.updateInputValue();
    }
    if (changedProperties.has('value')) {
      this.updateInputValue();
    }
  }

  updateInputValue() {
    if (this.input) {
      if (this.multiselect && this.selectedValues.length > 0) {
        this.input.value = this.selectedValues
          .map((selectedValue) => {
            const matchedOption = this.options.find(
              (option) => option[this.optionValueKey] === selectedValue
            );
            return matchedOption
              ? matchedOption[this.optionTextKey]
              : selectedValue;
          })
          .join(', ');
      } else {
        const matchedOption = this.options.find(
          (option) => option[this.optionValueKey] === this.value
        );
        this.input.value = matchedOption
          ? matchedOption[this.optionTextKey]
          : ''; // Update input value to show text instead of value
      }
    }
  }

  handleOutsideClick(event: MouseEvent) {
    if (this.isDropDownOpen && !this.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  render() {
    return html`
      <div
        class="autocomplete__container form-floating"
        role="combobox"
        aria-labelledby="autocomplete-label"
        aria-expanded="${this.isDropDownOpen}"
      >
        <input
          id="${this.id}"
          class="autocomplete__input form-control"
          role="textbox"
          placeholder="${this.label}"
          minlength="${this.minlength ?? ''}"
          maxlength="${this.maxlength ?? ''}"
          size="${this.size ?? ''}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .value="${this.input ? this.input.value : this.getInputTextValue()}"
          aria-controls="autocomplete-results"
          @input="${this.onInput}"
          @keydown="${this.handleKeyboardEvents}"
          @click="${this.openDropdown}"
        />
        <label for="${this.id}">
          ${this.required
            ? html`<span class="required">*</span> <slot></slot>`
            : html`<slot></slot>`}
        </label>

        <button
          aria-label="toggle dropdown"
          class="autocomplete__dropdown-arrow btn btn-secondary"
          @click="${this.toggleDropdown}"
        >
          ${this.isDropDownOpen
            ? html`<svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.14645 10.3536C3.34171 10.5488 3.65829 10.5488 3.85355 10.3536L8 6.20711L12.1464 10.3536C12.3417 10.5488 12.6583 10.5488 12.8536 10.3536C13.0488 10.1583 13.0488 9.84171 12.8536 9.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L3.14645 9.64645C2.95118 9.84171 2.95118 10.1583 3.14645 10.3536Z"
                  fill="#212121"
                />
              </svg>`
            : html`<svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
                  fill="#262626"
                />
              </svg>`}
        </button>

        ${this.supporttext
          ? html`<div class="form-text">${this.supporttext}</div>`
          : ''}
        ${this.errormessage
          ? html`<div class="error">${this.errormessage}</div>`
          : ''}

        <ul
          id="autocomplete-results"
          class="autocomplete__results ${this.isDropDownOpen ? 'visible' : ''}"
          role="listbox"
        >
          ${this.filteredResults.map(
            (item, index) => html`<li
              id="autocomplete-item-${index}"
              class="autocomplete-item ${this.selectedValues.includes(
                item[this.optionValueKey]
              )
                ? 'selected highlighted'
                : ''}"
              role="option"
              tabindex="0"
              @click="${() => this.selectValue(item)}"
              @keydown="${this.handleKeyboardEvents}"
            >
              ${item[this.optionTextKey]}
            </li>`
          )}
        </ul>
      </div>
    `;
  }

  getInputTextValue() {
    const matchedOption = this.options.find(
      (option) => option[this.optionValueKey] === this.value
    );
    return matchedOption ? matchedOption[this.optionTextKey] : '';
  }

  validateInput() {
    if (
      this.value &&
      !this.options.some((opt) => opt[this.optionValueKey] === this.value)
    ) {
      this.errormessage = 'You have entered an invalid option.';
    } else {
      this.errormessage = '';
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    const listItems = Array.from(this.resultsList.children) as HTMLElement[];
    let itemToFocus: HTMLElement | null = null;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.currentListItemFocused < listItems.length - 1) {
          this.currentListItemFocused++;
          itemToFocus = listItems[this.currentListItemFocused];
          this.focusListItem(itemToFocus);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.currentListItemFocused > 0) {
          this.currentListItemFocused--;
          itemToFocus = listItems[this.currentListItemFocused];
          this.focusListItem(itemToFocus);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (this.isDropDownOpen && this.currentListItemFocused >= 0) {
          const selectedItem =
            this.filteredResults[this.currentListItemFocused];
          this.selectValue(selectedItem);
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
      default:
        break;
    }
  }

  focusListItem(listItemNode: HTMLElement) {
    const id = listItemNode.id;
    if (this.input) {
      this.input.setAttribute('aria-activedescendant', id);
    }
    listItemNode.focus();
  }

  selectValue(value: { text: string; value: string }) {
    const selectedValue = value[this.optionValueKey as 'text' | 'value'];
    if (!selectedValue) {
      console.error(
        `Value key "${this.optionValueKey}" not found in the selected item.`
      );
      return;
    }

    const selectedText = value[this.optionTextKey as 'text' | 'value'];

    this.value = selectedValue;
    this.selectedValues = [selectedValue];
    this.updateInputValue();
    this.closeDropdown();
    this.errormessage = '';

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: this.value, text: selectedText },
        bubbles: true,
        composed: true,
      })
    );

    console.log('value-changed event emitted:', {
      value: this.value,
      text: selectedText,
    });
  }

  onInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value; // Set the value property
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = window.setTimeout(() => {
      this.filterResults(value);
      if (!this.isDropDownOpen) {
        this.openDropdown();
      }
      if (!value) {
        this.selectedValues = []; // Deselect all values if input is cleared
      }
    }, this.DEBOUNCE_TIMEOUT_MS);
  }

  filterResults(value: string) {
    if (value) {
      const regex = new RegExp(`^${value}.*`, 'gi');
      this.filteredResults = this.options.filter((opt) =>
        regex.test(opt[this.optionTextKey])
      );
    } else {
      this.filteredResults = [...this.options];
    }
  }

  openDropdown() {
    this.isDropDownOpen = true;
  }

  closeDropdown() {
    this.isDropDownOpen = false;
    this.currentListItemFocused = -1;
    if (this.input) {
      this.input.setAttribute('aria-activedescendant', '');
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropDownOpen ? this.closeDropdown() : this.openDropdown();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tds-dropdown': Dropdown;
  }
}
