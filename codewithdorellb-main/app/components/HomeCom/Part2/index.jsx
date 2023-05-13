import styles from './Part2.module.scss'
import { useTranslation } from 'next-i18next'
export default function Part2() {
  const {t} = useTranslation()
  return (
    <div className={styles.back}>
        <p className={styles.title}>{t('home:facts_title_1')}<span>{t('home:facts_title_2')}</span></p>
        <div className={styles.ul}>
            <li>{t('home:facts_text_1')}</li>
            <li>{t('home:facts_text_2')}</li>
            <li>{t('home:facts_text_3')}</li>
            <li>{t('home:facts_text_4')}</li>
        </div>
    </div>
  )
}
