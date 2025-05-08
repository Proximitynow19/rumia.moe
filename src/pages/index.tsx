import { useEffect, useState } from "react";

import Head from "next/head";

import { motion } from "framer-motion";

import styles from "@/styles/Home.module.css";
import {
  FaEnvelope,
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaSteam,
  FaStrava,
} from "react-icons/fa";
import { SiOsu } from "react-icons/si";

const socials = {
  Email: { icon: <FaEnvelope />, uri: "mailto:jakob@rumia.moe", contact: true },
  Discord: {
    icon: <FaDiscord />,
    uri: "https://discord.com/users/445035187370328066",
    contact: true,
  },
  GitHub: { icon: <FaGithub />, uri: "https://github.com/Proximitynow19" },
  LinkedIn: {
    icon: <FaLinkedinIn />,
    uri: "https://www.linkedin.com/in/jakob-d",
    contact: true,
  },
  Instagram: {
    icon: <FaInstagram />,
    uri: "https://www.instagram.com/jakob.deguzman/",
  },
  Twitter: { icon: <FaTwitter />, uri: "https://twitter.com/valeforgreen" },
  "osu!": { icon: <SiOsu />, uri: "https://osu.ppy.sh/users/13706100" },
  Steam: {
    icon: <FaSteam />,
    uri: "https://steamcommunity.com/id/Proximitynow19",
  },
  Strava: {
    icon: <FaStrava />,
    uri: "https://www.strava.com/athletes/108114192",
  },
};

export default function Home() {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      switch (data.op) {
        case 1:
          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: "445035187370328066" },
            })
          );

          setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, data.heartbeat_interval);
          break;
        case 0:
          let activities = data.d.activities.filter((k: any) => k.type != 4);

          for (let i = 0; i < activities.length; i++) {
            let activity = activities[i];

            switch (activity?.type) {
              case 0:
                activities[i].type = "Playing";
                break;
              case 1:
                activities[i].type = "Streaming";
                break;
              case 2:
                activities[i].type = "Listening to";
                break;
              case 3:
                activities[i].type = "Watching";
                break;
              case 5:
                activities[i].type = "Competing in";
                break;
            }
          }

          setActivity(activities);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Jakob de Guzman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Primary Meta Tags */}
        <title>Jakob de Guzman</title>
        <meta name="title" content="Jakob de Guzman" />
        <meta
          name="description"
          content="Hi, I'm Jakob, a Student and a Programmer from New Zealand."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rumia.moe/" />
        <meta property="og:title" content="Jakob de Guzman" />
        <meta
          property="og:description"
          content="Hi, I'm Jakob, a Student and a Programmer from New Zealand."
        />
        <meta property="og:image" content="/removed.png" />

        {/* Twitter */}
        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        <meta property="twitter:url" content="https://rumia.moe/" />
        <meta property="twitter:title" content="Jakob de Guzman" />
        <meta
          property="twitter:description"
          content="Hi, I'm Jakob, a Student and a Programmer from New Zealand."
        />
        <meta property="twitter:image" content="/removed.png" />

        {/* Other */}
        <meta property="theme-color" content="#1C1F0F" />
      </Head>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={styles.heroBackground}
        />

        <motion.header initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className={styles.centerItems}>
            <h1>Jakob</h1>
            <h3>@proximitynow</h3>
          </div>
          <div>
            {activity.map((a, i) => (
              <div key={i} className={styles.activity}>
                <span>
                  {a.type} {a.name}
                </span>
                <span>{[a.details, a.state].filter((k) => k).join(" · ")}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className={styles.socialList}>
            {Object.entries(socials).map(([key, value], i) => {
              return (
                <a href={value.uri} target={"_blank"} title={key} key={i}>
                  {value.icon}
                </a>
              );
            })}
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2>About Me</h2>
          <hr />
          <p>
            As a full-stack developer, I possess a diverse skill set that
            enables me to handle different aspects of software development. My
            experience in both frontend and backend development allows me to
            design and build applications that are not only functional but also
            visually appealing. I enjoy the challenge of creating software that
            is both user-friendly and efficient. Throughout my journey as a
            developer, I have developed proficiency in various programming
            languages, including Python, and JavaScript. I also have experience
            working with databases such as MongoDB.
          </p>
          <br />
          <p>
            Currently, I am a student at Rangitoto College, where I am pursuing
            my passion for coding. The college has provided me with a platform
            to hone my coding skills and learn about the latest technologies in
            the industry. In addition to the coursework, I also participate in
            coding competitions, hackathons, and coding clubs, which have
            further improved my coding abilities. When I am not coding, I enjoy
            watching anime and spending time at the gym. I believe that physical
            exercise helps me to stay healthy and focused, which ultimately
            translates to better productivity in my coding projects. Overall, I
            am a driven and passionate full-stack developer who is always eager
            to learn new things and take on new challenges.
          </p>
        </motion.section>
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2>Projects</h2>
          <hr />
          I&apos;m still working out my portfolio, however, you may check my
          GitHub profile posted at the top of the page.
        </motion.section>
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2>Contact</h2>
          <hr />
          <p>
            You may reach out to me via any of the methods listed at the top of
            the page, however, Email and Discord are preferred.
          </p>
        </motion.section>
      </main>
    </>
  );
}
