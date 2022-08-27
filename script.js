const wallpapers = [
  "250252.jpg",
  "303025.jpg",
  "303027.jpg",
  "312921.jpg",
  "715937.png",
  "719612.png",
  "754161.jpg",
  "762597.jpg",
  "763114.jpg",
  "824372.png",
  "847306.png",
  "901837.png",
  "914032.jpg",
  "934750.png",
  "937734.jpg",
  "957023.png",
  "1061397.jpg",
  "1070378.png",
  "1108003.png",
  "1125361.png",
  "1126546.png",
  "1145963.jpg",
  "1161086.jpg",
];

const index = Math.round(Math.random() * (wallpapers.length - 1));

$(".hero").css("background-image", `url('wallpapers/${wallpapers[index]}')`);

setTimeout(() => {
  window.location = "https://japanesegobl.in/";
}, 30000);
