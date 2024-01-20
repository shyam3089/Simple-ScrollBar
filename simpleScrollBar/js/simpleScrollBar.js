jQuery.fn.sScrollBar = function (options) {
	// Default options
    var settings = $.extend({
		scrollWidth: 5,
		borderRadius: 3,
		railBgColor: "#E1E5E6",
		handleBgColor: "#AAA",
		alpha: 0.8,
		showArrows: true,
		clickScrollRate: 200,
		clickScrollSpeed: 200,
		arrowScrollRate: 50
	  }, options);

	return this.each(function() {
		// select the container element
		var container = jQuery(this); 

		// Check container has overflowing children
		jQuery.fn.isOverflowing = function(direction) {
			if (direction == 'vertical') {
				return Math.round(this.get(0).scrollHeight) > Math.round(this.innerHeight());
			}
			else if (direction == 'horizontal') {
				return Math.round(this.get(0).scrollWidth) > Math.round(this.innerWidth());
			}
			return false;
		}

		// Convert into rgb
		function hexToRgb(rgb) {
			var hexCode;
			// Check if rgb is a shorthand hex code or not
			if (isShorthandHex(rgb)) {
				var fullHex = shorthandToFullHex(rgb);
				hexCode = fullHex;
			} else {
				hexCode = rgb;
			}

			// Remove the "#" symbol
			var hexCode = hexCode.slice(1);

			// Convert hex to decimal
			var red = parseInt(hexCode.substring(0, 2), 16);
			var green = parseInt(hexCode.substring(2, 4), 16);
			var blue = parseInt(hexCode.substring(4, 6), 16);

			return {
				red: red,
				green: green,
				blue: blue
			};
		}

		function isShorthandHex(hex) {
			return /^#([0-9a-fA-F]{3})$/.test(hex);
		}
		
		function shorthandToFullHex(shorthand) {
			if (isShorthandHex(shorthand)) {
				return shorthand.replace(/^#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3');
			} else {
				return shorthand; // Return the original value if not a valid shorthand
			}
		}
		
		// Initiate vertical scroll
		function initVerticalScrollbar() {
			if (!container.hasClass('vScroll') && container.css("overflow-y") != "hidden") {
				const children = container.children();
				let totalHeight = 0;
				// Loop through each child and sum their heights
				children.each(function () {
					var $this = jQuery(this);
					totalHeight = totalHeight + $this.outerHeight();
				});
	 
				if ( totalHeight >  container.outerHeight(true)) {
					if (container.isOverflowing('vertical') != false) {
						container.addClass('vScroll');
						container.addClass('noNativeScrollBar');

						var childrenHeight = 0;

						container.find("> *").each(function () {
							var getDisplay = jQuery(this).attr('display')
							getDisplay !== 'inline' ? (childrenHeight += jQuery(this).outerHeight()) : 0;
						});

						var totalChildrenHeight = childrenHeight;
						
						// create the verticalScrollbar element
						var vRail = jQuery('<div class="vScrollbarRail"><div class="arrow upArrow"></div><div class="arrow downArrow"></div></div>'),
							verticalScrollbar = jQuery('<div class="vScrollbarHandle"></div>');
						
						vRail.insertAfter(container);
						
						$vRailElm = $(".vScrollbarRail");
						
						// Set the width of the scroll bar
						$vRailElm.width(settings.scrollWidth);

						var rgbValues = hexToRgb(settings.railBgColor);

						$vRailElm.css({
							"background-color": "rgba(" + rgbValues.red + ", " + rgbValues.green + ", " + rgbValues.blue + ", " + settings.alpha + ")"
						});

						verticalScrollbar.width(settings.scrollWidth);

						verticalScrollbar.css({
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor
						});
			
						rightPos = container.position().left + container.outerWidth();
						$vRailElm.css({ "left": rightPos - settings.scrollWidth + "px", "top": container.position().top + "px" })
						
						// insert the scrollbar after the container			
						$vRailElm.append(verticalScrollbar)

						// Set background color for arrows
						$vRailElm.find(".arrow").css({
							"background-color": settings.railBgColor,
							"opacity": settings.alpha,
							"height": "15px",
							"background-size": "55%"
						});

						// Set arrow border-radius
						// NOTE: top arrow is flipped vertically
						$vRailElm.find(".upArrow").css({
							"border-bottom-right-radius": settings.borderRadius,
							"border-bottom-left-radius": settings.borderRadius
						});
 
						$vRailElm.find(".downArrow").css({
							"border-bottom-right-radius": settings.borderRadius,
							"border-bottom-left-radius": settings.borderRadius
						});

						// Hover effects
						$vRailElm.find(".upArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.alpha,})
							}
						);

						var contHeight = container.height();

						var arrowHeight = 15; 
						rightPosR = container.position().left + container.outerWidth();

						if (settings.showArrows === true) {
							$vRailElm.height(contHeight + parseInt(container.css('padding-top'), 10) - (arrowHeight * 2) + "px");

							$vRailElm.css({
								"left": rightPosR - settings.scrollWidth + "px",
								"top": container.position().top + arrowHeight + "px"
							})

						} else {
							$(".arrow").hide();

							$vRailElm.height(contHeight + parseInt(container.css('padding-top'), 10) + "px");
							
							$vRailElm.css({
								"left": rightPosR - settings.scrollWidth + "px",
								"top": container.position().top + "px",
								"border-radius":settings.borderRadius 
							})

						}

						// set the height of the verticalScrollbar based on the height of the container
						scrollBarHeight = 100 * contHeight / totalChildrenHeight;						
						scrollBarHeight = (scrollBarHeight > 100) ? 100 : scrollBarHeight;

						verticalScrollbar.height(scrollBarHeight + "%");
	
						//resize handler
						const resizeObserver = new ResizeObserver(() => {
							// $vRailElm.height(container.outerHeight());
							calcHeight = 100 * container.height() / totalChildrenHeight
							if (calcHeight > 100) {
								calcHeight = 100;
							}
							verticalScrollbar.height(calcHeight + "%");
	
							
						});
						
						resizeObserver.observe(container[0]);
						
						// handle the scroll event of the container
						container.on("scroll", function () {
							var scrollTopValue = container.scrollTop(); 

							// var x = parseInt(container.css('padding-top'), 10) + parseInt(container.css('padding-bottom'), 10)
							var scrollPercent = 100 * (scrollTopValue) / (totalChildrenHeight);
							verticalScrollbar.css('top', Math.max(0, scrollPercent) + '%');
							scrollBarHeight = 100 * container.height() / totalChildrenHeight;

							if (scrollBarHeight > 100) {
								scrollBarHeight = 100
							}

							verticalScrollbar.height(scrollBarHeight + "%");
						});
						
						//scroll content on rail click (vertical scroll)	  
						$vRailElm.on("mousedown", function (e) { //Relative ( to its parent) mouse position  
							if (e.target === this) {
								var sPosition = verticalScrollbar.position(),
									currPos = sPosition.top + settings.scrollWidth * 2,
									containerPos = container.offset().top;

								clickPos = e.pageY - containerPos
							
								if (currPos > clickPos) {
									container.animate({
										scrollTop: container.scrollTop() - settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (currPos < clickPos) {
									container.animate({
										scrollTop: container.scrollTop() + settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						verticalScrollbar.mousedown(function (e) { e.stopPropagation(); })
	
						// Arrow click event
						$(".upArrow").on("mousedown", function (e) {
							initialScrollTop = container.scrollTop();
							container.animate({
								scrollTop: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						$(".downArrow").on("mousedown", function (e) {
							initialScrollTop = container.scrollTop();
							container.animate({
								scrollTop: initialScrollTop + settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						// Scroll handle drag
						var isDragging = false;
						var initialY;
						var initialScrollTop;

						verticalScrollbar.mousedown(function (e) {
							e.preventDefault();
							isDragging = true;
							initialY = e.clientY;
							initialScrollTop = container.scrollTop();
							$(document).mousemove(drag);
							$(document).mouseup(function () {
								isDragging = false;
								$(document).off('mousemove', drag);
							});
						});

						function drag(e) {
							if (isDragging) {
								var deltaY = e.clientY - initialY;
								var containerHeight = container.height(); 
								var handleHeight = verticalScrollbar.height();
								var maxScrollTop = totalChildrenHeight - containerHeight;

								// Calculate the new scrollTop value based on the handle's drag
								var newScrollTop = initialScrollTop + deltaY * (maxScrollTop / (containerHeight - handleHeight));

								// Ensure the new scrollTop value is within bounds
								newScrollTop = Math.max(0, Math.min(maxScrollTop, newScrollTop));

								// Set the new scrollTop value
								container.scrollTop(newScrollTop);
							}
						}
					}
				}
			} 
		}

		initVerticalScrollbar();
		

		// -------------  Horizontal scrollbar ------------- 
		// Initiate horizontal scroll
		function initHorizontalScrollbar() {
			const children = container.children();
			let totalWidth = 0;

			// Loop through each child and sum their heights
			children.each(function(){
				var $this = jQuery(this);
				totalWidth = totalWidth + jQuery(this).outerWidth(true);
			});

			if (totalWidth > container.outerWidth(true)) {
				if (!container.hasClass('hScroll') && container.css("overflow-x") != "hidden") {
					if (container.isOverflowing('horizontal') != false) {
						container.addClass('hScroll');
						container.addClass('noNativeScrollBar');
																
						// create the scrollbar element
						var hRail = jQuery('<div class="hScrollbarRail"><div class="arrow leftArrow"></div><div class="arrow rightArrow"></div></div>');
						var hScrollbarHandle = jQuery('<div class="hScrollbarHandle"></div>');
					
						hRail.insertAfter(container);

						$hRailElm = $(".hScrollbarRail");
						
						$hRailElm.height(settings.scrollWidth);
						
						var rgbValues = hexToRgb(settings.railBgColor);
						
						$hRailElm.css({
							"background-color": "rgba(" + rgbValues.red + ", " + rgbValues.green + ", " + rgbValues.blue + ", " + settings.alpha + ")"
						});

						hScrollbarHandle.height(settings.scrollWidth);

						hScrollbarHandle.css({
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor
						});

						contWidth = container.width();

						var arrowWidth = 15; 
						hRightPos = container.position().left;

						if (settings.showArrows === true) {
							$hRailElm.width(contWidth + parseInt(container.css('padding-left'), 10) + parseInt(container.css('padding-right'), 10) - (arrowWidth * 2) + arrowWidth + "px");

							$hRailElm.css({
								"left": hRightPos + "px",
								"top": container.position().top + container.outerHeight() + "px"
							});
						} else {
							$(".arrow").hide();
							$hRailElm.width(contWidth + parseInt(container.css('padding-left'), 10) + parseInt(container.css('padding-right'), 10) + "px")
							

							$hRailElm.css({
								"left": hRightPos + "px",
								"top": container.position().top + container.outerHeight() + "px",
								"border-radius": settings.borderRadius 
							})
							
						}
					
					
						// insert the scrollbar after the container			
						$hRailElm.append(hScrollbarHandle)
				
						// Set background color for arrows
						$hRailElm.find(".arrow").css({
							"background-color": settings.railBgColor,
							"opacity": settings.alpha,
							"width": settings.scrollWidth,
							"background-size": "55%"
						});

						// Set left and right position of the arrows and border-radius
						// NOTE: left arrow is rotated 90deg
						$hRailElm.find(".leftArrow").css({
							"left": -settings.scrollWidth,
							"border-bottom-left-radius": settings.borderRadius,
							"border-bottom-right-radius": settings.borderRadius
						});
						$hRailElm.find(".rightArrow").css({
							"right": -settings.scrollWidth,
							"border-bottom-left-radius": settings.borderRadius,
							"border-bottom-right-radius": settings.borderRadius
						});
						
						// Hover effects
						$hRailElm.find(".upArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.alpha,})
							}
						);

						// set the width of the scrollbar based on the width of the container
						w = 100 * contWidth / maxWidth;
						hScrollbarHandle.width(w + "%");
	
						//resize handler
						const resizeObserverH = new ResizeObserver(() => {
							if (settings.showArrows === true) {
								var arrowWidth = settings.scrollWidth; 
								$hRailElm.width(container.outerWidth() + parseInt(container.css('padding-left'), 10) + parseInt(container.css('padding-right'), 10) - (arrowWidth * 2) +"px")
							} else {
								$(".arrow").hide();
								$hRailElm.width(container.outerWidth() + parseInt(container.css('padding-left'), 10) + parseInt(container.css('padding-right'), 10) + "px")
							}
							
							hSrollBarWidth = 100 * container.width() / maxWidth;
							hScrollbarHandle.width(hSrollBarWidth + "%");
	
							hRightPos = container.position().left;
							$hRailElm.css({ "left": hRightPos + arrowWidth + "px", "top": container.position().top + container.outerHeight() + "px" })
						});
					
						resizeObserverH.observe(container[0]);
					
						// handle the scroll event of the container
						container.on('scroll', function () {
							// var x = parseInt(container.css('padding-top'), 10) + parseInt(container.css('padding-bottom'), 10)
							var scrollPercentH = 100 * (container.scrollLeft()) / (maxWidth);
							hScrollbarHandle.css('left', Math.max(0, scrollPercentH) + '%');
							hSrollBarWidth = 100 * container.width() / maxWidth;
							hScrollbarHandle.width(hSrollBarWidth + "%");
						});
						
						//scroll content on rail click (vertical scroll)	  
						$hRailElm.on("mousedown", function (e) { //Relative ( to its parent) mouse position 
							if (e.target === this) {
								var sPosition = hScrollbarHandle.position(),
									currPos;
															
								//settings.scrollWidth added for compensationg arrow width
								currPos = sPosition.left + settings.scrollWidth * 2;
							
								if (currPos < e.pageX) {
									container.animate({
										scrollLeft: container.scrollLeft() + settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (currPos > e.pageX) { //settings.scrollWidth added for compensationg arrow width
									container.animate({
										scrollLeft: container.scrollLeft() - settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						hScrollbarHandle.mousedown(function (e) { e.stopPropagation(); })

						// Arrow click events
						$(".leftArrow").on("mousedown", function (e) {
							console.log("ccc")
							initialScrollTop = container.scrollLeft();
							container.animate({
								scrollLeft: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						$(".rightArrow").on("mousedown", function (e) {
							initialScrollTop = container.scrollLeft();
							container.animate({
								scrollLeft: initialScrollTop+settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});
			
						// Scroll handle drag
						var isDragging = false;
						var initialX;
						var initialScrollLeft;

						hScrollbarHandle.mousedown(function (e) {
							e.preventDefault();
							isDragging = true;
							initialX = e.clientX;
							initialScrollLeft = container.scrollLeft();
							$(document).mousemove(drag);
							$(document).mouseup(function () {
								isDragging = false;
								$(document).off('mousemove', drag);
							});
						});

						var maxWidth = 0,
						maxWidthElm;
					
						container.find("> *").each(function () {
							var cw = jQuery(this).outerWidth();
							if (cw > maxWidth) {
								maxWidth = cw;
								maxWidthElm = jQuery(this);
							}
						});
						
						function drag(e) {
							if (isDragging) {
								var deltaX = e.clientX - initialX;
								var containerWidth = container.width(); 
								var handleWidth = hScrollbarHandle.width(); 
								var maxScrollLeft = maxWidthElm.outerWidth() - containerWidth;

								// Calculate the new scrollLeft value based on the handle's drag
								var newScrollLeft = initialScrollLeft + deltaX * (maxScrollLeft / (containerWidth - handleWidth));

								// Ensure the new scrollLeft value is within bounds
								newScrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));

								// Set the new scrollLeft value
								container.scrollLeft(newScrollLeft);
							}
						}
					}
				}
			}
		}
		
		initHorizontalScrollbar();

	
	});
};