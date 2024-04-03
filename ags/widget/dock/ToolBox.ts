import options from "options";
import { sh } from "lib/utils";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";

const hyprland = await Service.import("hyprland");
const { icons } = options.dock.toolbox;

const move = (action: string, arg: string) => {
    console.log(`Performing action: ${action} with argument: ${arg}`);
    sh(`hyprctl dispatch ${action} ${arg}`);
};

const buttonConfigs = [
    { iconIndex: 0, action: 'movewindow', arg: 'u' },
    { iconIndex: 1, action: 'movewindow', arg: 'd' },
    { iconIndex: 2, action: 'movewindow', arg: 'l' },
    { iconIndex: 3, action: 'movewindow', arg: 'r' }
];

const ToolBox = (): Gtk.Box & BoxProps => {
    const ToolBoxButtons = () => {
        const buttons = buttonConfigs.map(({ iconIndex, action, arg }) =>
            Widget.Button({
                child: Widget.Icon({
                    icon: icons[iconIndex].bind(),
                }),
                on_clicked: () => {
                    console.log(`Clicked button with action: ${action} and argument: ${arg}`);
                    move(action, arg);
                },
            })
        );
        
        return Widget.Box({
            vertical: true,
            children: buttons,
        });
    };

    return Widget.Box({
        class_name: "toolbox",
        vertical: true,
        children: [ToolBoxButtons()],
    });
};

export default ToolBox;
