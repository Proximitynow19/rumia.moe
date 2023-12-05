const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.addEventListener("message", (event) => {
  let d = JSON.parse(event.data);

  console.log(d);

  if (d.op == 1) {
    socket.send(
      JSON.stringify({
        op: 2,
        d: { subscribe_to_id: "445035187370328066" },
      })
    );

    return setInterval(() => {
      socket.send(JSON.stringify({ op: 3 }));
    }, d.d.heartbeat_interval);
  }

  d = d.d;

  if (d.listening_to_spotify) {
    $("#spotify").fadeIn();
    $("#spotify > img").attr("src", d.spotify.album_art_url);
    $("#s-title").text(d.spotify.song);
    $("#s-artist").text(d.spotify.artist);
  } else {
    $("#spotify").fadeOut();
  }
});

function large_image(key) {
  if (key.startsWith("spotify:"))
    return "https://i.scdn.co/image/" + key.substring(8);

  return key;
}

$(document).click(() => {
  $("#background").trigger("play");
});

function acks() {
  $("#main").fadeOut();
  $("#notes").fadeIn();
}

function orig() {
  $("#notes").fadeOut();
  $("#main").fadeIn();
}

$(async () => {
  const commit = (
    await $.get(
      "https://api.github.com/repos/Proximitynow19/rumia.moe/commits?per_page=1"
    )
  )[0];

  $("#com-id").text(commit.sha.substring(0, 7));
});
