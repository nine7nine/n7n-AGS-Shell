import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import icons from '../../icons.js';
import PanelButton from '../PanelButton.js';

export default () => PanelButton({
    class_name: 'overview',
    window: 'overivew',
    content: Widget.Icon(icons.overview.overview),
    on_clicked: () => App.openWindow('overview'),
});
