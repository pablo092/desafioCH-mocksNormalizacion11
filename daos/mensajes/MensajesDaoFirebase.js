import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class MensajesDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes');
    }
}

export default MensajesDaoFirebase;