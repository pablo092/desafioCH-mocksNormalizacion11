import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class MensajesDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/mensajes.json');
    }
}

export default MensajesDaoArchivo;