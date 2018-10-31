import '../css/classic/default.css';

import React from 'react';
import { Fragment } from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@storybook/react';
import TimePicker from '../src/components/TimePicker';

storiesOf('Classic Theme', module)
  .addWithInfo('basic', () => (
    <TimePickerWrapper theme="classic" />
  ))
  .addWithInfo('dark color', () => (
    <TimePickerWrapper theme="classic" colorPalette="dark" />
  ))
  .addWithInfo('12 hours mode', () => (
   <Fragment>
     <TimePicker
          theme="classic"
          minuteStep={30}
          withMinTime={'09:00'}
//          withMaxTime={'17:00'}
          wrap={true}/>
   </Fragment>
  ))
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      focused
      theme="classic"
    />
  ))
  .addWithInfo('Set default time', () => (
    <TimePickerWrapper
      theme="classic"
      defaultTime="12:00"
    />
  ));
