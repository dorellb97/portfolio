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
          <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          gap: "100px",
        }}
      >
          <iframe src="//cavalryconvincing.com/watchnew?key=57372e2a84c5b521c3b130c6d039f938" height ="300"width ="160" align-items="center" frameborder="0" scrolling="no"></iframe>
          <iframe src="//cavalryconvincing.com/watchnew?key=b90e97a3d0ec53ba62200197912fd06e" height ="320"width ="50" align-items="center" frameborder="0" scrolling="no"></iframe>
     </div>
     </div>
        
        <Part3 />
        {/* <TestComponent /> */}
        {/* <Part2 /> */}
      </div>
      <div className={styles.hideTab}>
        <TopPostsView />
        <div>
         <iframe src="//cavalryconvincing.com/watchnew?key=57372e2a84c5b521c3b130c6d039f938" height ="300"width ="160" align-items="center" frameborder="0" scrolling="no"></iframe>  
         <iframe src="//cavalryconvincing.com/watchnew?key=b90e97a3d0ec53ba62200197912fd06e" height ="320"width ="50" align-items="center" frameborder="0" scrolling="no"></iframe>
         </div>
      </div>

      {/* <div>Hello how are you</div> */}
    </div>
  );
}
