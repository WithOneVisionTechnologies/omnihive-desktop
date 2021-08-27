import { DesktopModuleKey } from "../enums/DesktopModuleKey";
import { DesktopModule } from "./DesktopModule";

export class DesktopConstants {
    public static errorTimeout: number = 5000;
    public static launchDarklyAnonymousUser: string = "df77fb42-a10f-4ae9-be2e-6801252950c0";
    public static successTimeout: number = 2000;
    public static warningTimeout: number = 3000;
    public static registeredModules: DesktopModule[] = [
        {
            key: DesktopModuleKey.ServerManager,
            displayName: "Server Manager",
            imageSource: "/assets/images/modules/server_manager.png",
            flagName: "desktop-module-enable-server-manager",
        },
        {
            key: DesktopModuleKey.DataUi,
            displayName: "Data UI",
            imageSource: "/assets/images/modules/data_ui.png",
            flagName: "desktop-module-enable-data-ui",
        },
    ];
}
