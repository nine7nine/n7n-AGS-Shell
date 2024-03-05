import { launchApp } from "lib/utils";
import options from "options";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";

const hyprland = await Service.import("hyprland");
const applications = await Service.import("applications");
const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
const focus = (address: string) => hyprland.messageAsync(`dispatch focuswindow address:${address}`);

const updateIndicators = (button, term, indicators) => {
    const running = hyprland.clients
        .filter(client => (
            typeof client.class === 'string' &&
            typeof client.title === 'string' &&
            typeof client.initialClass === 'string' &&
            (client.class.includes(term) || client.title.includes(term) || client.initialClass.includes(term))
        ));

    const focused = running.find(client => client.address === (hyprland.active.client && hyprland.active.client.address));
    const index = running.findIndex(c => c === focused);

    indicators.map((indicator, i) => {
        if (indicator) {
            indicator.visible = i < running.length;
            indicator.toggleClassName('focused', i === index);
        }
    });
};

const AppButton = ({ icon, pinned = false, term, ...rest }: ButtonProps & { term?: string }): Gtk.Button & ButtonProps => {
    const indicators = range(5, 0).map(() => Widget.Box({
        class_name: 'indicator',
        visible: false,
    }));

    const buttonBox = Widget.Box({
        class_name: 'box',
        child: Widget.Icon({
            icon,
            binds: [['size', options.dock.iconSize]],
        }),
    });

    const button = Widget.Button({
        ...rest,
        class_name: '',
        child: pinned ? buttonBox : Widget.Overlay({
            child: buttonBox,
            pass_through: true,
            overlays: [indicators],
        }),
    });

    const updateIndicatorsInternal = () => updateIndicators(button, term, indicators);

    button
        .on('enter-notify-event', updateIndicatorsInternal)
        .on('leave-notify-event', updateIndicatorsInternal)
        .hook(hyprland, updateIndicatorsInternal, 'client-added')
        .hook(hyprland, updateIndicatorsInternal, 'client-removed');

    return Object.assign(button, { indicators });
};

const createAppButton = ({ app, term, ...params }) => {
    const button = AppButton({
        icon: app.icon_name || '',
        term,
        ...params,
    });

    button.hook(hyprland, button => {
        updateIndicators(button, term, button.indicators);
    }, 'client-added')
    .hook(hyprland, button => {
        updateIndicators(button, term, button.indicators);
    }, 'client-removed')
    .on('enter-notify-event', () => updateIndicators(button, term, button.indicators))
    .on('leave-notify-event', () => updateIndicators(button, term, button.indicators));

    return button;
};


const Taskbar = (): Gtk.Box & BoxProps => {
    const addedApps = new Set<string>();

    return Widget.Box({
        vertical: false,
        binds: [['children', hyprland, 'clients', c => {
            const validClients = c
                .filter(client => (
                    client.mapped &&
                    [client.class, client.title, client.initialClass].every(prop => typeof prop === 'string' && prop !== '')
                ));

            const focusedAddress = hyprland.active.client && hyprland.active.client.address;
            const running = validClients.filter(client => client.mapped);
            const focused = running.find(client => client.address === focusedAddress);

            return validClients.map(client => {
                if (!client.class || !client.title || !client.initialClass) {
                    return null;
                }

                if (addedApps.has(client.title)) {
                    return null;
                }

                for (const appName of options.dock.pinnedApps.value) {
                    if (!appName || typeof appName !== 'string') {
                        continue;
                    }

                    if (client.class.includes(appName) || client.title.includes(appName) || client.initialClass.includes(appName)) {
                        return null;
                    }
                }

                for (const app of applications.list) {
                    if (app.match(client.title) || app.match(client.class) || app.match(client.initialClass)) {
                        addedApps.add(client.title);
                        return createAppButton({
                            app,
                            term: app.title,
                            on_primary_click: () => {
                                const clickAddress = client.address || focusedAddress;
                                clickAddress && focus(clickAddress);
                            },
                            on_secondary_click: () => launchApp(app),
                        });
                    }
                }

                return null;
            });
        }]],
    });
};

const PinnedApps = (): Gtk.Box & BoxProps => {
    const updateIndicatorsInternal = (button, term, indicators) => {
        updateIndicators(button, term, indicators);
    };

    return Widget.Box({
        class_name: 'pins',
        vertical: true,
        homogeneous: true,
        binds: [['children', options.dock.pinnedApps, 'value', v => v
            .map(term => ({ app: applications.query(term)?.[0], term }))
            .filter(({ app }) => app)
            .map(({ app, term = true }) => createAppButton({
                app,
                term,
                pinned: true,
                on_primary_click: () => {
                    const matchingClients = hyprland.clients.filter(client => (
                        typeof client.class === 'string' &&
                        typeof client.title === 'string' &&
                        typeof client.initialClass === 'string' &&
                        (client.class.includes(term) || client.title.includes(term) || client.initialClass.includes(term))
                    ));

                    if (matchingClients.length > 0) {
                        const address = matchingClients[0].address;
                        address && focus(address);
                    } else {
                        launchApp(app);
                    }
                },
                on_secondary_click: () => launchApp(app),
            })),
        ]],
    });
};

const Dock = (): Gtk.Box & BoxProps => Widget.Box({
    class_name: 'dock',
    vertical: true,
    children: [PinnedApps(), Taskbar()],
});

export default Dock;
