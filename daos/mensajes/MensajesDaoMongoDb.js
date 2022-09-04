import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { Mensaje } from "../../models/mensajes/mensajes.js";

class MensajesDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(Mensaje);
    }
}

export default MensajesDaoMongoDb;