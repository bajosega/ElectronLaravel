import { app, BrowserWindow ,Menu } from 'electron';
import path from 'path';
import { spawn } from 'child_process';

let mainWindow;
let phpServer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Eliminar el menú de la aplicación
  Menu.setApplicationMenu(null);

  mainWindow.loadURL('http://127.0.0.1:8000');

  mainWindow.on('closed', function () {
    mainWindow = null;
    if (phpServer) {
      phpServer.kill();
    }
  });
}

app.on('ready', () => {
  // Obtener la ruta del directorio actual del módulo
  //const currentDir = path.dirname(new URL(import.meta.url).pathname);

  const currentDir = "";

  // Iniciar servidor PHP embebido
  const phpPath = path.join(currentDir, 'php', process.platform === 'win32' ? 'php.exe' : 'php');
  phpServer = spawn(phpPath, ['-S', '127.0.0.1:8000', '-t', 'public']);

  phpServer.stdout.on('data', (data) => {
    console.log(`PHP: ${data}`);
  });

  phpServer.stderr.on('data', (data) => {
    console.error(`PHP Error: ${data}`);
  });

  phpServer.on('close', (code) => {
    console.log(`PHP server exited with code ${code}`);
  });

  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// Manejo de errores global en el proceso principal
process.on('uncaughtException', (error) => {
  console.error('Error en el proceso principal:', error);
});
