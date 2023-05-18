import { GET_ONE_POST } from "../../apollo/posts";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Collapse from "react-collapsible";
import remarkGfm from "remark-gfm";
import styles from "./Post.module.scss";

const CodeBlock = ({ language, value }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Collapse trigger={language} open={expanded}>
      <SyntaxHighlighter
        language={language}
        style={darcula}
        showLineNumbers={!expanded}
      >
        {value}
      </SyntaxHighlighter>
      {!expanded && (
        <div className={styles.expandButton} onClick={handleToggle}>
          Show More
        </div>
      )}
    </Collapse>
  );
};

const renderers = {
  code: ({ language, value }) => {
    if (language && value) {
      return <CodeBlock language={language} value={value} />;
    }
    return <pre>{value}</pre>;
  },
};

export default function OnePost({ queryId }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { getPostId: queryId },
  });

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
            components={renderers}
          />
        </div>
      </div>
    </div>
  );
}
   

