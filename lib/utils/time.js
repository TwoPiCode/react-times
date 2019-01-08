'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _func = require('./func');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a time data object using moment.
 * If a time is provided, just format it; if not, use the current time.
 *
 * @function getValidTimeData
 * @param  {string} time          a time; defaults to now
 * @param  {string} meridiem      AM or PM; defaults to AM via moment
 * @param  {Number} timeMode      12 or 24-hour mode
 * @return {Object}               a key-value representation of time data
 */
var getValidTimeData = function getValidTimeData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var time = options.time,
      timeMode = options.timeMode,
      _options$useTz = options.useTz,
      useTz = _options$useTz === undefined ? true : _options$useTz,
      _options$meridiem = options.meridiem,
      meridiem = _options$meridiem === undefined ? null : _options$meridiem,
      _options$wrap = options.wrap,
      wrap = _options$wrap === undefined ? false : _options$wrap;


  if (wrap) {
    return _extends({}, options);
  }
  var validMeridiem = getValidMeridiem(meridiem);

  // when we only have a valid meridiem, that implies a 12h mode
  var mode = validMeridiem && !timeMode ? 12 : timeMode || 24;
  var validMode = getValidateTimeMode(mode);
  var validTime = getValidTimeString(time, validMeridiem);
  var format12 = 'hh:mmA';
  var format24 = 'HH:mmA';

  // What format is the hour we provide to moment below in?
  var hourFormat = validMode === 12 ? format12 : format24;

  var time24 = void 0;
  var time12 = void 0;
  var formatTime = (0, _moment2.default)('1970-01-01 ' + validTime, 'YYYY-MM-DD ' + hourFormat, 'en');
  if (time || !useTz) {
    time24 = (validTime ? formatTime.format(format24) : (0, _moment2.default)().format(format24)).split(/:/);
    time12 = (validTime ? formatTime.format(format12) : (0, _moment2.default)().format(format12)).split(/:/);
  } else {
    time24 = (validTime ? formatTime.format(format24) : (0, _moment2.default)().format(format24)).split(/:/);

    time12 = (validTime ? formatTime.format(format12) : (0, _moment2.default)().format(format12)).split(/:/);
  }

  var timeData = {
    mode: validMode,
    hour24: (0, _func.head)(time24),
    minute: (0, _func.last)(time24).slice(0, 2),
    hour12: (0, _func.head)(time12).replace(/^0/, ''),
    meridiem: validMode === 12 ? (0, _func.last)(time12).slice(2) : null
  };

  return timeData;
};

/**
 * Format the current time as a string
 * @function getCurrentTime
 * @return {string}
 */
var getCurrentTime = function getCurrentTime() {
  var time = getValidTimeData();
  return time.hour24 + ':' + time.minute;
};

/**
 * Get an integer representation of a time.
 * @function getValidateIntTime
 * @param  {string} time
 * @return {Number}
 */
var getValidateIntTime = function getValidateIntTime(time) {
  if (isNaN(parseInt(time, 10))) {
    return 0;
  }
  return parseInt(time, 10);
};

/**
 * Validate, set a default for, and stringify time data.
 * @function getValidateTime
 * @param {string}
 * @return {string}
 */
var getValidateTime = function getValidateTime(time) {
  var result = time;
  if (_func.is.undefined(result)) {
    result = '00';
  }
  if (isNaN(parseInt(result, 10))) {
    result = '00';
  }
  if (parseInt(result, 10) < 10) {
    result = '0' + parseInt(result, 10);
  }
  return '' + result;
};

/**
 * Given a time and meridiem, produce a time string to pass to moment
 * @function getValidTimeString
 * @param  {string} time
 * @param  {string} meridiem
 * @return {string}
 */
var getValidTimeString = function getValidTimeString(time, meridiem) {
  if (_func.is.string(time)) {
    var validTime = time && time.indexOf(':').length >= 0 ? time.split(/:/).map(function (t) {
      return getValidateTime(t);
    }).join(':') : time;
    var hourAsInt = parseInt((0, _func.head)(validTime.split(/:/)), 10);
    var is12hTime = hourAsInt > 0 && hourAsInt <= 12;

    validTime = validTime && meridiem && is12hTime ? validTime + ' ' + meridiem : validTime;

    return validTime;
  }

  return time;
};

/**
 * Given a meridiem, try to ensure that it's formatted for use with moment
 * @function getValidMeridiem
 * @param  {string} meridiem
 * @return {string}
 */
var getValidMeridiem = function getValidMeridiem(meridiem) {
  if (_func.is.string(meridiem)) {
    return meridiem && meridiem.match(/am|pm/i) ? meridiem.toLowerCase() : null;
  }

  return meridiem;
};

/**
 * Ensure that a meridiem passed as a prop has a valid value
 * @function getValidateMeridiem
 * @param  {string} time
 * @param  {string|Number} timeMode
 * @return {string|null}
 */
var getValidateMeridiem = function getValidateMeridiem(time, timeMode) {
  var validateTime = time || getCurrentTime();
  var mode = parseInt(timeMode, 10);
  // eslint-disable-next-line no-unused-vars
  var hour = validateTime.split(/:/)[0];
  hour = getValidateIntTime(hour);

  if (mode === 12) return hour > 12 ? 'PM' : 'AM';

  return null;
};

/**
 * Validate and set a sensible default for time modes.
 * TODO: this function might not really be necessary, see getValidTimeData() above
 *
 * @function getValidateTimeMode
 * @param  {string|Number} timeMode
 * @return {Number}
 */
var getValidateTimeMode = function getValidateTimeMode(timeMode) {
  var mode = parseInt(timeMode, 10);

  if (isNaN(mode)) {
    return 24;
  }
  if (mode !== 24 && mode !== 12) {
    return 24;
  }

  return mode;
};

exports.default = {
  current: getCurrentTime,
  time: getValidTimeData,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateMeridiem: getValidateMeridiem,
  validateTimeMode: getValidateTimeMode
};