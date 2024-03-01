import { launchApp, icon } from "lib/utils";
import icons from "lib/icons";
import options from "options";
import * as Gtk from "gi://Gtk?version=3.0";
import { type ButtonProps } from "types/widgets/button";
import { type BoxProps } from "types/widgets/box";
import { type SeparatorProps } from "types/widgets/separator";

const hyprland = await Service.import("hyprland");
const applications = await Service.import("applications");
const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
const focus = (address: string) => hyprland.messageAsync(`dispatch focuswindow address:${address}`);

const AppButton = ({ icon, pinned = false, isRunning = false, term, ...rest }: ButtonProps & { term?: string }): Gtk.Button & ButtonProps => {
    const indicators = range(5, 0).map(() => Widget.Box({
        class_name: 'indicator',
        visible: false,
    }));

    const button = Widget.Button({
        ...rest,
        class_name: isRunning ? 'running-indicator' : '',
        child: Widget.Box({
            class_name: 'box',
            child: Widget.Overlay({
                child: Widget.Icon({
                    icon,
                    binds: [['size', options.dock.iconSize]],
                }),
                pass_through: true,
                overlays: [
                    pinned ? indicators : [],
                ],
            }),
        }),
        connections: [[hyprland, button => {
            const running = hyprland.clients.filter(client => (
                typeof client.class === 'string' && typeof client.title === 'string' && typeof client.initialClass === 'string' &&
                (client.class.includes(term) || client.title.includes(term) || client.initialClass.includes(term))
            ));

            const focused = running.find(client => client.address === (hyprland.active.client && hyprland.active.client.address));
            const index = running.findIndex(c => c === focused);

            //console.log('Running Apps:', running);
            //console.log('Focused App:', focused);

            for (let i = 0; i < 5; ++i) {
                const indicator = indicators[i];
                if (indicator) {
                    indicator.visible = i < running.length;
                    indicator.toggleClassName('focused', i === index);
                }
            }
        }]],
    });

    return Object.assign(button, { indicators });
};

const Taskbar = (): Gtk.Box & BoxProps => {
    const addedApps = new Set<string>();

    return Widget.Box({
        vertical: false,
        binds: [['children', hyprland, 'clients', c => {
            //console.log('All Clients:', c);

            const mappedClients = c.filter(client => client.mapped); // Filter mapped clients
            //console.log('Mapped Clients:', mappedClients);

            const validClients = mappedClients.filter(client => (
                typeof client.class === 'string' &&
                typeof client.title === 'string' &&
                typeof client.initialClass === 'string' &&
                (client.class !== '' || client.title !== '' || client.initialClass !== '')
            ));
            //console.log('Valid Clients:', validClients);

            const focusedAddress = hyprland.active.client?.address;

            const running = validClients.filter(client => (
                client.mapped
            ));

            //console.log('Running Apps:', running);

            const focused = running.find(client => client.address === focusedAddress);
            console.log('Focused App:', focused);

            return validClients.map(client => {
                if (
                    !(typeof client.class === 'string' && client.class !== '' &&
                      typeof client.title === 'string' && client.title !== '' &&
                      typeof client.initialClass === 'string' && client.initialClass !== '')
                ) {
                    return null;
                }

                if (addedApps.has(client.title)) {
                    return null;
                }

                for (const appName of options.dock.pinnedApps.value) {
                    //console.log('appName:', appName);
                    if (typeof appName !== 'string') {
                        //console.error('Invalid appName:', appName);
                        continue;
                    }

                    if (client.class.includes(appName) || client.title.includes(appName) || client.initialClass.includes(appName)) {
                        return null;
                    }
                }

                for (const app of applications.list) {
                    if (app.match(client.title) || app.match(client.class) || app.match(client.initialClass)) {
                        addedApps.add(client.title);
                        return AppButton({
                            icon: app.icon_name || '',
                            on_primary_click: () => {
                                const clickAddress = client.address || focusedAddress;
                                clickAddress && focus(clickAddress);
                            },
                            on_secondary_click: () => launchApp(app),
                            isRunning: running.some(c => (
                                c.title === client.title ||
                                c.class === client.class ||
                                c.initialClass === client.initialClass
                            )),
                        });
                    }
                }

                return null;
            });
        }]],
    });
};

const PinnedApps = (): Gtk.Box & BoxProps => Widget.Box({
    class_name: 'pins',
    vertical: true,
    homogeneous: true,
    binds: [['children', options.dock.pinnedApps, 'value', v => v
        .map(term => ({ app: applications.query(term)?.[0], term }))
        .filter(({ app }) => app)
        .map(({ app, term = true }) => {
            if (typeof app !== 'object' || typeof term !== 'string') {
                //console.error('Invalid app or term:', app, term);
                return null;
            }

            return AppButton({
                pinned: true,
                icon: app.icon_name || '',
                term,
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
                connections: [[hyprland, button => {
                    const running = hyprland.clients
                        .filter(client => (
                            typeof client.class === 'string' &&
                            typeof client.title === 'string' &&
                            typeof client.initialClass === 'string' &&
                            (client.class.includes(term) || client.title.includes(term) || client.initialClass.includes(term))
                        ));

                    const focused = running.find(client => client.address === (hyprland.active.client && hyprland.active.client.address));
                    const index = running.findIndex(c => c === focused);

                    for (let i = 0; i < 5; ++i) {
                        const indicator = button.indicators.children[i];
                        indicator.visible = i < running.length;
                        indicator.toggleClassName('focused', i === index);
                    }
                }]],
            });
        }),
    ]],
});

const Separator = (): Gtk.Separator & SeparatorProps => Widget.Separator({
    vpack: 'center',
    hpack: 'center',
    orientation: 1,
    connections: [[hyprland, box => (box.visible = taskbar.children.length > 0)]],
});

const Dock = (): Gtk.Box & BoxProps => Widget.Box({
    class_name: 'dock',
    vertical: true,
    children: [PinnedApps(), Taskbar()],
});

export default Dock;

