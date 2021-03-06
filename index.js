const { app, BrowserView, BrowserWindow, Menu, Tray, Notification, globalShortcut, shell, dialog, ipcMain } = require('electron');
const https = require('https');
const path = require('path');
const fs = require('fs');

//Information
function title(){
    var title = 'Rampant Release Tracker';
    return title;
}
function buildNum(){
    var build = '2021.04.30';
    return build;
}
const currentVer = app.getVersion(); //Version Variable
const changelogOptions = {
    type: 'info',
    buttons: ['Close'],
    title: 'Changelog',
    message: 'Changes in Rampant Release Tracker v1.0.0-alpha3',
    detail: `- Fixed an issue where changing days wouldn't clear the previous day's list.

  If you have any suggestions for the app, please reach out to me on Twitter @rampantepsilon or Discord (RampantEpsilon#7868).`
  }

//Global Variables
let tray;
let mainWindow; //MainWindow tracker
var homeWindow; //Var to know the state of MainWindow
var notifications; //Notification Toggle
var launchCheck = 'true';

//App Menu
let menuTemplate = [
    {
        label: 'Edit',
        submenu: [
        {
            label: 'Undo',
            role: 'undo',
            accelerator: 'CommandOrControl+Z'
        },{
            label: 'Redo',
            role: 'redo',
            accelerator: 'CommandOrControl+Y'
        },{
            type: 'separator'
        },{
            label: 'Cut',
            role: 'cut',
            accelerator: 'CommandOrControl+X'
        },{
            label: 'Copy',
            role: 'copy',
            accelerator: 'CommandOrControl+C'
        },{
            label: 'Paste',
            role: 'paste',
            accelerator: 'CommandOrControl+V'
        },{
            label: 'Delete',
            role: 'delete'
        },{
            type: 'separator'
        },{
            label: 'Select All',
            role: 'selectAll',
            accelerator: 'CommandOrControl+A'
        }
        ]
    },{
        label: 'View',
        submenu: [
        {
            label: 'Reload',
            role: 'reload',
            accelerator: 'F5'
        },{
            label: 'Clear Cache & Reload',
            role: 'forceReload',
            accelerator: 'CommandOrControl+F5'
        },{
            label: 'Toggle Dev Tools',
            role: 'toggledevtools',
            accelerator: 'CommandOrControl+Alt+I',
            enabled: true,
            visible: true
        },{
            type: 'separator'
        },{
            label: 'Actual Size',
            role: 'resetZoom',
            accelerator: 'CommandOrControl+0'
        },{
            label: 'Zoom In',
            role: 'zoomIn',
            accelerator: 'CommandOrControl+Plus'
        },{
            label: 'Zoom Out',
            role: 'zoomOut',
            accelerator: 'CommandOrControl+-'
        },{
            type: 'separator'
        },{
            label: 'Toggle Full Screen',
            role: 'togglefullscreen',
            accelerator: 'CommandOrControl+F11'
        }
        ]
    },{
        label: 'Window',
        submenu: [
        {
            label: 'Minimize',
            role: 'minimize',
            accelerator: 'CommandOrControl+M'
        },{
            label: 'Close',
            role: 'close',
            accelerator: 'CommandOrControl+W'
        }
        ]
    },{
        label: 'About',
        role: 'about',
        submenu: [
        {
            label: title(),
            enabled: false,
        },{
            label: "Version " + currentVer,
            enabled: false,
        },{
            label: "Build: " + buildNum(),
            enabled: false,
        },{
            label: "Changelog",
            click(){
            changeLog()
            }
        }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuTemplate); //Add Template to Menu

//Function for Changelog
function changeLog(){
    dialog.showMessageBox(null, changelogOptions, (response, checkboxChecked) =>{});
}

function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        title: title(),
        webPreferences: {
            nativeWindowOpen: true
        }
    })

    mainWindow.loadFile('src/index.html');

    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy')

// Listen for web contents being created
app.on('web-contents-created', (e, contents) => {

    // Check for a webview
    if (contents.getType() == 'webview') {

      // Listen for any new window events
      contents.on('new-window', (e, url) => {
        e.preventDefault();
        let win = new BrowserWindow({
            width: 1200,
            height: 675,
            title: title(),
            webPreferences: {
                nativeWindowOpen: true,
                webviewTag: true
            }
        });
        win.loadURL(url);
        //shell.openExternal(url)
      })
    }
  })
