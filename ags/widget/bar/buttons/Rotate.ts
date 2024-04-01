import PanelButton from "../PanelButton";
import options from "options";
import { sh } from "lib/utils";

const { icon, label } = options.bar.rotate;
let isLandscape = true;

const toggleRotate = () => {
    isLandscape = !isLandscape;
    sh(`hyprrotate ${isLandscape ? '1' : '0'}`);
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

