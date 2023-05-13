import Image from 'next/image'
import styles from './Part1.module.scss'
import { useTranslation } from 'next-i18next'
import {useQuery, useMutation} from "@apollo/client"
import { CHANGE_LAST_VIDEO, GET_LAST_VIDEO } from '../../../apollo/posts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
export default function Part () {
  const { t } = useTranslation();
  const [url, setUrl] = useState('')
  // const [lastVideo, setLastVideo] = useState("https://youtu.be/embed/zzZbcrhmYdU")
  const {data, loading, error} = useQuery(GET_LAST_VIDEO)
  const [changeUrl, {loading: loadingChange}] = useMutation(CHANGE_LAST_VIDEO, {
    // onError: (error) => {
    //   Swal.fire(`Incorrect url: ${url}`);
    // },
    onCompleted: (data) => {
      Swal.fire({
          icon: 'success',
          title: `Url was added, update page to see new video`
        })
    },
    variables: {text: url}
  });

  // useEffect(() => {
  //   setLastVideo(data)
  // }, [data]);
  console.log(data?.getLastVideo);
  const {auth} = useSelector((state) => state.auth);


  const handleClick = async () => {
    const { value: url } = await Swal.fire({
      title: 'Input url of your video',
      input: 'text',
      inputLabel: 'Your url of your video',
      inputPlaceholder: 'Enter your url of your video'
    })

    if (url) {
      setUrl(url)
      // Swal.fire(`Entered url: ${url}`)
      setTimeout(changeUrl, 500)
    }
  }

  return (
    <div className={styles.back}>
      <div className={styles.left}>
        <p><span>{t('home:first_1')}</span>{t('home:first_2')}</p>
        </div>
        <div className={styles.right}>
         {auth&& <button className={styles.change} onClick={handleClick}>Change✒️</button>} 
        {/* {data?.getLastVideo ?   <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data?.getLastVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className={styles.video}></iframe> : <div className={styles.video}></div>
        } */}
       <iframe width="560" height="315" src={`https://www.youtube.com/embed/zzZbcrhmYdU`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className={styles.video}></iframe> 
        </div>
    </div>
  )
}
