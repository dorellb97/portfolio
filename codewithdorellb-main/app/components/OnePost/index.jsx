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

  const handleCopyCode = (copyElement) => {
    const preElement = copyElement.current;
    if (preElement) {
      const codeText = preElement.innerText;
      navigator.clipboard.writeText(codeText);
    }
  };

  const [isequal, setISequal] = useState(false)
  const [preVal, setPreVal]= useState('');
  const [isClick, setIsClick] = useState(false)
  const handleShowMoreOrLess = (first, second) => {
    if(first === second) {
      setPreVal(first)

    }
    if (lineLimit === defaultLineLimit) {
      setLineLimit(null);
    } else {
      setLineLimit(defaultLineLimit);
    }
  };


  return (
    //cavalryconvincing.com/7b/8b/46/7b8b46a1b228fd1ee289d7f9f358998f
    <div className={styles.preback}>
      <div className={styles.back}>
        <div className={styles.head}>
          <p className={styles.date_text}>{`Published ${creationDate}`}</p>
          <p className={styles.title}>{data?.getPost?.title}</p>
          <iframe src="//cavalryconvincing.com/watchnew?key=fbfe14d99dd78af78f889fa9e7198342" width="900" height="100" frameborder="0" scrolling="no"></iframe>
          <div className={styles.box}>
            <a href={`https://www.youtube.com/channel/UCdJ38tbKf_VG8lHm1StjaUA`}><button>YouTube Channel</button></a>
          </div>
          <iframe src="//cavalryconvincing.com/watchnew?key=b90e97a3d0ec53ba62200197912fd06e'"  align-items="center" frameborder="0" scrolling="no"></iframe>
          <p className={styles.pretitle}>{data?.getPost?.pretitle}</p>
        </div>
        <div className={styles.premark}>
        <ReactMarkdown
          className={styles.markdown}
          children={data?.getPost?.sourceCode}
          remarkPlugins={[remarkGfm]}
          components={{
            pre: (props) => {
              const { children, node } = props;
              const index = 1
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
                <div className={`${styles.codeContainer} ${!expanded ? styles.expanded : ""}`}>
                  <pre ref={preRef} className={styles.codeContent} style={{ "--line-limit": !isClick ? 1 : isClick && preVal === node?.children[0]?.children[0]?.value? null : 1 }}>
                    {React.Children.map(children, (child) => {
                      return React.cloneElement(child, { ref: preElement });
                    })}
                  </pre>
                  <button className={styles.copyButton} onClick={() => handleCopyCode(preElement)}>
                    Copy
                  </button>
                  <button
                    ref={showMoreButtonRef}
                    className={styles.showMoreButton}
                    onClick={() => {
                      setIsClick(!isClick)
                      handleShowMoreOrLess(preElement.current.innerText, node?.children[0]?.children[0]?.value)
                    }
                    }
                  >
                  {!isClick
                    ? "Show More"
                    : isClick && preVal === node?.children[0]?.children[0]?.value
                      ? "Show Less"
                      : "Show More"
                  }
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
