import { TemplateResult, html } from 'lit';
import '.';
import './NotificationLink';
import './NotificationClose';

interface NotificationArgs {
  variant: 'alert' | 'confirmation' | 'information' | 'error' | 'default';
  link: string;
  url: string;
  show: boolean;
  backgroundColor?: string;
  onClick?: () => void;
}

const renderNotification = (args: NotificationArgs): TemplateResult => html`
  <tds-notification variant=${args.variant} .show=${args.show} style="background-color: ${args.backgroundColor || 'inherit'}" @click=${args.onClick}>
    This is a ${args.variant} notification—check it out!
    <tds-notification-link type="link" variant="link" theme="light" label="Button" color="teal" url=${args.url}> ${args.link} </tds-notification-link>
    <tds-notification-close data-bs-dismiss="alert"></tds-notification-close>
  </tds-notification>
`;

export default {
  title: 'Components/Notification',
  component: 'tds-notification',
  parameters: {},
  tags: ['autodocs'],
  render: (args: NotificationArgs) => renderNotification(args),
  argTypes: {
    variant: {
      control: 'select',
      options: ['alert', 'confirmation', 'information', 'error', 'default'],
      description: 'Select the variant of the notification.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
    link: {
      control: 'text',
      description: 'Text for the hyperlink in the notification.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    url: {
      control: 'text',
      description: 'URL for the hyperlink in the notification.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    show: {
      control: 'boolean',
      description: 'Determines if the notification is shown.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'onClick',
      description: 'Action handler for click events.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  args: {
    variant: 'default',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};

export const Default = {
  args: {
    variant: 'default',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};

export const Alert = {
  args: {
    variant: 'alert',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};

export const Confirmation = {
  args: {
    variant: 'confirmation',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};

export const Information = {
  args: {
    variant: 'information',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};

export const Error = {
  args: {
    variant: 'error',
    link: 'Hyperlink',
    url: 'https://www.google.com',
    show: true,
  },
};
