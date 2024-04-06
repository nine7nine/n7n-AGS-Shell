import PanelButton from "../PanelButton"
import options from "options"
import { sh, range } from "lib/utils"

const hyprland = await Service.import("hyprland")
const { workspaces } = options.bar.workspaces

const dispatch = (arg: string | number) => {
    sh(`hyprctl dispatch workspace ${arg}`)
}

const Workspaces = (ws: number) => Widget.Box({
    children: range(ws || 20).map(i => {
        const btn = Widget.Button({
            attribute: i,
            on_clicked: () => dispatch(i),
            setup: self => self.hook(hyprland, () => {
                self.toggleClassName("active", hyprland.active.workspace.id === i)
                const workspace = hyprland.getWorkspace(i)
                if (workspace) {
                    self.toggleClassName("occupied", workspace.windows.length > 0)
                }
            }),
        })
        const workspace = hyprland.getWorkspace(i)
        if (workspace && workspace.initialized) {
            btn.setup()
        }
        return btn
    }),
    setup: box => {
        box.hook(hyprland.active.workspace, () => box.children.map(btn => {
            btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute)
        }))
    },
})

export default () => PanelButton({
    window: "overview",
    class_name: "workspaces",
    on_scroll_up: () => dispatch("r+1"),
    on_scroll_down: () => dispatch("r-1"),
    child: workspaces.bind().as(Workspaces),
})

