import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import HomeCom from '../components/HomeCom'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "header"]))
    }
  }
}


export default function Hello() {
  return (
  <>
   <Head>
   <link rel="icon" href="/logo.svg"/>
        <title>Codewith_Dorell.B - Creating New Level Websites </title>
        <meta name="description" content="WebXwiz is a company specializing in creating websites of any type. We provide high SEO optimization, modern performance and high security." />
      </Head>
  <HomeCom />
  </>
  )
}
