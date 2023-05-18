import { useQuery } from '@apollo/client';
import { LOADING10_POSTS } from '../../apollo/posts';
import { useState, useEffect } from 'react';

const TestComponent = () => {
    const [posts, setPosts] = useState([])
  const { loading, error, data, refetch } = useQuery(LOADING10_POSTS, {
    variables: {
        skipNumber: "0", // Начальное значение для skipNumber
    },
    
  });

  useEffect(() => {
    setPosts(prevPosts => [...prevPosts, data?.getNextPosts]);
  }, [data]);
  
  

  console.log(data)

//   const loadMorePosts = (data) => {
//     fetchMore({
//       variables: {
//         // skipNumber: data.getNextPosts.length.toString(), // Используйте длину текущего списка постов как значение skipNumber
//         skipNumber: "10", // Используйте длину текущего списка постов как значение skipNumber
//       },
//     });
//   };
console.log(posts)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
console.log(posts[2].length.toString())
  return (
    <div style={{color: "black"}}>
      {posts[2]?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
     <button onClick={() => refetch({ skipNumber: posts[2].length.toString() })}>
        Refetch new breed!
      </button>
    </div>
  );
};

export default TestComponent;