# Embed Tabs using attributes

Copy the Tabs ```<script>``` and paste into the ```<head>``` or ```<body>``` of your page
```
<!-- [attributes by RS] Tabs -->
<script src="https://rushidshinde.github.io/attributes/Tabs/tabs.min.js" type="text/javascript" crossorigin="anonymous"></script>
```
## Documentation
Embed Tabs using attributes
### Tab Wrapper
```Required*```
Name:
```
rs-tabs-element="wrapper"
```
### Tab List
```Required*```
Name:
```
rs-tabs-element="list"
```
### Tab Links
```Required*```
Name:
```
rs-tabs-element="link"
```
### Tab Content
```Required*```
Name:
```
rs-tabs-element="content"
```
### Tab Pane
```Required*```
Name:
```
rs-tabs-element="content"
```

### Example code
```
<div rs-tabs-element="wrapper">
    <ul rs-tabs-element="list">
        <li rs-tabs-element="link">Tab 1</li>
        <li rs-tabs-element="link">Tab 2</li>
    </ul>
    <div rs-tabs-element="content">
        <div rs-tabs-element="tab-pane">Content 1</div>
        <div rs-tabs-element="tab-pane">Content 2</div>
    </div>
</div>
```
