import React from 'react'
import LoginCom from '../../components/Login'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header", "home"]))
    }
  }
}

export default function Login() {
  return <LoginCom />
}
