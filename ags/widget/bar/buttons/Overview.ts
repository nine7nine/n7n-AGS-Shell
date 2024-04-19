import PanelButton from "../PanelButton"
import { sh } from "lib/utils"

const hyprspace = () => {
    sh(`hyprctl dispatch overview:toggle`)
}

export default () => PanelButton({
    class_name: "overview",
    on_clicked: () => hyprspace(),
    child: Widget.Box({ expand: true }),
})
