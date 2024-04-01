import PanelButton from "../PanelButton";
import options from "options";
import { sh } from "lib/utils";

const { icon, label } = options.bar.wvctl;
let isWvctlShown = false;

const toggleWvctl = () => {
    isWvctlShown = !isWvctlShown;
    sh(`wvctl ${isWvctlShown ? '1' : '0'}`);
};

export default () => PanelButton({
    class_name: "wvctl",
    on_clicked: toggleWvctl,
    child: Widget.Box([
        Widget.Icon({
            class_name: icon.colored.bind().as(c => c ? "colored" : ""),
            visible: icon.icon.bind().as(v => !!v),
            icon: icon.icon.bind(),
        }),
    ]),
});

