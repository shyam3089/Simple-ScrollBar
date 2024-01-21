<h1>Simple Scrollbar</h1>

<h4>Overview</h4>

<p>The Simple Scrollbar jQuery Plugin is a lightweight and customizable solution for adding vertical and horizontal scrollbars to overflowing containers. It provides a clean and easy-to-use interface for enhancing the scrolling experience of your web applications.

<strong>Features.</strong>

    1. Vertical and Horizontal Scrollbars
    2. Customizable appearance
    3. Smooth scrolling animation
    4. Arrow buttons for navigation
    5. Supports click-scrolling and drag-scrolling
    6. Hover effects for a polished user interface
    7. Automatically adjusts to container size changes

<h4>Installation</h4>

Include the jQuery library, the Simple Scrollbar plugin and css in your HTML file:

html

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="simple-scrollbar.js"></script>
<link rel="stylesheet" href="simple-scrollbar.css">

Usage

Apply the Simple Scrollbar to your container element:

javascript

$(document).ready(function () {
    $('.your-container-class').sScrollBar();
});

Configuration

Customize the scrollbar appearance and behavior by passing options during initialization:

javascript

$('.your-container-class').sScrollBar({
    scrollWidth: 5,
    borderRadius: 3,
    // ... other options
});

Options

    scrollWidth: Width of the scrollbar.
    borderRadius: Border radius of the scrollbar.
    railBgColor: Background color of the scrollbar rail.
    handleBgColor: Background color of the scrollbar handle.
    scrollBarOpacity: Opacity of the scrollbar rail.
    railOpacity: Opacity of the scrollbar rail.
    handleOpacity: Opacity of the scrollbar handle.
    showArrows: Display arrow buttons.
    clickScrollRate: Rate of scrolling on click.
    clickScrollSpeed: Speed of scrolling on click.
    arrowScrollRate: Rate of scrolling using arrow buttons.
    hOffset: Horizontal offset.
    vOffset: Vertical offset.

License

This project is licensed under the MIT License - see the LICENSE file for details.
