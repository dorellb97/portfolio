import React from 'react'
import OnePost from '../../components/OnePost'
import { GET_ONE_POST } from '../../apollo/posts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { apolloClient } from '../_app.mjs'
export async function getServerSideProps({ query, locale }) {
  const queryId = query.id;
  const translations = await serverSideTranslations(locale, ['home', 'header']);

  await apolloClient.query({
    query: GET_ONE_POST,
    variables: { id: queryId }
  });

  return {
    props: {
      queryId,
      ...translations
    }
  }
}



const ProjectPost = ({ queryId }) => {
  return <OnePost queryId={queryId} />;
};

export default ProjectPost;