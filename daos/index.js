/*Imports dinamicos */

async function init() {
  let mens;

  ["MensajesDaoArchivo", "MensajesDaoFirebase", "MensajesDaoMongoDb"].forEach(
    async (filename) => {
      if (filename == "MensajesDaoArchivo") {
        await import(`./mensajes/${filename}.js`)
          .then(({ default: MensajesDaoArchivo }) => {
            mens = new MensajesDaoArchivo();
          })
          .catch(function (err) {
            console.log(err);
          });
        return mens;
      }
    }
  );
}

const MensajesDao = await init();

console.log("MensajesDao", MensajesDao);

export default { MensajesDao };
