import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState, useRef } from "react";
import styles from "./Post.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function OnePost({ queryId }) {
  console.log(queryId);
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { getPostId: queryId },
  });
  console.log(error);
  const [creationDate, setCreationDate] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const preRef = useRef(null);
  const maxLines = 5; // Set the maximum number of lines to show initially

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

  useEffect(() => {
    const preElement = preRef.current;
    if (preElement) {
      const lineHeight = parseInt(getComputedStyle(preElement).lineHeight);
      const contentHeight = preElement.offsetHeight;
      const computedLineCount = Math.ceil(contentHeight / lineHeight);
      setLineCount(computedLineCount);
    }
  }, [data]);

  const handleCopyCode = () => {
    const preElement = preRef.current;
    if (preElement) {
      const codeText = preElement.innerText;
      navigator.clipboard.writeText(codeText);
    }
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.preback}>
      <div className={styles.back}>
        <div className={styles.head}>
          <p className={styles.date_text}>{`Published ${creationDate}`}</p>
          <p className={styles.title}>{data?.getPost?.title}</p>

          <div className={styles.box}>
            <a href={`https://www.youtube.com/channel/UCdJ38tbKf_VG8lHm1StjaUA`}><button>YouTube Channel</button></a> 
          </div> 

          <p className={styles.pretitle}>{data?.getPost?.pretitle}</p>
        </div>
        <div className={styles.premark}>
          <ReactMarkdown
            className={styles.markdown}
            children={data?.getPost?.sourceCode}
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => {
                const preElement = useRef(null);
                return (
                  <div className={styles.codeContainer}>
                    <pre
                      ref={preRef}
                      className={`${styles.codeContent} ${
                        expanded ? styles.expanded : ""
                      }`}
                      style={
                        !expanded
                          ? { maxHeight: `${maxLines * 2.2}em`, overflow: "hidden" }
                          : {}
                      }
                    >
                      {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { ref: preElement });
                      })}
                    </pre>
                    <button className={styles.copyButton} onClick={handleCopyCode}>
                      Copy
                    </button>
                    {lineCount > maxLines && (
                      <button className={styles.expandButton} onClick={handleToggleExpand}>
                        {expanded ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
