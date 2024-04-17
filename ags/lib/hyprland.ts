import options from "options"
const { messageAsync } = await Service.import("hyprland")

const {
    hyprland,
    theme: {
        spacing,
        radius,
        border: { width },
        blur,
        shadows,
        dark: {
            primary: { bg: darkActive },
        },
        light: {
            primary: { bg: lightActive },
        },
        scheme,
    },
} = options

const deps = [
    "hyprland",
    spacing.id,
    radius.id,
    blur.id,
    width.id,
    shadows.id,
    darkActive.id,
    lightActive.id,
    scheme.id,
]

function activeBorder() {
    const color = scheme.value === "dark"
        ? darkActive.value
        : lightActive.value

    return color.replace("#", "")
}

function sendBatch(batch: string[]) {
    const cmd = batch
        .filter(x => !!x)
        .map(x => `keyword ${x}`)
        .join("; ")

    return messageAsync(`[[BATCH]]/${cmd}`)
}

async function setupHyprland() {
    const wm_gaps = Math.floor(hyprland.gaps.value * spacing.value)

    sendBatch([
        `decoration:drop_shadow ${shadows.value ? "yes" : "no"}`,
        `dwindle:no_gaps_when_only ${hyprland.gapsWhenOnly.value ? 0 : 1}`,
        `master:no_gaps_when_only ${hyprland.gapsWhenOnly.value ? 0 : 1}`,
    ])
}

export default function init() {
    options.handler(deps, setupHyprland)
    setupHyprland()
}
