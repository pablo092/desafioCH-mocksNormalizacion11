import express from "express";
const app = express();
import { createServer } from "http";
const httpServer = createServer(app);
import { Server } from "socket.io";
import { engine } from "express-handlebars";
const io = new Server(httpServer);
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { normalizarMensajes } from "./utils/utils.js";
import ProductosRouter from "./routers/productos.js";
const PORT = process.env.PORT || 8080;
import MensajesDaoArchivo from "./daos/mensajes/MensajesDaoArchivo.js";
const mensajesApi = new MensajesDaoArchivo();

const mensajes= [];
const users = [];

// Handlebars config
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials"),
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./views")));

// Routes
app.use("/productos-test", new ProductosRouter());

// Listen
httpServer.listen(PORT, () => {
  console.log(`Server is up and running on port: `, PORT);
});

// Sockets events
io.on("connection", (socket) => {
  console.log(`New client connection! socket_id: ${socket.id}`);
  // send mesages
  const normalizedMessages = normalizarMensajes(mensajes);
  socket.emit("messages", normalizedMessages);

  // Join chat
  socket.on("join-chat", ({ email }) => {
    const newUser = {
      id: socket.id,
      email,
    };
    users.push(newUser);

    // Welcome current user
    // socket.emit('chat-message', normalizedMessages);

    // Broadcast user connection
    // socket.broadcast.emit('chat-message', normalizedMessages);
  });

  socket.on("new-message", (msg) => {
    mensajesApi.save(msg);
    mensajes.push(msg);
    const normalizedMessages = normalizarMensajes({ id: 'mensajes', mensajes })

    io.emit("chat-message", normalizedMessages);
  });
});
