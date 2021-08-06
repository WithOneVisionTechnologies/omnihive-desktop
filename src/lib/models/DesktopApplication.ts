import { DesktopApplicationKey } from "../enums/DesktopApplicationKey";

export class DesktopApplication {
    public key: DesktopApplicationKey = DesktopApplicationKey.Unknown;
    public displayName: string = "";
    public imageSource: string = "";
}
