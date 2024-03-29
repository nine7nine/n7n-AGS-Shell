import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import icons from '../../icons.js';
import PanelButton from '../PanelButton.js';

const defaultIcon = 'go-down-symbolic';

export default () => PanelButton({
    class_name: 'appkill',
    window: 'appkill',
    content: Widget.Icon(defaultIcon),
    on_clicked: () => Utils.execAsync('hyprctl kill'),
});
