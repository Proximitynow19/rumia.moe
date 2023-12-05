const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.addEventListener("message", (event) => {
  let d = JSON.parse(event.data);

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
    $("#s-artist").text(d.spotify.artist.replace(/;/g, ","));
  } else {
    $("#spotify").fadeOut();
  }
});

$(document).click(() => {
  $("#background").trigger("play");
});

$(document).on("mousemove", (e) => {
  let mx = $(document).width();
  let my = $(document).height();

  let nx = mx / 2 + ((e.pageX * 2) / mx - 1) * mx * -0.01;
  let ny = my / 2 + ((e.pageY * 2) / my - 1) * my * -0.01;

  $("#background").css({ top: ny, left: nx });
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
  $("#blackout").fadeOut();

  const commit = (
    await $.get(
      "https://api.github.com/repos/Proximitynow19/rumia.moe/commits?per_page=1"
    )
  )[0];

  $("#com-id").text(commit.sha.substring(0, 7)).fadeIn();
});
