const textInput = document.getElementById("text-input");
const chatForm = document.getElementById("chat-form");

const formatMessage = (email, text, avatar) => {
  return {
    email,
    text,
    time: moment(new Date()).format("DD/MM/YYYY HH:mm:ss a"),
    avatar,
  };
};

const renderMessage = (data) => {
  const div = document.createElement("div");
  const email = data.email;
  let html = `<div class="other-messages">
    <span style="font-weight: bolder; color: blue;"><b>${email}</b></span>
    <span style="color: brown;">[${data.time}]:</span>
    <span style="font-style: italic; color: green;">${data.text}</span>
    <img style="vertical-align: middle; width: 50px; height: 50px; border-radius: 50%;" src="${data.avatar}" alt="Avatar">
  </div>`;
  div.innerHTML = html;
  document.getElementById("messages").appendChild(div);
};

const socket = io("http://localhost:8080");

// Join chat
// const { email } = Qs.parse(window.location.search, {
//   ignoreQueryPrefix: true
// });
socket.emit("join-chat", { email });

socket.on("chat-message", (normalizedMensajes) => {
  const schemaAuthor = new normalizr.schema.Entity("author",{}, { idAttribute: "email" });
  const schemaMensaje = new normalizr.schema.Entity("post", { author: schemaAuthor }, { idAttribute: "_id" });
  const schemaMensajes = new normalizr.schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });

  let mensajesNsize = JSON.stringify(normalizedMensajes).length;
  console.log(normalizedMensajes, mensajesNsize);

  let mensajesD = normalizr.denormalize(
    normalizedMensajes.result,
    schemaMensajes,
    normalizedMensajes.entities
  );

  let mensajesDsize = JSON.stringify(mensajesD).length;
  console.log(mensajesD, mensajesDsize);

  let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize);
  console.log(`Porcentaje de compresión ${porcentajeC}%`);
  document.getElementById('compresion-info').innerText = porcentajeC;

  const msg = mensajesD.mensajes[mensajesD.mensajes.length - 1];
  console.log({ msg });

  const data = formatMessage(msg.author.email, msg.text, msg.author.avatar);

  renderMessage(data);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: textInput.value,
  };

  socket.emit("new-message", msg);
  textInput.value = "";
});
