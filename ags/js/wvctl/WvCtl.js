import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import options from '../options.js';

export default monitor => Widget.Window({
    monitor,
    name: `WvCtl${monitor}`,
    class_name: 'WvCtl',
    //hexpand: true,
    anchor: ['left', 'bottom', 'right'],
    child: Widget.EventBox({
        halign: 'fill',
        on_hover: box => {
            if (box._activated) {
                 Utils.timeout(600, () => {
                    Utils.exec('wvctl 0');
                    box._activated = false;
                });
            } else {
                Utils.timeout(600, () => {
                    Utils.exec('wvctl 1');
                    box._activated = true;
                });
            }
        },
        child: Widget.Box({
            halign: 'fill',
            css: 'padding: 12px;',
            children: [
            ],
        }),
    }),
});
