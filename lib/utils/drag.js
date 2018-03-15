"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getScrollPosition = function getScrollPosition() {
  var position = {
    x: document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body.scrollTop || 0
  };
  return position;
};

var mousePosition = function mousePosition(e) {
  var event = e || window.event;
  var xPos = void 0;
  var scrollPosition = getScrollPosition();

  if (event.pageX) {
    xPos = event.pageX;
  } else if (event.clientX + scrollPosition.x - document.body.clientLeft) {
    xPos = event.clientX + scrollPosition.x - document.body.clientLeft;
  } else if (event.touches[0]) {
    xPos = event.touches[0].clientX;
  } else {
    xPos = event.changedTouches[0].clientX;
  }
  var yPos = void 0;
  if (event.pageY) {
    yPos = event.pageY;
  } else if (event.clientY + scrollPosition.y - document.body.clientTop) {
    yPos = event.clientY + scrollPosition.y - document.body.clientTop;
  } else if (event.touches[0]) {
    yPos = event.touches[0].clientY;
  } else {
    yPos = event.changedTouches[0].clientY;
  }
  return {
    x: xPos,
    y: yPos
  };
};

var disableMouseDown = function disableMouseDown(e) {
  var event = e || window.event;
  event.preventDefault();
  event.stopPropagation();
};

var getRotateStyle = function getRotateStyle(degree) {
  return {
    transform: "rotate(" + degree + "deg)",
    OTransform: "rotate(" + degree + "deg)",
    MozTransform: "rotate(" + degree + "deg)",
    mstransform: "rotate(" + degree + "deg)",
    WebkitTransform: "rotate(" + degree + "deg)"
  };
};

var getInlineRotateStyle = function getInlineRotateStyle(degree) {
  return {
    transform: "translateX(-50%) rotate(" + degree + "deg)",
    OTransform: "translateX(-50%) rotate(" + degree + "deg)",
    MozTransform: "translateX(-50%) rotate(" + degree + "deg)",
    mstransform: "translateX(-50%) rotate(" + degree + "deg)",
    WebkitTransform: "translateX(-50%) rotate(" + degree + "deg)"
  };
};

var getInitialPointerStyle = function getInitialPointerStyle(height, top, degree) {
  return {
    height: height + "px",
    top: top + "px",
    transform: "translateX(-50%) rotate(" + degree + "deg)",
    OTransform: "translateX(-50%) rotate(" + degree + "deg)",
    MozTransform: "translateX(-50%) rotate(" + degree + "deg)",
    mstransform: "translateX(-50%) rotate(" + degree + "deg)",
    WebkitTransform: "translateX(-50%) rotate(" + degree + "deg)"
  };
};

var getStandardAbsolutePosition = function getStandardAbsolutePosition(position, minPosition, maxPosition) {
  var p = position;
  if (p < minPosition) {
    p = minPosition;
  }
  if (p > maxPosition) {
    p = maxPosition;
  }
  return p;
};

var degree2Radian = function degree2Radian(degree) {
  return degree * (2 * Math.PI) / 360;
};

exports.default = {
  degree2Radian: degree2Radian,
  mousePosition: mousePosition,
  disableMouseDown: disableMouseDown,
  rotateStyle: getRotateStyle,
  inlineRotateStyle: getInlineRotateStyle,
  initialPointerStyle: getInitialPointerStyle,
  validatePosition: getStandardAbsolutePosition
};