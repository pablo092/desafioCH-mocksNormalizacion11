import mongoose from "mongoose";
const user = "";
const pass = "";
const dbname = "";
const credentials = !user && !pass? '' : `${user}:${pass}@`;

class ContenedorMongoDb {
  constructor(model) {
    mongoose.connect(`mongodb+srv://${credentials}cluster0.ak3vl.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, err => {
      if (err) throw new Error(`Error de la conexion de la base de datos ${err}`)
      console.log('Base de datos conectada');
    });
    this.model = model;
    console.log("Conectado a MongoDB");
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(object) {
    const document = new this.model(object);
    await document.save();
    console.log("Document created!", document);
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(id) {
    const object = await this.model.findById(`${id}`);
    console.log(object);
    return object;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    const objects = await this.model.find();
    console.log(objects);
    return objects;
  }

  // Elimina del archivo el objeto con el id buscado.
  async updateById(id, object) {
    let documentUpdate = await this.model.updateOne(
      { _id: `${id}` },
      {
        $set: object,
      }
    );
    console.log(`Object updated!`, documentUpdate);
  }

  // Elimina del archivo el objeto con el id buscado.
  async deleteById(id) {
    let documentDelete = await this.model.deleteById(`${id}`);
    console.log(`Object deleted!`, documentDelete);
  }

  // Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    await this.model.deleteAll();
    console.log(`All objects were deleted!`);
  }
}

export default ContenedorMongoDb;
