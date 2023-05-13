import Image from 'next/image'
import styles from './Footer.module.scss'
import React from 'react'
import { useTranslation } from 'next-i18next'
export default function Footer() {
  const {t} = useTranslation()
    return (
    <div className={styles.back}>
        <div className={styles.logo}>
        <a href='/' style={{textDecoration: "none"}}><p>Codewith_Dorell.B</p></a>
        </div>
        <div className={styles.center}>
          <p className={styles.change}>{t('home:future')}</p><p >💫</p>
        </div>
        <div className={styles.last}>
        <a href='https://www.instagram.com/codewith_dorell.b/' style={{textDecoration: "none"}}><Image src="/instagram.svg" width={35} height={35}/></a>
        <a href='https://www.instagram.com/codewith_dorell.b/' style={{textDecoration: "none"}}><Image src="/tg.svg" width={35} height={35}/></a>
        <a href='https://t.me/webxwiz' style={{textDecoration: "none"}}><Image src="/youtube.svg" width={35} height={47}/></a>
        </div>
    </div>
    )
}