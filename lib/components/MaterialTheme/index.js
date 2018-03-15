'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TwelveHoursMode = require('./TwelveHoursMode');

var _TwelveHoursMode2 = _interopRequireDefault(_TwelveHoursMode);

var _TwentyFourHoursMode = require('./TwentyFourHoursMode');

var _TwentyFourHoursMode2 = _interopRequireDefault(_TwentyFourHoursMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  autoMode: _propTypes2.default.bool,
  clearFocus: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  handleEditTimezoneChange: _propTypes2.default.func,
  handleHourChange: _propTypes2.default.func,
  handleMeridiemChange: _propTypes2.default.func,
  handleMinuteChange: _propTypes2.default.func,
  handleShowTimezoneChange: _propTypes2.default.func,
  onTimezoneChange: _propTypes2.default.func,
  hour: _propTypes2.default.string,
  language: _propTypes2.default.string,
  meridiem: _propTypes2.default.string,
  minute: _propTypes2.default.string,
  phrases: _propTypes2.default.object,
  showTimezone: _propTypes2.default.bool,
  timeMode: _propTypes2.default.number,
  timezone: _propTypes2.default.shape({
    city: _propTypes2.default.string,
    zoneAbbr: _propTypes2.default.string,
    zoneName: _propTypes2.default.string
  }),
  timezoneIsEditable: _propTypes2.default.bool
};

var defaultProps = {
  autoMode: true,
  clearFocus: function clearFocus() {},
  draggable: true,
  handleEditTimezoneChange: function handleEditTimezoneChange() {},
  handleHourChange: function handleHourChange() {},
  handleMeridiemChange: function handleMeridiemChange() {},
  handleMinuteChange: function handleMinuteChange() {},
  handleShowTimezoneChange: function handleShowTimezoneChange() {},
  hour: '00',
  language: 'en',
  meridiem: 'AM',
  minute: '00',
  showTimezone: false,
  timeMode: 24
};

var MaterialTheme = function (_React$PureComponent) {
  _inherits(MaterialTheme, _React$PureComponent);

  function MaterialTheme() {
    _classCallCheck(this, MaterialTheme);

    return _possibleConstructorReturn(this, (MaterialTheme.__proto__ || Object.getPrototypeOf(MaterialTheme)).apply(this, arguments));
  }

  _createClass(MaterialTheme, [{
    key: 'renderTwentyFourHoursMode',
    value: function renderTwentyFourHoursMode() {
      var _props = this.props,
          hour = _props.hour,
          minute = _props.minute,
          phrases = _props.phrases,
          timezone = _props.timezone,
          autoMode = _props.autoMode,
          clearFocus = _props.clearFocus,
          draggable = _props.draggable,
          limitDrag = _props.limitDrag,
          minuteStep = _props.minuteStep,
          showTimezone = _props.showTimezone,
          onTimezoneChange = _props.onTimezoneChange,
          timezoneIsEditable = _props.timezoneIsEditable,
          handleHourChange = _props.handleHourChange,
          handleMinuteChange = _props.handleMinuteChange,
          handleEditTimezoneChange = _props.handleEditTimezoneChange,
          handleShowTimezoneChange = _props.handleShowTimezoneChange;


      return _react2.default.createElement(_TwentyFourHoursMode2.default, {
        limitDrag: limitDrag,
        minuteStep: minuteStep,
        autoMode: autoMode,
        clearFocus: clearFocus,
        draggable: draggable,
        handleEditTimezoneChange: handleEditTimezoneChange,
        handleHourChange: handleHourChange,
        handleMinuteChange: handleMinuteChange,
        handleShowTimezoneChange: handleShowTimezoneChange,
        onTimezoneChange: onTimezoneChange,
        hour: hour,
        minute: minute,
        phrases: phrases,
        showTimezone: showTimezone,
        timezone: timezone,
        timezoneIsEditable: timezoneIsEditable
      });
    }
  }, {
    key: 'renderTwelveHoursMode',
    value: function renderTwelveHoursMode() {
      var _props2 = this.props,
          hour = _props2.hour,
          minute = _props2.minute,
          phrases = _props2.phrases,
          language = _props2.language,
          meridiem = _props2.meridiem,
          timezone = _props2.timezone,
          clearFocus = _props2.clearFocus,
          draggable = _props2.draggable,
          limitDrag = _props2.limitDrag,
          minuteStep = _props2.minuteStep,
          showTimezone = _props2.showTimezone,
          onTimezoneChange = _props2.onTimezoneChange,
          timezoneIsEditable = _props2.timezoneIsEditable,
          handleHourChange = _props2.handleHourChange,
          handleMinuteChange = _props2.handleMinuteChange,
          handleEditTimezoneChange = _props2.handleEditTimezoneChange,
          handleMeridiemChange = _props2.handleMeridiemChange,
          handleShowTimezoneChange = _props2.handleShowTimezoneChange;


      return _react2.default.createElement(_TwelveHoursMode2.default, {
        limitDrag: limitDrag,
        minuteStep: minuteStep,
        clearFocus: clearFocus,
        draggable: draggable,
        handleEditTimezoneChange: handleEditTimezoneChange,
        handleHourChange: handleHourChange,
        handleMeridiemChange: handleMeridiemChange,
        handleMinuteChange: handleMinuteChange,
        handleShowTimezoneChange: handleShowTimezoneChange,
        onTimezoneChange: onTimezoneChange,
        hour: hour,
        language: language,
        meridiem: meridiem,
        minute: minute,
        phrases: phrases,
        showTimezone: showTimezone,
        timezone: timezone,
        timezoneIsEditable: timezoneIsEditable
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var timeMode = this.props.timeMode;

      return _react2.default.createElement(
        'div',
        null,
        parseInt(timeMode, 10) === 24 ? this.renderTwentyFourHoursMode() : this.renderTwelveHoursMode()
      );
    }
  }]);

  return MaterialTheme;
}(_react2.default.PureComponent);

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

exports.default = MaterialTheme;