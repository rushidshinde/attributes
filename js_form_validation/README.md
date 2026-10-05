# Javascript frontend form validation using attributes

Copy the validation ```<script>``` and paste into ```<body>``` of your page
```
<!-- [attributes by RS] Javascript Validation -->
<script src="https://rushidshinde.github.io/attributes/js_form_validation/validation_script.min.js" type="text/javascript" crossorigin="anonymous"></script>
```
## Documentation
Validate input fields using regex patterns   
#
### input field
```Required*```

Name:
```
rs-form-field
```
value: 
```
input
```
Where to add:  Add this attribute to all the input fields you want to validate

### input field type

set the custom field type so that the patterns will validate accordingly

```Required*```

Name:
```
rs-form-type
```
value:
``` 
businessEmail
```

Note: The important note is that to add the type value as the key of the patterns 
For custom type add a key value pair of type and pattern in patterns object

### input field patterns

There are default patterns added in script if you want to add custom pattern append in this object

```
const patterns = {
     text: "^(?! )[^0-9$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
     number: "^(?! )[0-9]+$",
     textAndNumber: "^(?! )[^$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
     email: "^(?! )[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
     businessEmail: "^(?! )[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
     contactNumber: "^(?! )\\+?[0-9]{6,14}$",
};
```

```Optional```

Name:
```
rs-form-pattern
```
value:
``` 
^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$
```
### Set custom error message  
```Optional```

Name:
```
rs-form-error
```
value: 
``` 
default is "Please enter valid data"
```
Validate checkbox fields for multiselect options   
#
### checkbox field wrapper
```Required*```

Name:
```
rs-form-field
```
value: 
```
checkbox-wrapper
```
```Required*```

Name:
```
rs-checkbox-multi-select
```
value: 
```
true
```
Where to add:  Add this attribute to wrapper of the all checkbox fields

---

## Custom Styling with CSS Variables

The custom error popup bubble automatically inherits default browser aesthetics and auto-resizes across screen sizes. You can easily override colors, font size, and background using CSS variables in your stylesheet:

```css
:root {
  /* Bubble background and text */
  --rs-bubble-bg: #ffffff;
  --rs-bubble-color: #202124;
  --rs-bubble-font-size: 13px;
  --rs-bubble-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Borders and shadows */
  --rs-bubble-border-color: #dadce0;
  --rs-bubble-border-radius: 5px;
  --rs-bubble-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.08);
  
  /* Warning icon */
  --rs-bubble-icon-bg: #e65100;
  --rs-bubble-icon-color: #ffffff;
  
  /* Dimensions and padding */
  --rs-bubble-max-width: 150px;
  --rs-bubble-padding: 8px 12px;
  
  /* Field invalid border color */
  --rs-input-invalid-border: #d93025;
}
```

### Dark Mode Example
```css
@media (prefers-color-scheme: dark) {
  :root {
    --rs-bubble-bg: #1e293b;
    --rs-bubble-color: #f8fafc;
    --rs-bubble-border-color: #334155;
    --rs-bubble-icon-bg: #f97316;
    --rs-bubble-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
}
```
