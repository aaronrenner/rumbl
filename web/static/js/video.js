import Player from "./player"

let Video = {
  init(socket, element) {
    if(!element) { return }

    let msgContainer = document.getElementById("msg-container");
    let msgInput = document.getElementById("msg-input");
    let postButton = document.getElementById("msg-submit");
    let videoId = element.getAttribute("data-id");
    let playerId = element.getAttribute("data-player-id");

    Player.init(element.id, playerId);

    socket.connect()

    let vidChannel = socket.channel("videos:" + videoId);


    postButton.addEventListener("click", e => {
      let payload = {body: msgInput.value, at: Player.getCurrentTime()};
      vidChannel.push("new_annotation", payload)
                .receive("error", e => console.log(e));
      msgInput.value = ""
    });

    vidChannel.on("new_annotation", (resp) => {
      this.renderAnnotation(msgContainer, resp);
    });

    vidChannel.join()
      .receive("ok", ({annotations}) => {
        annotations.forEach( ann => this.renderAnnotation(msgContainer, ann));
      })
      .receive("error", reason => console.log("join failed", reason));
  },

  renderAnnotation(msgContainer, {user, body, at}){
    let template = document.createElement("div");
    template.innerHTML = `
      <a href="#" data-seek="#{at}">
        [${this.formatTime(at)}] <b>${user.username}</b>: ${body}
      </a>
    `;

    msgContainer.appendChild(template);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  },

  formatTime(at) {
    let date = new Date(null);
    date.setSeconds(at / 1000);
    return date.toISOString().substr(14, 5);
  }
};

export default Video;
