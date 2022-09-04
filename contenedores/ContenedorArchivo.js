("use strict");

import fs from "fs";

function jsonReader(file) {
  let rawdata = fs.readFileSync(file, "UTF8") || "[]";
  let objects = JSON.parse(rawdata);
  return objects;
}

class ContenedorArchivo {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    fs.openSync(`${nombreArchivo}`, "w");
    console.log(`${nombreArchivo} creado!`);
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  save(object) {
    let objects = jsonReader(this.nombreArchivo);
    if (object.id === undefined) {
      if (objects.length > 0) {
        object.id =
          Math.max.apply(
            Math,
            objects.map(function (obj) {
              return obj.id;
            })
          ) + 1;
      } else {
        object.id = 1;
      }
    }

    objects.push(object);

    fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(objects));
    console.log(`Se guardo el objeto con el id: ${object.id}`);
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  getById(id) {
    let objects = jsonReader(this.nombreArchivo);
    const found = objects.find((element) => element.id === id);
    console.log("getById", found);
    return found ? found : null;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  getAll() {
    let objects = jsonReader(this.nombreArchivo);
    console.log("getAll", objects);
    return objects;
  }

  // Elimina del archivo el objeto con el id buscado.
  deleteById(id) {
    let objects = jsonReader(this.nombreArchivo);
    const found = objects.find((element) => element.id === id);
    const filtered = objects.filter((element) => element.id !== id);
    fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(filtered));

    console.log(`Se elimino correctamente el objeto con id: ${id}`);
    console.log("deleteById", found);
    return found ? found : { error: `Elemento con id ${id} no encontrado!` };
  }

  // Elimina todos los objetos presentes en el archivo.
  deleteAll() {
    fs.writeFileSync(`${this.nombreArchivo}`, "[]");
    console.log("Se elimino todo el contenido del archivo");
  }

  updateById(id, object) {
    let objects = jsonReader(this.nombreArchivo);
    let found = objects.find((element) => element.id === id);
    found = object;
    const filtered = objects.filter((element) => element.id !== id);
    filtered.push(found);
    fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(filtered));

    console.log(`Se actualizo correctamente el objeto con id: ${id}`);
    console.log("updateById", found);
    return found ? found : { error: `Elemento con id ${id} no encontrado!` };
  }
}

export default ContenedorArchivo;
