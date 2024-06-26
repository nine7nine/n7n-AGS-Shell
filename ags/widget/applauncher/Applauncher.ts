import PopupWindow, { Padding } from "widget/PopupWindow"
import { AppItem, QuickButton } from "./AppItem"
import icons from "lib/icons"
import options from "options"
import { launchApp } from "lib/utils"

const apps = await Service.import("applications")
const { query } = apps
const { width, margin, maxItem, favorites } = options.applauncher

const fetchInstalledApps = () => {
    const installedApps = apps.query('')
    const sortedApps = installedApps.sort((a, b) => a.name.localeCompare(b.name))
    return sortedApps.map(app => AppItem(app))
}

const SeparatedAppItem = (app: Parameters<typeof AppItem>[0]) => Widget.Revealer(
    { attribute: { app } },
    Widget.Box(
        { vertical: true },
        Widget.Separator(),
        AppItem(app),
    ),
)

const Applauncher = () => {
    const applist = Variable(query(""))
    let first = applist.value[0]

    const list = Widget.Box({
        vertical: true,
        hexpand: true,
        vexpand: true,
        children: applist.bind().as(list => [
            ...list.map(SeparatedAppItem),
            ...fetchInstalledApps(),
        ])
    })

    list.hook(apps, () => applist.value = query(""), "notify::frequents")

    const entry = Widget.Entry({
        hexpand: true,
        primary_icon_name: icons.ui.search,
        on_accept: () => {
            entry.text !== "" && launchApp(first)
            App.toggleWindow("applauncher")
        },
        on_change: ({ text }) => {
            first = query(text || "")[0]
            list.children.reduce((i, item) => {
                if (!text || i >= maxItem.value) {
                    item.reveal_child = false
                    return i
                }
                if (item.attribute.app.match(text)) {
                    item.reveal_child = true
                    return ++i
                }
                item.reveal_child = false
                return i
            }, 0)
        },
    })

    const quicklaunch = Widget.Revealer({
        setup: self => self.hook(entry, () => self.reveal_child = !entry.text, "notify::text"),
        visible: favorites.bind().as(f => f.length > 0),
        child: Widget.Box({
            vertical: true,
            children: favorites.bind().as(favs => favs.flatMap(fs => [
                Widget.Separator(),
                Widget.Box({
                    class_name: "quicklaunch horizontal",
                    children: fs
                        .map(f => query(f)?.[0])
                        .filter(f => f)
                        .map(QuickButton),
                }),
            ])),
        }),
    })

    function focus(): void {
        entry.text = "Search"
        entry.set_position(-1)
        entry.select_region(0, -1)
        entry.grab_focus()
        quicklaunch.reveal_child = true
    }

    const scrolledWindow = new imports.gi.Gtk.ScrolledWindow({
        hscrollbar_policy: imports.gi.Gtk.PolicyType.NEVER,
        vscrollbar_policy: imports.gi.Gtk.PolicyType.AUTOMATIC,
    })

    scrolledWindow.set_vexpand(true)
    scrolledWindow.set_hexpand(true)

    scrolledWindow.add(list)

    const layout = Widget.Box({
        css: width.bind().as(v => `min-width: 300pt;`),
        class_name: "applauncher",
        vertical: true,
        vpack: "start",
        setup: self => self.hook(App, (_, win, visible) => {
            if (win !== "applauncher") {
                return
            }

            entry.text = ""
            if (visible) {
                focus()
                // Reset scroll position to top
                scrolledWindow.vadjustment.set_value(0)
            }
        }),
        children: [
            entry,
            scrolledWindow,
        ],
    })

    return Widget.Box(
        { vertical: true, css: "padding: 1px" },
        Padding("applauncher", {
            css: margin.bind().as(v => `min-height: ${v}pt;`),
            vexpand: false,
        }),
        layout,
    )
}

export default () => PopupWindow({
    name: "applauncher",
    layout: "top-left",
    layer: "overlay",
    transition: "crossfade",
    child: Applauncher(),
})
