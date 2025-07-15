# 📂 Accordion Component – Attribute-Based Setup

This accordion system is designed to work purely using **custom HTML attributes**, with styling handled via CSS and behavior toggled through JavaScript. It's lightweight, semantic, and framework-free.

---

## 📐 How It Works

You define your accordion structure using a set of `rs-accordion-element` attributes, and control initial state and behavior with optional attributes like `rs-accordian-initial` and `rs-accordian-single`.

The JavaScript handles toggling by simply adding or removing the class `is-active-accordian` to relevant elements. All animations, visual cues, and transitions are done in CSS.

---

## 🔧 Attribute Reference

### 🧱 Accordion Group

#### `rs-accordion-element="accordion-group"`
- **Where:** On the parent element that wraps all accordion items.
- **Purpose:** Defines a group of accordions to coordinate behavior (like open/close logic).
- **Required:** ✅ Yes

---

### 🚀 Initial Open Accordion

#### `rs-accordian-initial="N"`
- **Where:** On the accordion group element.
- **Purpose:** Opens the Nth accordion (1-based index) on page load.
- **Example:** `rs-accordian-initial="2"` opens the 2nd accordion by default.
- **Optional:** ✅

---

### 🔁 Single or Multiple Accordion Behavior

#### `rs-accordian-single="true" | "false"`
- **Where:** On the accordion group element.
- **Purpose:**
  - `"true"` → Only one accordion opens at a time (others close automatically).
  - `"false"` → Allows multiple accordions to stay open simultaneously.
- **Default:** If not provided, defaults to multiple open (`false`).
- **Optional:** ✅

---

## 📦 Accordion Item Elements

### `rs-accordion-element="accordion"`
- **Where:** On the outer wrapper of a single accordion block.
- **Purpose:** Groups the trigger and content for one accordion.
- **Behavior:** Gets `is-active-accordian` class when open.

---

### `rs-accordion-element="trigger"`
- **Where:** On the clickable element (usually a heading or button).
- **Purpose:** Toggles the accordion open or closed.
- **Behavior:** Gets `is-active-accordian` class when its accordion is open.

---

### `rs-accordion-element="content"`
- **Where:** On the content element that expands/collapses.
- **Purpose:** Holds the content shown when the accordion is open.
- **Behavior:** Gets `is-active-accordian` class when visible.

---

### `rs-accordion-element="arrow"`
- **Where:** On an optional arrow/icon inside the trigger.
- **Purpose:** Can visually rotate or animate when the accordion is toggled.
- **Behavior:** Gets `is-active-accordian` class when the accordion is open.

---

## ✅ Summary Table

| Attribute                         | Where to Use                          | Description                                              |
|----------------------------------|---------------------------------------|----------------------------------------------------------|
| `rs-accordion-element="accordion-group"` | On group container                     | Groups multiple accordion items                          |
| `rs-accordian-initial="N"`       | On group container                     | Opens the Nth accordion by default (1-based index)       |
| `rs-accordian-single="true"`     | On group container                     | Allows only one open accordion at a time                |
| `rs-accordion-element="accordion"`     | On each accordion wrapper              | Defines an individual accordion                         |
| `rs-accordion-element="trigger"`       | On toggle element inside accordion     | Click to open/close accordion                           |
| `rs-accordion-element="content"`       | On content element                     | Content shown/hidden on toggle                          |
| `rs-accordion-element="arrow"`         | On arrow/icon element inside trigger   | Visual rotation when open                               |

---

## 🎨 Styling

The class `is-active-accordian` is added or removed automatically by the JavaScript. Use this class in your CSS to animate height, rotate arrows, change text color, etc.
