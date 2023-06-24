# Embed YouTube videos using attributes

Copy the YouTube Player ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page
```
<!-- [attributes by RS] YouTube Player -->
<script>!function(){let t=document.querySelectorAll('[rs-yt-element="player"]'),e=[];t.forEach(t=>{let r,s,l,i,o,_,a,y,n,u;r=t.hasAttribute("rs-yt-videoId")?t.getAttribute("rs-yt-videoId"):"",s=t.hasAttribute("rs-yt-title")?t.getAttribute("rs-yt-title"):"",l=t.hasAttribute("rs-yt-thumb")?t.getAttribute("rs-yt-thumb"):"",i=t.hasAttribute("rs-yt-autoplay")?t.getAttribute("rs-yt-autoplay"):"",o=t.hasAttribute("rs-yt-controls")?t.getAttribute("rs-yt-controls"):"",_=t.hasAttribute("rs-yt-fullscreen")?t.getAttribute("rs-yt-fullscreen"):"",a=t.hasAttribute("rs-yt-loop")?t.getAttribute("rs-yt-loop"):"",y=t.hasAttribute("rs-yt-modestBranding")?t.getAttribute("rs-yt-modestBranding"):"",n=t.hasAttribute("rs-yt-playsinline")?t.getAttribute("rs-yt-playsinline"):"",u=t.hasAttribute("rs-yt-rel")?t.getAttribute("rs-yt-rel"):"";let h={id:r,t:s,u:l,a:i,c:o,f:_,l:a,m:y,p:n,r:u};e.push(h)});for(let r=0;r<t.length;r++){let s=t[r];s.style.width="100%",s.style.height="100%",s.style.position="relative";let l=document.createElement("img");e[r].u&&o(e[r].u)?l.src=e[r].u:l.src="https://img.youtube.com/vi/"+e[r].id+"/maxresdefault.jpg",l.style.width="100%",l.style.height="100%",l.style.objectFit="cover",l.style.position="relative",l.style.top="0",l.style.left="0",l.alt=e[r].t,l.style.cursor="pointer",t[r].appendChild(l);let i=document.createElement("div");i.style.zIndex="1",i.style.position="absolute",i.style.top="43%",i.style.left="43%",i.style.width="15%",i.style.height="15%",i.style.backgroundImage="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill='red' d='M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z'/%3E%3Cpath fill='%23ffffff' d='M6.593 10.11l3.644-2.098-3.644-2.11v4.208z'/%3E%3C/svg%3E\")",i.style.backgroundRepeat="no-repeat",i.style.backgroundPosition="center",i.style.backgroundSize="contain",i.style.cursor="pointer",t[r].appendChild(i)}function o(t){return/^(http|https):\/\/[^ "]+$/.test(t)}for(let _=0;_<t.length;_++)t[_].onclick=function(){let t=document.createElement("iframe"),r=0,s=1,l=1,i=0,o=1,a=0,y=1,n=window.location.href;for(e[_].t&&"true"===e[_].t&&(r=1),e[_].a&&"1"===e[_].a&&(r=1),e[_].c&&"0"===e[_].c&&(s=0),e[_].f&&"0"===e[_].f&&(l=0),e[_].l&&"1"===e[_].l&&(i=1),e[_].m&&"1"===e[_].m&&(o=1),e[_].p&&"1"===e[_].p&&(a=1),e[_].r&&"0"===e[_].r&&(y=0),t.src="https://www.youtube.com/embed/"+e[_].id+"?autoplay="+r+"&controls="+s+"&rel="+y+"&mute="+r+"&enablejsapi=1&origin="+n+"&widget_referrer="+n+"&playsinline="+a+"&iv_load_policy=3&fs="+l+"&modestbranding="+o,t.frameborder="0",t.style.width="100%",t.style.top="0",t.style.left="0",t.style.height="100%",t.style.position="absolute",e[_].t&&(t.title=e[_].t),t.setAttribute("autoplay","");this.firstChild;)this.removeChild(this.firstChild);this.appendChild(t)}}();</script>
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
