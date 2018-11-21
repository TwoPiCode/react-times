'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timesToMap = exports.convert24to12 = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _const_value = require('../../utils/const_value');

var _time = require('../../utils/time');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  hour: _propTypes2.default.string,
  minute: _propTypes2.default.string,
  timeMode: _propTypes2.default.number,
  meridiem: _propTypes2.default.string,
  colorPalette: _propTypes2.default.string,
  handleTimeChange: _propTypes2.default.func,
  handleMeridiemChange: _propTypes2.default.func,
  withMaxTime: _propTypes2.default.string,
  withMinTime: _propTypes2.default.string,
  wrap: _propTypes2.default.bool
};

var defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  meridiem: 'AM',
  withMaxTime: '23:30',
  withMinTime: '00:00',
  wrap: false,
  colorPalette: 'light',
  handleTimeChange: function handleTimeChange() {},
  handleMeridiemChange: function handleMeridiemChange() {}
};

var userIsDragging = false;
var initialTouchX = 0;
var initialTouchY = 0;

var convert24to12 = exports.convert24to12 = function convert24to12(time) {
  var times24 = timesToMap(_const_value.TIMES_24_MODE, true, 24);
  var values24 = times24.map(function (time) {
    return time.value;
  });
  var index = values24.indexOf(time);
  return timesToMap(_const_value.TIMES_12_MODE, true, 12)[index].label.replace(' ', '');
};

var timesToMap = exports.timesToMap = function timesToMap(times, wrap, mode) {
  var base = times.map(function (time) {
    var split = time.split(':');
    return {
      label: time,
      value: [parseInt(split[0]).toString().padStart(2, '0'), split.slice(1).join(' ')].join(':')
    };
  });
  if (!wrap) return base;
  return base.concat(times.map(function (time) {
    var split = time.split(':');
    var base = mode;
    return {
      label: time + ' (+1 day)',
      value: [(base + parseInt(split[0])).toString().padStart(2, '0'), split.slice(1).join(' ')].join(':')
    };
  }));
};

var ClassicTheme = function (_React$PureComponent) {
  _inherits(ClassicTheme, _React$PureComponent);

  function ClassicTheme(props) {
    _classCallCheck(this, ClassicTheme);

    var _this = _possibleConstructorReturn(this, (ClassicTheme.__proto__ || Object.getPrototypeOf(ClassicTheme)).call(this, props));

    _this.handle12ModeHourChange = _this.handle12ModeHourChange.bind(_this);
    _this.handle24ModeHourChange = _this.handle24ModeHourChange.bind(_this);
    return _this;
  }

  _createClass(ClassicTheme, [{
    key: 'handle12ModeHourChange',
    value: function handle12ModeHourChange(time) {
      var _time$split = time.split(' '),
          _time$split2 = _slicedToArray(_time$split, 2),
          times = _time$split2[0],
          meridiem = _time$split2[1];

      var _props = this.props,
          handleTimeChange = _props.handleTimeChange,
          handleMeridiemChange = _props.handleMeridiemChange;

      handleMeridiemChange && handleMeridiemChange(meridiem);
      handleTimeChange && handleTimeChange({ time: times, meridiem: meridiem });
    }
  }, {
    key: 'handle24ModeHourChange',
    value: function handle24ModeHourChange(time) {
      var handleTimeChange = this.props.handleTimeChange;

      handleTimeChange && handleTimeChange({ time: time, meridiem: null });
    }
  }, {
    key: 'checkTimeIsActive',
    value: function checkTimeIsActive(time) {
      var _props2 = this.props,
          hour = _props2.hour,
          minute = _props2.minute,
          meridiem = _props2.meridiem;

      var _time$split3 = time.split(' '),
          _time$split4 = _slicedToArray(_time$split3, 2),
          times = _time$split4[0],
          rawMeridiem = _time$split4[1];

      var _times$split = times.split(':'),
          _times$split2 = _slicedToArray(_times$split, 2),
          rawHour = _times$split2[0],
          rawMinute = _times$split2[1];

      var currentHour = _time2.default.validate(rawHour);
      var currentMinute = _time2.default.validate(rawMinute);

      if (hour !== currentHour) {
        return false;
      }
      if (meridiem && meridiem !== rawMeridiem) {
        return false;
      }
      if (Math.abs(parseInt(minute, 10) - parseInt(currentMinute, 10)) < 15) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render12Hours',
    value: function render12Hours() {
      var _this2 = this;

      var _props3 = this.props,
          colorPalette = _props3.colorPalette,
          withMinTime = _props3.withMinTime,
          withMaxTime = _props3.withMaxTime,
          wrap = _props3.wrap;

      var times = timesToMap(_const_value.TIMES_12_MODE, wrap, 12);
      var times24 = timesToMap(_const_value.TIMES_24_MODE, wrap, 24);
      var values24 = times24.map(function (time) {
        return time.value;
      });
      var sliceLow = 0;
      var sliceHigh = values24.length;
      if (withMinTime) {
        sliceLow = values24.findIndex(function (time) {
          return time === withMinTime;
        });
      }
      if (withMaxTime) {
        sliceHigh = values24.findIndex(function (time) {
          return time === withMaxTime;
        }) + 1;
      }

      return [].concat(_toConsumableArray(times)).slice(sliceLow, sliceHigh).map(function (time, index) {
        var _React$createElement;

        var label = time.label,
            hourValue = time.value;

        var timeClass = _this2.checkTimeIsActive(hourValue) ? 'classic_time active' : 'classic_time';
        return _react2.default.createElement(
          'div',
          (_React$createElement = {
            key: index,
            onTouchStart: function onTouchStart(_ref) {
              var _ref$touches = _slicedToArray(_ref.touches, 1),
                  touch = _ref$touches[0];

              _this2.initialTouchX = touch.clientX;
              _this2.initialTouchY = touch.clientY;
              _this2.userIsDragging = false;
            },
            onTouchMove: function onTouchMove(_ref2) {
              var _ref2$touches = _slicedToArray(_ref2.touches, 1),
                  touch = _ref2$touches[0];

              var deltaX = Math.abs(touch.clientX - _this2.initialTouchX);
              var deltaY = Math.abs(touch.clientY - _this2.initialTouchY);
              var moveThreshold = 5;
              _this2.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
            },
            onTouchEnd: function onTouchEnd() {
              _this2.userIsDragging = false;
            }
          }, _defineProperty(_React$createElement, 'onTouchEnd', function onTouchEnd() {
            if (_this2.userIsDragging) return;
            wrap ? _this2.handle24ModeHourChange([].concat(_toConsumableArray(values24)).slice(sliceLow, sliceHigh)[index]) : _this2.handle12ModeHourChange(hourValue);
          }), _defineProperty(_React$createElement, 'onMouseDown', function onMouseDown() {
            wrap ? _this2.handle24ModeHourChange([].concat(_toConsumableArray(values24)).slice(sliceLow, sliceHigh)[index]) : _this2.handle12ModeHourChange(hourValue);
          }), _defineProperty(_React$createElement, 'className', timeClass + ' ' + colorPalette), _React$createElement),
          label
        );
      });
    }
  }, {
    key: 'render24Hours',
    value: function render24Hours() {
      var _this3 = this;

      var _props4 = this.props,
          colorPalette = _props4.colorPalette,
          withMinTime = _props4.withMinTime,
          withMaxTime = _props4.withMaxTime,
          wrap = _props4.wrap;

      var times = timesToMap(_const_value.TIMES_24_MODE, wrap, 24);
      var values = times.map(function (time) {
        return time.value;
      });

      var sliceLow = 0;
      var sliceHigh = values.length;
      if (withMinTime) {
        sliceLow = values.findIndex(function (time) {
          return time === withMinTime;
        });
      }
      if (withMaxTime) {
        sliceHigh = values.findIndex(function (time) {
          return time === withMaxTime;
        }) + 1;
      }

      return [].concat(_toConsumableArray(times)).slice(sliceLow, sliceHigh).map(function (time, index) {
        var _React$createElement2;

        var label = time.label,
            hourValue = time.value;

        var timeClass = _this3.checkTimeIsActive(hourValue) ? 'classic_time active' : 'classic_time';
        return _react2.default.createElement(
          'div',
          (_React$createElement2 = {
            key: index,
            onTouchStart: function onTouchStart(_ref3) {
              var _ref3$touches = _slicedToArray(_ref3.touches, 1),
                  touch = _ref3$touches[0];

              _this3.initialTouchX = touch.clientX;
              _this3.initialTouchY = touch.clientY;
              _this3.userIsDragging = false;
            },
            onTouchMove: function onTouchMove(_ref4) {
              var _ref4$touches = _slicedToArray(_ref4.touches, 1),
                  touch = _ref4$touches[0];

              var deltaX = Math.abs(touch.clientX - _this3.initialTouchX);
              var deltaY = Math.abs(touch.clientY - _this3.initialTouchY);
              var moveThreshold = 5;
              _this3.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
            },
            onTouchEnd: function onTouchEnd() {
              _this3.userIsDragging = false;
            }
          }, _defineProperty(_React$createElement2, 'onTouchEnd', function onTouchEnd() {
            if (_this3.userIsDragging) return;
            wrap ? _this3.handle24ModeHourChange([].concat(_toConsumableArray(values)).slice(sliceLow, sliceHigh)[index]) : _this3.handle12ModeHourChange(hourValue);
          }), _defineProperty(_React$createElement2, 'onMouseDown', function onMouseDown() {
            wrap ? _this3.handle24ModeHourChange([].concat(_toConsumableArray(values)).slice(sliceLow, sliceHigh)[index]) : _this3.handle12ModeHourChange(hourValue);
          }), _defineProperty(_React$createElement2, 'className', timeClass + ' ' + colorPalette), _React$createElement2),
          label
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var timeMode = this.props.timeMode;

      return _react2.default.createElement(
        'div',
        { className: 'classic_theme_container' },
        timeMode === 12 ? this.render12Hours() : this.render24Hours()
      );
    }
  }]);

  return ClassicTheme;
}(_react2.default.PureComponent);

ClassicTheme.propTypes = propTypes;
ClassicTheme.defaultProps = defaultProps;

exports.default = ClassicTheme;