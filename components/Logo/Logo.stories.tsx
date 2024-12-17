import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import '.';

interface LogoProps {
  name: 'techdata' | 'tdsynnex' | 'tecd';
  state: 'black' | 'dark' | 'light' | 'white';
  width: string;
  height: string;
}

// Metadata for the Logo component
const meta: Meta<LogoProps> = {
  title: 'Components/Logo',
  component: 'tds-logo',
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['techdata', 'tdsynnex', 'tecd'],
      defaultValue: { summary: 'techdata' },
      description: 'Specifies the name of the logo to display.',
    },
    state: {
      control: { type: 'select' },
      options: ['black', 'dark', 'light', 'white'],
      defaultValue: { summary: 'black' },
      description: 'Defines the color state of the logo.',
    },
    width: {
      control: 'text',
      defaultValue: { summary: '100px' },
      description: 'Sets the width of the logo.',
    },
    height: {
      control: 'text',
      defaultValue: { summary: 'auto' },
      description:
        'Sets the height of the logo. Defaults to "auto" to maintain aspect ratio.',
    },
  },
};

export default meta;

// Template definition
const Template = ({ name, state, width, height }: LogoProps) => html`
  <tds-logo
    name="${name}"
    state="${state}"
    width="${width}"
    height="${height}"
  ></tds-logo>
`;

// Stories definition
export const Techdata: StoryObj<LogoProps> = {
  args: {
    name: 'techdata',
    state: 'black',
    width: '100px',
    height: 'auto',
  },
  render: Template,
};

export const TD_SYNNEX: StoryObj<LogoProps> = {
  args: {
    name: 'tdsynnex',
    state: 'dark',
    width: '150px',
    height: 'auto',
  },
  render: Template,
};

export const TecD: StoryObj<LogoProps> = {
  args: {
    name: 'tecd',
    state: 'light',
    width: '120px',
    height: 'auto',
  },
  render: Template,
};
