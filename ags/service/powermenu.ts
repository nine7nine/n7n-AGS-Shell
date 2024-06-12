import options from "options"

const { lockscreen, sleep, hibernate, reboot, logout, shutdown } = options.powermenu

export type Action = "lockscreen" | "sleep" | "hibernate" | "reboot" | "logout" | "shutdown"

class PowerMenu extends Service {
    static {
        Service.register(this, {}, {
            "title": ["string"],
            "cmd": ["string"],
        })
    }

    #title = ""
    #cmd = ""

    get title() { return this.#title }

    action(action: Action) {
        [this.#cmd, this.#title] = {
            lockscreen: [lockscreen.value, "Lockscreen"],
            sleep: [sleep.value, "Sleep"],
            hibernate: [hibernate.value, "Hibernate"],
            reboot: [reboot.value, "Reboot"],
            logout: [logout.value, "Log Out"],
            shutdown: [shutdown.value, "Shutdown"],
        }[action]

        this.notify("cmd")
        this.notify("title")
        this.emit("changed")
        App.closeWindow("powermenu")
        App.openWindow("verification")
    }

    readonly shutdown = () => {
        this.action("shutdown")
    }

    readonly exec = () => {
        App.closeWindow("verification")
        Utils.exec(this.#cmd)
    }
}

const powermenu = new PowerMenu
Object.assign(globalThis, { powermenu })
export default powermenu
