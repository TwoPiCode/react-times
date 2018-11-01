import '../css/classic/default.css';

import React, { Fragment } from 'react';
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
  .addWithInfo('Wrap Test', () => (
   <Fragment>
     <TimePicker
          theme="classic"
          minuteStep={30}
          timeMode='12'
          time='47:00'
          // withMinTime={'23:00'}
          // withMaxTime={'47:00'}
          onTimeChange={time => console.dir(time)}
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
