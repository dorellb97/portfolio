import React from 'react'
import OnePost from '../../components/OnePost'
import { GET_ONE_POST } from '../../apollo/posts'
import { apolloClient } from '../_app.mjs'

export const getServerSideProps = async ({ query }) => {
  const queryId = query.id
  await apolloClient.query({
    query: GET_ONE_POST,
    variables: { id: queryId }
  });
  return {
    props: {queryId}
  }
}



const ProjectPost = ({ queryId }) => {
  return <OnePost queryId={queryId} />;
};

export default ProjectPost;