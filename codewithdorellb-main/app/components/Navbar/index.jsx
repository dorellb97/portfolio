import Image from 'next/image'
import styles from './Navbar.module.scss'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext';
import { useSpring, animated } from '@react-spring/web'

export default function Navbar() {
    const { user, logout, authredux } = useContext(AuthContext);
    const router = useRouter();
    const [isOpen, toggle] = useState(false)

    const onLogout = () => {
        logout();
        router.push('/')
        document.location.reload();
    }
    const {t} = useTranslation();
    const { auth } = useSelector((state) => state.auth); 
    const first = useSpring({
        transform: isOpen
          ? "translate(5px, 32px) rotate(-45deg)"
          : "translate(2px, 7px) rotate(0deg)"
      });
      const second = useSpring({
        transform: isOpen
          ? "translate(10px, 4px) rotate(45deg)"
          : "translate(2px, 19px) rotate(0deg)"
      });
      const third = useSpring({
        transform: isOpen
          ? "translate(5px, 32px) rotate(-45deg)"
          : "translate(2px, 31px) rotate(0deg)"
      });  
    return (
    <div className={styles.back}>
        <div className={styles.logo}>
        <Link href='/' style={{textDecoration: "none"}}><p>Codewith_Dorell.B</p></Link>
        </div>
        <div className={styles.center}>
        <Link href='/#projects' style={{textDecoration: "none"}}><p>{t('header:projects')}</p></Link>
        <Link href='https://www.buymeacoffee.com' style={{textDecoration: "none"}}><p>{t('header:support')}</p></Link>
        {auth &&
        <div>
        <Link href="/admin/createpost" style={{textDecoration: "none"}}><p>Create post</p></Link>
        <p onClick={onLogout}>Logout</p>
        </div>
        }
        </div>
        <div className={styles.last}>
        <a href='https://www.instagram.com/codewith_dorell.b/' style={{textDecoration: "none"}}><Image src="/instagram.svg" width={35} height={35}/></a>
        <a href='https://www.instagram.com/codewith_dorell.b/' style={{textDecoration: "none"}}><Image src="/tg.svg" width={35} height={35}/></a>
        <a href='https://t.me/webxwiz' style={{textDecoration: "none"}}><Image src="/youtube.svg" width={35} height={47}/></a>
        </div>
        <div className={styles.menu}>
        {isOpen ?
        <>
      <div className={styles.backmenu}>
        <div>
          {/* <CgMenuMotion onClick={() => toggle(!isOpen)} className={styles.burger2}/> */}
          <svg
        onClick={() => toggle(!isOpen)}
        width="40"
        height="32"
        viewBox="0 0 44 44"
        fill="#07081F"
        className={styles.animate_burger2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.rect width="40" height="4" rx="2" style={third} />
      </svg>
      </div>
         <div className={auth ? `${styles.info_links_admin} ${styles.info_links}` : styles.info_links} >
         <Link prefetch={false} href="/#about-us"><div>{t('header:projects')}</div></Link>
          <Link prefetch={false} href="/#works"><div>{t('header:support')}</div></Link>
          {auth &&
        <div style={{display: "flex", flexDirection: "column", gap: "1vw", marginTop: "2vw", marginBottom: "5vw"}}>
        <Link href="/admin/createpost" style={{textDecoration: "none"}}><p>Create post</p></Link>
        <p onClick={onLogout}>Logout</p>
        </div>
        }
          <div className={styles.box_contacts}>
            <div className={styles.first_child}>
            <a href='https://t.me/webXwiz'><div><Image src="/instagram.svg" alt='.' width={40} height={40}/></div></a>
            <a href='https://www.instagram.com/web.x.wiz/'><div><Image src="/tg.svg" alt='.' width={40} height={40}/></div></a>
            <a href='https://wa.me/380938036791'><div><Image src="/youtube.svg" alt='.' width={40} height={40}/></div></a>
            </div>
          </div>
         </div>
        </div>
        </>
        :
        <div className={styles.premenu}>
        <svg
        onClick={() => toggle(!isOpen)}
        width="40"
        height="32"
        viewBox="0 0 44 44"
        fill="#07081F"
        className={styles.animate_burger}
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.rect width="40" height="4" rx="2" style={third} />
      </svg>
      </div>
        // <CgMenu className={styles.burger} onClick={() => setIsOpenMenu(!isOpenMenu)}/>  
      }
      </div>
    </div>
    )
}