# Javascript frontend form validation using attributes

Copy the validation ```<script>``` and paste into ```<body>``` of your page
```
<!-- [attributes by RS] Javascript Validation -->
<script async src="https://rushidshinde.github.io/attributes/YouTube_Player/youTube_Player.min.js" type="text/javascript" crossorigin="anonymous"></script>
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

set the custom field type so that the patterns will validate according to type
```Required*```

Name:
```
rs-form-type
```
value:
``` 
businessEmail
```

Note: The important not is that to add the type value as the key of the patterns 
For custom type add a key value pair of type and pattern in patterns object

### input field patterns

There are default patterns added in script if you want to add custom pattern add using

```
const patterns = {
     text: "^[^0-9$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
     textAndNumber: "^[^$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
     email: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
     businessEmail: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
     contactNumber: "^\\+?[0-9]{6,14}$",
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