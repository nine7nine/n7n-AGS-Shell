import { launchApp } from "lib/utils";
import options from "options";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";

const hyprland = await Service.import("hyprland");
const applications = await Service.import("applications");

const focus = (address: string) => hyprland.messageAsync(`dispatch focuswindow address:${address}`);

const AppButton = ({ icon, pinned = false, term, ...rest }: ButtonProps & { term?: string }): Gtk.Button & ButtonProps => {
    const {iconSize} = options.dock;

    const buttonBox = Widget.Box({
        class_name: 'box',
        child: Widget.Icon({
            icon,
            size: iconSize,
        }),
    });

    const button = Widget.Button({
        ...rest,
        class_name: '',
        child: pinned ? buttonBox : Widget.Overlay({
            child: buttonBox,
            pass_through: false,
            overlays: [],
        }),
    });

    return Object.assign(button, {});
};

const createAppButton = ({ app, term, ...params }) => {
    return AppButton({
            icon: app.icon_name || '',
            term,
            ...params,
        });
};

const filterValidClients = (clients: any[]) => {
    return clients.filter(client => (
        client.mapped &&
        [client.class, client.title, client.initialClass].every(prop => typeof prop === 'string' && prop !== '')
    ));
};

const Taskbar = (): Gtk.Box & BoxProps => {
    const addedApps = new Set<string>();

    const updateTaskbar = (clients: any[]) => {
        const validClients = filterValidClients(clients);

        const focusedAddress = hyprland?.active.client?.address;
        const running = validClients.filter(client => client.mapped);
        const focused = running.find(client => client.address === focusedAddress);

        return validClients.map(client => {
                if (![client.class, client.title, client.initialClass].every(prop => typeof prop === 'string' && prop !== '')) {
                    return null;
                }

                if (addedApps.has(client.title)) {
                    return null;
                }

                for (const appName of options.dock.pinnedApps.value) {
                    if (!appName || typeof appName !== 'string') {
                        continue;
                    }

                    if (client.class.includes(appName) || client.title.includes(appName)
                        || client.initialClass.includes(appName)) {
                        return null;
                    }
                }

                const matchingApp = applications?.list.find(app => (
                    app.match(client.title) || app.match(client.class) || app.match(client.initialClass)
                ));

                if (matchingApp) {
                    addedApps.add(client.title);
                    return createAppButton({
                        app: matchingApp,
                        term: matchingApp.title,
                        on_primary_click: () => {
                            const clickAddress = client.address || focusedAddress;
                            clickAddress && focus(clickAddress);
                        },
                        on_secondary_click: () => launchApp(matchingApp),
                    });
                }
                return null;
            });
    };

    return Widget.Box({
        vertical: true,
    })
    .bind('children', hyprland, 'clients', updateTaskbar);
};

const PinnedApps = (): Gtk.Box & BoxProps => {
    const updatePinnedApps = (pinnedApps: string[]) => {
        return pinnedApps
            .map(term => ({ app: applications?.query(term)?.[0], term }))
            .filter(({ app }) => app)
            .map(({ app, term = true }) => createAppButton({
                app,
                term,
                pinned: true,
                on_primary_click: () => {
                    const matchingClients = hyprland?.clients.filter(client => (
                        typeof client.class === 'string' &&
                        typeof client.title === 'string' &&
                        typeof client.initialClass === 'string' &&
                        (client.class.includes(term) || client.title.includes(term) || client.initialClass.includes(term))
                    ));

                    if (matchingClients.length > 0) {
                        const {address} = matchingClients[0];
                        address && focus(address);
                    } else {
                        launchApp(app);
                    }
                },
                on_secondary_click: () => launchApp(app),
            }));
    };

    return Widget.Box({
        class_name: 'pins',
        vertical: true,
        homogeneous: true,
    })
    .bind('children', options.dock.pinnedApps, 'value', updatePinnedApps);
};

const Dock = (): Gtk.Box & BoxProps => Widget.Box({
    class_name: 'dock',
    vertical: true,
    children: [PinnedApps(), Taskbar()],
});

export default Dock;
