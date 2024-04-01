import PanelButton from "../PanelButton";
import options from "options";
import { sh } from "lib/utils";

const { icon, label, monitor } = options.bar.rotate;
let isLandscape = true;

const toggleRotate = () => {
    isLandscape = !isLandscape;
    const transformVal = isLandscape ? '1' : '0';
    const monitorStr = `${monitor},transform,${transformVal}`;
    const monitorCmd = `hyprctl keyword monitor ${monitorStr}`;
    sh(monitorCmd);
};

export default () => PanelButton({
    class_name: "wvctl",
    on_clicked: toggleRotate,
    child: Widget.Box([
        Widget.Icon({
            class_name: icon.colored.bind().as(c => c ? "colored" : ""),
            visible: icon.icon.bind().as(v => !!v),
            icon: icon.icon.bind(),
        }),
    ]),
});

