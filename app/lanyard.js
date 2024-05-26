"use client";

import { useLanyard } from "react-use-lanyard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./utils.module.css";
import sEmbla from "./embla.module.css";

export default function Lanyard() {
  const { loading, status } = useLanyard({
    userId: "445035187370328066",
    socket: true,
  });

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div
      className={styles.container + " " + sEmbla.embla}
      style={{ width: "350px", height: "100px" }}
      ref={emblaRef}
    >
      <div className={sEmbla.container}>
        {activities(loading ? [] : status).map((k, i) => (
          <div className={sEmbla.slide} key={i}>
            <div>{k.name}</div>
            <div>{k.details}</div>
            <div>{k.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function activities(input) {
  let a =
    input.activities
      ?.filter((k) => ![2, 4].includes(k.type))
      .map((k) => {
        k.name = "test" + k.name;
        return k;
      }) || [];

  if (input.spotify) {
    a.push({ name: "Listening to Spotify" });
  }

  return a;
}
