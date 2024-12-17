# Flyout

The `Flyout` component renders an offcanvas-style element with configurable title, backdrop, size, and placement options, providing an offscreen panel that can appear on specific areas of the screen.

## **Design Spec**

[Link to Flyout in Figma](https://www.figma.com/proto/43D318SJ2qbknLYlNKoyu7/Documentation?page-id=1650%3A21287&node-id=2041-11097&node-type=frame&viewport=-6922%2C1301%2C0.55&t=y9iEb08eZafu4oUV-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2009%3A8986)

<br />

## **Engineering Spec**

DDS WC3 Flyout is a Lit-based Web Component designed for flexible positioning and visibility control.

<br />

## Class: `Flyout`

<br />

### **Component Name**

`<tds-flyout></tds-flyout>`

<br />

### **Attributes**

| Name       | Field                     |
| ---------- | ------------------------- |
| `title`    | string                    |
| `backdrop` | boolean \| 'static'       |
| `show`     | boolean                   |
| `size`     | 'sm' \| 'md' \| 'lg' \| 'xl' |
| `placement`| 'start' \| 'end' \| 'top' \| 'bottom' |

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
| `<Flyout>`     | `<tds-flyout>`       |

<br />

**Property Mapping**

| DDS UI React 1     | DDS Web Components 1                        | Description of difference                                                                                                                    |
| ------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `title`                                     | Both implementations have this property to specify the title of the Flyout.                                                                   |
| `backdrop`         | `backdrop`                                  | Both implementations have this property to enable or set the backdrop as static.                                                              |
| `show`             | `show`                                      | Both implementations have this property to control the visibility of the Flyout.                                                              |
| `size`             | `size`                                      | Both implementations have this property to specify the size of the Flyout.                                                                    |
| `placement`        | `placement`                                 | Both implementations have this property to define the Flyout placement on the screen.                                                         |
