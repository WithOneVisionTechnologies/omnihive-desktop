import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styles from "./App.module.css";
import ServerManager from "./ServerManager";
import DataUi from "./DataUi";
import { DesktopModuleKey } from "../lib/enums/DesktopModuleKey";
import { DesktopModule } from "../lib/models/DesktopModule";
import Settings from "./Settings";
import Startup from "./Startup";
import { QueryClient, QueryClientProvider } from "react-query";
import { subscribeKey } from "valtio/utils";
import { rendererSharedStore } from "../lib/stores/RendererSharedStore";
import { rendererReactStore } from "../lib/stores/RendererReactStore";
import { IpcMessageName } from "../lib/enums/IpcMessageName";
import { useSnapshot } from "valtio";
import { useLDClient } from "launchdarkly-react-client-sdk";
import _ from "lodash";
import { DesktopConstants } from "../lib/models/DesktopConstants";
import { ipcRenderer } from "electron-better-ipc";
import NoModules from "./NoModules";

ipcRenderer.answerMain(IpcMessageName.MainSharedStore_AppSettings_Changed, (arg: string) => {
    if (!_.isEqual(rendererSharedStore.appSettings, JSON.parse(arg))) {
        rendererSharedStore.appSettings = JSON.parse(arg);
        console.log(`Renderer Process Received AppSettings Change`);
    }
});

subscribeKey(rendererSharedStore, "appSettings", () => {
    ipcRenderer.callMain(
        IpcMessageName.RendererSharedStore_AppSettings_Changed,
        JSON.stringify(rendererSharedStore.appSettings)
    );
});

let moduleCounter: number = 0;

const App: React.FC = (): React.ReactElement => {
    const queryClient = new QueryClient();
    const rendererReactStoreSnapshot = useSnapshot(rendererReactStore);
    const client = useLDClient();
    const [activeModuleCount, setActiveModuleCount] = useState<number>(0);

    React.useEffect(() => {
        DesktopConstants.registeredModules.forEach((mod: DesktopModule) => {
            const initialFlagValue: boolean = client.variation(`${mod.flagName}`, false);

            if (initialFlagValue === true) {
                moduleCounter = moduleCounter + 1;
            }

            client.on(`change:${mod.flagName}`, (newValue, oldValue) => {
                if (oldValue === false && newValue === true) {
                    moduleCounter = moduleCounter + 1;
                }
                if (oldValue === true && newValue === false) {
                    moduleCounter = moduleCounter - 1;
                }
                if (moduleCounter === 0) {
                    rendererReactStore.activeModuleKey = DesktopModuleKey.Unknown;
                }
                if (moduleCounter === 1 && newValue === true) {
                    rendererReactStore.activeModuleKey = mod.key;
                }
                if (moduleCounter === 1 && newValue === false) {
                    let checkDone: boolean = false;

                    DesktopConstants.registeredModules.forEach((checkMod: DesktopModule) => {
                        if (checkDone === true) {
                            return;
                        }

                        const checkFlagValue: boolean = client.variation(`${checkMod.flagName}`, false);

                        if (checkFlagValue === true) {
                            rendererReactStore.activeModuleKey = checkMod.key;
                            checkDone = true;
                        }
                    });
                }

                setActiveModuleCount(moduleCounter);
            });
        });

        setActiveModuleCount(moduleCounter);
    }, []);

    const renderBlankPlaceholders = (): React.ReactElement[] => {
        const blankPlaceholders: React.ReactElement[] = [];

        for (let i = activeModuleCount; i < 10; i++) {
            blankPlaceholders.push(
                <div key={i} className={styles.sidebarLink}>
                    <img className={styles.sidebarImage} src="/assets/images/blank_app.png" alt="Blank App" />
                </div>
            );
        }

        return blankPlaceholders;
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.appContainer}>
                {rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.Startup && <Startup />}
                {rendererReactStoreSnapshot.activeModuleKey !== DesktopModuleKey.Startup && (
                    <>
                        <div className={styles.sidebar}>
                            <div className={styles.sidebarApps}>
                                {DesktopConstants.registeredModules.map((desktopModule: DesktopModule) => (
                                    <React.Fragment key={desktopModule.key}>
                                        {client.variation(desktopModule.flagName, false) === true && (
                                            <React.Fragment>
                                                <div
                                                    className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                                        rendererReactStoreSnapshot.activeModuleKey === desktopModule.key
                                                            ? `${styles.sidebarLinkActive}`
                                                            : ``
                                                    }`}
                                                    data-tip
                                                    data-for={`${desktopModule.key}-tooltip`}
                                                    onClick={() => {
                                                        if (
                                                            desktopModule.key !==
                                                            rendererReactStoreSnapshot.activeModuleKey
                                                        ) {
                                                            rendererReactStore.activeModuleKey = desktopModule.key;
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
                                        )}
                                    </React.Fragment>
                                ))}
                                {renderBlankPlaceholders()}
                            </div>
                            <div className={styles.sidebarTools}>
                                <div
                                    className={`${styles.sidebarLink} ${styles.sidebarLinkFilled} ${
                                        rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.Settings
                                            ? `${styles.sidebarLinkActive}`
                                            : ``
                                    }`}
                                    data-tip
                                    data-for={"settings-tooltip"}
                                    onClick={() => {
                                        if (rendererReactStoreSnapshot.activeModuleKey !== DesktopModuleKey.Settings) {
                                            rendererReactStore.activeModuleKey = DesktopModuleKey.Settings;
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
                            {rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.Settings && <Settings />}
                            {activeModuleCount === 0 && <NoModules />}
                            {activeModuleCount !== 0 && (
                                <>
                                    {rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.Unknown && (
                                        <NoModules />
                                    )}
                                    {rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.ServerManager && (
                                        <ServerManager />
                                    )}
                                    {rendererReactStoreSnapshot.activeModuleKey === DesktopModuleKey.DataUi && (
                                        <DataUi />
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </QueryClientProvider>
    );
};

export default App;
