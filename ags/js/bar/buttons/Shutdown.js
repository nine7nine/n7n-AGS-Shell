import { Widget, Utils } from '../../imports.js';
import icons from '../../icons.js';
import PanelButton from '../PanelButton.js';

export default () => PanelButton({
    className: 'shutdown',
    content: Widget.Box({
        children: [
            Widget.Icon(icons.powermenu.shutdown),
        ],
    }),
    onClicked: () => Utils.execAsync('wlogout -b 4 -L 900 -R 900 -T 800 -B 800 -m 800 -c 10 -p layer-shell'),
});
