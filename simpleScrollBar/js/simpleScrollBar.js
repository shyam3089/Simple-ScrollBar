$.fn.sScrollBar = function (options) {
	// Default options
    var settings = $.extend({
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
		hOffset: 0,
		vOffset: 0,
		rtl: true
	}, options);

	return this.each(function() {
		// select the container element
		var container = $(this); 

		// Check container has overflowing children
		$.fn.isOverflowing = function (direction) {
			
			if (direction == "vertical") {
				return Math.round(this.get(0).scrollHeight) > Math.round(this.innerHeight());
			}
			else if (direction == "horizontal") {
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
				return shorthand.replace(/^#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
			} else {
				return shorthand; // Return the original value if not a valid shorthand
			}
		}
		
		// Initiate vertical scroll
		function initVerticalScrollbar() {
			if (!container.hasClass("vScroll") && container.css("overflow-y") != "hidden") {
				const children = container.children();
				let totalHeight = 0;
				// Loop through each child and sum their heights
				children.each(function () {
					var $this = $(this);
					totalHeight = totalHeight+$this.outerHeight();
				});
	 
				if ( totalHeight >  container.outerHeight(true)) {
					if (container.isOverflowing("vertical") != false) {
						container.addClass("vScroll");
						container.addClass("noNativeScrollBar");

						paddingTop = parseInt(container.css("padding-top"), 10),
						paddingRight = parseInt(container.css("padding-right"), 10),
						paddingBottom = parseInt(container.css("padding-bottom"), 10),
						paddingLeft = parseInt(container.css("padding-left"), 10);
						
						
						// Add padding for scrollbar to occuppy
						// 2px extra added for safety 
						if (settings.rtl && paddingRight === 0) {
							container.css("padding-right", settings.scrollWidth + 2)
						} else if (!settings.rtl && paddingLeft === 0) {
							container.css("padding-left", settings.scrollWidth + 2)
						}

						var childrenHeight = 0;

						container.find("> *").each(function () {
							var getDisplay = $(this).attr("display")
							getDisplay !== "inline" ? (childrenHeight += $(this).outerHeight()) : 0;
						});

						var totalChildrenHeight = childrenHeight;
						
						// create the verticalScrollbar element
						var vRail = $('<div class="ssb vScrollbarRail"><div class="arrow upArrow"></div><div class="arrow downArrow"></div></div>'),
							vHandle = $('<div class="vScrollbarHandle"></div>');
						
						// Append the scrollbar inside container
						vRail.appendTo(container);
						
						var $vRailElm = container.find(".vScrollbarRail");	

						// insert the scrollbar after the container			
						$vRailElm.append(vHandle)
						
						var $vScrollbarHandle = $vRailElm.find(".vScrollbarHandle");
						
						// Set the width of the scroll bar
						$vRailElm.width(settings.scrollWidth);

						var rgbValues = hexToRgb(settings.railBgColor);

						$vRailElm.css({
							"background-color": "rgba("+rgbValues.red+", "+rgbValues.green+", "+rgbValues.blue+", "+settings.railOpacity+")",
							"opacity": settings.scrollBarOpacity
						});

						$vScrollbarHandle.css({
							"width":settings.scrollWidth,
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor,
							"opacity": settings.handleOpacity
						});				

						// Set background color for arrows
						$vRailElm.find(".arrow").css({
							"background-color": settings.railBgColor,
							"opacity": settings.railOpacity,
							"height": "15px"
						});

						// Set arrow border-radius
						// NOTE: top arrow is flipped vertically
						$vRailElm.find(".upArrow").css({
							"border-top-right-radius": settings.borderRadius,
							"border-top-left-radius": settings.borderRadius,
							"background-position": "center center" 
						});
 
						$vRailElm.find(".downArrow").css({
							"border-top-right-radius": settings.borderRadius,
							"border-top-left-radius": settings.borderRadius,
							"background-position": "center center" // flipped div
						});

						// Hover effects
						$vRailElm.find(".upArrow,.downArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.railOpacity,})
							}
						);

						var contHeight = container.outerHeight();

						var arrowHeight = 15,
							rightPosR = container.position().left + container.outerWidth();

						// Handle arrows and adjust scroll bar dimensions
						if (settings.showArrows) {
							$vRailElm.height(contHeight-(arrowHeight * 2)+"px");

							$vRailElm.css({
								"left": rightPosR - settings.scrollWidth + settings.hOffset + "px",
								"top": container.position().top + arrowHeight + "px"
							});
						} else {
							$vRailElm.find(".arrow").hide();							
							$vRailElm.height(contHeight+"px");
							
							$vRailElm.css({
								"left": rightPosR-settings.scrollWidth+settings.hOffset+"px",
								"top": container.position().top+"px",
								"border-radius":settings.borderRadius 
							})

						}

						// set the height of the verticalScrollbar based on the height of the container
						scrollBarHeight = 100 * contHeight / totalChildrenHeight;						
						scrollBarHeight = (scrollBarHeight > 100) ? 100 : scrollBarHeight;

						$vScrollbarHandle.height(scrollBarHeight+"%");
	
						//resize handler
						const resizeObserver = new ResizeObserver(() => {
							rightPosR = container.position().left + container.outerWidth();

							// Handle arrows and adjust scroll bar dimensions
							if (settings.showArrows) {
								$vRailElm.height(contHeight-(arrowHeight * 2)+"px");
	
								$vRailElm.css({
									"left": rightPosR-settings.scrollWidth+settings.hOffset+"px",
									"top": container.position().top+arrowHeight+"px"
								})
	
							} else {
								$vRailElm.find(".arrow").hide();	
								$vRailElm.height(contHeight+"px");
								
								$vRailElm.css({
									"left": rightPosR-settings.scrollWidth+settings.hOffset+"px",
									"top": container.position().top+"px",
									"border-radius":settings.borderRadius 
								})
							}
							
							// calcHeight = 100 * container.height() / totalChildrenHeight
							// if (calcHeight > 100) {
							// 	calcHeight = 100;
							// }
							// $vScrollbarHandle.height(calcHeight+"%");							
						});
						
						// resizeObserver.observe(container[0]);
						
						// handle the scroll event of the container
						container.on("scroll", function () {
							var scrollTopValue = container.scrollTop(); 

							// var x = parseInt(container.css("padding-top"), 10)+parseInt(container.css("padding-bottom"), 10)
							var scrollPercent = 100 * (scrollTopValue) / (totalChildrenHeight);
							$vScrollbarHandle.css("top", Math.max(0, scrollPercent)+"%");
							scrollBarHeight = 100 * container.height() / totalChildrenHeight;

							if (scrollBarHeight > 100) {
								scrollBarHeight = 100
							}

							$vScrollbarHandle.height(scrollBarHeight+"%");
						});
						
						//scroll content on rail click (vertical scroll)	  
						$vRailElm.on("mousedown", function (e) { //Relative ( to its parent) mouse position  
							if (e.target === this) {
								var sPosition = $vScrollbarHandle.position(),
									currPos = sPosition.top+settings.scrollWidth * 2,
									containerPos = container.offset().top;

								clickPos = e.pageY-containerPos
							
								if (currPos > clickPos) {
									container.animate({
										scrollTop: container.scrollTop()-settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (currPos < clickPos) {
									container.animate({
										scrollTop: container.scrollTop()+settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						$vScrollbarHandle.mousedown(function (e) { e.stopPropagation(); })
	
						// Arrow click event
						var upArrow = container.find(".vScrollbarRail").find(".upArrow");
						upArrow.on("mousedown", function (e) {
							initialScrollTop = container.scrollTop();
							container.animate({
								scrollTop: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						var downArrow = container.find(".vScrollbarRail").find(".downArrow");
						downArrow.on("mousedown", function (e) {
							initialScrollTop = container.scrollTop();
							container.animate({
								scrollTop: initialScrollTop+settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						// Scroll handle drag
						var isDragging = false;
						var initialY;
						var initialScrollTop;

						$vScrollbarHandle.mousedown(function (e) {
							e.preventDefault();
							isDragging = true;
							initialY = e.clientY;
							initialScrollTop = container.scrollTop();
							$(document).mousemove(drag);
							$(document).mouseup(function () {
								isDragging = false;
								$(document).off("mousemove", drag);
							});
						});

						function drag(e) {
							if (isDragging) {
								var deltaY = e.clientY-initialY;
								var containerHeight = container.height(); 
								var handleHeight = $vScrollbarHandle.height();
								var maxScrollTop = totalChildrenHeight-containerHeight;

								// Calculate the new scrollTop value based on the handle's drag
								var newScrollTop = initialScrollTop+deltaY * (maxScrollTop / (containerHeight-handleHeight));

								// Ensure the new scrollTop value is within bounds
								newScrollTop = Math.max(0, Math.min(maxScrollTop, newScrollTop));

								// Set the new scrollTop value
								container.scrollTop(newScrollTop);
							}
						}

						// On hover container change opacity of scrollbars
						container.hover(
							function() {
								$vRailElm.css({"opacity": 1})
							},
							function() {
								$vRailElm.css({"opacity": settings.scrollBarOpacity})
							}
						);

						$vRailElm.hover(
							function() {
								$(this).css({"opacity": 1})
							},
							function() {
								$(this).css({"opacity": settings.scrollBarOpacity})
							}
						);
						
						$vScrollbarHandle.hover(
							function() {
								$(this).css({"opacity": 1})
							},
							function() {
								$(this).css({"opacity": settings.scrollBarOpacity})
							}
						);						
					}
				}
			} 
		}
		

		// -------------  Horizontal scrollbar ------------- 
		// Initiate horizontal scroll
		function initHorizontalScrollbar() {
			const children = container.children();
			let totalWidth = 0;

			// Loop through each child and sum their heights
			children.each(function(){
				var $this = $(this);
				totalWidth = totalWidth+$this.outerWidth(true);
			});

			if (totalWidth > container.outerWidth(true)) {
				if (!container.hasClass("hScroll") && container.css("overflow-x") != "hidden") {
					if (container.isOverflowing("horizontal") != false) {
						container.addClass("hScroll");
						container.addClass("noNativeScrollBar");						
						
						var paddingTop = parseInt(container.css("padding-top"), 10),
							paddingRight = parseInt(container.css("padding-right"), 10),
							paddingBottom = parseInt(container.css("padding-bottom"), 10),
							paddingLeft = parseInt(container.css("padding-left"), 10);
							
						// Add padding for scrollbar to occuppy
						// 2px extra added for safety 
						if (paddingBottom === 0) {
							container.css("padding-bottom", settings.scrollWidth+2)
						}
						
						// create the scrollbar element
						var hRail = $('<div class="ssb hScrollbarRail"><div class="arrow leftArrow"></div><div class="arrow rightArrow"></div></div>');
						var hHandle = $('<div class="hScrollbarHandle"></div>');
					
						hRail.appendTo(container);

						var $hRailElm = container.find(".hScrollbarRail");
						$hRailElm.height();

						var rgbValues = hexToRgb(settings.railBgColor);
						$hRailElm.css({
							"height": settings.scrollWidth,
							"background-color": "rgba("+rgbValues.red+", "+rgbValues.green+", "+rgbValues.blue+", "+settings.railOpacity+")",
							"opacity": settings.scrollBarOpacity
						});
						
						// Append the scrollbar handle inside the container
						$hRailElm.append(hHandle);

						var $hScrollbarHandle = $hRailElm.find(".hScrollbarHandle");			

						var contWidth = container.outerWidth(),
							hRightPos = container.position().left,
							arrowWidth = 15,
							maxWidth = 0,
							maxWidthElm;
													
						container.find("> *").each(function () {
							var cw = $(this).outerWidth();
							if (cw > maxWidth) {
								maxWidth = cw;
								maxWidthElm = $(this);
							}
						});
						
						// set the width of the scrollbar based on the width of the container			
						var w;				
						if (maxWidth != 0) {
							w = (contWidth/maxWidth)*100;
						}

						$hScrollbarHandle.css({
							"width": w + "%",
							"height": settings.scrollWidth,
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor,
							"opacity": settings.handleOpacity
						});
					
						
						// Handle arrows and adjust scroll bar dimensions
						if (settings.showArrows) { 
							$hRailElm.width(contWidth-(arrowWidth*2)+"px");

							$hRailElm.css({
								"left": hRightPos+arrowWidth+"px",
								"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight()+"px"
							});
						} else {
							$hRailElm.find(".arrow").hide();
							console.log(contWidth,paddingLeft,paddingRight)
							$hRailElm.width(contWidth+"px")
							
							$hRailElm.css({
								"left": hRightPos+"px",
								"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight()+"px",
								"border-radius": settings.borderRadius 
							})
							
						}
						
						// Set background color for arrows
						$hRailElm.find(".arrow").css({
							"background-color": settings.railBgColor,
							"opacity": settings.railOpacity,
							"width": "15px",
						});

						// Set left and right position of the arrows and border-radius
						// NOTE: left arrow is rotated 90deg
						$hRailElm.find(".leftArrow").css({
							"left": -15,
							"border-top-left-radius": settings.borderRadius,
							"border-bottom-left-radius": settings.borderRadius,
							"background-position": "center center" 
						});

						$hRailElm.find(".rightArrow").css({
							"right": -15,
							"border-top-left-radius": settings.borderRadius,
							"border-bottom-left-radius": settings.borderRadius,
							"background-position": "center center" // flipped div
						});
						
						// Hover effects
						$hRailElm.find(".leftArrow, .rightArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.railOpacity,})
							}
						);

						// resizeObserverH.observe(container[0]);
					
						// handle the scroll event of the container
						container.on("scroll", function () {
							var sLeft = container.scrollLeft() ,
								totalContentWidth = maxWidth-paddingLeft;
						
							var scrollPercentH = (sLeft/totalContentWidth)*100;
							$hScrollbarHandle.css("left", Math.max(0, scrollPercentH) + "%");
							
							// *** Never use outerWidth here ***
							var maxWidthx = maxWidth-paddingLeft;
							var hHandleWidth = (container.width() / maxWidthx) * 100;
							
							if (hHandleWidth > 100) {
								hHandleWidth = 100
							}

							$hScrollbarHandle.width(hHandleWidth + "%");
							
						});
						
						//scroll content on rail click (vertical scroll)	  
						$hRailElm.on("mousedown", function (e) { //Relative ( to its parent) mouse position 
							if (e.target === this) {
								var sPosition = $hScrollbarHandle.position(),
									currPos;
															
								//settings.scrollWidth added for compensationg arrow width
								currPos = sPosition.left+settings.scrollWidth * 2;
							
								if (currPos < e.pageX) {
									container.animate({
										scrollLeft: container.scrollLeft()+settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (currPos > e.pageX) { //settings.scrollWidth added for compensationg arrow width
									container.animate({
										scrollLeft: container.scrollLeft()-settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						$hScrollbarHandle.mousedown(function (e) { e.stopPropagation(); })

						// Arrow click events
						var leftArrow = container.find(".hScrollbarRail").find(".leftArrow");
						leftArrow.on("mousedown", function (e) {
							var initialScrollTop = container.scrollLeft();
							container.animate({
								scrollLeft: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						var rightArrow = container.find(".hScrollbarRail").find(".rightArrow");
						rightArrow.on("mousedown", function (e) {
							var initialScrollTop = container.scrollLeft();
							container.animate({
								scrollLeft: initialScrollTop+settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});
			
						// Scroll handle drag
						var isDragging = false;
						var initialX;
						var initialScrollLeft;

						$hScrollbarHandle.mousedown(function (e) {
							e.preventDefault();
							isDragging = true;
							initialX = e.clientX;
							initialScrollLeft = container.scrollLeft();
							$(document).mousemove(drag);
							$(document).mouseup(function () {
								isDragging = false;
								$(document).off("mousemove", drag);
							});
						});
						
						function drag(e) {
							if (isDragging) {
								var deltaX = e.clientX-initialX;
								var containerWidth = container.width(); 
								var handleWidth = $hScrollbarHandle.width(); 
								var maxScrollLeft = maxWidthElm.width()-containerWidth;

								// Calculate the new scrollLeft value based on the handle's drag
								var newScrollLeft = initialScrollLeft+deltaX * (maxScrollLeft / (containerWidth-handleWidth));

								// Ensure the new scrollLeft value is within bounds
								newScrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));

								// Set the new scrollLeft value
								container.scrollLeft(newScrollLeft);
							}
						}

						// On hover container change opacity of scrollbars
						container.hover(
							function() {
								$hRailElm.css({"opacity": 1})
							},
							function() {
								$hRailElm.css({"opacity": settings.scrollBarOpacity})
							}
						);

						$hRailElm.hover(
							function() {
								$(this).css({"opacity": 1})
							},
							function() {
								$(this).css({"opacity": settings.scrollBarOpacity})
							}
						);
						
						$hScrollbarHandle.hover(
							function() {
								$(this).css({"opacity": 1})
							},
							function() {
								$(this).css({"opacity": settings.scrollBarOpacity})
							}
						);

						//resize handler
						const resizeObserverH = new ResizeObserver(() => {
							var contWidth = container.outerWidth();
							
							// Handle arrows and adjust scroll bar dimensions
							if (settings.showArrows) {								
								$hRailElm.width(contWidth-(arrowWidth * 2)+"px");
	
								$hRailElm.css({
									"left": hRightPos+arrowWidth+"px",
									"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight()+"px"
								});
							} else {
								$hRailElm.find(".arrow").hide();
								$hRailElm.width(contWidth+"px")
								
								console.log(settings.vOffset,container.position().top+container.outerHeight())
								$hRailElm.css({
									"left": hRightPos+"px",
									"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight()+"px",
									"border-radius": settings.borderRadius 
								})
								
							};
							
							hSrollBarWidth = 100 * container.outerWidth() / maxWidth;
							$hScrollbarHandle.width(hSrollBarWidth+"%");

						});
					
					}
				}
			}
		}
		
		
		initVerticalScrollbar();

		initHorizontalScrollbar();

	});
};