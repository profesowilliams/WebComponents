import { html, TemplateResult } from 'lit';
import './Accordion';
import './AccordionItem';
import './AccordionHeader';
import './AccordionBody';
import './AccordionButton';
import { Meta, StoryFn } from '@storybook/web-components';

interface AccordionProps {
  outline: 'top' | 'bottom' | 'topbottom' | 'full';
  orientation: 'left' | 'right';
}

export default {
  title: 'Components/Accordion',
  component: 'tds-accordion',
  args: {
    outline: 'top',
    orientation: 'left',
  },
  argTypes: {
    outline: {
      control: 'select',
      description: 'Sets the outline of the accordion',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
      options: ['top', 'bottom', 'topbottom', 'full'],
    },
    orientation: {
      control: 'radio',
      description: 'Sets the orientation of the accordion',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
      options: ['left', 'right'],
    },
  },
} as Meta<AccordionProps>;

const Template: StoryFn<AccordionProps> = ({ outline, orientation }: AccordionProps): TemplateResult => html`
  <tds-accordion outline="${outline}" orientation="${orientation}">
    <tds-accordion-item expanded>
      <tds-accordion-header>
        <tds-accordion-button>Accordion Item #1</tds-accordion-button>
      </tds-accordion-header>
      <tds-accordion-body> <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. </tds-accordion-body>
    </tds-accordion-item>
    <tds-accordion-item>
      <tds-accordion-header>
        <tds-accordion-button>Accordion Item #2</tds-accordion-button>
      </tds-accordion-header>
      <tds-accordion-body> <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. </tds-accordion-body>
    </tds-accordion-item>
    <tds-accordion-item>
      <tds-accordion-header>
        <tds-accordion-button>Accordion Item #3</tds-accordion-button>
      </tds-accordion-header>
      <tds-accordion-body> <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. </tds-accordion-body>
    </tds-accordion-item>
  </tds-accordion>
`;

export const Accordion = Template.bind({});
Accordion.args = {
  outline: 'top',
  orientation: 'left',
};
