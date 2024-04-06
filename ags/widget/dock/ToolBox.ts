import options from "options";
import { sh } from "lib/utils";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";

const hyprland = await Service.import("hyprland");
const { icons } = options.dock.toolbox;
const buttonToggles = {};

const dispatch = (action: string, arg: string) => {
    //console.log(`Performing action: ${action} with argument: ${arg}`);
    sh(`hyprctl dispatch ${action} ${arg}`);
};

const keyword = (action: string, arg: string) => {
    //console.log(`Performing action: ${action} with argument: ${arg}`);
    sh(`hyprctl keyword ${action} ${arg}`);
};


const buttonConfigs = [
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 0, action: 'killactive', arg: '' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 1, action: 'exec hyprctl', arg: 'kill' },
    { 
        actionExec: keyword,
        trigger: 'toggle-switch',
        actionIndex: 2,
        actionOn: 'monitor', arg: 'eDP-1,2736x1824,0x0,0,transform,1',
        actionOff: 'monitor', argOff: 'eDP-1,2736x1824,0x0,0,transform,0'
    },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 3, action: 'swapnext', arg: 'next' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 4, action: 'movewindow', arg: 'l' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 5, action: 'movewindow', arg: 'r' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 6, action: 'movewindow', arg: 'u' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 7, action: 'movewindow', arg: 'd' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 8, action: 'workspace', arg: 'r-1' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 9, action: 'workspace', arg: 'r+1' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 10, action: 'pin', arg: '' },
    { 
        actionExec: dispatch,
        trigger: 'toggleOn-multi',
        actionIndex: 11,
        actionOn: [
            { action: 'togglefloating', arg: 'active' },
            { action: 'resizeactive', arg: 'exact 90% 90%' },
            { action: 'centerwindow', arg: '' },
        ],
        actionOff: 'togglefloating', argOff: 'active'
    },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 12, action: 'fullscreen', arg: '1' },
    { 
        actionExec: dispatch,
        trigger: 'toggle-switch',
        actionIndex: 13,
        actionOn: 'exec', arg: 'wvctl 1',
        actionOff: 'exec', argOff: 'wvctl 0'
    },
];

const ToolBox = (): Gtk.Box & BoxProps => {
    const ToolBoxButtons = () => {
        const buttons = buttonConfigs.map(({ actionIndex, actionOn, argOn, actionOff, argOff, 
                                             actionExec, trigger, action, arg }) => {
            const execAction = () => {
                if (trigger === 'toggleOn-multi') {
                    buttonToggles[actionIndex] = !buttonToggles[actionIndex];
                    if (buttonToggles[actionIndex]) {
                        actionOn.forEach(({ action, arg }) => {
                            actionExec(action, arg);
                        });
                    } else {
                        actionExec(actionOff, argOff);
                    }
                } else if (trigger === 'toggle-switch') {
                    buttonToggles[actionIndex] = !buttonToggles[actionIndex];
                    if (buttonToggles[actionIndex]) {
                        actionExec(actionOn, arg);
                    } else {
                        actionExec(actionOff, argOff);
                    }
                } else if (trigger === 'oneshot') {
                    actionExec(action, arg);
                }
            };

            return Widget.Button({
                child: Widget.Icon({
                    icon: icons[actionIndex].bind(),
                }),
                on_clicked: execAction,
            });
        });

        return Widget.Box({
            vertical: true,
            homogeneous: true,
            children: buttons,
        });
    };

    return Widget.Box({
        class_name: "toolbox",
        vertical: true,
        homogeneous: true,
        children: [ToolBoxButtons()],
    });
};

export default ToolBox;
