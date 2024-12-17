import { html, TemplateResult } from 'lit';
import '.';

interface TooltipArgs {
  text: string;
  placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
  size: boolean;
  hide: boolean;
  arrow: boolean;
  arrowPadding: number;
}

const renderTooltip = (args: TooltipArgs): TemplateResult => html`
  <tds-tooltip text="${args.text}" placement="${args.placement}" ?size="${args.size}" ?hide="${args.hide}" ?arrow="${args.arrow}" arrow-padding="${args.arrowPadding}">
    <button>Hover me</button>
  </tds-tooltip>
`;

export default {
  title: 'Components/Tooltip',
  component: 'tds-tooltip',
  parameters: {
    layout: 'centered',
  },
  tags: ['docsPage'],
  render: (args: TooltipArgs) => renderTooltip(args),
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to be displayed inside the tooltip.',
      table: {
        defaultValue: { summary: 'Tooltip text' },
        type: { summary: 'string' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'],
      description: 'Position of the tooltip relative to the wrapped element.',
      table: {
        defaultValue: { summary: 'bottom' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'boolean',
      description: 'Whether to enable the size middleware to fit the viewport.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    hide: {
      control: 'boolean',
      description: 'Whether to enable hiding the tooltip when appropriate.',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to enable the arrow pointing to the reference element.',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    arrowPadding: {
      control: 'number',
      description: 'Padding between the arrow and edges of the floating element.',
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    text: 'Tooltip text',
    placement: 'bottom',
    size: false,
    hide: true,
    arrow: true,
    arrowPadding: 0,
  },
};

export const Default = {
  args: {
    text: 'Tooltip text',
    placement: 'bottom',
    size: false,
    hide: true,
    arrow: true,
    arrowPadding: 0,
  },
};
