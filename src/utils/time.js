import moment from 'moment';
import { head, last, is } from './func';

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
const getValidTimeData = (options = {}) => {
  const {
    time,
    timeMode,
    useTz = true,
    meridiem = null,
    wrap = false
  } = options;

  if (wrap) {
    return {...options};
  }
  const validMeridiem = getValidMeridiem(meridiem);

  // when we only have a valid meridiem, that implies a 12h mode
  const mode = (validMeridiem && !timeMode) ? 12 : timeMode || 24;
  const validMode = getValidateTimeMode(mode);
  const validTime = getValidTimeString(time, validMeridiem);
  const format12 = 'hh:mmA';
  const format24 = 'HH:mmA';

  // What format is the hour we provide to moment below in?
  const hourFormat = (validMode === 12) ? format12 : format24;

  let time24;
  let time12;
  const formatTime = moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en');
  if (time || !useTz) {
    time24 = ((validTime)
      ? formatTime.format(format24)
      : moment().format(format24)).split(/:/);
    time12 = ((validTime)
      ? formatTime.format(format12)
      : moment().format(format12)).split(/:/);
  } else {
    time24 = ((validTime)
      ? formatTime.format(format24)
      : moment().format(format24)).split(/:/);

    time12 = ((validTime)
      ? formatTime.format(format12)
      : moment().format(format12)).split(/:/);
  }

  const timeData = {
    mode: validMode,
    hour24: head(time24),
    minute: last(time24).slice(0, 2),
    hour12: head(time12).replace(/^0/, ''),
    meridiem: validMode === 12 ? last(time12).slice(2) : null,
  };

  return timeData;
};

/**
 * Format the current time as a string
 * @function getCurrentTime
 * @return {string}
 */
const getCurrentTime = () => {
  const time = getValidTimeData();
  return `${time.hour24}:${time.minute}`;
};

/**
 * Get an integer representation of a time.
 * @function getValidateIntTime
 * @param  {string} time
 * @return {Number}
 */
const getValidateIntTime = (time) => {
  if (isNaN(parseInt(time, 10))) { return 0; }
  return parseInt(time, 10);
};

/**
 * Validate, set a default for, and stringify time data.
 * @function getValidateTime
 * @param {string}
 * @return {string}
 */
const getValidateTime = (time) => {
  let result = time;
  if (is.undefined(result)) { result = '00'; }
  if (isNaN(parseInt(result, 10))) { result = '00'; }
  if (parseInt(result, 10) < 10) { result = `0${parseInt(result, 10)}`; }
  return `${result}`;
};

/**
 * Given a time and meridiem, produce a time string to pass to moment
 * @function getValidTimeString
 * @param  {string} time
 * @param  {string} meridiem
 * @return {string}
 */
const getValidTimeString = (time, meridiem) => {
  if (is.string(time)) {
    let validTime = (time && time.indexOf(':').length >= 0)
      ? time.split(/:/).map(t => getValidateTime(t)).join(':')
      : time;
    const hourAsInt = parseInt(head(validTime.split(/:/)), 10);
    const is12hTime = (hourAsInt > 0 && hourAsInt <= 12);

    validTime = (validTime && meridiem && is12hTime)
      ? `${validTime} ${meridiem}`
      : validTime;

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
const getValidMeridiem = (meridiem) => {
  if (is.string(meridiem)) {
    return (meridiem && meridiem.match(/am|pm/i)) ? meridiem.toLowerCase() : null;
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
const getValidateMeridiem = (time, timeMode) => {
  const validateTime = time || getCurrentTime();
  const mode = parseInt(timeMode, 10);
  // eslint-disable-next-line no-unused-vars
  let hour = validateTime.split(/:/)[0];
  hour = getValidateIntTime(hour);

  if (mode === 12) return (hour > 12) ? 'PM' : 'AM';

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
const getValidateTimeMode = (timeMode) => {
  const mode = parseInt(timeMode, 10);

  if (isNaN(mode)) { return 24; }
  if (mode !== 24 && mode !== 12) { return 24; }

  return mode;
};

export default {
  current: getCurrentTime,
  time: getValidTimeData,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateMeridiem: getValidateMeridiem,
  validateTimeMode: getValidateTimeMode
};
