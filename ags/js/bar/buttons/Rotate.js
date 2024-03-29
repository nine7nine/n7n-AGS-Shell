import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import icons from '../../icons.js';
import PanelButton from '../PanelButton.js';

const defaultIcon = 'object-rotate-left-symbolic';

export default () => {
  let isLandscape = true;

  const toggleRotateState = () => {
    isLandscape = !isLandscape;
    const command = isLandscape ? 'hyprrotate 0' : 'hyprrotate 1';
    Utils.execAsync(command);
  };

  const button = PanelButton({
    class_name: 'rotate',
    content: Widget.Icon(defaultIcon),
    onClicked: toggleRotateState,
  });

  return button;
};

