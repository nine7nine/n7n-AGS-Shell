import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import icons from '../../icons.js';
import PanelButton from '../PanelButton.js';

export default () => PanelButton({
    class_name: 'applauncher',
    window: 'applauncher',
    content: Widget.Icon(icons.apps.apps),
    on_clicked: () => App.openWindow('applauncher'),
});
