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
    const update = () => {
        const ws = hyprland.getWorkspace(hyprland.active.workspace.id);
        if (hyprland.getMonitor(monitor)?.name === ws?.monitor) {
          revealer.reveal_child = ws?.windows === 0;
        }
    };

    const revealer: Gtk.Revealer & RevealerProps = Widget.Revealer({
        transition: 'slide_right',
        child: Dock(),
        setup: self => self
            .hook(hyprland, update, 'client-added')
            .hook(hyprland, update, 'client-removed')
            .hook(hyprland.active.workspace, update),
    });

    const window = Widget.Window({
        monitor,
        halign: 'fill',
        layer: "top",
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
    });

    window
        .on('enter-notify-event', () => {
            revealer.reveal_child = true;
        })
        .on('leave-notify-event', () => {
            revealer.reveal_child = false;
        })
        .bind('visible', options.bar.position, 'value', v => v !== 'left');

    return window;
};

export default createFloatingDock;

