import React from "react";
import Link from "next/link";
import styles from "./TopPostsView.module.scss";
import { useInView } from "react-intersection-observer";
import { PostSkeleton } from "./Skeleton";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../../apollo/posts";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../../apollo/posts";
import { useDebounce } from "@react-hooks-library/core";

const postToBeShownIds = [
  "64623f0b482188c78ac55eb7", // snake 
  "6463e2ddfe47407b60471ca8",//netflix 
  "6463aab3fe47407b60471bea", //maze game
  "6463e0eafe47407b60471c9b", // flipy bird
  "6462417a482188c78ac55ed0", //race
];

const TopPostsView = ({ id, title, videoLink, sourceCode }) => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const { ref, inView } = useInView({
    treshold: 0.5,
    triggerOnce: true,
  });

  let postsToBeShown = [];

  if (data?.getAllPosts?.length > 0) {
    postsToBeShown = postToBeShownIds?.map((id) => {
      let post = data?.getAllPosts?.find((item) => item.id === id);
      if (post) {
        return post;
      }
    });
  }

  return (
    
    <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
      <div ref={ref} className={styles.topPostsContainer}>
        <span style={{ fontSize: 20, marginTop: 10 }}>Top Posts</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
            minWidth: 300,
            //   marginTop: 20,
          }}
        >
          {postsToBeShown?.map((item) => {
            return (
             
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: 15,
                  fontStize: 50
                }}
              >
                <a href={`/projects/${item?.id}`}>
                <img
                  style={{ marginRight: 5 }}
                  width={56}
                  height={56}
                  src={item?.videoLink}
                />
                </a>
                
                {/* <p   className={styles.description}> <a href={`/projects/${item?.id}`}></a>{item.title}</p> */}
                 <a href={`/projects/${item?.id}`}  className={styles.description} > {item.title}</a> 
                 
              </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopPostsView;
