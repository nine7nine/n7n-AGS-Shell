import PanelButton from "../PanelButton"
import options from "options"

const { icon, label, action } = options.bar.overview

export default () => PanelButton({
    class_name: "appkill",
    on_clicked: action.bind(),
    child: Widget.Box([
        Widget.Icon({
            class_name: icon.colored.bind().as(c => c ? "colored" : ""),
            visible: icon.icon.bind().as(v => !!v),
            icon: icon.icon.bind(),
        }),
    ]),
})
