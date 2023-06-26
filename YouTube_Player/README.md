# Embed YouTube videos using attributes

Copy the YouTube Player ```<script>``` and paste into the ```<body>``` of your page
```
<!-- [attributes by RS] YouTube Player -->
<script async src="https://rushidshinde.github.io/attributes/YouTube_Player/youTube_Player.min.js" type="text/javascript" crossorigin="anonymous"></script>
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
