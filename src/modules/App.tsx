import React from "react";
import ReactTooltip from "react-tooltip";
import styles from "./App.module.css";
import ServerManager from "./ServerManager";
import DataUi from "./DataUi";
import { DesktopModuleKey } from "../lib/enums/DesktopModuleKey";
import { DesktopModule } from "../lib/models/DesktopModule";
import Settings from "./Settings";
import Startup from "./Startup";
import { QueryClient, QueryClientProvider } from "react-query";
import { IAppStore, AppStoreProxy } from "../lib/stores/AppStore";
import { useSnapshot } from "valtio";

const registeredModules: DesktopModule[] = [
    {
        key: DesktopModuleKey.ServerManager,
        displayName: "Server Manager",
        imageSource: "/assets/images/modules/server_manager.png",
    },
    {
        key: DesktopModuleKey.DataUi,
        displayName: "Data UI",
        imageSource: "/assets/images/modules/data_ui.png",
    },
];

const App: React.FC = (): React.ReactElement => {
    const queryClient = new QueryClient();
    const appStoreSnap = useSnapshot<IAppStore>(AppStoreProxy);

    const renderBlankAppPlaceholders = (): React.ReactElement[] => {
        const items: React.ReactElement[] = [];

        for (let i = 0; i < 10 - registeredModules.length; i++) {
            items.push(
                <div key={i} className={styles.sidebarLink}>
                    <img className={styles.sidebarImage} src="/assets/images/blank_app.png" alt="Blank App" />
                </div>
            );
        }

        return items;
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.appContainer}>
                {appStoreSnap.activeModuleKey === DesktopModuleKey.Startup && <Startup />}
                {appStoreSnap.activeModuleKey !== DesktopModuleKey.Startup && (
                    <>
                        <div className={styles.sidebar}>
                            <div className={styles.sidebarApps}>
                                {registeredModules.map((desktopModule: DesktopModule) => (
                                    <React.Fragment key={desktopModule.key}>
                                        <div
                                            className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                                appStoreSnap.activeModuleKey === desktopModule.key
                                                    ? `${styles.sidebarLinkActive}`
                                                    : ``
                                            }`}
                                            data-tip
                                            data-for={`${desktopModule.key}-tooltip`}
                                            onClick={() => {
                                                if (desktopModule.key !== appStoreSnap.activeModuleKey) {
                                                    AppStoreProxy.activeModuleKey = desktopModule.key;
                                                }
                                            }}
                                        >
                                            <img
                                                className={styles.sidebarImage}
                                                src={desktopModule.imageSource}
                                                alt={desktopModule.displayName}
                                            />
                                        </div>
                                        <ReactTooltip
                                            id={`${desktopModule.key}-tooltip`}
                                            place="top"
                                            effect="solid"
                                            type="warning"
                                        >
                                            {desktopModule.displayName}
                                        </ReactTooltip>
                                    </React.Fragment>
                                ))}
                                {renderBlankAppPlaceholders()}
                            </div>
                            <div className={styles.sidebarTools}>
                                <div
                                    className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                        appStoreSnap.activeModuleKey === DesktopModuleKey.Settings
                                            ? `${styles.sidebarLinkActive}`
                                            : ``
                                    }`}
                                    data-tip
                                    data-for={"settings-tooltip"}
                                    onClick={() => {
                                        if (appStoreSnap.activeModuleKey !== DesktopModuleKey.Settings) {
                                            AppStoreProxy.activeModuleKey = DesktopModuleKey.Settings;
                                        }
                                    }}
                                >
                                    <img
                                        className={styles.sidebarImage}
                                        src="/assets/images/common/settings.png"
                                        alt="Settings"
                                    />
                                </div>
                                <ReactTooltip id={"settings-tooltip"} place="top" effect="solid" type="warning">
                                    Settings
                                </ReactTooltip>
                            </div>
                        </div>
                        <div className={styles.appActive}>
                            {appStoreSnap.activeModuleKey === DesktopModuleKey.ServerManager && <ServerManager />}
                            {appStoreSnap.activeModuleKey === DesktopModuleKey.DataUi && <DataUi />}
                            {appStoreSnap.activeModuleKey === DesktopModuleKey.Settings && <Settings />}
                        </div>
                    </>
                )}
            </div>
        </QueryClientProvider>
    );
};

export default App;
