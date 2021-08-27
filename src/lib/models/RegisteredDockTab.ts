import { DesktopModuleKey } from "../enums/DesktopModuleKey";

export class RegisteredDockTab {
    public key: DesktopModuleKey = DesktopModuleKey.Unknown;
    public tabId: number = 0;
    public panelName: string = "";
}
