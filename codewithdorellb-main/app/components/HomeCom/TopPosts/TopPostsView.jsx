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
  "64693b6a69afeebc34bf09d2",
  "646936fc69afeebc34bf09cc",
  "6469351a69afeebc34bf09c8",
  "6465f890d15f82a69ae4559c",
  "6465f5ebd15f82a69ae45590",
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
        <span style={{ fontSize: 18, marginTop: 10 }}>Top Posts</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
            minWidth: 250,
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
                }}
              >
                <img
                  style={{ marginRight: 5 }}
                  width={56}
                  height={56}
                  src={item?.videoLink}
                />
                <p className={styles.description}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopPostsView;
