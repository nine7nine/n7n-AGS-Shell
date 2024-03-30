import { clock, uptime } from "lib/variables"

export default () => Widget.Box({
    vertical: true,
    class_name: "date-column vertical",
    children: [
        Widget.Box({
            class_name: "calendar",
            children: [
                Widget.Calendar({
                    hexpand: true,
                    vexpand: true,
                    hpack: "center",
                    vpack: "center",
                }),
            ],
        }),
    ],
})
