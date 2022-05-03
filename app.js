const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state')
const { DisableMinimize } = require('electron-disable-minimize')
const AutoLaunch = require('auto-launch')

let win, tray, mainWindowState

const createWindow = () => {
  mainWindowState = windowStateKeeper()

  win = new BrowserWindow({
    maxWidth: 400,
    minWidth: 150,
    maxHeight: 155,
    minHeight: 40,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    icon: path.join(__dirname, './src/img/clock.ico'),
    frame: false,
    transparent: true,
    skipTaskbar: true,
    minimizable: false,
    fullscreenable: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  mainWindowState.manage(win)

  const handle = win.getNativeWindowHandle()
  DisableMinimize(handle)

  win.loadFile('./src/index.html')

  win.on('closed', () => {
    app.quit()
  })
}

const createTray = () => {
  const contextMenu = [
    {
      label: 'Show',
      click: () => {
        win.focus()
      },
    },
    {
      label: 'Quit',
      click: () => {
        win.close()
      },
    },
  ]

  const menu = Menu.buildFromTemplate(contextMenu)

  tray = new Tray(path.join(__dirname, './src/img/clock.ico'))
  tray.setContextMenu(menu)
  tray.setToolTip('Just Clock')
  tray.on('click', () => {
    win.focus()
  })
}

app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('ready', () => {
  let autoLaunch = new AutoLaunch({
    name: 'Just Clock',
    path: app.getPath('exe'),
  })
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
