import styles from './Part2.module.scss'
import { useTranslation } from 'next-i18next'
export default function Part2() {
  const {t} = useTranslation()
  return (
    <div className={styles.back} id="about-us">
      {/* <iframe src="//cavalryconvincing.com/watchnew?key=fbfe14d99dd78af78f889fa9e7198342"  align-items="center" frameborder="0" scrolling="no"></iframe> */}
        <p className={styles.title}>{t('header:about_us')}</p>
        <div className={styles.ul}>
            <li>{t('home:facts_text_1')}</li>
            
            <li>{t('home:facts_text_2')}</li>
           
            <li>{t('home:facts_text_3')}</li>
             
            <li>{t('home:facts_text_4')}</li>
            
            <li>{t('home:facts_text_5')}</li>
        </div>
    </div>
  )
}
