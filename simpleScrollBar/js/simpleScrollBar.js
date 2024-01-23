$.fn.sScrollBar = function (options) {
	// Default options
    var settings = $.extend({
		scrollWidth: 5,
		borderRadius: 3,
		trackBgColor: "#E1E5E6",
		handleBgColor: "#AAA",
		scrollBarOpacity: 0.6,
		trackOpacity: 0.6,
		handleOpacity: 0.8,
		showArrows: true,
		clickScrollRate: 200,
		clickScrollSpeed: 200,
		arrowScrollRate: 50,
		hOffset: 0,
		vOffset: 0,
		rtl: true
	}, options);

	// Common vars	
	var trackMarginTop = settings.scrollWidth;

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
						if (settings.rtl && paddingRight < settings.scrollWidth + 2) {
							container.css("padding-right", settings.scrollWidth + 2)
						} else if (!settings.rtl && paddingLeft < settings.scrollWidth + 2) {
							container.css("padding-left", settings.scrollWidth + 2)
						}

						var totalChildrenHeight = container.prop("scrollHeight")-paddingTop-paddingBottom; 
						
						var upArrowSvg = '<svg class="arrow upArrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 492" style="enable-background:new 0 0 800 492;" xml:space="preserve"><g><path d="M781,472.9c-25.4,25.4-66.6,25.4-92,0L400,184.1L111.1,472.9c-25.4,25.4-66.6,25.4-92.1,0c-25.4-25.4-25.4-66.6,0-92.1 L400,0l380.9,380.9C806.4,406.3,806.4,447.5,781,472.9z"/></g></svg>';

						var downArrowSvg = '<svg class="arrow downArrow"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 492" style="enable-background:new 0 0 800 492;" xml:space="preserve"><g><path d="M780.9,111L400,491.9L19,111.2C-6.4,85.7-6.4,44.4,19,19c25.5-25.4,66.7-25.4,92.1,0L400,307.8L689,19 c25.4-25.4,66.6-25.4,92,0S806.4,85.7,780.9,111z"/></g></svg>';

						// create the verticalScrollbar element
						var vTrack = $('<div class="vScrollbarTrack">'+upArrowSvg+downArrowSvg+'<div class="ssb vScrollbarRail"></div></div>'),
							vHandle = $('<div class="vScrollbarHandle"></div></div>');
						
						// Append the scrollbar inside container
						vTrack.appendTo(container);
						
						var	$vTrackElm =  container.find(".vScrollbarTrack"),
							$vRailElm = container.find(".vScrollbarRail");	

						// insert the scrollbar after the container			
						$vRailElm.append(vHandle)
						
						var $vScrollbarHandle = $vTrackElm.find(".vScrollbarHandle");
						
						// Set the width of the scroll bar
						$vTrackElm.width(settings.scrollWidth);

						var rgbValues = hexToRgb(settings.trackBgColor);

						$vTrackElm.css({
							"background-color": "rgba("+rgbValues.red+", "+rgbValues.green+", "+rgbValues.blue+", "+settings.trackOpacity+")",
							"opacity": settings.scrollBarOpacity
						});

						$vScrollbarHandle.css({
							"width":settings.scrollWidth,
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor,
							"opacity": settings.handleOpacity
						});				

						// Set background color for arrows						
						$svg = container.find(".arrow");
						$svg.find('path').attr('fill', settings.trackBgColor);

						$vTrackElm.find(".arrow").css({
							"opacity": settings.trackOpacity,
							"height": settings.scrollWidth
						});

						// Set arrow border-radius
						// NOTE: top arrow is flipped vertically
						$vTrackElm.find(".upArrow").css({
							"top": -settings.scrollWidth,
							"border-top-right-radius": settings.borderRadius,
							"border-top-left-radius": settings.borderRadius,
							"background-position": "center center" 
						});
 
						$vTrackElm.find(".downArrow").css({
							"bottom": -settings.scrollWidth,
							"border-top-right-radius": settings.borderRadius,
							"border-top-left-radius": settings.borderRadius,
							"background-position": "center center" // flipped div
						});

						// Hover effects
						$vTrackElm.find(".upArrow,.downArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.trackOpacity,})
							}
						);

						var contHeight = container.outerHeight();

						var arrowHeight = settings.scrollWidth,
							rightPosR = container.position().left + container.outerWidth(),
							borderInt = 0;

						if (settings.rtl) {
							var borderWidth = container.css('border-right-width');
							borderInt = parseFloat(borderWidth);
						} else {
							borderWidth = container.css('border-left-width');		
							borderInt = parseFloat(borderWidth);
						}

						var topBorderWidth = container.css('border-top-width'),
							topborderInt = parseFloat(topBorderWidth),
							bottomBorderWidth = container.css('border-bottom-width'),
							bottomborderInt = parseFloat(bottomBorderWidth);
						//-----------------------------------------------------
						// Handle arrows and adjust scroll bar dimensions
						//-----------------------------------------------------
						if (settings.showArrows) {
							$vTrackElm.height(contHeight-topborderInt-bottomborderInt-paddingTop-paddingBottom-(arrowHeight * 2));
						
							$vTrackElm.css({
								"left": rightPosR - settings.scrollWidth + settings.hOffset-borderInt,
								"top": container.position().top + arrowHeight + topborderInt+(paddingTop) ,
								"border-radius":settings.borderRadius 
							});
						} else {
							$vTrackElm.find(".arrow").hide();							
							$vTrackElm.height(contHeight-topborderInt-bottomborderInt-paddingTop-paddingBottom);
							
							$vTrackElm.css({
								"left": rightPosR-settings.scrollWidth+settings.hOffset-borderInt,
								"top": container.position().top+topborderInt+paddingTop,
								"border-radius":settings.borderRadius 
							})

						}
						//-----------------------------------------------------
						// set the height of the verticalScrollbar based on the height of the container
						scrollBarHeight = 100 * contHeight / totalChildrenHeight;						
						// scrollBarHeight = (scrollBarHeight > 100) ? 100 : scrollBarHeight;

						$vScrollbarHandle.height(scrollBarHeight+"%");
	
						//resize handler
						const resizeObserver = new ResizeObserver(() => {
							rightPosR = container.position().left + container.outerWidth();

							// Handle arrows and adjust scroll bar dimensions
							if (settings.showArrows) {
								$vTrackElm.height(contHeight-(arrowHeight * 2));
	
								$vTrackElm.css({
									"left": rightPosR-settings.scrollWidth+settings.hOffset,
									"top": container.position().top + arrowHeight + "px",
									"border-radius":settings.borderRadius 
								})
	
							} else {
								$vTrackElm.find(".arrow").hide();	
								$vTrackElm.height(contHeight);
								
								$vTrackElm.css({
									"left": rightPosR-settings.scrollWidth+settings.hOffset,
									"top": container.position().top,
									"border-radius":settings.borderRadius 
								})
							}						
						});
						
						// resizeObserver.observe(container[0]);
						
						// handle the scroll event of the container
						container.on("scroll", function () {
							const scrollPercentage = container.scrollTop() / (totalChildrenHeight - container.height());
							const handleHeight = $vTrackElm.height() * container.height() / totalChildrenHeight;
					  
							$vScrollbarHandle.css({
							  top: scrollPercentage * ($vTrackElm.height() - handleHeight),
							  height: handleHeight
							});
						});
						
						//scroll content on track click (vertical scroll)	  
						$vRailElm.on("mousedown", function (e) { //Relative ( to its parent) mouse position  
							if (e.target === this) {
								var sPosition = $vScrollbarHandle.position(),
									handlePos = sPosition.top+settings.scrollWidth * 2,
									containerPos = container.offset().top;

								clickPos = e.pageY-containerPos
								console.log(handlePos, clickPos);
								if (handlePos > clickPos) {
									container.animate({
										scrollTop: container.scrollTop()-settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (handlePos < clickPos) {
									container.animate({
										scrollTop: container.scrollTop()+settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						$vScrollbarHandle.mousedown(function (e) { e.stopPropagation(); })
	
						// Arrow click event
						var upArrow = container.find(".vScrollbarTrack").find(".upArrow");
						upArrow.on("mousedown", function (e) {
							initialScrollTop = container.scrollTop();
							container.animate({
								scrollTop: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						var downArrow = container.find(".vScrollbarTrack").find(".downArrow");
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

						$vScrollbarHandle.on("mousedown", function (e) {
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
								$vTrackElm.css({"opacity": 1})
							},
							function() {
								$vTrackElm.css({"opacity": settings.scrollBarOpacity})
							}
						);

						$vTrackElm.hover(
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
						if (paddingBottom === settings.scrollWidth + 2) {
							container.css("padding-bottom", settings.scrollWidth+2)
						}
						
						// create the scrollbar element
						var leftArrowSvg = '<svg class="arrow leftArrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 800" style="enable-background:new 0 0 492 800;" xml:space="preserve"><g><path fill="red" d="M472.9,19c25.4,25.4,25.4,66.6,0,92L184.1,400l288.8,288.9c25.4,25.4,25.4,66.6,0,92.1c-25.4,25.4-66.6,25.4-92.1,0L0,400 L380.9,19.1C406.3-6.3,447.5-6.3,472.9,19z"/></g></svg>';
						var rightArrowSvg = '<svg class="arrow rightArrow" version = "1.1" id = "Capa_1" xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" x = "0px" y = "0px" viewBox = "0 0 491.9 800.1" style = "enable-background:new 0 0 491.9 800.1;" xml: space = "preserve" > <g><path d="M111,19.1L491.9,400L111.2,781c-25.5,25.4-66.7,25.4-92.1,0c-25.4-25.5-25.4-66.7,0-92.1L307.8,400L19,111 C-6.3,85.6-6.3,44.4,19,19S85.7-6.4,111,19.1z" /></g></svg>'

						var hTrack = $('<div class="hScrollbarTrack">'+leftArrowSvg+rightArrowSvg+'<div class="ssb hScrollbarRail"></div></div>');
						var hHandle = $('<div class="hScrollbarHandle"></div>');
					
						hTrack.appendTo(container);


						var $hTrackElm = container.find(".hScrollbarTrack")
							$hRailElm = container.find(".hScrollbarRail");	
						$hTrackElm.height();

						var rgbValues = hexToRgb(settings.trackBgColor);
						$hTrackElm.css({
							"height": settings.scrollWidth,
							"background-color": "rgba("+rgbValues.red+", "+rgbValues.green+", "+rgbValues.blue+", "+settings.trackOpacity+")",
							"opacity": settings.scrollBarOpacity
						});
						
						// Append the scrollbar handle inside the container
						$hRailElm.append(hHandle);

						var $hScrollbarHandle = $hTrackElm.find(".hScrollbarHandle");			

						var contWidth = container.outerWidth(),
							hRightPos = container.position().left,
							arrowWidth = settings.scrollWidth,
							maxWidth = 0,
							maxWidthElm;
													
						// container.find("> *").each(function () {
						// 	var cw = $(this).outerWidth();
						// 	if (cw > maxWidth) {
						// 		maxWidth = cw;
						// 		maxWidthElm = $(this);
						// 	}
						// });
						maxWidth = container.prop("scrollWidth") - paddingLeft - paddingRight;
						
						var hHandleWidth = 100 * (container.width()/maxWidth);
						
						$hScrollbarHandle.css({
							"width": hHandleWidth + "%",
							"height": settings.scrollWidth,
							"border-radius": settings.borderRadius,
							"background-color": settings.handleBgColor,
							"opacity": settings.handleOpacity
						});
					
						var	topBorderWidth = container.css('border-top-width'),
							topBorderint = parseFloat(topBorderWidth),
							
							leftBorderWidth = container.css('border-left-width'),
							leftborderInt = parseFloat(leftBorderWidth),
						
							rightBorderWidth = container.css('border-right-width'),
							rightBorderint = parseFloat(rightBorderWidth),
							
						
							bottomBorderWidth = container.css('border-bottom-width'),
							bottomborderInt = parseFloat(bottomBorderWidth)
						
						//-----------------------------------------------------
						// Handle arrows and adjust scroll bar dimensions
						//-----------------------------------------------------
						if (settings.showArrows) { 
							$hTrackElm.width(contWidth-(arrowWidth*2)-leftborderInt-rightBorderint-paddingLeft-paddingRight);

							$hTrackElm.css({
								"left": hRightPos+arrowWidth+leftborderInt+paddingLeft,
								"top": container.position().top - settings.scrollWidth + settings.vOffset + container.outerHeight() - bottomborderInt + "px",
								"border-radius":settings.borderRadius 
							});
						} else {
							$hTrackElm.find(".arrow").hide();

							$hTrackElm.width(contWidth-leftborderInt-rightBorderint-paddingLeft-paddingRight)
							
							$hTrackElm.css({
								"left": hRightPos+leftborderInt+paddingLeft,
								"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight()-bottomborderInt,
								"border-radius": settings.borderRadius 
							})
							
						}
						//-----------------------------------------------------
						// Set background color for arrows						
						$svg = container.find(".arrow");
						$svg.find('path').attr('fill', settings.trackBgColor);

						$hTrackElm.find(".arrow").css({
							// "background-color": settings.trackBgColor,
							"opacity": settings.trackOpacity,
							"width": settings.scrollWidth,
						});

						// Set left and right position of the arrows and border-radius
						// NOTE: left arrow is rotated 90deg
						$hTrackElm.find(".leftArrow").css({
							"left": -settings.scrollWidth,
							"border-top-left-radius": settings.borderRadius,
							"border-bottom-left-radius": settings.borderRadius,
							"background-position": "center center" 
						});

						$hTrackElm.find(".rightArrow").css({
							"right": -settings.scrollWidth,
							"border-top-right-radius": settings.borderRadius,
							"border-bottom-right-radius": settings.borderRadius,
							"background-position": "center center" // flipped div
						});
						
						// Hover effects
						$hTrackElm.find(".leftArrow, .rightArrow").hover(
							function() {
								$(this).css({"opacity": 1,})
							},
							function() {
								$(this).css({"opacity": settings.trackOpacity,})
							}
						);

						// resizeObserverH.observe(container[0]);
					
						// handle the scroll event of the container
						container.on("scroll", function () {
							const scrollPercentage = container.scrollLeft() / (maxWidth - container.width());
							const handleWidth = $hTrackElm.width() * container.width() / maxWidth;
							
							$hScrollbarHandle.css({
							  left: scrollPercentage * ($hTrackElm.width() - handleWidth),
							  width: handleWidth
							});						
						});
						
						//scroll content on track click (horizontal scroll)	  
						$hRailElm.on("mousedown", function (e) { //Relative (to its parent) mouse position 
							if (e.target === this) {
								var sPosition = $hScrollbarHandle.position(),
									handlePos;
															
								//settings.scrollWidth added for compensationg arrow width
								handlePos = sPosition.left+settings.scrollWidth * 2;
								console.log("handle_pos", handlePos, "click_pos", e.pageX - container.position().left)
								
								if (handlePos < e.pageX-container.position().left) {
									container.animate({
										scrollLeft: container.scrollLeft()+settings.clickScrollRate
									}, settings.clickScrollSpeed);
								} else if (handlePos > e.pageX - container.position().left) { //settings.scrollWidth added for compensationg arrow width
									container.animate({
										scrollLeft: container.scrollLeft()-settings.clickScrollRate
									}, settings.clickScrollSpeed);
								}
							}
						});
						$hScrollbarHandle.mousedown(function (e) { e.stopPropagation(); })

						// Arrow click events
						var leftArrow = container.find(".hScrollbarTrack").find(".leftArrow");
						leftArrow.on("mousedown", function (e) {
							var initialScrollTop = container.scrollLeft();
							container.animate({
								scrollLeft: initialScrollTop-settings.arrowScrollRate
							}, settings.clickScrollSpeed);
						});

						var rightArrow = container.find(".hScrollbarTrack").find(".rightArrow");
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

						$hScrollbarHandle.on("mousedown", function (e) {
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
								var maxScrollLeft = maxWidth-containerWidth;
								console.log(container.scrollLeft(),containerWidth)
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
								$hTrackElm.css({"opacity": 1})
							},
							function() {
								$hTrackElm.css({"opacity": settings.scrollBarOpacity})
							}
						);

						$hTrackElm.hover(
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
								$hTrackElm.width(contWidth-(arrowWidth * 2));
	
								$hTrackElm.css({
									"left": hRightPos+arrowWidth,
									"top": container.position().top - settings.scrollWidth + settings.vOffset + container.outerHeight() + "px",
									"border-radius": settings.borderRadius 
								});
							} else {
								$hTrackElm.find(".arrow").hide();
								$hTrackElm.width(contWidth)
								
								console.log(settings.vOffset,container.position().top+container.outerHeight())
								$hTrackElm.css({
									"left": hRightPos,
									"top": container.position().top-settings.scrollWidth+settings.vOffset+container.outerHeight(),
									"border-radius": settings.borderRadius,
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