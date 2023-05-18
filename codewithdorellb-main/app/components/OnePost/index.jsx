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
  const divRef = useRef(null);

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
    const preElements = divRef.current.querySelectorAll("pre");
    if (preElements.length > 0) {
      let codeText = "";
      preElements.forEach((preElement) => {
        codeText += preElement.textContent + "\n";
      });

      // Create a temporary textarea element to copy the code
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
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
              div: ({ children, ...props }) => {
                const divElementRef = useRef(null);
                divRef.current = divElementRef;

                return <div ref={divElementRef} {...props}>{children}</div>;
              },
              pre: ({ children }) => {
                return (
                  <div className={styles.codeContainer}>
                    <pre>
                      <code>{children}</code>
                    </pre>
                  </div>
                );
              },
            }}
          />
          <button className={styles.copyButton} onClick={handleCopyCode}>
            Copy All Code
          </button>
        </div>
      </div>
    </div>
  );
}
