import { addDecorator, configure, setAddon } from '@storybook/react';

import infoAddon from '@storybook/addon-info';
import moment from 'moment';

addDecorator((story) => {
  moment.locale('zh-cn');
  return (story());
});

function loadStories() {
  require('../stories/TimePicker');
  require('../stories/DarkColor');
  require('../stories/TwelveHoursMode');
  require('../stories/ClassicThemePicker');
  require('../stories/CustomTrigger');
}

setAddon(infoAddon);

configure(loadStories, module);
