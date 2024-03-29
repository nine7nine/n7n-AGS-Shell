import { Menu, ArrowToggleButton } from "../ToggleButton"
import icons from "lib/icons.js"
import { dependencies, sh } from "lib/utils"
import options from "options"
const { wifi } = await Service.import("network")

const maxAccessPointsToShow = 25;

export const NetworkToggle = () => ArrowToggleButton({
    name: "network",
    icon: wifi.bind("icon_name"),
    label: wifi.bind("ssid").as(truncateSsid),
    connection: [wifi, () => wifi.enabled],
    deactivate: () => wifi.enabled = false,
    activate: () => {
        wifi.enabled = true
        wifi.scan()
    },
})

export const WifiSelection = () => Menu({
    name: "network",
    icon: wifi.bind("icon_name"),
    title: "Wifi Selection",
    content: [
        Widget.Box({
            vertical: true,
            setup: self => self.hook(wifi, () => {
                // Sort access points by signal strength (descending order)
                const sortedAccessPoints = wifi.access_points.sort((a, b) => b.strength - a.strength);
                // Take top maxAccessPointsToShow access points
                const visibleAccessPoints = sortedAccessPoints.slice(0, maxAccessPointsToShow);
                // Update the children of the box
                self.children = visibleAccessPoints.map(ap => Widget.Button({
                    on_clicked: () => {
                        if (dependencies("nmcli"))
                            Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`)
                    },
                    child: Widget.Box({
                        children: [
                            Widget.Icon(ap.iconName),
                            Widget.Label(truncateSsid(ap.ssid) || ""),
                            Widget.Icon({
                                icon: icons.ui.tick,
                                hexpand: true,
                                hpack: "end",
                                setup: self => Utils.idle(() => {
                                    if (!self.is_destroyed)
                                        self.visible = ap.active
                                }),
                            }),
                        ],
                    }),
                }));
            }),
        }),
        Widget.Separator(),
        Widget.Button({
            on_clicked: () => sh(options.quicksettings.networkSettings.value),
            child: Widget.Box({
                children: [
                    Widget.Icon(icons.ui.settings),
                    Widget.Label("Network"),
                ],
            }),
        }),
    ],
})

function truncateSsid(ssid) {
    const maxLength = 30;
    return ssid.length > maxLength ? ssid.slice(0, maxLength) + "..." : ssid;
}
