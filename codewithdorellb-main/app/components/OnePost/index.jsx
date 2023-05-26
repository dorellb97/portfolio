import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState, useRef } from "react";
import styles from "./Post.module.scss";
import { useEffect } from "react";
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
  const preRef = useRef(null);
  const defaultLineLimit = 3;
  const [lineLimit, setLineLimit] = useState(defaultLineLimit);

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

  const handleShowMoreOrLess = () => {
    if (lineLimit === defaultLineLimit) {
      setLineLimit(null); // Show all lines
    } else {
      setLineLimit(defaultLineLimit); // Show default number of lines
    }
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
                const showMoreButtonRef = useRef(null);

                useEffect(() => {
                  if (preElement.current && showMoreButtonRef.current) {
                    const preHeight = preElement.current.offsetHeight;
                    const lineHeight = parseInt(getComputedStyle(preElement.current).lineHeight);
                    const maxLines = Math.floor(preHeight / lineHeight);
                    if (maxLines > defaultLineLimit) {
                      showMoreButtonRef.current.style.display = "block";
                    }
                  }
                }, []);

                return (
                  <div className={`${styles.codeContainer} ${expanded ? styles.expanded : ""}`}>
                    <pre ref={preRef} className={styles.codeContent} style={{ "--line-limit": lineLimit }}>
                      {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { ref: preElement });
                      })}                     
                    </pre>
                    <button className={styles.copyButton} onClick={handleCopyCode(preElement)}>
                      Copy
                    </button>
                    <button
                      ref={showMoreButtonRef}
                      className={styles.showMoreButton}
                      onClick={handleShowMoreOrLess}
                    >
                      {lineLimit === defaultLineLimit ? "Show More" : "Show Less"}
                    </button>
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
