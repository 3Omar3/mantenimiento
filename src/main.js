const { BrowserWindow, Menu } = require("electron");
const { getConnection } = require("./database");

let window;

function createWindow() {
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.loadFile("src/views/index.html");

  // const mainMenu = Menu.buildFromTemplate(templateMenu);
  // Menu.setApplicationMenu(mainMenu);
}

const templateMenu = [
  {
    label: "File",
    submenu: [
      {
        label: "New Product",
        accelerator: "ctrl+n",
        click() {
          console.log("dasd");
        },
      },
    ],
  },
];

// ********** consultas mysql **************

// inserta usuario
async function registerUser(data) {
  try {
    const conn = getConnection();
    (await conn).query("INSERT INTO usuario SET ?", data);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { createWindow, registerUser };
