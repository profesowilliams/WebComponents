import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import './Button';

interface ButtonProps {
  theme: 'light' | 'dark';
  disabled: boolean;
  color: 'dark-blue' | 'ocean-blue' | 'teal' | 'cobalt';
  compact: boolean;
  variant:
    | 'primary'
    | 'secondary'
    | 'filled'
    | 'tertiary'
    | 'link'
    | 'affirmative'
    | 'destructive';
  label: string;
}

// Metadata for the Button component
const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: 'tds-button',
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      defaultValue: { summary: 'light' },
      description: 'Specifies the theme of the button, either light or dark.',
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: false },
      description: 'Determines if the button is disabled.',
    },
    color: {
      control: 'select',
      options: ['dark-blue', 'ocean-blue', 'teal', 'cobalt'],
      defaultValue: { summary: 'dark-blue' },
      description: 'Specifies the color of the button.',
    },
    compact: {
      control: 'boolean',
      defaultValue: { summary: false },
      description: 'If true, the button has a compact appearance.',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'filled',
        'tertiary',
        'link',
        'affirmative',
        'destructive',
      ],
      defaultValue: { summary: 'primary' },
      description: 'Defines the style variant of the button.',
    },
    label: {
      control: 'text',
      defaultValue: { summary: 'Button' },
      description: 'The text displayed inside the button.',
    },
  },
};

export default meta;

// Template definition
const Template = ({
  theme,
  disabled,
  color,
  compact,
  variant,
  label,
}: ButtonProps) => html`
  <tds-button
    theme="${theme}"
    ?disabled="${disabled}"
    color="${color}"
    ?compact="${compact}"
    variant="${variant}"
    label="${label}"
  >
    ${label}
  </tds-button>
`;

// Stories definition
export const Default: StoryObj<ButtonProps> = {
  args: {
    theme: 'light',
    disabled: false,
    color: 'dark-blue',
    compact: false,
    variant: 'primary',
    label: 'Button',
  },
  render: Template,
};

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    ...Default.args,
    disabled: true,
    label: 'Disabled Button',
  },
  render: Template,
};

export const Compact: StoryObj<ButtonProps> = {
  args: {
    ...Default.args,
    compact: true,
    label: 'Compact Button',
  },
  render: Template,
};

export const Primary: StoryObj<ButtonProps> = {
  args: {
    theme: "light",
    disabled: false,
    color: "teal",
    compact: false,
    variant: "primary",
    label: "Primary Button"
  },

  render: Template
};

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    ...Default.args,
    variant: 'secondary',
    label: 'Secondary Button',
    color: "teal"
  },
  render: Template,
};

export const Filled: StoryObj<ButtonProps> = {
  args: {
    theme: "light",
    disabled: false,
    color: "teal",
    compact: false,
    variant: "filled",
    label: "Filled Button"
  },

  render: Template
};

export const Tertiary: StoryObj<ButtonProps> = {
  args: {
    theme: "light",
    disabled: false,
    color: "teal",
    compact: false,
    variant: "tertiary",
    label: "Tertiary Button"
  },

  render: Template
};

export const Link: StoryObj<ButtonProps> = {
  args: {
    ...Default.args,
    variant: 'link',
    label: 'Link Button',
    color: "teal"
  },
  render: Template,
};

export const Affirmative: StoryObj<ButtonProps> = {
  args: {
    theme: "light",
    disabled: false,
    color: "teal",
    compact: false,
    variant: "affirmative",
    label: "Affirmative Button"
  },

  render: Template
};

export const Destructive: StoryObj<ButtonProps> = {
  args: {
    theme: "light",
    disabled: false,
    color: "teal",
    compact: false,
    variant: "destructive",
    label: "Destructive Button"
  },

  render: Template
};
