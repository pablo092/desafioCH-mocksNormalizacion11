import mongoose from "mongoose";

const mensajesCollection = "mensajes";

const mensajeSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true, default: Date.now() },
  id: { type: String, required: true },
  mensajes: { type: Array, default: [] },
});

export const Mensaje = mongoose.model(mensajesCollection, mensajeSchema);
