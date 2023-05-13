import React from 'react';
import Link from 'next/link';
import styles from './PostsView.module.scss'
import { useInView } from 'react-intersection-observer'
import { PostSkeleton } from './Skeleton';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../apollo/posts';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const PostsView = ({
  id,
  title,
  videoLink,
  sourceCode,
}) => {
  const { ref, inView } = useInView({
    treshold: 0.5,
    triggerOnce:true
  })
console.log(videoLink);
const { auth } = useSelector((state) => state.auth);   
const [deletePost, {loading}] = useMutation(DELETE_POST, {
  onCompleted: (data) => {
    Swal.fire({
        icon: 'success',
        title: `Deleted`
      })
  },
  variables: {deletePostId: id}
})
console.log(sourceCode)
  return (
    <div ref={ref} className={styles.back}>
            {inView ?
      (
        <>
    <div className={styles.back} key={id} >
      {auth && <button  className={`${styles.title} ${styles.delete}`} style={{position: "absolute", color: "red"}} onClick={() => deletePost()}>Delete</button>}
      <div className={styles.description}>
          <p className={styles.title}>
            {title}
          </p>
          <div className={styles.box}>
            <a href={`https://www.youtube.com/watch?v=${videoLink}`}><button>Explained video</button></a>
            <a href={sourceCode}><button>Source code</button></a>
          </div>
          </div>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoLink}`} title="YouTube video player" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className={styles.video} />
    </div>
    </>)
     :
     (<PostSkeleton />)
     }
    </div>
  );
};

export default PostsView