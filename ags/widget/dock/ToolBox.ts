import options from "options";
import { sh } from "lib/utils";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";

const hyprland = await Service.import("hyprland");
const { icons } = options.dock.toolbox;

const move = (arg: string) => {
    console.log(`Moving window: ${arg}`);
    sh(`hyprctl dispatch movewindow ${arg}`);
};

const buttonConfigs = [
    { iconIndex: 0, moveDirection: 'u' },
    { iconIndex: 1, moveDirection: 'd' },
    { iconIndex: 2, moveDirection: 'l' },
    { iconIndex: 3, moveDirection: 'r' }
];

const ToolBox = (): Gtk.Box & BoxProps => {
    const ToolBoxButtons = () => {
        const buttons = buttonConfigs.map(({ iconIndex, moveDirection }) =>
            Widget.Button({
                child: Widget.Icon({
                    icon: icons[iconIndex].bind(),
                }),
                on_clicked: () => {
                    console.log("Clicked button with moveDirection:", moveDirection);
                    move(moveDirection);
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
