import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Dock from './Dock.js';
import options from '../options.js';

/** @param {number} monitor */
export default monitor => {
    const revealer = Widget.Revealer({
        transition: 'slide_right',
        child: Dock(),
        setup: self => {
            const update = () => {
                const ws = Hyprland.getWorkspace(Hyprland.active.workspace.id);
                if (Hyprland.getMonitor(monitor)?.name === ws?.monitor)
                    self.reveal_child = ws?.windows === 0;
            };
            self.connectTo(Hyprland, update, 'client-added');
            self.connectTo(Hyprland, update, 'client-removed');
            self.connectTo(Hyprland.active.workspace, update);
        },
    });

    return Widget.Window({
        monitor,
        halign: 'fill',
        name: `dock${monitor}`,
        class_name: 'floating-dock',
        anchor: ['left'],
        child: Widget.Box({
            vertical: true,
            halign: 'center',
            hpack: 'center',
            children: [
                revealer,
                Widget.Box({
                    class_name: 'padding',
                    css: 'padding: 6px;',
                }),
            ],
        }),
        connections: [
            ['enter-notify-event', () => {
                revealer.reveal_child = true;
            }],
            ['leave-notify-event', () => {
                revealer.reveal_child = false;
            }],
        ],
        binds: [['visible', options.bar.position, 'value', v => v !== 'left']],
    });
};

