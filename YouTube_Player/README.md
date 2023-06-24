# Embed YouTube videos using attributes

Copy the YouTube Player ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page
```
<!-- [attributes by RS] YouTube Player -->
<script>!function(){const t=document.querySelectorAll('[rs-yt-element="player"]'),e=[];t.forEach((t=>{let s,l,r,i,o,a,n,u,y,h;s=t.hasAttribute("rs-yt-videoId")?t.getAttribute("rs-yt-videoId"):"",l=t.hasAttribute("rs-yt-title")?t.getAttribute("rs-yt-title"):"",r=t.hasAttribute("rs-yt-thumb")?t.getAttribute("rs-yt-thumb"):"",i=t.hasAttribute("rs-yt-autoplay")?t.getAttribute("rs-yt-autoplay"):"",o=t.hasAttribute("rs-yt-controls")?t.getAttribute("rs-yt-controls"):"",a=t.hasAttribute("rs-yt-fullscreen")?t.getAttribute("rs-yt-fullscreen"):"",n=t.hasAttribute("rs-yt-loop")?t.getAttribute("rs-yt-loop"):"",u=t.hasAttribute("rs-yt-modestBranding")?t.getAttribute("rs-yt-modestBranding"):"",y=t.hasAttribute("rs-yt-playsinline")?t.getAttribute("rs-yt-playsinline"):"",h=t.hasAttribute("rs-yt-rel")?t.getAttribute("rs-yt-rel"):"";const d={id:s,t:l,u:r,a:i,c:o,f:a,l:n,m:u,p:y,r:h};e.push(d)}));for(let l=0;l<t.length;l++){let r=t[l];r.style.width="100%",r.style.height="100%",r.style.position="relative";let i=document.createElement("img");e[l].u&&s(e[l].u)?i.src=e[l].u:i.src="https://img.youtube.com/vi/"+e[l].id+"/maxresdefault.jpg",i.style.width="100%",i.style.height="100%",i.style.objectFit="cover",i.style.position="relative",i.style.top="0",i.style.left="0",i.alt=e[l].t,t[l].appendChild(i);let o=document.createElement("div");o.style.zIndex="1",o.style.position="absolute",o.style.top="43%",o.style.left="43%",o.style.width="15%",o.style.height="15%",o.style.backgroundImage="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill='red' d='M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z'/%3E%3Cpath fill='%23ffffff' d='M6.593 10.11l3.644-2.098-3.644-2.11v4.208z'/%3E%3C/svg%3E\")",o.style.backgroundRepeat="no-repeat",o.style.backgroundPosition="center",o.style.backgroundSize="contain",t[l].appendChild(o)}function s(t){return/^(http|https):\/\/[^ "]+$/.test(t)}for(let s=0;s<t.length;s++)t[s].onclick=function(){let t=document.createElement("iframe"),l=0,r=1,i=1,o=0,a=1,n=0,u=1,y=window.location.href;for(e[s].t&&"true"===e[s].t&&(l=1),e[s].a&&"1"===e[s].a&&(l=1),e[s].c&&"0"===e[s].c&&(r=0),e[s].f&&"0"===e[s].f&&(i=0),e[s].l&&"1"===e[s].l&&1,e[s].m&&"1"===e[s].m&&(a=1),e[s].p&&"1"===e[s].p&&(n=1),e[s].r&&"0"===e[s].r&&(u=0),t.src="https://www.youtube.com/embed/"+e[s].id+"?autoplay="+l+"&controls="+r+"&rel="+u+"&mute="+l+"&enablejsapi=1&origin="+y+"&widget_referrer="+y+"&playsinline="+n+"&iv_load_policy=3&fs="+i+"&modestbranding="+a,t.frameborder="0",t.style.width="100%",t.style.top="0",t.style.left="0",t.style.height="100%",t.style.position="absolute",e[s].t&&(t.title=e[s].t),t.setAttribute("autoplay","");this.firstChild;)this.removeChild(this.firstChild);this.appendChild(t)}}();</script>
```
## Documentation
Embed YouTube videos using attributes
#
### Player
```Required*```

Name:
```
rs-yt-element
```
value: 
```
player
```
Where to add:  Add this attribute to element where you want to embed player
### YouTube video Id 
```Required*```

Name:
```
rs-yt-videoId 
```
value: [https://youtu.be/ ```mUxzKVrSAjs``` ]
``` 
mUxzKVrSAjs
```
### Set custom thumbnail for your YouTube video 
```Optional```

Name:
```
rs-yt-thumb
```
value: (default src: YouTube thumbnail)
``` 
https://cdn.pixabay.com/photo/2023/05/06/20/15/ai-generated-7975048_640.png
```
### add title attribute to iframe
```Optional```

Name:
```
rs-yt-title
```
value: (this value will be added as alt text for thumb image)
``` 
YouTube video
```
### Set YouTube video parameters 
```Optional```

### autoplay
Name:
```
rs-yt-autoplay
```
value: (default value: 0; supported values 0 and 1)
``` 
0
```
### controls
Name:
```
rs-yt-controls
```
value: (default value: 1; supported values 0 and 1)
``` 
1
```
### fullscreen
Name:
```
rs-yt-fullscreen
```
value: (default value: 1; supported values 0 and 1)
``` 
1
```
### loop
Name:
```
rs-yt-loop
```
value: (default value: 0; supported values 0 and 1)
``` 
0
```
### modestBranding
Name:
```
rs-yt-modestBranding
```
value: (supported value 1) set this attribute to hide YouTube logo from control bar
``` 
1
```
### playsinline
Name:
```
rs-yt-playsinline
```
value: (default value: 0; supported values 0 and 1)
``` 
0
```
### rel
Name:
```
rs-yt-rel
```
value: (default value: 1; supported values 0 and 1)
``` 
1
```
Where to add: add all attribute to element where you have added ```rs-yt-element = "player"```
