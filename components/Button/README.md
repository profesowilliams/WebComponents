# Button

The `Button` component allows users to commit a change or trigger an action via a single click or tap and is often found inside forms, dialogs, panels, and/or pages.

## **Design Spec**

[Link to Button in Figma](https://www.figma.com/proto/43D318SJ2qbknLYlNKoyu7/Documentation?page-id=1650%3A21287&node-id=1778-22596&node-type=frame&viewport=-5826%2C1267%2C0.55&t=FllCFtMiAHakM3kb-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2009%3A8986)

<br />

## **Engineering Spec**

DDS WC3 Button has feature parity with the DDS UI React 1 Button implementation but not direct parity.

<br />

## Class: `Button`

<br />

### **Component Name**

`<tds-button></tds-button>`

<br />

### **Attributes**

| Name              | Field                |
| ----------------- | -------------------- |
| `primary`         | boolean              |
| `disabled`        | boolean              |
| `type`            | string               |
| `link`            | string               |
| `variant`         | string               |
| `theme`           | string               |
| `minimal`         | boolean              |
| `id`              | string               |
| `name`            | string               |
| `className`       | string               |
| `label`           | string               |
| `color`           | string               |
| `size`            | string               |
| `backgroundColor` | string               |
| `onClick`         | function             |
| `compact`         | boolean              |

<br />

<hr />

<br />

## **Accessibility**

[W3 Button Spec](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

<br />

### **WAI-ARIA Roles, States, and Properties**

<br />
<hr />
<br />

## **Preparation**

<br />

### **DDS Web Component v1 vs DDS React 1**

<br />

**Component and Slot Mapping**

| DDS UI React 1 | DDS Web Components 1 |
| -------------- | -------------------- |
| `<Button>`     | `<tds-button>`       |

<br />

**Property Mapping**

| DDS UI React 1     | DDS Web Components 1                        | Description of difference                                                                                                                    |
| ------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`             | The default slot or `start`, and `end` slots | In DDSUIR1, `icon` is a slot. In the web components implementation, an icon can be passed into the default slot and paired with an `icon-only` attribute, or supplementally in the `start` and/or `end` slots |
| `as`               | A separate web component for anchor implementations | In DDSUIR1, HTML is returned so interpolating tags in the virtual DOM doesn't present a problem. In WC's, we can't safely interpolate tags and the cost to provide two sets of APIs, one form associated and one not. Button is a form associated element whereas anchors are not. For this reason, we'll provide an "anchor-button" as a separate component.  |
| `primary`          | `primary`                                   | Both implementations have this property to indicate if the button is primary.                                                                 |
| `disabled`         | `disabled`                                  | Both implementations have this property to indicate if the button should be disabled.                                                         |
| `type`             | `type`                                      | Both implementations have this property to specify the type of the button.                                                                    |
| `link`             | `url`                                       | In DDSUIR1, `link` is used, whereas in DDS WC, `url` is used.                                                                                 |
| `variant`          | `variant`                                   | Both implementations have this property to specify the variant of the button.                                                                 |
| `theme`            | `theme`                                     | Both implementations have this property to specify the theme of the button.                                                                   |
| `minimal`          | `minimal`                                   | Both implementations have this property to indicate if the button should be minimal.                                                          |
| `id`               | `id`                                        | Both implementations have this property to specify the ID of the button.                                                                      |
| `name`             | `name`                                      | Both implementations have this property to specify the name of the button.                                                                    |
| `className`        | `className`                                 | Both implementations have this property to specify the class of the button.                                                                   |
| `label`            | `label`                                     | Both implementations have this property to specify the label of the button.                                                                   |
| `color`            | `color`                                     | Both implementations have this property to specify the color of the button.                                                                   |
| `size`             | `size`                                      | Both implementations have this property to specify the size of the button.                                                                    |
| `backgroundColor`  | `backgroundColor`                           | Both implementations have this property to specify the background color of the button.                                                        |
| `onClick`          | `onClick`                                   | Both implementations have this property to specify the click handler for the button.                                                          |
| `compact`          | `compact`                                   | Both implementations have this property to indicate if the button should be compact.                                                          |
