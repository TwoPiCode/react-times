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

var _OutsideClickHandler = require('./OutsideClickHandler');

var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

var _MaterialTheme = require('./MaterialTheme');

var _MaterialTheme2 = _interopRequireDefault(_MaterialTheme);

var _ClassicTheme = require('./ClassicTheme');

var _ClassicTheme2 = _interopRequireDefault(_ClassicTheme);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _language = require('../utils/language');

var _language2 = _interopRequireDefault(_language);

var _icons = require('../utils/icons');

var _icons2 = _interopRequireDefault(_icons);

var _func = require('../utils/func');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// aliases for defaultProps readability
var TIME = _time2.default.time({ useTz: false });
TIME.current = _time2.default.current();

var propTypes = {
  autoMode: _propTypes2.default.bool,
  colorPalette: _propTypes2.default.string,
  draggable: _propTypes2.default.bool,
  focused: _propTypes2.default.bool,
  language: _propTypes2.default.string,
  meridiem: _propTypes2.default.string,
  onFocusChange: _propTypes2.default.func,
  onHourChange: _propTypes2.default.func,
  onMeridiemChange: _propTypes2.default.func,
  onMinuteChange: _propTypes2.default.func,
  withMinTime: _propTypes2.default.string,
  withMaxTime: _propTypes2.default.string,
  wrap: _propTypes2.default.bool,
  onTimeChange: _propTypes2.default.func,
  onTimezoneChange: _propTypes2.default.func,
  phrases: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  showTimezone: _propTypes2.default.bool,
  theme: _propTypes2.default.string,
  time: _propTypes2.default.string,
  timeMode: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  timezone: _propTypes2.default.string,
  timezoneIsEditable: _propTypes2.default.bool,
  trigger: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object, _propTypes2.default.instanceOf(_react2.default.Component), _propTypes2.default.instanceOf(_react2.default.PureComponent)]),
  withoutIcon: _propTypes2.default.bool,
  minuteStep: _propTypes2.default.number,
  limitDrag: _propTypes2.default.bool,
  timeFormat: _propTypes2.default.string,
  timeFormatter: _propTypes2.default.func,
  useTz: _propTypes2.default.bool
};

var defaultProps = {
  autoMode: true,
  colorPalette: 'light',
  draggable: true,
  focused: false,
  language: 'en',
  withMinTime: null,
  withMaxTime: null,
  wrap: false,
  meridiem: TIME.meridiem,
  onFocusChange: function onFocusChange() {},
  onHourChange: function onHourChange() {},
  onMeridiemChange: function onMeridiemChange() {},
  onMinuteChange: function onMinuteChange() {},
  onTimeChange: function onTimeChange() {},
  onTimezoneChange: function onTimezoneChange() {},
  placeholder: '',
  showTimezone: false,
  theme: 'material',
  time: '',
  timeMode: TIME.mode,
  trigger: null,
  withoutIcon: false,
  minuteStep: 5,
  limitDrag: false,
  timeFormat: '',
  timeFormatter: null,
  useTz: true
};

var TimePicker = function (_React$PureComponent) {
  _inherits(TimePicker, _React$PureComponent);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    var focused = props.focused,
        timezone = props.timezone,
        onTimezoneChange = props.onTimezoneChange;

    var timeData = _this.timeData(false);
    var timezoneData = _time2.default.tzForName(timeData.timezone);

    _this.state = {
      focused: focused,
      timezoneData: timezoneData,
      timeChanged: false
    };

    _this.timeData = _this.timeData.bind(_this);
    _this.handleHourAndMinuteChange = _this.handleHourAndMinuteChange.bind(_this);
    _this.handleHourChange = _this.handleHourChange.bind(_this);
    _this.handleMeridiemChange = _this.handleMeridiemChange.bind(_this);
    _this.handleMinuteChange = _this.handleMinuteChange.bind(_this);
    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);

    // if a timezone value was not passed in,
    // call the callback with the default value used for timezone
    if (!timezone) {
      onTimezoneChange(timezoneData);
    }
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'timeData',
    value: function timeData(timeChanged) {
      var _props = this.props,
          time = _props.time,
          useTz = _props.useTz,
          timeMode = _props.timeMode,
          timezone = _props.timezone,
          meridiem = _props.meridiem;

      var timeData = _time2.default.time({
        time: time,
        meridiem: meridiem,
        timeMode: timeMode,
        tz: timezone,
        useTz: !time && !timeChanged && useTz
      });
      return timeData;
    }
  }, {
    key: 'languageData',
    value: function languageData() {
      var _props2 = this.props,
          language = _props2.language,
          _props2$phrases = _props2.phrases,
          phrases = _props2$phrases === undefined ? {} : _props2$phrases;

      return Object.assign({}, _language2.default.get(language), phrases);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var focused = nextProps.focused;

      if (focused !== this.state.focused) {
        this.setState({ focused: focused });
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        focused: true
      });
      var onFocusChange = this.props.onFocusChange;

      onFocusChange && onFocusChange(true);
    }
  }, {
    key: 'getHourAndMinute',
    value: function getHourAndMinute() {
      var timeMode = this.props.timeMode;

      var timeData = this.timeData(this.state.timeChanged);
      // Since someone might pass a time in 24h format, etc., we need to get it from
      // timeData to 'translate' it into the local format, including its accurate meridiem
      var hour = parseInt(timeMode, 10) === 12 ? timeData.hour12 : timeData.hour24;
      var minute = timeData.minute;
      return [hour, minute];
    }
  }, {
    key: 'getFormattedTime',
    value: function getFormattedTime() {
      var _props3 = this.props,
          timeMode = _props3.timeMode,
          timeFormat = _props3.timeFormat,
          timeFormatter = _props3.timeFormatter;

      var _getHourAndMinute = this.getHourAndMinute(),
          _getHourAndMinute2 = _slicedToArray(_getHourAndMinute, 2),
          hour = _getHourAndMinute2[0],
          minute = _getHourAndMinute2[1];

      var validTimeMode = _time2.default.validateTimeMode(timeMode);

      var times = '';
      if (timeFormatter && _func.is.func(timeFormatter)) {
        times = timeFormatter({
          hour: hour,
          minute: minute,
          meridiem: this.meridiem
        });
      } else if (timeFormat && _func.is.string(timeFormat)) {
        times = timeFormat;
        if (/HH?/.test(times) || /MM?/.test(times)) {
          if (validTimeMode === 12) {
            //  console.warn('It seems you are using 12 hours mode with 24 hours time format. Please check your timeMode and timeFormat props');
          }
        } else if (/hh?/.test(times) || /mm?/.test(times)) {
          if (validTimeMode === 24) {
            //  console.warn('It seems you are using 24 hours mode with 12 hours time format. Please check your timeMode and timeFormat props');
          }
        }
        times = times.replace(/(HH|hh)/g, hour);
        times = times.replace(/(MM|mm)/g, minute);
        times = times.replace(/(H|h)/g, Number(hour));
        times = times.replace(/(M|m)/g, Number(minute));
      } else {
        times = validTimeMode === 12 ? hour + ' : ' + minute + ' ' + this.meridiem : hour + ' : ' + minute;
      }
      return times;
    }
  }, {
    key: 'onClearFocus',
    value: function onClearFocus() {
      this.setState({
        focused: false
      });
      var onFocusChange = this.props.onFocusChange;

      onFocusChange && onFocusChange(false);
    }
  }, {
    key: 'onTimeChanged',
    value: function onTimeChanged(timeChanged) {
      this.setState({
        timeChanged: timeChanged
      });
    }
  }, {
    key: 'handleHourChange',
    value: function handleHourChange(hour) {
      var validateHour = _time2.default.validate(hour);
      var onHourChange = this.props.onHourChange;

      var minute = this.getHourAndMinute()[1];
      onHourChange && onHourChange(validateHour);
      this.handleTimeChange(validateHour + ':' + minute);
    }
  }, {
    key: 'handleMinuteChange',
    value: function handleMinuteChange(minute) {
      var validateMinute = _time2.default.validate(minute);
      var onMinuteChange = this.props.onMinuteChange;

      var hour = this.getHourAndMinute()[0];
      onMinuteChange && onMinuteChange(validateMinute);
      this.handleTimeChange(hour + ':' + validateMinute);
    }
  }, {
    key: 'handleMeridiemChange',
    value: function handleMeridiemChange(meridiem) {
      var onMeridiemChange = this.props.onMeridiemChange;

      onMeridiemChange && onMeridiemChange(meridiem);
    }
  }, {
    key: 'handleTimeChange',
    value: function handleTimeChange(time) {
      var onTimeChange = this.props.onTimeChange;

      onTimeChange && onTimeChange(time);
      this.onTimeChanged(true);
    }
  }, {
    key: 'handleHourAndMinuteChange',
    value: function handleHourAndMinuteChange(time) {
      this.onTimeChanged(true);
      var _props4 = this.props,
          onTimeChange = _props4.onTimeChange,
          autoMode = _props4.autoMode;

      if (autoMode) {
        this.onClearFocus();
      }
      return onTimeChange && onTimeChange(time);
    }
  }, {
    key: 'renderMaterialTheme',
    value: function renderMaterialTheme() {
      var _props5 = this.props,
          timeMode = _props5.timeMode,
          autoMode = _props5.autoMode,
          draggable = _props5.draggable,
          language = _props5.language,
          limitDrag = _props5.limitDrag,
          minuteStep = _props5.minuteStep,
          showTimezone = _props5.showTimezone,
          onTimezoneChange = _props5.onTimezoneChange,
          timezoneIsEditable = _props5.timezoneIsEditable;
      var timezoneData = this.state.timezoneData;

      var _getHourAndMinute3 = this.getHourAndMinute(),
          _getHourAndMinute4 = _slicedToArray(_getHourAndMinute3, 2),
          hour = _getHourAndMinute4[0],
          minute = _getHourAndMinute4[1];

      return _react2.default.createElement(_MaterialTheme2.default, {
        limitDrag: limitDrag,
        minuteStep: parseInt(minuteStep, 10),
        autoMode: autoMode,
        clearFocus: this.onClearFocus,
        draggable: draggable,
        handleHourChange: this.handleHourChange,
        handleMeridiemChange: this.handleMeridiemChange,
        handleMinuteChange: this.handleMinuteChange,
        onTimezoneChange: onTimezoneChange,
        hour: hour,
        language: language,
        meridiem: this.meridiem,
        minute: minute,
        phrases: this.languageData(),
        showTimezone: showTimezone,
        timeMode: parseInt(timeMode, 10),
        timezone: timezoneData,
        timezoneIsEditable: timezoneIsEditable
      });
    }
  }, {
    key: 'renderClassicTheme',
    value: function renderClassicTheme() {
      var _props6 = this.props,
          timeMode = _props6.timeMode,
          colorPalette = _props6.colorPalette;

      var _getHourAndMinute5 = this.getHourAndMinute(),
          _getHourAndMinute6 = _slicedToArray(_getHourAndMinute5, 2),
          hour = _getHourAndMinute6[0],
          minute = _getHourAndMinute6[1];

      return _react2.default.createElement(_ClassicTheme2.default, {
        withMinTime: this.props.withMinTime,
        withMaxTime: this.props.withMaxTime,
        wrap: this.props.wrap,
        colorPalette: colorPalette,
        handleMeridiemChange: this.handleMeridiemChange,
        handleTimeChange: this.handleHourAndMinuteChange,
        hour: hour,
        meridiem: this.meridiem,
        minute: minute,
        timeMode: parseInt(timeMode, 10)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          theme = _props7.theme,
          trigger = _props7.trigger,
          placeholder = _props7.placeholder,
          withoutIcon = _props7.withoutIcon,
          colorPalette = _props7.colorPalette,
          containerClassProp = _props7.containerClass;
      var focused = this.state.focused;

      var times = this.getFormattedTime();

      var pickerPreviewClass = focused ? 'time_picker_preview active' : 'time_picker_preview';
      var containerClass = colorPalette === 'dark' ? 'time_picker_container dark' : 'time_picker_container';
      var previewContainerClass = withoutIcon ? 'preview_container without_icon' : 'preview_container';

      return _react2.default.createElement(
        'div',
        { className: containerClass + (containerClassProp ? ' ' + containerClassProp : '') },
        trigger || _react2.default.createElement(
          'div',
          {
            onClick: this.onFocus,
            className: pickerPreviewClass },
          _react2.default.createElement(
            'div',
            { className: previewContainerClass },
            withoutIcon ? '' : _icons2.default.time,
            placeholder || times
          )
        ),
        _react2.default.createElement(
          _OutsideClickHandler2.default,
          {
            onOutsideClick: this.onClearFocus,
            focused: focused },
          theme === 'material' ? this.renderMaterialTheme() : this.renderClassicTheme()
        )
      );
    }
  }, {
    key: 'meridiem',
    get: function get() {
      var meridiem = this.props.meridiem;

      var timeData = this.timeData(this.state.timeChanged);
      var localMessages = this.languageData();
      // eslint-disable-next-line no-unneeded-ternary
      var m = meridiem ? meridiem : timeData.meridiem;
      // eslint-disable-next-line no-extra-boolean-cast
      return m && !!m.match(/^am|pm/i) ? localMessages[m.toLowerCase()] : m;
    }
  }]);

  return TimePicker;
}(_react2.default.PureComponent);

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

exports.default = TimePicker;