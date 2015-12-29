import Player from "./player";

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

    msgContainer.addEventListener("click", e=> {
      e.preventDefault();
      let seconds = e.target.getAttribute("data-seek");
      if(!seconds){ return }

      Player.seekTo(seconds);
    });

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
        this.scheduleMessages(msgContainer, annotations);
      })
      .receive("error", reason => console.log("join failed", reason));
  },

  renderAnnotation(msgContainer, {user, body, at}){
    let template = document.createElement("div");
    template.innerHTML = `
      <a href="#" data-seek="${at}">[${this.formatTime(at)}]</a> <b>${user.username}</b>: ${body}
    `;

    msgContainer.appendChild(template);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  },

  scheduleMessages(msgContainer, annotations){
    setTimeout(() => {
      let ctime = Player.getCurrentTime();
      let remaining = this.renderAtTime(annotations, ctime, msgContainer);
      this.scheduleMessages(msgContainer, remaining);
    }, 1000);
  },

  renderAtTime(annotations, seconds, msgContainer){
    return annotations.filter(ann => {
      if(ann.at > seconds){
        return true;
      } else {
        this.renderAnnotation(msgContainer, ann);
        return false;
      }
    });
  },

  formatTime(at) {
    let date = new Date(null);
    date.setSeconds(at / 1000);
    return date.toISOString().substr(14, 5);
  }
};

export default Video;
