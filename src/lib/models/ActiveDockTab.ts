import { DesktopModuleKey } from "../enums/DesktopModuleKey";

export class ActiveDockTab {
    public key: DesktopModuleKey = DesktopModuleKey.Unknown;
    public tabId: number = 0;
    public panelName: string = "";
}
