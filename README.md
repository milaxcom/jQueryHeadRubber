jQueryHeadRubber
================

##How to use

Include script after the jQuery library:
```HTML
<script type="text/javascript" src="jquery.headrubber.min.js"></script>
```

Set styles for your container:
```HTML
<style>
    #container { 
		min-width:1000px;
		
		/* Required param */
		overflow: hidden; 
		height:400px; 
		position: relative;
	}
</style>
<div id="container"></div>
```

Use it how jQuery-plugin with options:
```JavaScript
$("#container").HeadRubber({
	/** Required: src attribute for <img>  */
	src 			: "image.jpg",
	/** Required: real image width  */
	imageWidth 		: 2580,
	/** Required: real image height  */
	imageHeight 	: 1378,
	/** Optional: top/center/bottom, center is default */
	valign			: "center",
	/** Optional: image show duration, 0 is default */
	duration		: 3000
});
```

##Demonstration
![](stuff/readme_preview.png)