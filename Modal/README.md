# Create Modal Popups using attributes

Copy the YouTube Player ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page
```
<!-- [attributes by RS] Modal -->
<script async src="https://rushidshinde.github.io/attributes/Modal/modal.min.js" type="text/javascript" crossorigin="anonymous"></script>
```
## Documentation
Create Modals using attributes
#
### Trigger element to open Modal
```Required*```

Name:
```
rs-modal-element
```
value:
```
open-1
```
### Trigger element to close Modal
```Required*```

Name:
```
rs-modal-element
```
value: 
``` 
close-1
```
### Modal wrapper element that shows and hides
```Required*```

Name:
```
rs-modal-element
```
value:
``` 
modal-1
```

### For more than one instances

First instance:
```
rs-modal-element= "open-1"
rs-modal-element= "close-1"
rs-modal-element= "modal-1"
```
Second instance:
```
rs-modal-element= "open-2"
rs-modal-element= "close-2"
rs-modal-element= "modal-2"
```
Third instance:
```
rs-modal-element= "open-3"
rs-modal-element= "close-3"
rs-modal-element= "modal-3"
```

