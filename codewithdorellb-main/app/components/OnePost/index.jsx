import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Post.module.scss";
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
  const preRefs = useRef([]);

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

  const handleCopyCode = (index) => {
    const preElement = preRefs.current[index];
    if (preElement) {
      const codeText = preElement.innerText;
      navigator.clipboard.writeText(codeText);
    }
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
            children={data?.getPost?.sourceCode}
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => {
                const preElementRef = useRef(null);
                const index = preRefs.current.length;
                preRefs.current.push(preElementRef);

                return (
                  <div className={styles.codeContainer}>
                    <pre ref={preElementRef}>
                      <code>{children}</code>
                    </pre>
                    <button
                      className={styles.copyButton}
                      onClick={() => handleCopyCode(index)}
                    >
                      Copy
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
