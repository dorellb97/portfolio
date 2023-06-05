import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import HomeCom from "../components/HomeCom";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "header"])),
    },
  };
}

export default function Hello() {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>codewithdorellb </title>
        <meta
          name="description"
          content="codewithdorellb JavaScript project css"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P12ML1XCLR"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-P12ML1XCLR');
        </script>
      </Head>
      <HomeCom />
    </>
  );
}
