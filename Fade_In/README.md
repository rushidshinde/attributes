# Scroll-Based Fade-In Animations

This project provides a lightweight scroll animation system using Intersection Observer and auto-injected CSS. Two script variants are available depending on your animation preference:

---

## 📁 Files

### 1. `fade.js`
- Applies **fade-in animation only** using `opacity`.
- No transform or movement effect.
- Ideal for minimal transitions.

### 2. `fade_transform.js`
- Applies both **fade-in** and **transform** animations.
- Default movement: `translateY(100px)` (slide-up effect).
- Creates a more dynamic entry animation.

---

## 📦 How to Use

### 1. Include the Desired Script

Add the relevant script before the closing `</body>` tag in your HTML:
 
```
<!-- [attributes by RS] Custom Fade-In Animation -->
<script src="https://rushidshinde.github.io/attributes/Fade_In/fade.min.js" type="text/javascript" crossorigin="anonymous"></script>
```
or 
```
<!-- [attributes by RS] Custom Fade-Transform Animation -->
<script src="https://rushidshinde.github.io/attributes/Fade_In/fade_transform.min.js" type="text/javascript" crossorigin="anonymous"></script>
```

### 2. Mark Elements for Animation

Add the following attribute to any HTML element that you want to animate when it scrolls into view:

```html
data-scroll="out"
