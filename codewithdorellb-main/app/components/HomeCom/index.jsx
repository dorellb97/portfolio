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
           </div>
          <div>
          <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="400" height="250" frameborder="0" scrolling="no"></iframe>
     </div>
     <div>
     <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="300" height="250" frameborder="0" scrolling="no"></iframe>
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
         <div>
         <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="400" height="250" frameborder="0" scrolling="no"></iframe>
         </div>
         <div>
         <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="300" height="250" frameborder="0" scrolling="no"></iframe>
         </div>
         </div>
      </div>

      {/* <div>Hello how are you</div> */}
    </div>
  );
}
