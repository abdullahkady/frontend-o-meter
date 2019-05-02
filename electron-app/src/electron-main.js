const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');
const analyzeDir = require('../src/analyzer');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.

  win = new BrowserWindow({
    icon: path.join(__dirname, '../assets/icons/png/512x512.png'),
    width: 1600,
    height: 900,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: { nodeIntegration: true }
  });

  if (serve) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadFile('build/index.html');
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('analyzeDirectory', (event, dirPath) => {
  analyzeDir(dirPath)
    .then(result => {
      event.sender.send('analyzeDirectory-reply', { err: null, result });
    })
    .catch(err =>
      event.sender.send('analyzeDirectory-reply', { err, result: null })
    );
});

ipcMain.on('chooseDirectory', event => {
  const rawSelection = dialog.showOpenDialog(win, {
    title: 'Choose Project Directory',
    buttonLabel: 'Select Directory',
    properties: ['openDirectory']
  });
  if (!rawSelection) {
    return event.sender.send('chooseDirectory-reply', '');
  }
  const [dirPath] = rawSelection;
  event.sender.send('chooseDirectory-reply', dirPath);
});

ipcMain.on('saveFile', (event, data) => {
  const filePath = dialog.showSaveDialog(win, {
    title: 'Save your exported data',
    defaultPath: 'exported.json'
  });

  if (filePath) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      // I'm a terrible person \_0_/
    });
  }
});
