import { html } from 'lit';
import type { Meta, StoryFn } from '@storybook/web-components';
import { Menu } from './Menu';
import './Menu';
import './MenuItem';
import '../Button';
import '../Icon';

export default {
  title: 'Components/Menu',
  component: 'tds-menu',
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the menu.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'],
      description: 'Specifies the placement of the menu relative to the trigger.',
      table: {
        defaultValue: { summary: 'bottom-start' },
        type: { summary: 'string' },
      },
    },
    strategy: {
      control: 'text',
      description: 'Specifies the positioning strategy for the menu.',
      table: {
        defaultValue: { summary: 'absolute' },
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable dropdown menu component built with Lit. Use `open` to toggle visibility and `placement` to control its position.',
      },
    },
  },
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = (args) => html`
  <tds-menu .open=${args.open} .placement=${args.placement} .strategy=${args.strategy}>
    <tds-button type="button" variant="tertiary" color="teal" slot="trigger"><tds-icon name="ellipsis" state="default"></tds-icon></tds-button>
    <tds-menu-item><tds-button type="link" variant="link" color="teal"><tds-icon name="person" state="default"></tds-icon>Test 1</tds-button></tds-menu-item>
    <tds-menu-item><tds-button type="link" variant="link" color="teal">Test 2</tds-button></tds-menu-item>
    <tds-menu-item><tds-button type="link" variant="link" color="teal">Test 3</tds-button></tds-menu-item>
  </tds-menu>
`;

export const Default = Template.bind({});
Default.args = {
  open: false,
  placement: 'bottom-start',
  strategy: 'absolute',
};

export const OpenMenu = Template.bind({});
OpenMenu.args = {
  open: true,
  placement: 'bottom-start',
  strategy: 'absolute',
};

export const Interactive = (args) => {
  return html`
    <tds-menu .open=${args.open} .hover=${args.hover} .placement=${args.placement} .strategy=${args.strategy} role="menu" aria-expanded=${args.open}>
      <button slot="trigger">Hover or Click to Open Menu</button>
      <tds-menu-item><tds-button type="button" variant="link" color="teal">Test 1</tds-button></tds-menu-item>
      <tds-menu-item><tds-button type="button" variant="link" color="teal">Test 2</tds-button></tds-menu-item>
      <tds-menu-item><tds-button type="button" variant="link" color="teal">Test 3</tds-button></tds-menu-item>
    </tds-menu>
  `;
};

Interactive.args = {
  open: false,
  hover: true, // Enable hover interaction
  placement: 'bottom-start',
  strategy: 'absolute',
};
