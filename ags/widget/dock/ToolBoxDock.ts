import options from "options";
import ToolBox from "./ToolBox.ts";
const hyprland = await Service.import("hyprland");
const apps = await Service.import("applications");

import type Gtk from "gi://Gtk?version=3.0";
import { type WindowProps } from "types/widgets/window";
import { type RevealerProps } from "types/widgets/revealer";
import { type EventBoxProps } from "types/widgets/eventbox";

/** @param {number} monitor */
const ToolBoxDock = (monitor: number): Gtk.Window & WindowProps => {
    const revealer: Gtk.Revealer & RevealerProps = Widget.Revealer({
        transition: 'slide_right',
        transitionDuration: 90,
        child: ToolBox(),
    });

    const window = Widget.Window({
        monitor,
        halign: 'fill',
        layer: "overlay",
        exclusivity: "exclusive",
        name: `toolbox${monitor}`,
        class_name: 'floating-toolbox',
        anchor: ['bottom','left'],
        child: Widget.Box({
            vertical: true,
            halign: 'top',
            hpack: 'fill',
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

export default ToolBoxDock;