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

const ToggleSwitch = (buttonIndex, actionOn, argOn, actionOff, argOff, actionExec) => {
    buttonToggles[buttonIndex] = !buttonToggles[buttonIndex];
    const { action, arg } = buttonToggles[buttonIndex] ? { action: actionOn, arg: argOn } : { action: actionOff, arg: argOff };
    actionExec(action, arg);
};

const ToggleOnMulti = (buttonIndex, actionOn, argOn, actionOff, argOff, actionExec) => {
    buttonToggles[buttonIndex] = !buttonToggles[buttonIndex];
    if (buttonToggles[buttonIndex]) {
        actionOn.forEach(({ action, arg }) => {
            actionExec(action, arg);
        });
    } else {
        actionExec(actionOff, argOff);
    }
};

const execAction = (trigger, actionIndex, actionOn, argOn, actionOff, argOff, action, arg, actionExec) => {
    switch (trigger) {
        case 'toggleOn-multi':
            ToggleOnMulti(actionIndex, actionOn, argOn, actionOff, argOff, actionExec);
            break;
        case 'toggle-switch':
            ToggleSwitch(actionIndex, actionOn, argOn, actionOff, argOff, actionExec);
            break;
        case 'oneshot':
            actionExec(action, arg);
            break;
        default:
            break;
    }
};

const buttonConfigs = [
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 0, action: 'killactive', arg: '' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 1, action: 'exec hyprctl', arg: 'kill' },
    { 
        actionExec: keyword,
        trigger: 'toggle-switch',
        actionIndex: 2,
        actionOn: 'monitor', argOn: 'eDP-1,2736x1824,0x0,0,transform,1',
        actionOff: 'monitor', argOff: 'eDP-1,2736x1824,0x0,0,transform,0'
    },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 3, action: 'workspace', arg: 'r-1' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 4, action: 'workspace', arg: 'r+1' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 5, action: 'movewindow', arg: 'l' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 6, action: 'movewindow', arg: 'r' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 7, action: 'movewindow', arg: 'u' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 8, action: 'movewindow', arg: 'd' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 9, action: 'swapnext', arg: 'next' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 10, action: 'togglesplit', arg: '' },
    { 
        actionExec: dispatch, 
        trigger: 'toggleOn-multi',
        actionIndex: 11,
        actionOn: [
            { action: 'setfloating', arg: 'active' },
            { action: 'resizeactive', arg: 'exact 90% 90%' },
            { action: 'centerwindow', arg: '' },
        ],
        actionOff: 'settiled', argOff: 'active'
    },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 12, action: 'pin', arg: '' },
    { actionExec: dispatch, trigger: 'oneshot', actionIndex: 13, action: 'fullscreen', arg: '0' },
    { 
        actionExec: dispatch,
        trigger: 'toggle-switch',
        actionIndex: 14,
        actionOn: 'exec', argOn: 'wvctl 1',
        actionOff: 'exec', argOff: 'wvctl 0'
    },
];

const ToolBox = () => {
    const ToolBoxButtons = () => {
        const buttons = buttonConfigs.map(({ actionIndex, actionOn, argOn, actionOff, argOff, actionExec, trigger, action, arg }) => {
            const execActionWrapper = () => execAction(trigger, actionIndex, actionOn, argOn, actionOff, argOff, action, arg, actionExec);

            return Widget.Button({
                child: Widget.Icon({
                    icon: icons[actionIndex].bind(),
                }),
                on_clicked: execActionWrapper,
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
