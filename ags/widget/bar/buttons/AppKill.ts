import PanelButton from "../PanelButton"
import options from "options"
import { sh } from "lib/utils"

const { icon, label } = options.bar.appkill

const kill = () => {
    sh(`hyprctl kill`)
}

export default () => PanelButton({
    class_name: "appkill",
    on_clicked: () => kill(),
    child: Widget.Box([
        Widget.Icon({
            class_name: icon.colored.bind().as(c => c ? "colored" : ""),
            visible: icon.icon.bind().as(v => !!v),
            icon: icon.icon.bind(),
        }),
    ]),
})
