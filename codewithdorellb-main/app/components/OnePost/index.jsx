import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import styles from "./Post.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CodeComponent = ({ language, value }) => {
  const [isCodeVisible, setCodeVisibility] = useState(false);

  const toggleCodeVisibility = () => {
    setCodeVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className={styles.codeContainer}>
      <pre className={isCodeVisible ? styles.expandedCode : styles.collapsedCode}>
        {value}
      </pre>
      <button onClick={toggleCodeVisibility}>
        {isCodeVisible ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default function OnePost({ queryId }) {
  console.log(queryId);
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { getPostId: queryId },
  });
  console.log(error);
  const [creationDate, setCreationDate] = useState("");

  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(parseInt(data?.getPost?.updatedAt));
    const year = date.getFullYear();
    const monthNumber = date.getMonth();
    const monthName = monthNames[monthNumber];
    const day = date.getDate().toString().padStart(2, "0");
    setCreationDate(`${monthName} ${day}, ${year}`);
  }, [data]);

  return (
    <div className={styles.preback}>
      <div className={styles.back}>
        <div className={styles.head}>
          <p className={styles.date_text}>{`Published ${creationDate}`}</p>
          <p className={styles.title}>{data?.getPost?.title}</p>

          <div className={styles.box}>
            <a href={`https://www.youtube.com/channel/UCdJ38tbKf_VG8lHm1StjaUA`}>
              <button>YouTube Channel</button>
            </a>
          </div>

          <p className={styles.pretitle}>{data?.getPost?.pretitle}</p>
        </div>
        <div className={styles.premark}>
          <ReactMarkdown
            className={styles.markdown}
            children={data?.getPost?.sourceCode}
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeComponent,
            }}
          />
        </div>
      </div>
    </div>
  );
}
