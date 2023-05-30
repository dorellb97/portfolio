import Image from 'next/image'
import styles from './Navbar.module.scss'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext';
import { useSpring, animated } from '@react-spring/web'
import { Dropdown } from "@nextui-org/react";
import { setProjectType } from "../../redux/slices/auth";

function Navbar() {
    const { user, logout, authredux } = useContext(AuthContext);
    const router = useRouter();
    const [isOpen, toggle] = useState(false)
    const dispatch = useDispatch();

    const onLogout = () => {
        logout();
        router.push('/')
        document.location.reload();
    }
    const {t} = useTranslation();
    const { auth, projectType } = useSelector((state) => state.auth); 
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
    
      const onSelect = (e) => {
        dispatch(setProjectType(e.currentKey?.toLowerCase()))
      }
    return (
      <div className={styles.back}>
          <div className={styles.logo}>
          <Link href='/' style={{textDecoration: "none"}}><p>Codewith_Dorell.B</p></Link>
          </div>
          <div className={styles.center}>

          <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {projectType}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={projectType}
            onSelectionChange={(e) => onSelect(e)}
          >
            <Dropdown.Item key="Css">CSS Project</Dropdown.Item>
            <Dropdown.Item key="JS">JS Projects</Dropdown.Item>
            <Dropdown.Item key="Games">Games</Dropdown.Item>
        
          </Dropdown.Menu>
        </Dropdown>
          <Link href='/about-us' style={{textDecoration: "none"}}><p>{t('header:about_us')}</p></Link>
          <Link href='/disclaimer' style={{textDecoration: "none"}}><p>{t('header:disclaimer')}</p></Link>
          <Link href='/privacy-policy' style={{textDecoration: "none"}}><p>{t('header:privacy_policy')}</p></Link>
          <Link href='https://www.buymeacoffee.com/codewithdorellb' target="_blank" style={{textDecoration: "none"}}><p>{t('header:support')}</p></Link>
          {auth &&
          <div>
          <Link href="/admin/createpost" style={{textDecoration: "none"}}><p>Create post</p></Link>
          <p onClick={onLogout}>Logout</p>
          </div>
          }
          </div>
          <div className={styles.last}>
          <a href='https://www.instagram.com/codewith_dorell.b/' style={{textDecoration: "none"}}><Image src="/instagram.svg" width={35} height={35}/></a>
          <a href='https://t.me/codewith_dorellb' style={{textDecoration: "none"}}><Image src="/tg.svg" width={35} height={35}/></a>
          <a href='https://www.youtube.com/@codewith_Dorell.B' style={{textDecoration: "none"}}><Image src="/youtube.svg" width={35} height={47}/></a>
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


          <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {projectType}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={projectType}
            onSelectionChange={(e) => onSelect(e)}
          >
            <Dropdown.Item key="Css">CSS Project</Dropdown.Item>
            <Dropdown.Item key="JS">JS Projects</Dropdown.Item>
            <Dropdown.Item key="Games">Games</Dropdown.Item>
        
          </Dropdown.Menu>
        </Dropdown>


          {/*<Link prefetch={false} href="/#projects"><div>{t('header:projects')}</div></Link>*/}
          <Link prefetch={false} href="/about-us"><div>{t('header:about_us')}</div></Link>
          <Link prefetch={false} href="/disclaimer"><div>{t('header:disclaimer')}</div></Link>
          <Link prefetch={false} href="/privacy-policy"><div>{t('header:privacy_policy')}</div></Link>
            <Link prefetch={false} href="https://www.buymeacoffee.com/codewithdorellb"><div>{t('header:support')}</div></Link>
            {auth &&
          <div style={{display: "flex", flexDirection: "column", gap: "1vw", marginTop: "2vw", marginBottom: "5vw"}}>
          <Link href="/admin/createpost" style={{textDecoration: "none"}}><p>Create post</p></Link>
          <p onClick={onLogout}>Logout</p>
          </div>
          }
            <div className={styles.box_contacts}>
              <div className={styles.first_child}>
              <a href='https://www.instagram.com/codewith_dorell.b/'><div><Image src="/instagram.svg" alt='.' width={40} height={40}/></div></a>
              <a href='https://t.me/codewith_dorellb'><div><Image src="/tg.svg" alt='.' width={40} height={40}/></div></a>
              <a href='https://www.youtube.com/@codewith_Dorell.B'><div><Image src="/youtube.svg" alt='.' width={40} height={40}/></div></a>
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

export default (Navbar);