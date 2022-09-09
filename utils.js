import util from "util";
import { normalize, schema, denormalize } from "normalizr";

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity("post", { author: schemaAuthor }, { idAttribute: "_id" });
// Definimos un esquema de posts
const schemaMensajes = new schema.Entity("posts", [schemaMensaje] , { idAttribute: "id" });

export function print(object) {
  console.log(util.inspect(object, false, 12, true));
}

export function normalizarMensajes(mensajes) {
  const normalized = normalize(mensajes, schemaMensajes);
  console.log("NORMALIZADO");
  print(normalized);

  desnormalizarMensajes(normalized);
  return normalized;
}

export function desnormalizarMensajes(normalized) {
  const denormalized = denormalize(
    normalized.result,
    schemaMensajes,
    normalized.entities
  );
  console.log("DESNORMALIZADO");
  print(denormalized);

  return denormalized;
}
