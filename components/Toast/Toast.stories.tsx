import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import './Toast';
import './ToastHeader';
import './ToastBody';
import './ToastLink';

interface ToastProps {
  variant: 'default' | 'information' | 'confirmation' | 'alert' | 'error';
  size: 'small' | 'medium' | 'large';
  placement:
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
  show: boolean;
  timeout: number;
  persistent: boolean;
  top: string;
  right: string;
  bottom: string;
  left: string;
}

// Metadata for the Toast component
const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  component: 'tds-toast',
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      story: {
        height: '150px',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'information', 'confirmation', 'alert', 'error'],
      defaultValue: { summary: 'default' },
      description: 'Specifies the visual style of the toast.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: { summary: 'medium' },
      description: 'Defines the size of the toast.',
    },
    placement: {
      control: 'select',
      options: [
        'custom',
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-center',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      defaultValue: { summary: 'top-center' },
      description: 'Controls where the toast is displayed on the screen.',
    },
    show: {
      control: 'boolean',
      defaultValue: { summary: true },
      description: 'Determines whether the toast is visible.',
    },
    timeout: {
      control: 'number',
      defaultValue: { summary: 5000 },
      description:
        'Specifies how long (in milliseconds) the toast remains visible before auto-closing.',
    },
    persistent: {
      control: 'boolean',
      defaultValue: { summary: false },
      description:
        'When true, the toast does not auto-close and ignores the timeout property.',
    },
    top: {
      control: 'text',
      defaultValue: { summary: '' },
      description:
        'Specifies the top position when placement is set to "custom".',
    },
    right: {
      control: 'text',
      defaultValue: { summary: '' },
      description:
        'Specifies the right position when placement is set to "custom".',
    },
    bottom: {
      control: 'text',
      defaultValue: { summary: '' },
      description:
        'Specifies the bottom position when placement is set to "custom".',
    },
    left: {
      control: 'text',
      defaultValue: { summary: '' },
      description:
        'Specifies the left position when placement is set to "custom".',
    },
  },
};

export default meta;

// Template definition
const Template = ({
  variant,
  size,
  placement,
  show,
  timeout,
  persistent,
  top,
  right,
  bottom,
  left,
}: ToastProps) => html`
  <tds-toast
    variant="${variant}"
    size="${size}"
    placement="${placement}"
    ?show="${show}"
    timeout="${timeout}"
    ?persistent="${persistent}"
    style="
      ${placement === 'custom'
      ? `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`
      : ''}"
  >
    <tds-toast-header>This is a ${variant} toast.</tds-toast-header>
    <tds-toast-body>
      <tds-toast-link url="#" target="_blank">Learn more</tds-toast-link>
    </tds-toast-body>
  </tds-toast>
`;

const SansLink = ({
  variant,
  size,
  placement,
  show,
  timeout,
  persistent,
  top,
  right,
  bottom,
  left,
}: ToastProps) => html`
  <tds-toast
    variant="${variant}"
    size="${size}"
    placement="${placement}"
    ?show="${show}"
    timeout="${timeout}"
    ?persistent="${persistent}"
    style="
      ${placement === 'custom'
      ? `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`
      : ''}"
  >
    <tds-toast-header>This is a ${variant} toast.</tds-toast-header>
  </tds-toast>
`;

// Stories definition
export const Default: StoryObj<ToastProps> = {
  args: {
    variant: 'default',
    size: 'medium',
    placement: 'middle-center',
    show: true,
    timeout: 5000,
    persistent: true,
    top: '',
    right: '',
    bottom: '',
    left: '',
  },
  render: Template,
};

export const NoLink: StoryObj<ToastProps> = {
  args: {
    variant: 'default',
    size: 'medium',
    placement: 'middle-center',
    show: true,
    timeout: 5000,
    persistent: true,
    top: '',
    right: '',
    bottom: '',
    left: '',
  },
  render: SansLink,
};

export const Information: StoryObj<ToastProps> = {
  args: {
    ...Default.args,
    variant: 'information',
    placement: 'middle-center',
  },
  render: Template,
};

export const Confirmation: StoryObj<ToastProps> = {
  args: {
    ...Default.args,
    variant: 'confirmation',
    placement: 'middle-center',
  },
  render: Template,
};

export const Alert: StoryObj<ToastProps> = {
  args: {
    ...Default.args,
    variant: 'alert',
    placement: 'middle-center',
  },
  render: Template,
};

export const Error: StoryObj<ToastProps> = {
  args: {
    ...Default.args,
    variant: 'error',
    placement: 'middle-center',
  },
  render: Template,
};

export const CustomPlacement: StoryObj<ToastProps> = {
  args: {
    ...Default.args,
    placement: 'custom',
    top: '10px',
    left: '10px',
  },
  render: Template,
};
