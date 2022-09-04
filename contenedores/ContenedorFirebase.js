const serviceAccount = require("./DB/coderhouse-ecommercebe-firebase-adminsdk-rb9yk-0953ab5ad8.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderhouse-ecommercebe.firebaseio.com",
});

class ContenedorFirebase {
  constructor(collectionName) {
    this.db = admin.firestore();
    this.query = this.db.collecion(collectionName);
    console.log("Base Firebase conectada!");
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(object) {
    try {
      await this.query.doc().create(object);
      console.log("Document created!", object);
    } catch (error) {
      console.log(error);
    }
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(id) {
    let object;
    await this.query
      .get()
      .where("id", "==", id)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          object = doc.data();
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return object;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    let objects = [];
    await this.query
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          objects = doc.data();
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return objects;
  }

  // Elimina del archivo el objeto con el id buscado.
  async updateById(id, object) {
    await this.query
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.update(object);
          console.log(`Object updated!`);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  // Elimina del archivo el objeto con el id buscado.
  async deleteById(id) {
    await this.query
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
          console.log(`Object deleted!`);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  // Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    await this.query
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
          console.log(`All objects were deleted!`);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }
}

export default ContenedorFirebase;
