import options from "options"
import Dock from "./Dock.ts"
const hyprland = await Service.import("hyprland")
const apps = await Service.import("applications")

import type Gtk from "gi://Gtk?version=3.0";
import { type WindowProps } from "types/widgets/window";
import { type RevealerProps } from "types/widgets/revealer";
import { type EventBoxProps } from "types/widgets/eventbox";

/** @param {number} monitor */
const FloatingDock = (monitor: number): Gtk.Window & WindowProps => {
    const update = () => {
        const ws = hyprland.getWorkspace(hyprland.active.workspace.id);
        if (hyprland.getMonitor(monitor)?.name === ws?.monitor) {
            revealer.reveal_child = !ws || ws.windows === 0;
        }
    };

    const revealer: Gtk.Revealer & RevealerProps = Widget.Revealer({
        transition: 'slide_right',
        transitionDuration: 90,
        child: Dock(),
        setup: self => self
            .hook(hyprland, update, 'client-added')
            .hook(hyprland, update, 'client-removed')
            .hook(hyprland.active.workspace, update),
    });

    const window = Widget.Window({
        monitor,
        halign: 'fill',
        layer: "overlay",
        name: `dock${monitor}`,
        click_through: false,
        class_name: 'floating-dock',
        anchor: ['left'],
        child: Widget.Box({
            vertical: true,
            halign: 'top',
            hpack: 'fill',
            children: [
                revealer,
                Widget.Box({
                    class_name: 'padding',
                    css: 'padding: 9px;',
                    vertical: true,
                    halign: 'top',
                    hpack: 'fill',
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

export default FloatingDock;

