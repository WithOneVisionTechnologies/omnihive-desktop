const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
const electronReload = require("electron-reload");

// Application variables
let initialLaunchComplete = false;
const isMac = process.platform === "darwin";
const publicDirectory = isDev ? `${path.join(__dirname, "../public")}` : `${path.join(__dirname, "../build")}`;
const publicFilePath = `file://${publicDirectory}`;
let splash;

// Handle menu

const menuTemplate = [
    // { role: 'appMenu' }
    ...(isMac
        ? [
              {
                  label: "OmniHive Desktop",
                  submenu: [
                      { role: "about" },
                      { type: "separator" },
                      { role: "services" },
                      { type: "separator" },
                      { role: "hide" },
                      { role: "hideothers" },
                      { role: "unhide" },
                      { type: "separator" },
                      { role: "quit" },
                  ],
              },
          ]
        : []),
    // { role: 'fileMenu' }
    {
        label: "File",
        submenu: [
            {
                label: "New Window",
                accelerator: "CommandOrControl+N",
                click: () => {
                    createNewWindow();
                },
            },
            isMac ? { role: "close" } : { role: "quit" },
        ],
    },
    // { role: 'editMenu' }
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            ...(isMac
                ? [
                      { role: "pasteAndMatchStyle" },
                      { role: "delete" },
                      { role: "selectAll" },
                      { type: "separator" },
                      {
                          label: "Speech",
                          submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
                      },
                  ]
                : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
        ],
    },
    // { role: 'viewMenu' }
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
        ],
    },
    // { role: 'windowMenu' }
    {
        label: "Window",
        submenu: [
            { role: "minimize" },
            { role: "zoom" },
            ...(isMac
                ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
                : [{ role: "close" }]),
        ],
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click: async () => {
                    const { shell } = require("electron");
                    await shell.openExternal("https://electronjs.org");
                },
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// Initialize App
function initializeApplication() {
    // Set up splash screen
    splash = new BrowserWindow({
        width: 800,
        height: 600,
        icon: `${publicDirectory}/images/Application.icns`,
        resizable: false,
        center: true,
        closable: false,
        movable: false,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        show: false,
    });
    splash.loadURL(`${publicFilePath}/splash.html`);
    splash.show();

    createNewWindow();
}

// Create a new window
function createNewWindow() {
    // Create the browser window.
    let appWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: `${publicDirectory}/images/Application.icns`,
        show: false,
        webPreferences: {
            allowRunningInsecureContent: false,
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    appWindow.loadURL(isDev ? "http://localhost:3000" : `${publicFilePath}/index.html")}`);

    // Open the DevTools.
    if (isDev) {
        appWindow.webContents.openDevTools({ mode: "detach" });
    }

    appWindow.once("ready-to-show", () => {
        if (!initialLaunchComplete) {
            splash.destroy();
            initialLaunchComplete = true;
        }
        appWindow.show();
    });

    appWindow.on("closed", function () {
        appWindow = null;
    });
}

// Load remote debugging port for VSCode Chrome Debugger
if (isDev) {
    app.commandLine.appendSwitch("remote-debugging-port", "8315");
}

// Set application icon
app.dock.setIcon(`${publicDirectory}/images/dock_icon.png`);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(initializeApplication);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        initializeApplication();
    }
});
