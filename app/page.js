"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Flex from "./flex";
import Grid from "./grid";

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
          <Grid>
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
              <pre>activity</pre>
            </div>
            <Flex>
              <div>
                <pre>{date.toTimeString()}</pre>
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
        <pre>{!loading && JSON.stringify(status, null, 4)}</pre>
      </Flex>
    </main>
  );
}
