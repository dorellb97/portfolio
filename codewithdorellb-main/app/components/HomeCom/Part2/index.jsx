import styles from './Part2.module.scss'
import { useTranslation } from 'next-i18next'
export default function Part2() {
  const {t} = useTranslation()
  return (
    <div className={styles.back} id="about-us">
        <p className={styles.title}>{t('home:facts_title_1')}<span>{t('home:facts_title_2')}</span></p>
        <div className={styles.preback}>
        <div className={styles.back}>
      <h1></h1>
      <p>Last updated: May 18, 2023</p>
      
      <p>
      Explore our vast collection of meticulously crafted tutorials, comprehensive guides, and insightful articles, meticulously curated by our team of coding experts. From the basics of HTML and CSS to the intricacies of  JavaScript, and beyond, we cover a wide range of programming languages and concepts to cater to your learning needs.

But it doesn't stop there! Immerse yourself in our vibrant coding community, where you can connect with like-minded individuals, collaborate on exciting projects, and seek guidance from seasoned professionals. Our forums provide a supportive environment for you to ask questions, share ideas, and find inspiration as you progress on your coding journey.

Stay up to date with the latest industry trends and advancements through our blog, where we delve into cutting-edge technologies, innovative frameworks, and emerging programming paradigms. Be prepared to broaden your horizons and stay ahead of the curve.

So, whether you aspire to build groundbreaking web applications, develop captivating mobile apps, or simply expand your knowledge in the world of programming, CodeWithDorellB.com is here to fuel your passion, ignite your creativity, and propel you towards coding mastery.

Join us today and unlock the doors to a world of endless coding possibilities. Let your coding odyssey begin at CodeWithDorellB.com!
      </p>
        </div>
    </div>
    </div>
  )
}
