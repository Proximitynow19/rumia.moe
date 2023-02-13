import Head from "next/head";
import Box from "@/components/Box";
import styles from "@/styles/Home.module.css";
import {
  FaReact,
  FaFigma,
  FaCloudflare,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPython,
  FaStrava,
  FaGithub,
  FaEnvelope,
  FaDiscord,
  FaLinkedin,
} from "react-icons/fa";
import { SiOsu, SiMyanimelist } from "react-icons/si";
import { ReactNode, useEffect, useState } from "react";

import moment from "moment-timezone";

import axios from "axios";

const socials: Record<string, { icon: ReactNode; href: string }> = {
  "osu!": { icon: <SiOsu />, href: "https://osu.ppy.sh/users/13706100" },
  MyAnimeList: {
    icon: <SiMyanimelist />,
    href: "https://myanimelist.net/profile/Proximitynow",
  },
  Strava: {
    icon: <FaStrava />,
    href: "https://www.strava.com/athletes/108114192",
  },
  GitHub: { icon: <FaGithub />, href: "https://github.com/Proximitynow19" },
};

const skills: Record<string, ReactNode> = {
  React: <FaReact />,
  Figma: <FaFigma />,
  Cloudflare: <FaCloudflare />,
  Linux: <FaLinux />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJsSquare />,
  Python: <FaPython />,
};

const contacts: Record<string, { icon: ReactNode; href: string }> = {
  Email: { icon: <FaEnvelope />, href: "mailto:jakob@rumia.moe" },
  Discord: {
    icon: <FaDiscord />,
    href: "https://discord.com/users/445035187370328066",
  },
  LinkedIn: {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/jakob-d/",
  },
};

const user_id = "445035187370328066";

const ActivityTypes: { [key: number]: string } = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  4: "",
  5: "Competing in",
};

function Home({
  projects,
  reactive,
}: {
  projects: { name: string; description: string }[];
  reactive: { time: string; lanyard: any };
}) {
  const [time, setTime] = useState(reactive.time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        moment().tz("Pacific/Auckland").format("dddd, MMMM Do YYYY, h:mm:ss a")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [lanyard, setLanyard] = useState(reactive.lanyard);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.op) {
        case 1:
          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: user_id },
            })
          );

          setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, data.heartbeat_interval);

          break;
        case 0:
          setLanyard(data.d);

          break;
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Jakob de Guzman</title>
        <meta name="description" content="hello :)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div
            className={styles.background}
            style={{ backgroundImage: `url(/takapuna.jpg)` }}
          />
          <div className={styles.greeting}>
            <h1>Hey, I&apos;m Jakob</h1>
            <span>
              <h2>🇳🇿 Auckland, New Zealand</h2>
            </span>
            <div>{time}</div>
            <div className={styles.layout}>
              {Object.keys(socials).map((k, i) => (
                <Box title={k} key={i}>
                  <a
                    href={socials[k].href}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {socials[k].icon}
                  </a>
                </Box>
              ))}
            </div>
          </div>
        </div>
        {lanyard.activities.length > 0 ? (
          <div>
            <h1>Activity</h1>
            <ul>
              {lanyard.activities.map((k: any, i: number) => (
                <li key={i}>
                  <strong>
                    {ActivityTypes[k.type]} {k.name}
                  </strong>
                  <div>
                    {k.details}
                    <br />
                    {k.state}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div>
          <h1>Introduction</h1>
          <p>
            I am a full-stack developer based in Auckland, New Zealand. Although
            I have proficiency in both frontend and backend development, I tend
            to prefer working on backend projects. I am currently a student at
            Rangitoto College, where I am pursuing my passion for coding. In my
            free time, I enjoy watching anime and spending time at the gym to
            improve my physical programming.
          </p>
        </div>
        <div>
          <h1>Skills</h1>
          <p>
            I am a highly skilled individual with a diverse range of technical
            abilities. The following is a list of some of the key areas in which
            I excel:
          </p>
          <div className={styles.layout}>
            {Object.keys(skills).map((k, i) => (
              <Box size={2} spacing={2} title={k} key={i}>
                {skills[k]}
              </Box>
            ))}
          </div>
        </div>
        <div>
          <h1>Projects</h1>
          <div className={styles.layout}>
            {projects.map((k, i) => (
              <Box size={8} roundness={1 / 4} spacing={4} key={i}>
                <h1 className={styles.projectTitle}>{k.name}</h1>
                <p>{k.description}</p>
              </Box>
            ))}
          </div>
        </div>
        <div>
          <h1>Contact</h1>
          <div className={styles.layout}>
            {Object.keys(contacts).map((k, i) => (
              <Box size={8} roundness={1 / 4} spacing={12} title={k} key={i}>
                <a href={contacts[k].href} target={"_blank"} rel={"noreferrer"}>
                  {contacts[k].icon}
                </a>
              </Box>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

Home.getInitialProps = async () => {
  return {
    projects: [
      {
        name: "rumia.moe",
        description:
          "A simple Next.JS-based website to showcase some of my projects and skills.",
      },
      {
        name: "tetr.js",
        description: "A npm module to interact with the TETR.IO API.",
      },
      {
        name: "RangiHub",
        description:
          "Made for students at Rangitoto College to access their timetables and attendance.",
      },
    ],
    reactive: {
      time: moment()
        .tz("Pacific/Auckland")
        .format("dddd, MMMM Do YYYY, h:mm:ss a"),
      lanyard: (
        await axios("https://api.lanyard.rest/v1/users/445035187370328066")
      ).data.data,
    },
  };
};

export default Home;
