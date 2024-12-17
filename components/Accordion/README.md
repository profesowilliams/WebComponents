# Accordion

As defined by the [W3C](https://w3c.github.io/aria-practices/#accordion):

> An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

<br />

## **Design Spec**

[Link to Accordion Design Spec in Figma](https://www.figma.com/design/0kRReWOuX0Wv29hbxahsRr/Component-Library?node-id=3242-18290)

<br />

## **Engineering Spec**

DDS WC3 Accordion extends from the [Bootstrap Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) and is intended to be as close to the DDS UI React 1 Accordion implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `Accordion`

<br />

### **Component Name**

`Accordion`

<br />

### **Variables**

| Name                  | Description               | Type                                   |
| --------------------- | ------------------------- | -------------------------------------- |
| `AccordionExpandMode` | Expand mode for Accordion | `{ single: "single", multi: "multi" }` |

<br />

### **Fields**

| Name             | Privacy   | Type                  | Default    | Description                                                                                   |
| ---------------- | --------- | --------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `expandmode`     | public    | `AccordionExpandMode` | `multiple` | Controls the expand mode of the Accordion, either allowing single or multiple item expansion. |
| `AccordionItems` | protected | `Element[]`           |

<br />

### **Methods**

| Name                | Privacy | Description | Parameters                                              | Return | Inherited From |
| ------------------- | ------- | ----------- | ------------------------------------------------------- | ------ | -------------- |
| `expandmodeChanged` | public  |             | `prev: AccordionExpandMode, next: AccordionExpandMode ` |

<br />

### **Events**

| Name     | Type | Description                                                | Inherited From |
| -------- | ---- | ---------------------------------------------------------- | -------------- |
| `change` |      | Fires a custom 'change' event when the active item changes |

<br />

### **Attributes**

| Name          | Field      |
| ------------- | ---------- |
| `expand-mode` | expandmode |
| `outline`     | outline    |
| `orientation` | orientation|

<br />

<hr />

<br />

## **Accessibility**

[W3 Accordion Spec](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

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
| `<Accordion>`  | `<tds-accordion>`    |

<br />

**Property Mapping**
| DDS UI React 1 | DDS Web Components 1 | Description of difference |
| ------------------------- | ------------------------------------------ |---------------------------------------------------------- |
| `defaultOpenItems: number`| `expand: boolean` | `defaultOpenItems` is a number property set on the `Accordion` corresponding to the intended `AccordionItem` to be expanded.<hr /> `expand` is a boolean property set directly on the `AccordionItem` intended to be expanded |
| `multiple: boolean` | `expand-mode: "single" \| "multiple"` | |

### **Nested Tags and Their Mappings**

| DDS UI React 1      | DDS Web Components 1   |
| ------------------- | ---------------------- |
| `<AccordionItem>`   | `<tds-accordion-item>` |
| `<AccordionHeader>` | `<tds-accordion-header>` |
| `<AccordionBody>`   | `<tds-accordion-body>` |
| `<AccordionButton>` | `<tds-accordion-button>` |

## **Example Usage**

```html
<tds-accordion outline="top" orientation="left">
  <tds-accordion-item expanded>
    <tds-accordion-header>
      <tds-accordion-button>Accordion Item #1</tds-accordion-button>
    </tds-accordion-header>
    <tds-accordion-body>
      <strong>This is the first item's accordion body.</strong>
      It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
    </tds-accordion-body>
  </tds-accordion-item>
  <tds-accordion-item>
    <tds-accordion-header>
      <tds-accordion-button>Accordion Item #2</tds-accordion-button>
    </tds-accordion-header>
    <tds-accordion-body>
      <strong>This is the second item's accordion body.</strong>
      It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
    </tds-accordion-body>
  </tds-accordion-item>
  <tds-accordion-item>
    <tds-accordion-header>
      <tds-accordion-button>Accordion Item #3</tds-accordion-button>
    </tds-accordion-header>
    <tds-accordion-body>
      <strong>This is the third item's accordion body.</strong>
      It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
    </tds-accordion-body>
  </tds-accordion-item>
</tds-accordion>
