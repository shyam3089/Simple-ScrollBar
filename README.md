<h1 id="documentaionHeader">Simple Scrollbar</h1>

<h3>Overview</h3>
 
<p>The Simple Scrollbar jQuery Plugin is a lightweight and customizable solution for adding vertical and horizontal scrollbars to overflowing elements. It provides a clean and easy-to-use interface for enhancing the scrolling experience of your web applications.

<a href="https://htmlpreview.github.io/?https://github.com/shyam3089/myJQueryPlugins/blob/main/simpleScrollBar/demo/demo.html">Demo</a>

<strong>Features.</strong>

    1. Vertical and Horizontal Scrollbars
    2. Customizable appearance
	3. Responsive - Automatically adjusts to container size changes
    4. Smooth scrolling animation
    5. Arrow buttons for navigation
    6. Supports click-scrolling, drag-scrolling and touch scrolling
    7. Hover effects for a polished user interface
    8. Supports touch events

<h3>Installation</h3>

Include the jQuery library, the Simple Scrollbar plugin and css in your HTML file.<br>

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="simple-scrollbar.js"></script>
<link rel="stylesheet" href="sScrollbar.css">
```

<h3>Usage</h3>

To initialize Simple Scrollbar on a container element, call the sScrollBar method and pass in an options object:

```javascript
$(document).ready(function () {
	// Scroll bar will be appearing on all the elements with the given class
	$('.your-container-class').sScrollBar(); 
});
```

<h3>Configuration</h3>

Customize the scrollbar appearance and behavior by passing options during initialization:
 
```javascript
$('.your-container-class').sScrollBar({
	scrollWidth: 5,            // Scrollbar width
	borderRadius: 3,           // Scrollbar elements border-radius
	railBgColor: "#E1E5E6",    // Scrollbar rail color
	handleBgColor: "#AAA",     // Scrollbar handle color
	scrollBarOpacity: 1,       // Total scrollbar opacity
	railDefaultOpacity: 0.6,   // Scrollbar rail defafult opacity
	handleDefaultOpacity: 0.6, // Scrollbar hand defafult opacity
	railHoverOpacity: 1,       // Scrollbar rail opacity on hover	 
	handleHoverOpacity: 1,     // Scrollbar handle opacity on hover	
	showArrows: true,          // Control scrollbar navigation arrows
	clickScrollRate: 200,      // On click scroll distance
	clickScrollSpeed: 200,     // On click scroll animation speed in millisecond
	arrowScrollRate: 50,       // Arrow click scroll distance
	hOffset: -3,               // Scrollbar spacing from the cotainer
	vOffset: -3,               //Scrollbar spacing from the cotainer
});
```


<strong>Options</strong>

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>scrollWidth</td>
            <td>Number</td>
            <td>Width of the scrollbar.</td>
            <td>5</td>
        </tr>
        <tr>
            <td>borderRadius</td>
            <td>Number</td>
            <td>Border radius of the scrollbar.</td>
            <td>3</td>
        </tr>
        <tr>
            <td>railBgColor</td>
            <td>String - hexcode</td>
            <td>Background color of the scrollbar rail.</td>
            <td>#E1E5E6</td>
        </tr>
        <tr>
            <td>handleBgColor</td>            
            <td>String - hexcode</td>
            <td>Background color of the scrollbar handle.</td>
            <td>#AAAAAA</td>
        </tr>
        <tr>
            <td>scrollBarOpacity</td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar rail.</td>
            <td>0.6</td>
        </tr>
        <tr>
            <td>railDefaultOpacity: </td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar rail.</td>
            <td>0.6</td>
        </tr>
        <tr>
            <td>handleDefaultOpacity: </td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar handle.</td>
            <td>0.8</td>
        </tr>
		 <tr>
            <td>railHoverOpacity: : </td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar rail on hover.</td>
            <td>0.6</td>
        </tr>
        <tr>
            <td>handleHoverOpacity: : </td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar handle on hover.</td>
            <td>0.8</td>
        </tr>
        <tr>
            <td>showArrows</td>
            <td>Boolean</td>
            <td>Display arrow buttons.</td>
            <td>true</td>
        </tr>
        <tr>
            <td>clickScrollRate</td>
            <td>Number</td>
            <td>Rate of scrolling on click: `pixels`.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>clickScrollSpeed</td>
            <td>Number</td>
            <td>Speed of scrolling animation in `millisecond` when clickig on rail.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>arrowScrollRate</td>
            <td>Number</td>
            <td>Rate of scrolling using arrow buttons: `pixels`.</td>
            <td>50</td>
        </tr>
        <tr>
            <td>hOffset</td>
            <td>Number</td>
            <td>Horizontal scrollbar offset from container in `pixels`.</td>
            <td>-2</td>
        </tr>
        <tr>
            <td>vOffset</td>
            <td>Number</td>
            <td>Vertical scrollbar offset from container in `pixels`.</td>
            <td>-2</td>
        </tr>
    </tbody>
</table>


<strong>License</strong>

This project is licensed under the MIT License - see the LICENSE file for details.
