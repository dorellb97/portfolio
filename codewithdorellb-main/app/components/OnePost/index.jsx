import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function OnePost({ queryId }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { getPostId: queryId },
  });

  const [creationDate, setCreationDate] = useState("");
  const [expanded, setExpanded] = useState(false);

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

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const replacePreTag = (sourceCode) => {
    return sourceCode.replace(
      /<pre>/g,
      `<pre class="${expanded ? styles.expanded : ""}">`
    );
  };

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
            children={replacePreTag(data?.getPost?.sourceCode)}
            remarkPlugins={[remarkGfm]}
            allowDangerousHtml
          />
          <button className={styles.toggleButton} onClick={handleToggleExpand}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
    </div>
  );
}
