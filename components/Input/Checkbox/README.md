# Checkbox

> An implementation of a [checkbox](https://w3c.github.io/html-reference/input.checkbox.html) as a form-connected web-component.

<br />

## **Design Spec**

[Link to Checkbox Design Spec in Figma](https://www.figma.com/proto/43D318SJ2qbknLYlNKoyu7/Documentation?page-id=1650%3A21287&node-id=1948-27074&node-type=frame&viewport=-5826%2C1267%2C0.55&t=FllCFtMiAHakM3kb-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2009%3A8986)

<br />

## **Engineering Spec**

DDS WC3 Checkbox has feature parity with the DDS UI React 1 Checkbox implementation but not direct parity.

<br />

## Class: `Checkbox`

<br />

### **Component Name**

`<tds-checkbox>`

<br />

### **Variables**

| Name                    | Description          | Type                                         |
| ----------------------- | -------------------- | -------------------------------------------- |
| `CheckboxLabelPosition` | label position types | `{ before: "before", after: "after" }`       |
| `CheckboxShape`         | checkbox shape types | `{ square: "square", circular: "circular" }` |
| `CheckboxSize`          | checkbox size types  | `{ medium: "medium", large: "large" }`       |

<br />

### **Attributes**

| Name             | Privacy | Type                    | Default                       | Description                                        |
| ---------------- | ------- | ----------------------- | ----------------------------- | -------------------------------------------------- |
| `label-position` | public  | `CheckboxLabelPosition` | `CheckboxLabelPosition.after` | Indicates postion of label                         |
| `checked`        | public  | `boolean`               | `false`                       | Indicates whether input is checked                 |
| `indeterminate`  | public  | `boolean`               | `false`                       | Indicates whether input is initially indeterminate |
| `disabled`       | public  | `boolean`               | `false`                       | Indicates whether input is disabled                |
| `required `      | public  | `boolean`               | `false`                       | Indicates whether input is required                |
| `size`           | public  | `CheckboxSize`          | `CheckboxSize.medium`         | Indicates the size of the checkbox                 |
| `shape`          | public  | `CheckboxShape`         | `CheckboxShape.square`        | Indicates shape of the checkbox                    |

<br />

### **IDL Attributes**

| Name            | Field         | Type      | Description                                     |
| --------------- | ------------- | --------- | ----------------------------------------------- |
| `checked`       | checked       | `boolean` | The current checked state of the checkbox       |
| `indeterminate` | indeterminate | `boolean` | The indeterminate state. Independent of checked |

<br />

### **Slots**

| Name                      | Description                                    |
| ------------------------- | ---------------------------------------------- |
|                           | The default slot for text input content        |
| `checked-indicator`       | The named slot for the checked indicator       |
| `indeterminate-indicator` | The named slot for the indeterminate indicator |

<br />
<hr />
<br />

## **Accessibility**

[W3C Checkbox Spec](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `role="checkbox"`
- `aria-checked`
- `aria-required`
- `aria-disabled`

<br />

### **DDS Web Component v1 v.s DDS React 1**

<br />

**Component and Slot Mapping**

| DDS UI React 1 | DDS Web Components 1            | Description                      |
| -------------- | ------------------------------- | -------------------------------- |
| `<Checkbox>`   | `<tds-checkbox>`                |
| n/a            | slot: `checked-indicator`       | slot for checked indicator       |
| n/a            | slot: `indeterminate-indicator` | slot for indeterminate indicator |

<br />

**Property Mapping**
| DDS UI React 1 | DDS Web Components 1 | Description of difference |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `checked: boolean | 'mixed'` | `checked: boolean` `indeterminate: boolean` | DDS UI React v9 uses a single property to set the checked and indeterminate states, while DDS UI Web Components v3 requires separate boolean attributes for each state.
