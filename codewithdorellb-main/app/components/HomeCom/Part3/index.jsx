import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import styles from "./Part3.module.scss";
import { useTranslation } from "next-i18next";
import PostsView from "../Posts/PostsView";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../../apollo/posts";
import { useDebounce } from "@react-hooks-library/core";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Part3() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500); // Debounce time of 500 milliseconds
  const { projectType } = useSelector((state) => state.auth);

  const { data, loading, error } = useQuery(GET_POSTS);
  const fakeArray = [
    {
      id: "64580bffc8a2b84184b66a76",
      title: "JS Clock",
      sourceCode: "zzZbcrhmYdU",
      videoLink: "zzZbcrhmYdU",
    },
  ];

  const filtered = data?.getAllPosts?.filter((obj) => {
    return obj.title.toLowerCase().includes(debouncedSearchText?.toLowerCase());
  });

  let css = [];
  let js = [];
  let games = [];
  const categorizedData = useMemo(
    () =>
      filtered?.reduce((agg, data) => {
        if (data.title?.toLowerCase().includes("css")) {
          css.push(data);
        } else if (data.title?.toLowerCase().includes("js")) {
          js.push(data);
        } else {
          games.push(data);
        }
        return {
          ...agg,
          css: css,
          js: js,
          games: games,
        };
      }, {}),
    [filtered]
  );

  const [project, setProject] = useState(filtered);

  useEffect(() => {
    setProject(
      projectType == "Projects" ? filtered : categorizedData[projectType]
    );
  }, [projectType, filtered]);

  return (
    <div className={styles.back} id="projects">
      <div className={styles.head}>
        <p className={styles.title}>{t("home:projects_title")}</p>
        <Image
          src="/arrow.svg"
          width={41}
          height={114}
          className={styles.arrow}
        />
        {/* <Posts /> */}
      </div>

      {/* <div className={styles.search} id='category'>
      <label  for="projects">Choose a category</label>
      <select name="projects" id="cars">
        {filtered && filtered.map(obj => (
          <option value={obj.title} key={obj.id}>{obj.title}</option>
        ))}
      </select>
      </div>  */}
{/* <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="300" height="250" frameborder="0" scrolling="no"></iframe> */}
      <input
        type="search"
        placeholder="Search here..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={styles.search}
      />
 {/* <script async="async" data-cfasync="false" src="//cavalryconvincing.com/d826116ece53ad17fb6e20679b7522d4/invoke.js"></script>
<div id="container-d826116ece53ad17fb6e20679b7522d4"></div> */}
{/* <iframe src="//cavalryconvincing.com/watchnew?key=fbfe14d99dd78af78f889fa9e7198342" width="500" height="90" frameborder="0" scrolling="no"></iframe> */}
      <div className={styles.back2}>
        {(loading ? [...Array(3)] : project)?.map((obj, key) =>
          // {(loading ? [...Array(3)] :fakeArray).map((obj, key) =>
          loading ? (
            <PostsView key={key} myKey={key} isLoading={true} />
          ) : (
            <PostsView
              key={key}
              myKey={key}
              id={obj.id}
              title={obj.title}
              sourceCode={obj.sourceCode}
              videoLink={obj.videoLink}
            />
          )
        )}
        {/* <iframe src="//cavalryconvincing.com/watchnew?key=9281de430afa613004176a26d7ff887c" width="300" height="250" frameborder="0" scrolling="no"></iframe> */}
        <div className={styles.box}>
          <Link href="/#home">
            <button> Back to Header  </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
