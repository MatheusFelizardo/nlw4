import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import styles from '../styles/pages/Home.module.scss'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'
import { DarkTheme } from '../components/DarkTheme'
import { useEffect, useState } from 'react'
import { UserProvider } from '../contexts/UserContext'
import { LoginScreen } from '../components/LoginScreen'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie'
import { signIn, signOut, useSession } from 'next-auth/client'


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;  
}


export default function Home(props:HomeProps) {
  const [isDark, setIsDark] = useState(false)
  const [isLight, setIsLight] = useState(true)
  const [ session, loading ] = useSession()

  function changeToDark() {
    setIsDark(true)
    setIsLight(false)
  }

  function changeToLight() {
      setIsDark(false)
      setIsLight(true)
  }
  
  if(loading) return <h2>Carregando</h2>

  if(!session) {
    return (
      <LoginScreen />
    )
  }
  
  function removeCookies() {
    Cookies.remove('level')
    Cookies.remove('currentExperience')
    Cookies.remove('challengesCompleted')
  }

  function userLogout() {
    removeCookies()
    signOut({ callbackUrl: 'http://localhost:3000/' })
  }

  return (    
    <UserProvider>
      <ChallengesProvider 
        level={props.level} 
        currentExperience={props.currentExperience} 
        challengesCompleted={props.challengesCompleted}
        >  
        <div className={ isDark ? `${styles.page} ${styles.darkTheme}` : `${styles.page}` }>          
          <div className={ isDark ? `${styles.container} ${styles.darkTheme}` : `${styles.container}` }>
            <Head>
              <title>Início | PomoChallenges</title>
            </Head>
            
            <div className={styles.flexContent}>
            <DarkTheme isDark={isDark} isLight={isLight} changeToLight={changeToLight}  changeToDark={changeToDark} />

              <div className={styles.logout} >
                <a onClick={userLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt}/>
                  <p>Logout</p>
                </a>
              </div>
            </div>            
            <ExperienceBar />
            <CountdownProvider>
              <section>
                <div>
                  <div>
                  <Profile />            
                  </div>
                  <CompletedChallenges />
                  <Countdown />
                </div>

                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </div>
      </ChallengesProvider>
    </UserProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies
  
  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
