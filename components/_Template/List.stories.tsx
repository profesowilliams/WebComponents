import type { Meta, StoryObj } from '@storybook/web-components';

import { html } from 'lit';

const meta: Meta = {
  title: 'List',
  component: 'tds-toast',
  subcomponents: { ToastHeader: 'tds-toast-header' }, // 👈 Adds the ListItem component as a subcomponent
};
export default meta;

type Story = StoryObj;

export const Empty: Story = {};

export const OneItem: Story = {
  render: () => html`
    <demo-list>
      <demo-list-item></demo-list-item>
    </demo-list>
  `,
};
