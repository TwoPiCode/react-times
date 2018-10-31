import React from 'react';
import PropTypes from 'prop-types';
import {
  TIMES_12_MODE,
  TIMES_24_MODE
} from '../../utils/const_value';
import timeHelper from '../../utils/time';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  meridiem: PropTypes.string,
  colorPalette: PropTypes.string,
  handleTimeChange: PropTypes.func,
  handleMeridiemChange: PropTypes.func,
  withMaxTime: PropTypes.string,
  withMinTime: PropTypes.string,
  wrap: PropTypes.bool
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  meridiem: 'AM',
  withMaxTime: '23:30',
  withMinTime: '00:00',
  wrap: false,
  colorPalette: 'light',
  handleTimeChange: () => {},
  handleMeridiemChange: () => {}
};

export const timesToMap = (times, wrap) => {
  const base = times.map(time => {
    const split = time.split(':');
    return {
      label: time,
      value: [(parseInt(split[0])).toString().padStart(2, '0'), split[1]].join(':')
    };
  });
  if (!wrap) return base;
  return base.concat(
    times.map(time => {
      const split = time.split(':');
      return {
        label: `${time} (+1)`,
        value: [(parseInt(split[0]) + 24).toString().padStart(2, '0'), split[1]].join(':')
      };
    })
  );
};
class ClassicTheme extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handle12ModeHourChange = this.handle12ModeHourChange.bind(this);
    this.handle24ModeHourChange = this.handle24ModeHourChange.bind(this);
  }

  handle12ModeHourChange(time) {
    const [times, meridiem] = time.split(' ');
    const { handleTimeChange, handleMeridiemChange } = this.props;
    handleMeridiemChange && handleMeridiemChange(meridiem);
    handleTimeChange && handleTimeChange({time: times, meridiem});
  }

  handle24ModeHourChange(time) {
    const { handleTimeChange } = this.props;
    handleTimeChange && handleTimeChange({time, meridiem: null});
  }

  checkTimeIsActive(time) {
    const { hour, minute, meridiem } = this.props;
    const [times, rawMeridiem] = time.split(' ');
    const [rawHour, rawMinute] = times.split(':');
    const currentHour = timeHelper.validate(rawHour);
    const currentMinute = timeHelper.validate(rawMinute);

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

  render12Hours() {
    const { colorPalette, withMinTime, withMaxTime, wrap } = this.props;
    let sliceLow = 0;
    let sliceHigh = TIMES_12_MODE.length;
    if (withMinTime) {
      sliceLow = TIMES_24_MODE.findIndex(time => time === withMinTime);
    }
    if (withMaxTime) {
      sliceHigh = TIMES_24_MODE.findIndex(time => time === withMaxTime) + 1;
    }

    return [...TIMES_12_MODE].slice(sliceLow, sliceHigh).map((hourValue, index) => {
      const timeClass = this.checkTimeIsActive(hourValue)
        ? 'classic_time active'
        : 'classic_time';
      const [time, meridiem] = hourValue.split(' ');
      return (
        <div
          key={index}
          onClick={() => {
            this.handle12ModeHourChange(hourValue);
          }}
          className={`${timeClass} ${colorPalette}`}
        >
          {time}&nbsp;
          <span className="meridiem">{meridiem}</span>
        </div>
      );
    });
  }

  render24Hours() {
    const { colorPalette, withMinTime, withMaxTime, wrap } = this.props;
    const times = timesToMap(TIMES_24_MODE, wrap);
    const values = times.map(time => time.value);

    let sliceLow = 0;
    let sliceHigh = values.length;
    if (withMinTime) {
      sliceLow = values.findIndex(time => time === withMinTime);
    }
    if (withMaxTime) {
      sliceHigh = values.findIndex(time => time === withMaxTime) + 1;
    }

    return [...times].slice(sliceLow, sliceHigh).map((time, index) => {
      const { label, value: hourValue } = time;
      const timeClass = this.checkTimeIsActive(hourValue)
        ? 'classic_time active'
        : 'classic_time';
      return (
        <div
          key={index}
          onClick={() => {
            this.handle24ModeHourChange(hourValue);
          }}
          className={`${timeClass} ${colorPalette}`}
        >
          {label}
        </div>
      );
    });
  }

  render() {
    const { timeMode } = this.props;
    return (
      <div className="classic_theme_container">
        {timeMode === 12 ? this.render12Hours() : this.render24Hours()}
      </div>
    );
  }
}

ClassicTheme.propTypes = propTypes;
ClassicTheme.defaultProps = defaultProps;

export default ClassicTheme;
