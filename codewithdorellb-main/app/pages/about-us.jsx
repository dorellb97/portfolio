import React from 'react'
import Part2 from '../components/HomeCom/Part2'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["home", "header"]))
      }
    }
  }
export default function Aboutus() {
  return (
    <div style={{width: "100vw", display: "flex", justifyContent: "center", paddingTop: "3vw", height: "100vh"}}>
        <Part2 />
    </div>
  )
}
