# Disable scroll of page using attribute

Copy the Disable Scrolling ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page

```
<!-- [attributes by RS] Disabled Scroll -->
<script>let e=document.querySelectorAll('[rs-scroll-element="enable"], [rs-scroll-element="enable"] *'),d=document.querySelectorAll('[rs-scroll-element="disable"], [rs-scroll-element="disable"] *');function o(l){l?document.body.style.overflow="hidden":document.body.removeAttribute("style")}e.forEach(function(l){l.addEventListener("click",function(){o(!1)})}),d.forEach(function(l){l.addEventListener("click",function(){o(!0)})});</script>
```

Add a custom attribute to an element that, when clicked, will toggle the scrolling behavior of the page, enabling or disabling it. 

### Disable scroll using attribute 
Name: 
```
rs-scroll-element
```

value: 
```
disable
```

### Enable scroll using attribute
Name: 
```
rs-scroll-element
```

value: 
```
enable
```