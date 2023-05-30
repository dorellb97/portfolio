import Image from 'next/image';
import { useState, useMemo } from 'react';
import styles from './Part3.module.scss';
import { useTranslation } from 'next-i18next';
import PostsView from '../Posts/PostsView';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../../apollo/posts';
import { useDebounce } from '@react-hooks-library/core';
import Link from 'next/link';
import { useSelector } from 'react-redux'

export default function Part3() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500); // Debounce time of 500 milliseconds
  const { projectType } = useSelector((state) => state.auth); 

  const { data, loading, error } = useQuery(GET_POSTS);
  const fakeArray = [
    {
      "id": "64580bffc8a2b84184b66a76",
      "title": "JS Clock",
      "sourceCode": "zzZbcrhmYdU",
      "videoLink": "zzZbcrhmYdU"
    }
  ];
  
  const filtered = data?.getAllPosts?.filter(obj => {
    return (
      obj.title.toLowerCase().includes(debouncedSearchText?.toLowerCase()),
      all.push(data)
    );
    
  });

  let css = []
  let js = [] 
  let games = []
  let all = []
  const categorizedData = useMemo(() => filtered?.reduce((agg, data) => {
    if(data.title?.toLowerCase().includes("css")) {
      css.push(data)
    } else if(data.title?.toLowerCase().includes("js")) {
      js.push(data)
    } else   {
      games.push(data)
    }
    
    all.push(data)
    
    return {
      ...agg,
      css: css, 
      js: js, 
      games: games,
      all:all
      
    }
  }, {}), [filtered])

  return (
    <div className={styles.back} id='projects'>
      <div className={styles.head}>
        <p className={styles.title}>
          {t('home:projects_title')}
        </p>
        <Image src="/arrow.svg" width={41} height={114} className={styles.arrow} />
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


      <input type="search" placeholder="Search here..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className={styles.search} />

      <div className={styles.back2}>
        {(loading ? [...Array(3)] : categorizedData[projectType])?.map((obj, key) =>
          // {(loading ? [...Array(3)] :fakeArray).map((obj, key) => 
          loading ?
            (<PostsView key={key} myKey={key} isLoading={true} />) :
            (
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
        <div className={styles.box}>
          <Link href="/#home"><button> Back to Header </button></Link>
        </div>
      </div>
    </div>
  );
}
