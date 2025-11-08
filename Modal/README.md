# Create Modal Popups using attributes

Copy the YouTube Player ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page

### Default Version
This version hides modals using `display: none`.

```
<!-- [attributes by RS] Modal -->
<script async src="https://rushidshinde.github.io/attributes/Modal/modal.min.js" type="text/javascript" crossorigin="anonymous"></script>
```
### ⚡ Modal v2 (Keep Elements Alive in DOM)

```
<!-- [attributes by RS] Modal v2 -->
<script async src="https://rushidshinde.github.io/attributes/Modal/modal@2.min.js" type="text/javascript" crossorigin="anonymous"></script>
```

## Documentation
Easily create modal popups in Webflow or plain HTML using simple attribute-based triggers — no extra setup or dependencies required.  
Two optimized versions are available depending on how you want your modals to behave in the DOM.

---

## 🧱 Version 1 — `modal.min.js`
**Lightweight and performance-focused.**  
This version uses `display: none` to fully hide modals when they are closed.  
It’s ideal for simple use cases where modals don’t need to initialize scripts or load media while hidden.

**✅ Best for:**
- Static modals (text, buttons, or basic content)  
- Fast load times and minimal DOM footprint  
- Use cases where inactive modals can be removed from rendering flow  

**⚙️ Behavior:**
- Hidden modals are completely removed from layout using `display: none`  
- Scripts or animations inside the modal only load after it opens  

---

## ⚡ Version 2 — `modal@2.min.js`
**Keeps modals alive in the DOM even when hidden.**  
Instead of using `display: none`, this version hides modals with `opacity`, `visibility`, and `z-index` — keeping their elements active and accessible to JavaScript.

**✅ Best for:**
- Modals containing embedded videos, sliders, or dynamic components  
- Scenarios where inner scripts or libraries need to initialize before the modal opens  
- Smooth transitions and preloaded content  

**⚙️ Behavior:**
- Hidden modals stay in DOM with `opacity: 0; visibility: hidden; z-index: -1`  
- Ensures all internal scripts and effects remain initialized  

---

✨ **Choose the version that fits your workflow:**  
| Version | File | Hides Modals Using | Keeps Scripts Alive | Best For |
|----------|------|--------------------|---------------------|-----------|
| v1 | `modal.min.js` | `display: none` | ❌ No | Simple static modals |
| v2 | `modal@2.min.js` | `opacity`, `visibility`, `z-index` | ✅ Yes | Modals with dynamic or embedded content |

---

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

