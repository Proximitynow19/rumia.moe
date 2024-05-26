import styles from "./page.module.css";

import Flex from "./flex";
import Grid from "./grid";
import Hero from "./hero";
import Social from "./social";
import Lanyard from "./lanyard";
import Clock from "./clock";
import Weather from "./weather";
import Highlight from "./highlight";
import Contact from "./contact";

import { FaLinkedinIn, FaEnvelope, FaGithub, FaDiscord } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div
        className={styles.background}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      />
      <main className={styles.main}>
        <Flex vertical={true}>
          <Flex>
            <Hero />
            <Grid cols={2}>
              {[
                [
                  <FaLinkedinIn />,
                  "https://www.linkedin.com/in/jakob-d/",
                  "LinkedIn",
                  "#2D6988",
                ],
                [<FaEnvelope />, "mailto:jakob@rumia.moe", "Email", "#894343"],
                [
                  <FaGithub />,
                  "https://github.com/Proximitynow19",
                  "GitHub",
                  "#6e5494",
                ],
                [
                  <FaDiscord />,
                  "https://discord.com/users/445035187370328066",
                  "Discord",
                  "#8187C9",
                ],
              ].map(([ic, l, n, c], i) => (
                <Social icon={ic} link={l} name={n} color={c} key={i} />
              ))}
            </Grid>
          </Flex>
          <Flex>
            <Flex vertical={true}>
              <Lanyard />
              <Flex>
                <Clock />
                <Weather />
              </Flex>
            </Flex>
            <Highlight />
          </Flex>
          <Contact />
        </Flex>
      </main>
    </>
  );
}
