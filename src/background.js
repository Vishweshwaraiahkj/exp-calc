'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import * as path from 'path'
import fs from 'fs'
import Os from 'os'

let udPath = app.getPath('userData')
if (!app.isPackaged) {
  udPath = process.cwd()
}

const homeDir = Os.homedir()
const docsDir = `${homeDir}/Downloads/Documents`

const ipc = ipcMain

const isDevelopment = process.env.NODE_ENV !== 'production'

const consoleError = (err, type) => {
  let message
  switch (err.code) {
    case 'EEXIST':
      message = `Previous ${type} file exists, no further action needed!`
      break

    default:
      message = `Error creating ${type.toLowerCase()} file!`
      break
  }
  console.log(message)
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    minHeight: 560,
    minWidth: 768,
    show: false,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html
      nodeIntegration: process.env.VUE_APP_NODE_INTEGRATION,
      contextIsolation: !process.env.VUE_APP_NODE_INTEGRATION,
      enableRemoteModule: true,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icons/lion-face.ico')
  })

  // creating data files if they doesn't exists already,
  // if exists those will be used.

  const dataPath = udPath + '/data'
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true })
  }

  const expensesFile = path.resolve(dataPath + '/expenses.json')
  const categoriesFile = path.resolve(dataPath + '/categories.json')
  const typesFile = path.resolve(dataPath + '/types.json')
  const usersFile = path.resolve(dataPath + '/users.json')
  const tasksFile = path.resolve(dataPath + '/tasks.json')

  fs.writeFile(expensesFile, '', { flag: 'wx+' }, (err) => {
    if (err) consoleError(err, 'Expenses')
  })

  fs.writeFile(categoriesFile, '', { flag: 'wx+' }, (err) => {
    if (err) consoleError(err, 'Categories')
  })

  fs.writeFile(typesFile, '', { flag: 'wx+' }, (err) => {
    if (err) consoleError(err, 'Types')
  })

  fs.writeFile(usersFile, '', { flag: 'wx+' }, (err) => {
    if (err) consoleError(err, 'Users')
  })

  fs.writeFile(tasksFile, '', { flag: 'wx+' }, (err) => {
    if (err) consoleError(err, 'Tasks')
  })

  win.on('ready-to-show', () => {
    win.show()
    win.maximize()
    win.focus()
    win.webContents.send('isAppReady', udPath)
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // Minimize app
  ipc.on('MinimizeApp', () => {
    win.minimize()
  })

  // Maximize app
  ipc.on('MaximizeApp', () => {
    if (win.isMaximized()) {
      win.restore()
      win.center()
    } else {
      win.maximize()
    }
  })

  // Close app
  ipc.on('CloseApp', () => {
    win.close()
  })

  // Create PDF
  ipc.on('print-to-pdf', (event) => {
    const date = new Date()
    const pdfPath = path.join(docsDir, `/${date.getTime()}.pdf`)
    win.webContents
      .printToPDF({
        printBackground: true,
        landscape: true,
        displayHeaderFooter: false,
        preferCSSPageSize: true
      })
      .then((data) => {
        if (!fs.existsSync(docsDir)) {
          fs.mkdirSync(docsDir, { recursive: true })
        }

        fs.writeFile(pdfPath, data, { flag: 'wx' }, (error) => {
          if (error) throw error
          win.webContents.send('execPdf', {
            message: 'Successfully wrote to PDF',
            path: pdfPath
          })
        })
      })
      .catch((error) => {
        win.webContents.send('execPdf', {
          message: 'Failed to write PDF: ' + error.message,
          path: pdfPath
        })
      })
  })

  win.on('maximize', () => {
    win.webContents.send('isMaximized')
  })

  win.on('unmaximize', () => {
    win.webContents.send('isRestored')
  })

  // set null to win when app closes
  win.on('closed', () => {
    win = null
  })
}

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
