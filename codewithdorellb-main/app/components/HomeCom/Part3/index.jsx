import Image from 'next/image'
import styles from './Part3.module.scss'
import { useTranslation } from 'next-i18next';
import PostsView from '../Posts/PostsView';
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../../apollo/posts';
export default function Part3() {
  const {t} = useTranslation()
  const {data, loading, error} = useQuery(GET_POSTS);
  const fakeArray = [
    {
      "id": "64580bffc8a2b84184b66a76",
      "title": "JS Clock",
      "sourceCode": "zzZbcrhmYdU",
      "videoLink": "zzZbcrhmYdU"
    }
  ];
  
  return (
    <div className={styles.back} id='projects'>
      <div className={styles.head}>
        <p className={styles.title}>
        {t('home:projects_title')}
        </p>
        <Image src="/arrow.svg" width={41} height={114} className={styles.arrow}/>
        {/* <Posts /> */}
       
        </div>
            <div className={styles.back2}>
            {/* {(loading ? [...Array(3)] :data?.getAllPosts).map((obj, key) =>  */}
            {(loading ? [...Array(3)] :fakeArray).map((obj, key) => 
             loading ? 
             (<PostsView     key={key} 
                 myKey={key} isLoading={true} />) :
            (
            <PostsView
                key={key} 
                myKey={key}
                id={obj.id}
                title={obj.title}
                sourceCode={obj.sourceCode}
                videoLink={obj.videoLink}
            />
            ),
            )}
        </div>
    </div>
  )
}
