import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';
import './Input';
import '../Heading';
import '../Icon';
import '../Button';
import { Input } from './Input';

export default {
  title: 'Components/Input',
  component: 'tds-input',
  argTypes: {
    type: {
      control: 'select',
      options: [
        'hidden',
        'text',
        'search',
        'tel',
        'url',
        'email',
        'password',
        'datetime',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'range',
        'color',
        'checkbox',
        'radio',
        'file',
        'submit',
        'image',
        'reset',
        'button',
      ],
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    id: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    regex: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<Input> = (args) =>
  html`
    <tds-input
      id="${args.id}"
      type="${args.type}"
      placeholder="${args.placeholder}"
      label="${args.label}"
      regex="${args.pattern}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
    ></tds-input>
  `;

export const Default = Template.bind({});
Default.args = {
  id: 'input-example',
  type: 'text',
  placeholder: 'Enter text',
  label: 'Text Input',
  disabled: false,
  required: false,
};

export const Hidden = Template.bind({});
Hidden.args = {
  id: 'hidden-example',
  type: 'hidden',
};

export const Text = Template.bind({});
Text.args = {
  id: 'text-example',
  type: 'text',
  placeholder: 'Enter text',
  label: 'Text Input',
  required: true,
};

export const Search = Template.bind({});
Search.args = {
  id: 'search-example',
  type: 'search',
  placeholder: 'Search...',
  label: 'Search Input',
};

export const Telephone = Template.bind({});
Telephone.args = {
  id: 'telephone-example',
  type: 'tel',
  placeholder: 'Enter phone number',
  label: 'Telephone Input',
  regex: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
};

export const Url = Template.bind({});
Url.args = {
  id: 'url-example',
  type: 'url',
  placeholder: 'Enter URL',
  label: 'URL Input',
};

export const Email = Template.bind({});
Email.args = {
  id: 'email-example',
  type: 'email',
  placeholder: 'Enter email',
  label: 'Email Input',
};

export const Password = Template.bind({});
Password.args = {
  id: 'password-example',
  type: 'password',
  placeholder: 'Enter password',
  label: 'Password Input',
};

export const Datetime = Template.bind({});
Datetime.args = {
  id: 'datetime-example',
  type: 'datetime',
  placeholder: 'Enter datetime',
  label: 'Datetime Input',
};

export const Date = Template.bind({});
Date.args = {
  id: 'date-example',
  type: 'date',
  placeholder: 'Enter date',
  label: 'Date Input',
};

export const Month = Template.bind({});
Month.args = {
  id: 'month-example',
  type: 'month',
  placeholder: 'Enter month',
  label: 'Month Input',
};

export const Week = Template.bind({});
Week.args = {
  id: 'week-example',
  type: 'week',
  placeholder: 'Enter week',
  label: 'Week Input',
};

export const Time = Template.bind({});
Time.args = {
  id: 'time-example',
  type: 'time',
  placeholder: 'Enter time',
  label: 'Time Input',
};

export const DatetimeLocal = Template.bind({});
DatetimeLocal.args = {
  id: 'datetime-local-example',
  type: 'datetime-local',
  placeholder: 'Enter datetime-local',
  label: 'Datetime Local Input',
};

export const Number = Template.bind({});
Number.args = {
  id: 'number-example',
  type: 'number',
  placeholder: 'Enter number',
  label: 'Number Input',
};

export const Range = Template.bind({});
Range.args = {
  id: 'range-example',
  type: 'range',
  placeholder: 'Enter range',
  label: 'Range Input',
};

export const Color = Template.bind({});
Color.args = {
  id: 'color-example',
  type: 'color',
  placeholder: 'Enter color',
  label: 'Color Input',
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'checkbox-example',
  type: 'checkbox',
  placeholder: 'Enter checkbox',
  label: 'Checkbox Input',
};

export const Radio = Template.bind({});
Radio.args = {
  id: 'radio-example',
  type: 'radio',
  label: 'Radio Input',
  checked: false,
  disabled: false,
  required: false,
};

export const File = Template.bind({});
File.args = {
  id: 'file-example',
  type: 'file',
  placeholder: 'Enter file',
  label: 'File Input',
};

export const Submit = Template.bind({});
Submit.args = {
  id: 'submit-example',
  type: 'submit',
  placeholder: 'Enter submit',
  label: 'Submit Input',
};

export const Image = Template.bind({});
Image.args = {
  id: 'image-example',
  type: 'image',
  placeholder: 'Enter image',
  label: 'Image Input',
};

export const Reset = Template.bind({});
Reset.args = {
  id: 'reset-example',
  type: 'reset',
  placeholder: 'Enter reset',
  label: 'Reset Input',
};

export const Button = Template.bind({});
Button.args = {
  id: 'button-example',
  type: 'button',
  placeholder: 'Enter button',
  label: 'Button Input',
};
