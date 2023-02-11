import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";
import { Nothing_You_Could_Do } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import stringify from "json-stringify-pretty-compact";
import moment from "moment";
import momentTz from "moment-timezone";
import { useEffect, useState } from "react";

const nothing_you_could_do = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
});

type Quote = {
  _id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  // The `slug` of the quote author
  authorSlug: string;
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  tags: string[];
};

type Lanyard = {
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  listening_to_spotify: boolean;
  // Lanyard KV
  kv: Map<string, string>;
  // Below is a custom crafted "spotify" object, which will be null if listening_to_spotify is false
  spotify: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
  discord_user: {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  // activities contains the plain Discord activities array that gets sent down with presences
  activities: Map<string, any>[];
};

const getAge = () => moment().diff("2006-04-09", "years", true);
const getTime = () =>
  momentTz.tz("Pacific/Auckland").format("dddd, MMMM Do YYYY, h:mm:ss a");

function Home({
  quote,
  initProps,
}: {
  quote: Quote;
  initProps: { age: number; lanyard: Lanyard; time: string };
}) {
  const [age, setAge] = useState(initProps.age);
  const [time, setTime] = useState(initProps.time);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
      setTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [lanyard, setLanyard] = useState(initProps.lanyard);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

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

      <motion.div
        className={styles.quote_box}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6.2, times: [0, 1 / 6.2, 6 / 6.2, 1] }}
      >
        <figure className={nothing_you_could_do.className}>
          <blockquote cite={`https://api.quotable.io/quotes/${quote._id}`}>
            {quote.content}
          </blockquote>{" "}
          <figcaption>{quote.author}</figcaption>
        </figure>
      </motion.div>

      <motion.main
        className={styles.main}
        initial={{ opacity: 0, display: "none" }}
        animate={{ opacity: 1, display: "block" }}
        transition={{ delay: 6, duration: 0.2 }}
      >
        <SyntaxHighlighter language="javascript" style={duotoneDark}>
          {stringify({
            quote,
            me: {
              firstName: "Jakob",
              lastName: "de Guzman",
              aliases: ["Proximitynow"],
              age,
              location: { country: "New Zealand", city: "Auckland", time },
              hobbies: ["Programming", "Chess", "Anime", "Gym"],
            },
            skills: ["React", "Node.JS", "Figma"],
            contact: {
              email: "jakob@rumia.moe",
              discord: "https://discord.com/users/445035187370328066",
              linkedIn: "https://www.linkedin.com/in/jakob-d/",
            },
            github: "https://github.com/Proximitynow19",
            projects: [],
            discord: lanyard,
            path: "https://rumia.moe/",
          })}
        </SyntaxHighlighter>
      </motion.main>
    </>
  );
}

Home.getInitialProps = async () => {
  return {
    quote: (await axios("https://api.quotable.io/random?tags=technology")).data,
    initProps: {
      age: getAge(),
      lanyard: (
        await axios("https://api.lanyard.rest/v1/users/445035187370328066")
      ).data.data,
      time: getTime(),
    },
  };
};

export default Home;
