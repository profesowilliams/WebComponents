import { html, TemplateResult } from 'lit';
import { action } from '@storybook/addon-actions';
import '../Button';
import './index';
import './ModalHeader';
import './ModalTitle';
import './ModalBody';
import './ModalFooter';
import './ModalButton';
import './ModalClose';

interface ModalArgs {
  theme: 'light' | 'dark';
  show: boolean;
  fade: boolean;
  title: string;
  footer: boolean;
  size: 'sm' | 'md' | 'lg';
  centered: boolean;
  scrollable: boolean;
  backdrop: boolean;
  placement: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'inline';
}

const renderModal = (args: ModalArgs): TemplateResult => html`
  <tds-modal .show="${args.show}" .fade="${args.fade}" .size="${args.size}" .centered="${args.centered}" .scrollable="${args.scrollable}" .backdrop="${args.backdrop}" @onHide="${action('onHide')}" @onCancel="${action('onCancel')}" @onSave="${action('onSave')}">
    <tds-modal-header>
      <tds-modal-title>${args.title}</tds-modal-title>
      <tds-modal-close data-bs-dismiss="modal"></tds-modal-close>
    </tds-modal-header>
    <tds-modal-body> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </tds-modal-body>
    <tds-modal-footer>
      <tds-modal-button type="button" variant="tertiary" theme="light" label="Button" color="dark-blue" data-bs-dismiss="modal">Close</tds-modal-button>
      <tds-modal-button type="button" variant="primary" theme="light" label="Button" color="dark-blue">Save</tds-modal-button>
    </tds-modal-footer>
  </tds-modal>
`;

export default {
  title: 'Components/Modal',
  component: 'tds-modal',
  tags: ['autodocs'],
  render: (args: ModalArgs) => renderModal(args),
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
    },
  },
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'inline-radio' },
      description: 'Select the theme for the modal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    show: {
      control: 'boolean',
      description: 'Determines if the modal is shown.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    fade: {
      control: 'boolean',
      description: 'Determines if the modal has a fade animation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the modal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Title' },
      },
    },
    footer: {
      control: 'boolean',
      description: 'Determines if the modal has a footer.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
      description: 'Size of the modal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Determines if the modal is centered.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    scrollable: {
      control: 'boolean',
      description: 'Determines if the modal content is scrollable.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    backdrop: {
      control: 'boolean',
      description: 'Determines if the modal has a backdrop.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    placement: {
      options: [
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-center',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'inline',
      ],
      control: 'select',
      description: 'Determines if the modal has a backdrop.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'middle-center' },
      },
    },
  },
  args: {
    theme: 'light',
    show: true,
    fade: true,
    title: 'Title',
    footer: false,
    size: 'md',
    centered: true,
    scrollable: false,
    backdrop: false,
    placement: 'middle-center',
  },
};

export const _Modal = {
  args: {
    show: true,
    fade: true,
    title: 'Title',
    footer: false,
    size: 'md',
    centered: true,
    scrollable: false,
    backdrop: false,
    placement: 'middle-center',
  },
  render: (args: ModalArgs) => renderModal(args),
};

export const DialogSmall = {
  args: {
    ..._Modal.args,
    size: 'sm',
  },
  render: (args: ModalArgs) => renderModal(args),
};

export const DialogMedium = {
  args: {
    ..._Modal.args,
    size: 'md',
  },
  render: (args: ModalArgs) => renderModal(args),
};

export const DialogLarge = {
  args: {
    ..._Modal.args,
    size: 'lg',
  },
  render: (args: ModalArgs) => renderModal(args),
};
