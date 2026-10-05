# Javascript Frontend Form Validation Using Attributes

Lightweight, attribute-based JavaScript form validation with custom error bubbles matching native browser aesthetics across all devices and mobile browsers.

Copy the validation `<script>` and paste it into the `<body>` of your page:
```html
<!-- [attributes by RS] Javascript Validation -->
<script src="https://rushidshinde.github.io/attributes/js_form_validation/validation_script.min.js" type="text/javascript" crossorigin="anonymous"></script>
```

---

## Features

- **Cross-Device Custom Error Bubble**: Replaces inconsistent native browser popups with an in-DOM tooltip matching the clean Chromium/Edge style (warning badge, directional arrow, shadow, auto-alignment).
- **Mobile Responsive & Keyboard Safe**: Automatically flips above inputs when space below is limited and clamps to screen edges on small devices. Smoothly scrolls to the first invalid field.
- **Pure JavaScript Validation**: Disables native browser bubbles (`novalidate`) and handles required fields, regex patterns, and public email domain blocking.
- **Multi-Step Form Gating**: Isolates validation per step and keeps the Next button disabled by default until all fields in that step pass validation.
- **Multi-Select Checkbox Validation**: Enforces at least one selection across checkbox groups.
- **Customizable with CSS Variables**: Easily adjust colors, borders, font sizes, and dark mode without editing JavaScript.

---

## Documentation

### 1. Input Fields
Validate text, numbers, emails, phone numbers, and custom regex patterns.

#### Input Field Identifier
`Required*`

- **Name**: `rs-form-field`
- **Value**: `input`
- **Where to add**: Add to all input fields you want to validate.

```html
<input type="text" rs-form-field="input" rs-form-type="text" required />
```

#### Field Type
`Required*`

- **Name**: `rs-form-type`
- **Value**: One of the predefined pattern keys:
  - `text`: Alphabets only (disallows numbers & special characters)
  - `number`: Numeric digits only
  - `textAndNumber`: Letters and numbers
  - `email`: Standard email format validation
  - `businessEmail`: Valid email format + blocks public domains (gmail, yahoo, outlook, hotmail, etc.)
  - `contactNumber`: Valid phone number (6 to 14 digits with optional leading `+`)
  - Or a custom key matching an entry in `patterns`

```html
<input type="email" rs-form-field="input" rs-form-type="businessEmail" required />
```

#### Predefined Regex Patterns
You can append custom pattern types in your script:

```javascript
const patterns = {
  text: "^[^0-9$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
  number: "^[0-9]+$",
  textAndNumber: "^[^$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
  email: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  businessEmail: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  contactNumber: "^\\+?[0-9]{6,14}$",
};
```

#### Custom Regex Pattern (Per Input)
`Optional`

- **Name**: `rs-form-pattern`
- **Value**: Regex string (overrides the pattern from `rs-form-type`)

```html
<input type="text" rs-form-field="input" rs-form-pattern="^[A-Z]{4}[0-9]{3}$" />
```

#### Custom Error Message
`Optional`

- **Name**: `rs-form-error`
- **Value**: Custom text displayed in the validation bubble (default: `"Please enter valid data"`)

```html
<input
  type="email"
  rs-form-field="input"
  rs-form-type="businessEmail"
  rs-form-error="Please provide a corporate email. Free domains like gmail are not accepted."
  required
/>
```

---

### 2. Multi-Select Checkbox Groups
Enforce that at least one checkbox in a group is selected before form submission.

#### Checkbox Wrapper
`Required*`

- **Name**: `rs-form-field`
- **Value**: `checkbox-wrapper`

#### Multi-Select Flag
`Required*`

- **Name**: `rs-checkbox-multi-select`
- **Value**: `true`

```html
<div rs-form-field="checkbox-wrapper" rs-checkbox-multi-select="true" rs-form-error="Please choose at least one option">
  <label><input type="checkbox" name="services" value="design" /> UI/UX Design</label>
  <label><input type="checkbox" name="services" value="dev" /> Development</label>
  <label><input type="checkbox" name="services" value="marketing" /> Marketing</label>
</div>
```

---

### 3. Multi-Step Form Validation
Isolate validation per step container and automatically gate the **Next** button.

- **Next button disabled by default**: The button has `disabled` applied on step load and automatically enables once all required and validated fields in that step pass validation.
- **Decoupled from step visibility**: The script handles field validation and button states only, leaving step display/transition animations to your own CSS, tabs, or slider components.

#### Multi-Step Form Identifier
`Required*` (on form)

- **Name**: `rs-form-multistep`
- **Value**: `true`

#### Step Wrapper
`Required*`

- **Name**: `rs-form-step`
- **Value**: Step index or name (e.g. `1`, `2`, `3`)

#### Next Step Button
`Required*`

- **Name**: `rs-step-btn`
- **Value**: `next`

#### Example Multi-Step HTML
```html
<form rs-form-multistep="true">
  <!-- Step 1 -->
  <div rs-form-step="1">
    <input type="text" rs-form-field="input" rs-form-type="text" placeholder="Full Name" required />
    <input type="tel" rs-form-field="input" rs-form-type="contactNumber" placeholder="Phone" required />
    
    <!-- Next button is disabled by default; enables automatically when Step 1 is valid -->
    <button type="button" rs-step-btn="next">Next &rarr;</button>
  </div>

  <!-- Step 2 -->
  <div rs-form-step="2">
    <input type="email" rs-form-field="input" rs-form-type="businessEmail" placeholder="Work Email" required />
    
    <button type="button" rs-step-btn="next">Next &rarr;</button>
  </div>

  <!-- Step 3 (Final) -->
  <div rs-form-step="3">
    <div rs-form-field="checkbox-wrapper" rs-checkbox-multi-select="true">
      <label><input type="checkbox" name="service" value="cloud" /> Cloud</label>
      <label><input type="checkbox" name="service" value="security" /> Security</label>
    </div>
    
    <button type="submit">Submit Form</button>
  </div>
</form>
```

---

### 4. Custom Styling with CSS Variables

The custom error popup bubble automatically inherits browser aesthetics and auto-resizes across screen sizes. You can override colors, font size, and background using CSS variables in your stylesheet:

```css
:root {
  /* Bubble background and text */
  --rs-bubble-bg: #ffffff;
  --rs-bubble-color: #202124;
  --rs-bubble-font-size: 13px;
  --rs-bubble-font-family: inherit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Borders and shadows */
  --rs-bubble-border-color: #dadce0;
  --rs-bubble-border-radius: 5px;
  --rs-bubble-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.08);
  
  /* Warning badge icon */
  --rs-bubble-icon-bg: #e65100;
  --rs-bubble-icon-color: #ffffff;
  
  /* Dimensions and padding */
  --rs-bubble-max-width: 150px;
  --rs-bubble-padding: 8px 12px;
  
  /* Field invalid border color */
  --rs-input-invalid-border: #d93025;
}
```

#### Dark Mode Example
```css
@media (prefers-color-scheme: dark) {
  :root {
    --rs-bubble-bg: #1e293b;
    --rs-bubble-color: #f8fafc;
    --rs-bubble-border-color: #334155;
    --rs-bubble-icon-bg: #f97316;
    --rs-bubble-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    --rs-input-invalid-border: #ef4444;
  }
}
```

---

### 5. Building & Minification

To regenerate the production minified bundle from [`validation_script.js`](./validation_script.js):

```bash
node js_form_validation/minify.js
```

This optimizes and minifies both the JavaScript and the injected CSS styles while preserving public APIs (`patterns` and `disallowedDomains`).
