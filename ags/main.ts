import "lib/session"
import "style/style"
import init from "lib/init"
import options from "options"
import Bar from "widget/bar/Bar"
import Applauncher from "widget/applauncher/Applauncher"
import PowerMenu from "widget/powermenu/PowerMenu"
import Verification from "widget/powermenu/Verification"
import NotificationPopups from "widget/notifications/NotificationPopups"
import ScreenCorners from "widget/bar/ScreenCorners"
import OSD from "widget/osd/OSD"
import SettingsDialog from "widget/settings/SettingsDialog"
import FloatingDock from "widget/dock/FloatingDock"
import ToolBoxDock from "widget/dock/ToolBoxDock"
import { forMonitors } from "lib/utils"
import { setupQuickSettings } from "widget/quicksettings/QuickSettings"
import { setupDateMenu } from "widget/datemenu/DateMenu"

App.config({
    onConfigParsed: () => {
        setupQuickSettings()
        setupDateMenu()
        init()
    },
    closeWindowDelay: {
        "applauncher": options.transition.value,
        "overview": options.transition.value,
        "quicksettings": options.transition.value,
        "datemenu": options.transition.value,
    },
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(NotificationPopups),
        ...forMonitors(ScreenCorners),
        ...forMonitors(OSD),
        ...forMonitors(FloatingDock),
        ...forMonitors(ToolBoxDock),
        Applauncher(),
        PowerMenu(),
        Verification(),
        SettingsDialog(),
    ],
})
