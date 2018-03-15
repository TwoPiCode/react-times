'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  handleMeridiemChange: _propTypes2.default.func
};

var defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  meridiem: 'AM',
  colorPalette: 'light',
  handleTimeChange: function handleTimeChange() {},
  handleMeridiemChange: function handleMeridiemChange() {}
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
      handleTimeChange && handleTimeChange(times);
    }
  }, {
    key: 'handle24ModeHourChange',
    value: function handle24ModeHourChange(time) {
      var handleTimeChange = this.props.handleTimeChange;

      handleTimeChange && handleTimeChange(time);
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

      var colorPalette = this.props.colorPalette;

      return _const_value.TIMES_12_MODE.map(function (hourValue, index) {
        var timeClass = _this2.checkTimeIsActive(hourValue) ? 'classic_time active' : 'classic_time';

        var _hourValue$split = hourValue.split(' '),
            _hourValue$split2 = _slicedToArray(_hourValue$split, 2),
            time = _hourValue$split2[0],
            meridiem = _hourValue$split2[1];

        return _react2.default.createElement(
          'div',
          {
            key: index,
            onClick: function onClick() {
              _this2.handle12ModeHourChange(hourValue);
            },
            className: timeClass + ' ' + colorPalette
          },
          time,
          '\xA0',
          _react2.default.createElement(
            'span',
            { className: 'meridiem' },
            meridiem
          )
        );
      });
    }
  }, {
    key: 'render24Hours',
    value: function render24Hours() {
      var _this3 = this;

      var colorPalette = this.props.colorPalette;

      return _const_value.TIMES_24_MODE.map(function (hourValue, index) {
        var timeClass = _this3.checkTimeIsActive(hourValue) ? 'classic_time active' : 'classic_time';
        return _react2.default.createElement(
          'div',
          {
            key: index,
            onClick: function onClick() {
              _this3.handle24ModeHourChange(hourValue);
            },
            className: timeClass + ' ' + colorPalette
          },
          hourValue
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