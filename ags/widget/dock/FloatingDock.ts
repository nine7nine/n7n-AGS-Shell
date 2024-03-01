import options from "options"
import Dock from "./Dock.ts"
const hyprland = await Service.import("hyprland")
const apps = await Service.import("applications")

import type Gtk from "gi://Gtk?version=3.0";
import { type WindowProps } from "types/widgets/window";
import { type RevealerProps } from "types/widgets/revealer";
import { type EventBoxProps } from "types/widgets/eventbox";

/** @param {number} monitor */
const createFloatingDock = (monitor: number): Gtk.Window & WindowProps => {
    const revealer: Gtk.Revealer & RevealerProps = Widget.Revealer({
        transition: 'slide_right',
        child: Dock(),
        setup: self => {
            const update = () => {
                const ws = hyprland.getWorkspace(hyprland.active.workspace.id);
                if (hyprland.getMonitor(monitor)?.name === ws?.monitor)
                    self.reveal_child = ws?.windows === 0;
            };
            self.connectTo(hyprland, update, 'client-added');
            self.connectTo(hyprland, update, 'client-removed');
            self.connectTo(hyprland.active.workspace, update);
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

export default createFloatingDock;

