import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { createUploadLink } from 'apollo-upload-client';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import Router from 'next/router';
import store from '../redux/store.jsx';
import { ApolloCache } from '@apollo/client/core';
import Loader from '../components/Loader/index.jsx';
import Script from 'next/script';

import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';
import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { AuthProvider } from '../hooks/AuthContext.jsx';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import Disclaimer from './Disclaimer';

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI, credentials: 'include' }),
  });
export const apolloClient = createApolloClient(ApolloCache);
 

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
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
    return <></>;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          {loading ? (
            <Loader />
          ) : (
            <Layout>
              <Head></Head>
              <main>
                <>
                  <Script
                    id="Adsense-id"
                    data-ad-client="ca-pub-6283396829393644"
                    async
                    strategy="afterInteractive"
                    onError={(e) => {
                      console.error('Script failed to load', e);
                    }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6283396829393644"
                  />
                  <Router>
                    <Switch>
                      {/* Other routes for your application */}
                      <Route path="/disclaimer" component={Disclaimer} />
                      <Route path="/" exact component={Component} />
                      {/* Add more routes as needed */}
                    </Switch>
                  </Router>
                </>
              </main>
            </Layout>
          )}
        </ApolloProvider>
      </AuthProvider>
    </Provider>
  );
};

export default appWithTranslation(App);
