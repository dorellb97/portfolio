import '../styles/globals.scss'
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache.js";
import { ApolloClient } from "@apollo/client/core/ApolloClient.js";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider.js";
import { createUploadLink } from "apollo-upload-client";
import Head from 'next/head'
import Layout from "../components/Layout.jsx";
import { AuthProvider } from "../hooks/AuthContext.jsx";
import {  useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux';
import Router from 'next/router'
import store from '../redux/store.jsx';
import { ApolloCache } from '@apollo/client/core';
import Loader from '../components/Loader/index.jsx';
import Script from 'next/script';

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI,
    credentials: 'include'
  }),
  });
export const apolloClient = createApolloClient(ApolloCache)


const App = ({
  Component,
  pageProps
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, []);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;}
  return (
    <Provider store={store}>
  <AuthProvider>
  <ApolloProvider client={apolloClient}>
    {
        loading ?<Loader />
        :
      <Layout>
        <Head>
        
        </Head>
        <main>
        <>
    {/* <Script id="Adsense-id" data-ad-client="ca-pub-6283396829393644"
  async strategy="afterInteractive"
  onError={ (e) => { console.error('Script failed to load', e) }}
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6283396829393644" 
/> */}
 {/* <Script
        src={
          'http' +
          (location.protocol === 'https:' ? 's' : '') +
          '://www.profitabledisplaynetwork.com/fbfe14d99dd78af78f889fa9e7198342/invoke.js'
        }
        strategy="afterInteractive"
        
          key = 'fbfe14d99dd78af78f889fa9e7198342'
          format = 'iframe'
          height = "90"
          width= "728"
          params ="{}"
          onError={ (e) => { console.error('Script failed to load', e) }}
      /> */}

 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6283396829393644"
     crossorigin="anonymous"></script> 
        <Component {...pageProps} />
        </>
        </main>
      </Layout>
       }
  </ApolloProvider>
  </AuthProvider>
  </Provider>
  )
}

export default appWithTranslation(App);