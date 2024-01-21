Simple Scrollbar jQuery Plugin
Overview

The Simple Scrollbar jQuery Plugin is a lightweight and customizable solution for adding vertical and horizontal scrollbars to overflowing containers. It provides a clean and easy-to-use interface for enhancing the scrolling experience of your web applications.
Features

    Vertical and Horizontal Scrollbars
    Customizable appearance
    Smooth scrolling animation
    Arrow buttons for navigation
    Supports click-scrolling and drag-scrolling
    Hover effects for a polished user interface
    Automatically adjusts to container size changes

Installation

Include the jQuery library and the Simple Scrollbar plugin in your HTML file:

html

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/jquery.simple-scrollbar.js"></script>

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
