import styles from './Part2.module.scss'
import { useTranslation } from 'next-i18next'
export default function Part2() {
  const {t} = useTranslation()
  return (
    <div className={styles.back} id="about-us">
        <p className={styles.title}>{t('header:about_us')}</p>
        <div className={styles.ul}>
            <li>{t('home:facts_text_1')}</li>
            <br> </br> 
            <li>{t('home:facts_text_2')}</li>
            <br> </br> 
            <li>{t('home:facts_text_3')}</li>
            <br> </br> 
            <li>{t('home:facts_text_4')}</li>
            <br> </br> 
            <li>{t('home:facts_text_5')}</li>
        </div>
    </div>
  )
}
