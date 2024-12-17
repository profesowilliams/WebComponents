import { html } from 'lit';
import './Dropdown';
import { Meta, StoryFn } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'tds-dropdown',
  parameters: {
    actions: {
      handles: ['input', 'click', 'keydown', 'value-changed'],
    },
    controls: {
      expanded: true,
    },
    docs: {
      story: {
        height: '250px',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Defines the dropdown options as an array of objects.',
      control: 'object',
      table: {
        defaultValue: { summary: '[]' }, // Array represented as string
        type: { summary: 'object' },
      },
    },
    value: {
      description: 'The selected value of the dropdown.',
      control: 'text',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'The label for the dropdown.',
      control: 'text',
      table: {
        defaultValue: { summary: 'Choose an option' },
        type: { summary: 'string' },
      },
    },
    required: {
      description: 'Specifies whether the dropdown is required.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' }, // Boolean represented as string
        type: { summary: 'boolean' },
      },
    },
    supporttext: {
      description: 'Displays additional help text below the dropdown.',
      control: 'text',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    errormessage: {
      description: 'Displays an error message below the dropdown.',
      control: 'text',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    multiselect: {
      description: 'Enables multi-select functionality.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' }, // Boolean represented as string
        type: { summary: 'boolean' },
      },
    },
    minlength: {
      description: 'Defines the minimum number of characters allowed.',
      control: 'number',
      table: {
        defaultValue: { summary: '0' }, // Number represented as string
        type: { summary: 'number' },
      },
    },
    maxlength: {
      description: 'Defines the maximum number of characters allowed.',
      control: 'number',
      table: {
        defaultValue: { summary: '100' }, // Number represented as string
        type: { summary: 'number' },
      },
    },
    size: {
      description: 'Defines the size of the dropdown.',
      control: 'number',
      table: {
        defaultValue: { summary: '1' }, // Number represented as string
        type: { summary: 'number' },
      },
    },
    disabled: {
      description: 'Disables the dropdown if set to true.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' }, // Boolean represented as string
        type: { summary: 'boolean' },
      },
    },
    optionTextKey: {
      description: 'The key used for option text.',
      control: 'text',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'string' },
      },
    },
    optionValueKey: {
      description: 'The key used for option values.',
      control: 'text',
      table: {
        defaultValue: { summary: 'value' },
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

const Template: StoryFn = (args) =>
  html`<tds-dropdown
    .options=${args.options}
    .value=${args.value}
    .label=${args.label}
    ?required=${args.required}
    .supporttext=${args.supporttext}
    .errormessage=${args.errormessage}
    ?multiselect=${args.multiselect}
    .minlength=${args.minlength}
    .maxlength=${args.maxlength}
    .size=${args.size}
    ?disabled=${args.disabled}
    .optionTextKey=${args.optionTextKey}
    .optionValueKey=${args.optionValueKey}
  ></tds-dropdown>`;

export const Default = Template.bind({});
Default.args = {
  options: [
    { text: 'Red', value: 'red' },
    { text: 'Blue', value: 'blue' },
    { text: 'Green', value: 'green' },
    { text: 'Yellow', value: 'yellow' },
    { text: 'Purple', value: 'purple' },
  ],
  label: 'Choose a color',
  optionTextKey: 'text',
  optionValueKey: 'value',
};

export const WithCustomValues = Template.bind({});
WithCustomValues.args = {
  options: [
    { text: 'Pink', value: 'pink' },
    { text: 'Lavender', value: 'lavender' },
    { text: 'Magenta', value: 'magenta' },
    { text: 'Beige', value: 'beige' },
    { text: 'Maroon', value: 'maroon' },
  ],
  value: 'magenta',
  label: 'Choose a shade',
  optionTextKey: 'text',
  optionValueKey: 'value',
};

export const PreselectedValue = Template.bind({});
PreselectedValue.args = {
  options: [
    { text: 'Red', value: 'red' },
    { text: 'Green', value: 'green' },
    { text: 'Blue', value: 'blue' },
  ],
  value: 'green',
  label: 'Choose a color',
  optionTextKey: 'text',
  optionValueKey: 'value',
};

export const WithCheckboxOptions = Template.bind({});
WithCheckboxOptions.args = {
  options: [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
    { text: 'Option 3', value: 'opt3' },
  ],
  label: 'Choose options',
  multiselect: true,
  optionTextKey: 'text',
  optionValueKey: 'value',
};

export const MultiSelectExample = Template.bind({});
MultiSelectExample.args = {
  options: [
    { text: 'Pink', value: 'pink' },
    { text: 'Lavender', value: 'lavender' },
    { text: 'Magenta', value: 'magenta' },
    { text: 'Beige', value: 'beige' },
    { text: 'Maroon', value: 'maroon' },
  ],
  label: 'Choose multiple colors',
  multiselect: true,
  optionTextKey: 'text',
  optionValueKey: 'value',
};

export const WithSupportText = Template.bind({});
WithSupportText.args = {
  options: [
    { text: 'Option A', value: 'a' },
    { text: 'Option B', value: 'b' },
    { text: 'Option C', value: 'c' },
  ],
  label: 'Enter a valid option',
  minlength: 3,
  maxlength: 10,
  supporttext: 'Minimum 3 characters, max 10 characters.',
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  options: [
    { text: 'Option A', value: 'a' },
    { text: 'Option B', value: 'b' },
    { text: 'Option C', value: 'c' },
  ],
  label: 'Enter a valid option',
  minlength: 3,
  maxlength: 10,
  errormessage: 'Invalid option selected.',
};
