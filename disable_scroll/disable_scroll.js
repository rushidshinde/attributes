let e=document.querySelectorAll('[rs-scroll-element="enable"], [rs-scroll-element="enable"] *'),d=document.querySelectorAll('[rs-scroll-element="disable"], [rs-scroll-element="disable"] *');function o(l){l?document.body.style.overflow="hidden":document.body.removeAttribute("style")}e.forEach(function(l){l.addEventListener("click",function(){o(!1)})}),d.forEach(function(l){l.addEventListener("click",function(){o(!0)})});