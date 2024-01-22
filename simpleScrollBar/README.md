<h1>Simple Scrollbar</h1>

<h3>Overview</h3>

<p>The Simple Scrollbar jQuery Plugin is a lightweight and customizable solution for adding vertical and horizontal scrollbars to overflowing containers. It provides a clean and easy-to-use interface for enhancing the scrolling experience of your web applications.

<a href="https://htmlpreview.github.io/?https://github.com/shyam3089/myJQueryPlugins/blob/main/simpleScrollBar/demo/demo/index.html">Demo</a>

<strong>Features.</strong>

    1. Vertical and Horizontal Scrollbars
    2. Customizable appearance
    3. Smooth scrolling animation
    4. Arrow buttons for navigation
    5. Supports click-scrolling and drag-scrolling
    6. Hover effects for a polished user interface
    7. Automatically adjusts to container size changes

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

</strong>Configuration</strong>

Customize the scrollbar appearance and behavior by passing options during initialization:

```javascript
    $('.your-container-class').sScrollBar({
        scrollWidth: 5,
        borderRadius: 3,
        railBgColor: "#E1E5E6",
        handleBgColor: "#AAA",
        scrollBarOpacity: 0.6,
        railOpacity: 0.6,
        handleOpacity: 0.8,
        showArrows: true,
        clickScrollRate: 200,
        clickScrollSpeed: 200,
        arrowScrollRate: 50,
        hOffset: 15,
        vOffset: 15
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
            <td>String (Color:hex)</td>
            <td>Background color of the scrollbar rail.</td>
            <td>#E1E5E6</td>
        </tr>
        <tr>
            <td>handleBgColor</td>            
            <td>String (Color:hex)</td>
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
            <td>railOpacity</td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar rail.</td>
            <td>0.6</td>
        </tr>
        <tr>
            <td>handleOpacity</td>
            <td>Number (0 to 1)</td>
            <td>Opacity of the scrollbar handle.</td>
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
            <td>Horizontal scrollbar offset from container: `pixels`.</td>
            <td>-2</td>
        </tr>
        <tr>
            <td>vOffset</td>
            <td>Number</td>
            <td>Vertical scrollbar offset from container: `pixels`.</td>
            <td>-2</td>
        </tr>
    </tbody>
</table>


<strong>License</strong>

This project is licensed under the MIT License - see the LICENSE file for details.
