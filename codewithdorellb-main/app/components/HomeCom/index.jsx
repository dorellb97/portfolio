import React from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import TestComponent from "../Test";
import TopPostsView from "./TopPosts/TopPostsView";
import styles from "./HomeCom.module.scss";

export default function HomeCom() {
  return (
    <div className={styles.topPosts}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          gap: "100px",
        }}
      >
        <Part1 />
        <div className={styles.hideWeb}>
          <TopPostsView />
          <iframe src="////cavalryconvincing.com/d826116ece53ad17fb6e20679b7522d4" width="300" height="250" frameborder="0" scrolling="no"></iframe>
        </div>
        <Part3 />
        {/* <TestComponent /> */}
        {/* <Part2 /> */}
      </div>
      <div className={styles.hideTab}>
        <TopPostsView />
        <iframe src="////cavalryconvincing.com/d826116ece53ad17fb6e20679b7522d4" width="300" height="250" frameborder="0" scrolling="no"></iframe>
      </div>

      {/* <div>Hello how are you</div> */}
    </div>
  );
}
