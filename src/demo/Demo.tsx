import type { CSSProperties } from "react";
import { Tabs } from "../components/Tabs";
import styles from "./Demo.module.scss";

const blocks = [0, 1, 2, 3, 4, 5];

function List() {
  return (
    <div className={styles.list}>
      {blocks.map((block) => (
        <div key={block} className={styles.block} style={{ "--index": block } as CSSProperties} />
      ))}
    </div>
  );
}

function Grid() {
  return (
    <div className={styles.grid}>
      {blocks.map((block) => (
        <div key={block} className={styles.block} style={{ "--index": block } as CSSProperties} />
      ))}
    </div>
  );
}

export function Demo() {
  return (
    <main className={styles.page}>
      <Tabs aria-label="Mailbox sections" variant="pill">
        <Tabs.Tab label="Emails">
          <List />
        </Tabs.Tab>
        <Tabs.Tab label="Files" badge={{ label: "Warning", variant: "negative" }}>
          <Grid />
        </Tabs.Tab>
        <Tabs.Tab label="Edits">
          <List />
        </Tabs.Tab>
        <Tabs.Tab label="Dashboard">
          <Grid />
        </Tabs.Tab>
        <Tabs.Tab label="Messages">
          <List />
        </Tabs.Tab>
      </Tabs>
    </main>
  );
}
