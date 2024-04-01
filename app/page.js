"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Flex from "./flex";
import Grid from "./grid";
import Spotify from "./spotify";

import { useLanyard } from "react-use-lanyard";

export default function Home() {
  const { loading, status } = useLanyard({
    userId: "445035187370328066",
    socket: true,
  });

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date(), 1000));

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Flex vertical={true}>
        <Flex>
          <div>
            <pre>hero</pre>
          </div>
          <Grid cols={2}>
            <div>
              <pre>social</pre>
            </div>
            <div>
              <pre>social</pre>
            </div>
            <div>
              <pre>social</pre>
            </div>
            <div>
              <pre>social</pre>
            </div>
          </Grid>
        </Flex>
        <Flex>
          <Flex vertical={true}>
            <div>
              {!loading && status.spotify && (
                <Spotify data={status.spotify}></Spotify>
              )}
            </div>
            <Flex>
              <div>
                <pre>
                  {date.toLocaleTimeString("en-NZ", {
                    timeZone: "Pacific/Auckland",
                  })}
                </pre>
              </div>
              <div>
                <pre>weather</pre>
              </div>
            </Flex>
          </Flex>
          <div>
            <pre>highlight</pre>
          </div>
        </Flex>
        <div>
          <pre>Send message</pre>
        </div>
      </Flex>
    </main>
  );
}
