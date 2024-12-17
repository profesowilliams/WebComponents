import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';
import './Skeleton'; // Import the Lit component

export default {
  title: 'Components/Skeleton',
  component: 'tds-skeleton',
} satisfies Meta;

export const Basic = () => html` <tds-skeleton .count=${5} .width=${400} .height=${''} .borderRadius=${'0.25rem'} .circle=${false} .enableAnimation=${true} .duration=${1.5} .direction=${'ltr'} .baseColor=${'#ebebeb'} .highlightColor=${'#f5f5f5'} .customHighlightBackground=${undefined}></tds-skeleton> `;
Basic.args = {
  count: 5,
  width: 400,
};

export const Inline = () => html`
  <div style="display: flex; align-items: center;">
    <tds-skeleton width="100px" inline style="margin-right: 0.5rem;"></tds-skeleton>
    <tds-skeleton width="150px" inline style="margin-right: 0.5rem;"></tds-skeleton>
    <tds-skeleton width="75px" inline style="margin-right: 0.5rem;"></tds-skeleton>
    <tds-skeleton width="150px" inline></tds-skeleton>
  </div>
  <div>Some text for comparison</div>
`;

export const InlineWithText = () => html` <div>Some random text <tds-skeleton width="150px" inline></tds-skeleton> Some more random text</div> `;

export const DifferentWidths = () => html`
  <div style="display: flex; flex-direction: column;">
    <tds-skeleton></tds-skeleton>
    <tds-skeleton width="50px"></tds-skeleton>
    <tds-skeleton width="100px"></tds-skeleton>
    <tds-skeleton width="200px"></tds-skeleton>
    <tds-skeleton width="50em"></tds-skeleton>
  </div>
`;

export const DifferentHeights = () => html`
  <div style="display: flex; flex-direction: column;">
    <tds-skeleton></tds-skeleton>
    <tds-skeleton height="200px"></tds-skeleton>
    <tds-skeleton height="400px"></tds-skeleton>
    <tds-skeleton height="600px"></tds-skeleton>
    <tds-skeleton height="50em"></tds-skeleton>
  </div>
`;

export const CustomStyles = () => html` <tds-skeleton height="100px" style="border-radius: 10px; height: 50px; width: 50px;"></tds-skeleton> `;

export const Circle = () => html` <tds-skeleton height="50px" width="50px" circle></tds-skeleton> `;

export const DecimalCount = () => html` <tds-skeleton count="3.5"></tds-skeleton> `;

export const DecimalCountPercentWidth = () => html` <tds-skeleton width="50%" count="3.5"></tds-skeleton> `;

export const DecimalCountInline = () => html` <tds-skeleton width="100px" inline count="3.5" style="margin-right: 1rem;"></tds-skeleton> `;

export const RightToLeft = () => html` <tds-skeleton direction="rtl"></tds-skeleton> `;

export const DisableAnimation = () => {
  let enabled = true;

  const toggleAnimation = (e: Event) => {
    enabled = (e.target as HTMLInputElement).checked;
    const skeleton = document.querySelector('tds-skeleton')!;
    skeleton.setAttribute('enableAnimation', String(enabled));
  };

  return html`
    <div>
      <label for="checkbox">
        Enable animation:
        <input id="checkbox" type="checkbox" .checked=${enabled} @change=${toggleAnimation} />
      </label>
      <tds-skeleton count="5" .enableAnimation=${enabled} highlightColor="#FF3384"></tds-skeleton>
    </div>
  `;
};

export const HighlightWidth = () => html`
  <div style="width: 500px;">
    <p>Default</p>
    <tds-skeleton highlightColor="#E0B0FF" customHighlightBackground="linear-gradient(90deg, var(--base-color) 0%, var(--highlight-color) 50%, var(--base-color) 100%)"></tds-skeleton>
    <br />
    <p>Narrow highlight</p>
    <tds-skeleton highlightColor="#E0B0FF" customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"></tds-skeleton>
    <br />
    <p>Wide highlight</p>
    <tds-skeleton highlightColor="#E0B0FF" customHighlightBackground="linear-gradient(90deg, var(--base-color) 0%, var(--highlight-color) 5%, var(--highlight-color) 95%, var(--base-color) 100%)"></tds-skeleton>
    <br />
    <p>Fun gradient</p>
    <tds-skeleton highlightColor="#E0B0FF" customHighlightBackground="linear-gradient(90deg, var(--base-color) 0%, rgba(131,58,180,1) 25%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 75%, var(--base-color) 100%)"></tds-skeleton>
  </div>
`;
