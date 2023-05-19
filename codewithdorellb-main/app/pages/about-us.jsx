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
    <div className={styles.back} id="about-us">
        <p className={styles.title}>{t('header:about_us')}</p>
        <div className={styles.preback}>
        <div className={styles.back}>
      <h1></h1>
      <p>Last updated: May 18, 2023</p>
      
      <h2>
      Explore our vast collection of meticulously crafted tutorials, comprehensive guides, and insightful articles, meticulously curated by our team of coding experts. From the basics of HTML and CSS to the intricacies of  JavaScript, and beyond, we cover a wide range of programming languages and concepts to cater to your learning needs.</h2>

      <h2>But it doesn't stop there! Immerse yourself in our vibrant coding community, where you can connect with like-minded individuals, collaborate on exciting projects, and seek guidance from seasoned professionals. Our forums provide a supportive environment for you to ask questions, share ideas, and find inspiration as you progress on your coding journey.</h2>

      <h2>Stay up to date with the latest industry trends and advancements through our blog, where we delve into cutting-edge technologies, innovative frameworks, and emerging programming paradigms. Be prepared to broaden your horizons and stay ahead of the curve.</h2>

<h2>So, whether you aspire to build groundbreaking web applications, develop captivating mobile apps, or simply expand your knowledge in the world of programming, CodeWithDorellB.com is here to fuel your passion, ignite your creativity, and propel you towards coding mastery.</h2>

<h2>Join us today and unlock the doors to a world of endless coding possibilities. Let your coding odyssey begin at CodeWithDorellB.com!
      </h2>
      </div>
      <img src={`dorel.jpg` } width="450" height="300"></img>
         
    </div>
    </div>



  )
}
