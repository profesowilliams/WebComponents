# Heading Component

As defined by the [W3C](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=247#heading-and-label):

> Headings are used to describe the topic or purpose of the content that follows them. Headings are an essential component of a well-structured document as they help users, including those using assistive technologies, to navigate through content efficiently.

<br />

## **Design Spec**

[Link to Heading Design Spec in Figma](https://www.figma.com/file/7X3Tgd3fTurii3FACrfhzo/Heading?node-id=2777%3A42482&t=jHgc4PXRMQH6rPmy-0)

<br />

## **Engineering Spec**

DDS WC3 Heading extends from the [FAST Heading](https://explore.fast.design/components/fast-heading) and aims to provide a versatile and accessible heading component. This component should be adaptable to various sizes and styles while maintaining accessibility standards.

<br />

## Class: `Heading`

<br />

### **Component Name**

`Heading`

<br />

### **Variables**

| Name   | Description                        | Type     |
| ------ | ---------------------------------- | -------- |
| `as`   | Heading level or role              | `string` |
| `size` | Size of the heading (optional)     | `string` |
| `slot` | Content to be displayed in heading | `string` |

<br />

### **Fields**

| Name    | Privacy | Type     | Default | Description                                 |
| ------- | ------- | -------- | ------- | ------------------------------------------- |
| `as`    | public  | `string` | `h2`    | Specifies the heading level or role         |
| `size`  | public  | `string` | `''`    | Specifies the size of the heading           |
| `color` | public  | `string` | `''`    | Specifies the color of the heading (if any) |

<br />

### **Methods**

| Name           | Privacy | Description                     | Parameters | Return                | Inherited From |
| -------------- | ------- | ------------------------------- | ---------- | --------------------- | -------------- |
| `getAriaLevel` | private | Determines ARIA level if needed | `none`     | `number \| undefined` | `none`         |

<br />

### **Attributes**

| Name    | Field |
| ------- | ----- |
| `as`    | as    |
| `size`  | size  |
| `color` | color |

<br />

<hr />

<br />

## **Accessibility**

[W3 Heading Spec](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=247#heading-and-label)

<br />

### **WAI-ARIA Roles, States, and Properties**

- The `role` attribute is used to provide accessibility semantics when the heading level is not an h1 to h6 tag.
- The `aria-level` attribute is used to define the heading level in cases where the `role="heading"` is used.

<br />
<hr />
<br />

## **Preparation**

<br />

### **DDS Web Component v11 vs DDS React 1**

<br />

**Component and Slot Mapping**

| DDS UI React 1 | DDS Web Components 1 |
| -------------- | -------------------- |
| `<Heading>`    | `<tds-heading>`      |

<br />

**Property Mapping**

| DDS UI React 1 | DDS Web Components 1 | Description of difference                                                      |
| -------------- | -------------------- | ------------------------------------------------------------------------------ |
| `as: string`   | `as: string`         | Both components use the `as` property to define the heading level or role.     |
| `size: string` | `size: string`       | Both components use the `size` property to define the size of the heading.     |
| `slot: string` | `slot: string`       | Both components use the `slot` property to specify the content of the heading. |

## Example Usage

```html
<tds-heading as="h1" size="large" color="primary">Large Heading</tds-heading>
<tds-heading as="h3" size="medium">Medium Heading</td-heading>
<tds-heading as="h5" size="small" color="secondary">Small Heading</td-heading>
```
