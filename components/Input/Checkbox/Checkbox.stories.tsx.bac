import { html, TemplateResult } from 'lit';
import '.';

interface CheckboxArgs {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  theme?: 'light' | 'dark';
}

const renderCheckbox = (args: CheckboxArgs): TemplateResult => html` <tds-checkbox ?checked=${args.checked} ?indeterminate=${args.indeterminate} ?disabled=${args.disabled}> This is a test message. </tds-checkbox> `;

export default {
  title: 'Components/Checkbox',
  component: 'tds-checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Select the theme for the checkbox.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Determines if the checkbox is checked.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Determines if the checkbox is in an indeterminate state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the checkbox is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    theme: 'light',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const Default = {
  render: () => html`
    <tds-checkbox id="unchecked">This is a test message.</tds-checkbox>
    <tds-checkbox id="checked" checked>This is a test message.</tds-checkbox>
    <tds-checkbox id="indeterminate" indeterminate>This is a test message.</tds-checkbox>
  `,
};

export const Unchecked = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const Checked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const Indeterminate = {
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const DisabledUnchecked = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: true,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const DisabledChecked = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: true,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};

export const DisabledIndeterminate = {
  args: {
    checked: false,
    indeterminate: true,
    disabled: true,
  },
  render: (args: CheckboxArgs) => renderCheckbox(args),
};
